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
import { Check } from "lucide-react";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Context ─────────────────────────────────────────────────────────────────

type DDCtx = { open: boolean; setOpen: (v: boolean) => void; triggerId: string };
const DDContext = createContext<DDCtx | null>(null);
function useDD() {
  const ctx = useContext(DDContext);
  if (!ctx) throw new Error("DropdownMenu components must be inside <DropdownMenu>");
  return ctx;
}

// ─── Variants ────────────────────────────────────────────────────────────────

const MENU_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.94, y: -6, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...SPRING_PANEL,
      opacity: { duration: 0.15, ease: EASE_OUT },
      filter: { duration: 0.2, ease: EASE_OUT },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -4,
    filter: "blur(4px)",
    transition: { duration: 0.12, ease: EASE_OUT },
  },
};

const REDUCED_MENU: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
};

const ITEM_VARIANTS: Variants = {
  initial: { opacity: 0, x: -4 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0 },
};

// ─── Root ─────────────────────────────────────────────────────────────────────

export function DropdownMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerId = useId();
  return (
    <DDContext.Provider value={{ open, setOpen, triggerId }}>
      <div className="relative inline-block">{children}</div>
    </DDContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

export function DropdownMenuTrigger({
  children,
  className,
  asChild,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, triggerId } = useDD();
  const handleClick = () => setOpen(!open);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      id: triggerId,
      "aria-haspopup": "menu",
      "aria-expanded": open,
      onClick: handleClick,
    });
  }
  return (
    <button
      id={triggerId}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      className={className}
      {...rest}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

export interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
}

export function DropdownMenuContent({
  children,
  className,
  align = "start",
  side = "bottom",
}: DropdownMenuContentProps) {
  const { open, setOpen, triggerId } = useDD();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        const trigger = document.getElementById(triggerId);
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
  }, [open, setOpen, triggerId]);

  const alignClass =
    align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";
  const sideClass = side === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="menu"
          aria-labelledby={triggerId}
          className={cn(
            "absolute z-50 min-w-[160px] rounded-xl border border-border bg-popover p-1 shadow-xl shadow-black/10",
            alignClass,
            sideClass,
            className,
          )}
          variants={reduce ? REDUCED_MENU : MENU_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            variants={{
              animate: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
            }}
            initial="initial"
            animate="animate"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  inset?: boolean;
  checked?: boolean;
  destructive?: boolean;
  icon?: ReactNode;
  shortcut?: string;
}

export function DropdownMenuItem({
  children,
  className,
  inset,
  checked,
  destructive,
  icon,
  shortcut,
  onClick,
  disabled,
  ...rest
}: DropdownMenuItemProps) {
  const { setOpen } = useDD();
  const reduce = useReducedMotion();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen(false);
    },
    [onClick, setOpen],
  );

  return (
    <motion.div variants={reduce ? undefined : ITEM_VARIANTS}>
      <button
        type="button"
        role="menuitem"
        disabled={disabled}
        className={cn(
          "flex w-full cursor-default select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm outline-none transition-colors",
          "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
          destructive && "text-destructive hover:bg-destructive/10 hover:text-destructive",
          inset && "pl-8",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        onClick={handleClick}
        {...rest}
      >
        {checked !== undefined && (
          <span className="h-4 w-4 flex-shrink-0">
            {checked && <Check className="h-4 w-4" />}
          </span>
        )}
        {icon && (
          <span className="h-4 w-4 flex-shrink-0 text-muted-foreground">{icon}</span>
        )}
        <span className="flex-1 text-left">{children}</span>
        {shortcut && (
          <kbd className="ml-auto text-xs text-muted-foreground">{shortcut}</kbd>
        )}
      </button>
    </motion.div>
  );
}

// ─── Separator ───────────────────────────────────────────────────────────────

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div role="separator" className={cn("my-1 h-px bg-border", className)} />;
}

// ─── Label ───────────────────────────────────────────────────────────────────

export function DropdownMenuLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-2.5 py-1 text-xs font-medium text-muted-foreground", className)}>
      {children}
    </div>
  );
}
