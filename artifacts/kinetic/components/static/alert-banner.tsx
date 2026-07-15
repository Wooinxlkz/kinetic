import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant = "info" | "success" | "warning" | "error";

const VARIANT_CONFIG: Record<
  AlertVariant,
  { icon: typeof Info; container: string; iconColor: string; title: string }
> = {
  info: {
    icon: Info,
    container: "border-blue-500/30 bg-blue-500/[0.06] text-blue-700 dark:text-blue-300",
    iconColor: "text-blue-500",
    title: "text-blue-800 dark:text-blue-200",
  },
  success: {
    icon: CheckCircle2,
    container: "border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-700 dark:text-emerald-300",
    iconColor: "text-emerald-500",
    title: "text-emerald-800 dark:text-emerald-200",
  },
  warning: {
    icon: AlertTriangle,
    container: "border-amber-500/30 bg-amber-500/[0.06] text-amber-700 dark:text-amber-300",
    iconColor: "text-amber-500",
    title: "text-amber-800 dark:text-amber-200",
  },
  error: {
    icon: X,
    container: "border-red-500/30 bg-red-500/[0.06] text-red-700 dark:text-red-300",
    iconColor: "text-red-500",
    title: "text-red-800 dark:text-red-200",
  },
};

export interface AlertBannerProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  onDismiss?: () => void;
  icon?: ReactNode;
  className?: string;
}

/**
 * Inline alert banner with optional dismiss button.
 * Static — no motion. Place at top of sections or inline in forms.
 */
export function AlertBanner({
  variant = "info",
  title,
  children,
  onDismiss,
  icon,
  className,
}: AlertBannerProps) {
  const cfg = VARIANT_CONFIG[variant];
  const Icon = cfg.icon;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
        cfg.container,
        className,
      )}
    >
      <span className={cn("mt-px shrink-0", cfg.iconColor)}>
        {icon ?? <Icon className="h-4 w-4" />}
      </span>
      <div className="min-w-0 flex-1">
        {title ? (
          <p className={cn("mb-0.5 font-semibold", cfg.title)}>{title}</p>
        ) : null}
        {children ? <div className="leading-relaxed opacity-90">{children}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-auto shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}
