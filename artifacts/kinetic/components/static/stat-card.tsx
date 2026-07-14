import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  /** Small label above the value, e.g. "Monthly revenue". */
  label: string;
  /** The headline value, e.g. "$48,290". */
  value: string;
  /** Signed percentage change shown as a trend chip, e.g. 12.4 or -3.2. */
  delta?: number;
  /** Optional icon rendered in the top-right corner. */
  icon?: ReactNode;
  className?: string;
}

/**
 * Plain KPI stat card: label, big value, and an optional up/down trend chip.
 * No motion — a static building block for dashboards and summaries.
 */
export function StatCard({ label, value, delta, icon, className }: StatCardProps) {
  const positive = typeof delta === "number" && delta >= 0;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {icon ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/[0.06] text-muted-foreground">
            {icon}
          </span>
        ) : null}
      </div>

      <div className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </div>

      {typeof delta === "number" ? (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            positive
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-red-500/10 text-red-500",
          )}
        >
          {positive ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          {Math.abs(delta)}%
        </div>
      ) : null}
    </div>
  );
}
