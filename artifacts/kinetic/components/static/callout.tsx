import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, Lightbulb, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutVariant = "info" | "success" | "warning" | "error" | "tip";

const VARIANT_CONFIG: Record<
  CalloutVariant,
  { icon: typeof Info; border: string; bg: string; iconColor: string; titleColor: string }
> = {
  info: {
    icon: Info,
    border: "border-l-blue-500",
    bg: "bg-blue-500/[0.06]",
    iconColor: "text-blue-500",
    titleColor: "text-blue-700 dark:text-blue-400",
  },
  success: {
    icon: CheckCircle2,
    border: "border-l-emerald-500",
    bg: "bg-emerald-500/[0.06]",
    iconColor: "text-emerald-500",
    titleColor: "text-emerald-700 dark:text-emerald-400",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-l-amber-500",
    bg: "bg-amber-500/[0.06]",
    iconColor: "text-amber-500",
    titleColor: "text-amber-700 dark:text-amber-400",
  },
  error: {
    icon: X,
    border: "border-l-red-500",
    bg: "bg-red-500/[0.06]",
    iconColor: "text-red-500",
    titleColor: "text-red-700 dark:text-red-400",
  },
  tip: {
    icon: Lightbulb,
    border: "border-l-violet-500",
    bg: "bg-violet-500/[0.06]",
    iconColor: "text-violet-500",
    titleColor: "text-violet-700 dark:text-violet-400",
  },
};

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/**
 * Contextual callout block with a left accent border.
 * Use for info notes, warnings, tips and errors in docs or content areas.
 * Static — no motion.
 */
export function Callout({
  variant = "info",
  title,
  children,
  icon,
  className,
}: CalloutProps) {
  const cfg = VARIANT_CONFIG[variant];
  const Icon = cfg.icon;

  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-r-xl border-l-[3px] p-4",
        cfg.border,
        cfg.bg,
        className,
      )}
    >
      <span className={cn("mt-px shrink-0", cfg.iconColor)}>
        {icon ?? <Icon className="h-4 w-4" />}
      </span>
      <div className="min-w-0 text-sm leading-relaxed">
        {title ? (
          <p className={cn("mb-1 font-semibold", cfg.titleColor)}>{title}</p>
        ) : null}
        <div className="text-foreground/80">{children}</div>
      </div>
    </div>
  );
}
