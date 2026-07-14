"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Context ─────────────────────────────────────────────────────────────────

type PopCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerId: string;
  triggerRef: RefObject<HTMLElement | null>;
};
const PopContext = createContext<PopCtx | null>(null);
function usePop() {
  const ctx = useContext(PopContext);
  if (!ctx) throw new Error("Popover components must be used inside <Popover>");
  return ctx;
}

// ─── Variants ────────────────────────────────────────────────────────────────

function buildVariants(side: "top" | "bottom" | "left" | "right"): Variants {
  const offset = { top: { y: 8 }, bottom: { y: -8 }, left: { x: 8 }, right: { x: -8 } }[side];
  return {
    initial: { opacity: 0, scale: 0.93, filter: "blur(8px)", ...offset },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: {
        ...SPRING_PANEL,
        opacity: { duration: 0.18, ease: EASE_OUT },
        filter: { duration: 0.25, ease: EASE_OUT },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)",
      transition: { duration: 0.14, ease: EASE_OUT },
    },
  };
}

const REDUCED: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// ─── Position calculator ──────────────────────────────────────────────────────

const GAP = 8;
const MARGIN = 8; // minimum distance from viewport edges

/**
 * Computes fixed position for the portal panel.
 * Uses actual measured content dimensions (from the mounted ref) so alignment
 * math and viewport clamping are always pixel-accurate regardless of width class.
 * Falls back gracefully when dimensions aren't available yet on the first paint.
 */
function calcStyle(
  rect: DOMRect,
  side: "top" | "bottom" | "left" | "right",
  align: "start" | "center" | "end",
  contentEl: HTMLElement | null,
): CSSProperties {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cw = contentEl?.offsetWidth ?? 0;
  const ch = contentEl?.offsetHeight ?? 0;
  const style: CSSProperties = { position: "fixed" };

  if (side === "right") {
    style.left = Math.min(rect.right + GAP, vw - cw - MARGIN);
    style.top = Math.min(Math.max(rect.top, MARGIN), vh - ch - MARGIN);
    return style;
  }

  if (side === "left") {
    style.left = Math.max(rect.left - GAP - cw, MARGIN);
    style.top = Math.min(Math.max(rect.top, MARGIN), vh - ch - MARGIN);
    return style;
  }

  // Vertical axis: bottom / top with flip when content overflows viewport
  if (side === "bottom") {
    const fitsBelow = ch === 0 || rect.bottom + GAP + ch <= vh - MARGIN;
    style.top = fitsBelow ? rect.bottom + GAP : Math.max(rect.top - GAP - ch, MARGIN);
  } else {
    const fitsAbove = ch === 0 || rect.top - GAP - ch >= MARGIN;
    style.top = fitsAbove ? rect.top - GAP - ch : rect.bottom + GAP;
  }

  // Horizontal alignment with viewport clamping
  let rawLeft: number;
  if (align === "start") {
    rawLeft = rect.left;
  } else if (align === "end") {
    rawLeft = rect.right - cw;
  } else {
    rawLeft = rect.left + rect.width / 2 - cw / 2;
  }

  // Clamp: keep content within [MARGIN, vw - cw - MARGIN], skip if cw unknown
  style.left =
    cw > 0
      ? Math.min(Math.max(rawLeft, MARGIN), vw - cw - MARGIN)
      : rawLeft;

  return style;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function Popover({ open: ctrl, onOpenChange, children }: PopoverProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const triggerId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const isControlled = ctrl !== undefined;
  const open = isControlled ? ctrl : uncontrolled;
  const setOpen = useCallback(
    (v: boolean) => {
      if (!isControlled) setUncontrolled(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange],
  );
  return (
    <PopContext.Provider value={{ open, setOpen, triggerId, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </PopContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

export function PopoverTrigger({
  children,
  className,
  asChild,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, triggerId, triggerRef } = usePop();
  const handleClick = () => setOpen(!open);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      id: triggerId,
      ref: triggerRef,
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      onClick: handleClick,
    });
  }
  return (
    <button
      id={triggerId}
      ref={triggerRef as RefObject<HTMLButtonElement>}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={`${triggerId}-content`}
      className={className}
      {...rest}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

export interface PopoverContentProps {
  children: ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  width?: string;
}

export function PopoverContent({
  children,
  className,
  side = "bottom",
  align = "start",
  width = "w-72",
}: PopoverContentProps) {
  const { open, setOpen, triggerId, triggerRef } = usePop();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});

  // Portal requires document — guard against SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Recalculate fixed position whenever open, side, or align changes.
  // Passes ref.current so calcStyle can measure the actual rendered dimensions
  // for accurate center-alignment and viewport clamping.
  useEffect(() => {
    if (!open) return;
    const update = () => {
      const el = triggerRef.current;
      if (!el) return;
      setStyle(calcStyle(el.getBoundingClientRect(), side, align, ref.current));
    };
    update();
    window.addEventListener("scroll", update, { capture: true, passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
    };
  }, [open, side, align, triggerRef]);

  // Outside-click and Escape dismissal
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        const trigger = triggerRef.current;
        if (trigger?.contains(e.target as Node)) return;
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen, triggerRef]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id={`${triggerId}-content`}
          role="dialog"
          aria-labelledby={triggerId}
          style={style}
          className={cn(
            "z-[9999] rounded-xl border border-border bg-popover p-4 shadow-xl shadow-black/10",
            width,
            className,
          )}
          variants={reduce ? REDUCED : buildVariants(side)}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ─── Close ────────────────────────────────────────────────────────────────────

export function PopoverClose({
  children,
  className,
  asChild,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = usePop();
  const handleClick = () => setOpen(false);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      onClick: handleClick,
    });
  }
  return (
    <button type="button" className={className} {...rest} onClick={handleClick}>
      {children}
    </button>
  );
}
