import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "secondary";

export type BadgeSize = "sm" | "md";

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  default: "bg-foreground/[0.08] text-foreground",
  success:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20",
  warning:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20",
  error: "bg-red-500/10 text-red-500 ring-1 ring-red-500/20",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20",
  secondary: "bg-muted text-muted-foreground",
};

const SIZE_CLASS: Record<BadgeSize, string> = {
  sm: "h-5 px-2 text-[10px]",
  md: "h-6 px-2.5 text-xs",
};

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
}

/** Minimal semantic badge pill. Static, no motion. */
export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        className,
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      {children}
    </span>
  );
}

export interface BadgeGroupProps {
  children: ReactNode;
  className?: string;
}

/** Flex row that wraps Badges with consistent spacing. */
export function BadgeGroup({ children, className }: BadgeGroupProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {children}
    </div>
  );
}
