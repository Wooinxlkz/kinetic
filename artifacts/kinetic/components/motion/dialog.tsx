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
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Focus trap ───────────────────────────────────────────────────────────────

const FOCUSABLE =
  'button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])';

function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const panel = ref.current;

    // Initial focus: first focusable element
    const focusable = () => Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
    requestAnimationFrame(() => focusable()[0]?.focus());

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const els = focusable();
      if (els.length === 0) { e.preventDefault(); return; }
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [active, ref]);
}

// ─── Context ─────────────────────────────────────────────────────────────────

type DialogCtx = { open: boolean; setOpen: (v: boolean) => void; titleId: string };
const DialogContext = createContext<DialogCtx | null>(null);
function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog compound components must be used inside <Dialog>");
  return ctx;
}

// ─── Variants ────────────────────────────────────────────────────────────────

const BACKDROP_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: EASE_OUT } },
};

const PANEL_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.93, y: 12, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...SPRING_PANEL,
      opacity: { duration: 0.18, ease: EASE_OUT },
      filter: { duration: 0.25, ease: EASE_OUT },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    filter: "blur(4px)",
    transition: { duration: 0.15, ease: EASE_OUT },
  },
};

const REDUCED_PANEL: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const titleId = useId();
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolled;
  const setOpen = useCallback(
    (v: boolean) => {
      if (!isControlled) setUncontrolled(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange],
  );
  return (
    <DialogContext.Provider value={{ open, setOpen, titleId }}>
      {children}
    </DialogContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

export function DialogTrigger({
  children,
  className,
  asChild,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog();
  const handleClick = () => setOpen(true);

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

// ─── Content ──────────────────────────────────────────────────────────────────

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  maxWidth?: string;
  /**
   * "default" is the standard weighty entrance (scale + blur + spring).
   * "fast" is a lighter, quicker entrance for content-heavy dialogs (e.g.
   * code viewers) where a slower/blurrier animation reads as sluggish.
   * Purely a timing/variant choice — behavior and API are unchanged.
   */
  speed?: "default" | "fast";
}

const FAST_PANEL_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.98, y: 6 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 560, damping: 36, mass: 0.4 },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    y: 4,
    transition: { duration: 0.1, ease: EASE_OUT },
  },
};

export function DialogContent({
  children,
  className,
  onClose,
  maxWidth = "max-w-md",
  speed = "default",
}: DialogContentProps) {
  const { open, setOpen, titleId } = useDialog();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [setOpen, onClose]);

  // Focus trap
  useFocusTrap(panelRef, open);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  // Body scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={BACKDROP_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={handleClose}
            aria-hidden="true"
          />
          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "relative z-10 w-full rounded-2xl border border-border bg-background p-6 shadow-2xl",
              maxWidth,
              className,
            )}
            variants={reduce ? REDUCED_PANEL : speed === "fast" ? FAST_PANEL_VARIANTS : PANEL_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4 pr-6", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  const { titleId } = useDialog();
  return (
    <h2 id={titleId} className={cn("text-lg font-semibold text-foreground", className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-1 text-sm text-muted-foreground", className)}>{children}</p>;
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mt-6 flex flex-wrap justify-end gap-2", className)}>
      {children}
    </div>
  );
}

export function DialogClose({
  children,
  className,
  asChild,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog();
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
