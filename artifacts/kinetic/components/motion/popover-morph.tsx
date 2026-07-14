"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Side = "top" | "bottom";
type Align = "start" | "end";

type MorphContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  triggerId: string;
  contentId: string;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const MorphContext = createContext<MorphContextValue | null>(null);

function useMorphContext(component: string) {
  const ctx = useContext(MorphContext);
  if (!ctx) throw new Error(`${component} must be used within <MorphPopover>`);
  return ctx;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface MorphPopoverProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function MorphPopover({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
}: MorphPopoverProps) {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const controlled = controlledOpen !== undefined;
  const open = controlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!controlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange],
  );

  const toggle = useCallback(() => setOpen(!open), [setOpen, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node))
        setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, setOpen]);

  const ctx = useMemo<MorphContextValue>(
    () => ({
      open,
      setOpen,
      toggle,
      triggerId: `${baseId}-trigger`,
      contentId: `${baseId}-content`,
    }),
    [open, setOpen, toggle, baseId],
  );

  return (
    <MorphContext.Provider value={ctx}>
      <div ref={rootRef} className={cn("relative inline-flex", className)}>
        {children}
      </div>
    </MorphContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

export interface MorphPopoverTriggerProps {
  children: ReactNode;
}

/**
 * Wraps children in a transparent `contents` span that captures click events.
 * This way any element — including components that don't forward props — will
 * toggle the popover when clicked.
 */
export function MorphPopoverTrigger({ children }: MorphPopoverTriggerProps) {
  const ctx = useMorphContext("MorphPopoverTrigger");
  return (
    <span
      id={ctx.triggerId}
      onClick={ctx.toggle}
      aria-haspopup="true"
      aria-expanded={ctx.open}
      className="contents"
    >
      {children}
    </span>
  );
}

// ─── Clip helpers ─────────────────────────────────────────────────────────────

/** Corner origin that matches the trigger's side and alignment. */
function clipAt(side: Side, align: Align, r: number) {
  const x = align === "end" ? `calc(100% - ${r}px)` : `${r}px`;
  const y = side === "bottom" ? `${r}px` : `calc(100% - ${r}px)`;
  return { x, y };
}

function clipHidden(side: Side, align: Align, r: number) {
  const { x, y } = clipAt(side, align, r);
  return `circle(0px at ${x} ${y})`;
}

function clipShown(side: Side, align: Align, r: number) {
  const { x, y } = clipAt(side, align, r);
  return `circle(150% at ${x} ${y})`;
}

// ─── Arrow ────────────────────────────────────────────────────────────────────

function Arrow({ side, align }: { side: Side; align: Align }) {
  const isBottom = side === "bottom";
  const isEnd = align === "end";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-0 w-0",
        isBottom
          ? "-top-[6px] border-b-[6px] border-b-border"
          : "-bottom-[6px] border-t-[6px] border-t-border",
        isEnd ? "right-3" : "left-3",
        "border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent",
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute h-0 w-0",
          isBottom
            ? "-bottom-[7px] -left-[5px] border-b-[5px] border-b-background"
            : "-top-[7px] -left-[5px] border-t-[5px] border-t-background",
          "border-l-[5px] border-r-[5px] border-l-transparent border-r-transparent",
        )}
      />
    </span>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

export interface MorphPopoverContentProps {
  children: ReactNode;
  side?: Side;
  align?: Align;
  radius?: number;
  /** Show a small caret arrow pointing toward the trigger. */
  showArrow?: boolean;
  /**
   * - `"default"` — opaque background
   * - `"glass"` — translucent backdrop-blur surface
   */
  variant?: "default" | "glass";
  className?: string;
}

export function MorphPopoverContent({
  children,
  side = "bottom",
  align = "start",
  radius = 12,
  showArrow = false,
  variant = "default",
  className,
}: MorphPopoverContentProps) {
  const ctx = useMorphContext("MorphPopoverContent");
  const reduce = useReducedMotion();

  const posClass = cn(
    "absolute z-30",
    side === "bottom" ? "top-[calc(100%+8px)]" : "bottom-[calc(100%+8px)]",
    align === "end" ? "right-0" : "left-0",
  );

  const glassClass =
    variant === "glass"
      ? "bg-background/75 backdrop-blur-xl"
      : "bg-background";

  return (
    <AnimatePresence>
      {ctx.open ? (
        <motion.div
          id={ctx.contentId}
          style={{ borderRadius: radius }}
          initial={
            reduce
              ? { opacity: 0 }
              : { clipPath: clipHidden(side, align, radius) }
          }
          animate={
            reduce
              ? { opacity: 1 }
              : { clipPath: clipShown(side, align, radius) }
          }
          exit={
            reduce
              ? { opacity: 0 }
              : { clipPath: clipHidden(side, align, radius) }
          }
          transition={
            reduce
              ? { duration: 0.14 }
              : { ...SPRING_PANEL, stiffness: 440, damping: 36 }
          }
          className={cn(
            posClass,
            "overflow-hidden border border-border shadow-lg shadow-black/10",
            glassClass,
            className,
          )}
        >
          {showArrow && <Arrow side={side} align={align} />}
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
