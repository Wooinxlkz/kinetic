"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { SPRING_PANEL, EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "success" | "error" | "warning";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// ─── Variant config ───────────────────────────────────────────────────────────

const VARIANT_ICON = {
  default: Info,
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
};

const VARIANT_CLASS: Record<ToastVariant, string> = {
  default: "text-primary bg-primary/10",
  success: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
  error: "text-destructive bg-destructive/10",
  warning: "text-amber-600 bg-amber-500/10 dark:text-amber-400",
};

const TOAST_DURATION = 4000;
const MAX_VISIBLE = 5;
let seed = 0;

// ─── Single Toast ─────────────────────────────────────────────────────────────

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const progressRef = useRef<HTMLDivElement>(null);
  const variant = toast.variant ?? "default";
  const Icon = VARIANT_ICON[variant];

  // Animate progress bar width from 100% → 0% over TOAST_DURATION
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    const elapsed = Date.now() - toast.createdAt;
    const remaining = Math.max(TOAST_DURATION - elapsed, 0);
    const startFraction = remaining / TOAST_DURATION;

    if (reduce) {
      el.style.width = "0%";
      return;
    }

    el.style.width = `${startFraction * 100}%`;
    const anim = el.animate(
      [{ width: `${startFraction * 100}%` }, { width: "0%" }],
      { duration: remaining, easing: "linear", fill: "forwards" },
    );
    return () => anim.cancel();
  }, [toast.createdAt, reduce]);

  return (
    <motion.div
      layout
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.18, ease: EASE_OUT } }
      }
      transition={SPRING_PANEL}
      drag={reduce ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400) {
          onDismiss(toast.id);
        }
      }}
      className="relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/10 will-change-transform"
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <span
          className={cn(
            "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
            VARIANT_CLASS[variant],
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-5 text-foreground">{toast.title}</p>
          {toast.description ? (
            <p className="mt-0.5 line-clamp-2 text-xs leading-4 text-muted-foreground">
              {toast.description}
            </p>
          ) : null}
        </div>

        {/* Dismiss */}
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss"
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border">
        <div
          ref={progressRef}
          className={cn(
            "h-full",
            variant === "success" && "bg-emerald-500",
            variant === "error" && "bg-destructive",
            variant === "warning" && "bg-amber-500",
            variant === "default" && "bg-primary",
          )}
          style={{ width: "100%" }}
        />
      </div>
    </motion.div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((opts: ToastOptions): string => {
    const id = `toast-${Date.now()}-${seed++}`;
    const item: ToastItem = { ...opts, id, createdAt: Date.now() };
    setToasts((prev) => {
      const next = [...prev, item];
      return next.slice(-MAX_VISIBLE);
    });
    // Auto-dismiss after TOAST_DURATION
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);
    return id;
  }, []);

  const visibleToasts = toasts.slice(-MAX_VISIBLE);

  const container =
    mounted
      ? createPortal(
          <div
            className="pointer-events-none fixed bottom-6 right-4 z-[90] flex w-[calc(100vw-2rem)] max-w-sm flex-col-reverse gap-2"
            aria-live="polite"
            aria-atomic="false"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {visibleToasts.map((t) => (
                <div key={t.id} className="pointer-events-auto">
                  <ToastCard toast={t} onDismiss={dismiss} />
                </div>
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )
      : null;

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {container}
    </ToastContext.Provider>
  );
}
