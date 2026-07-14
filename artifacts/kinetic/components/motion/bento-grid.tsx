"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface BentoCardProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds for stagger-in animation. */
  delay?: number;
}

export function BentoCard({ children, className, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay }}
      whileHover={{ scale: 1.01, transition: { duration: 0.18 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-5",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
  /** Number of columns (default 3). */
  cols?: 2 | 3 | 4;
}

export function BentoGrid({ children, className, cols = 3 }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(120px,auto)] gap-4",
        cols === 2 && "grid-cols-2",
        cols === 3 && "grid-cols-3",
        cols === 4 && "grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Convenience label + value metric inside a BentoCard. */
export function BentoMetric({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div>
        <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        {delta && (
          <p className={cn("mt-1 text-xs font-medium", positive ? "text-emerald-500" : "text-red-400")}>
            {positive ? "↑" : "↓"} {delta}
          </p>
        )}
      </div>
    </div>
  );
}

/** Horizontal bar chart rendered purely in CSS — no charting library. */
export function BentoBarChart({
  data,
  label,
}: {
  data: { label: string; value: number; color?: string }[];
  label?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-full flex-col gap-3">
      {label && <p className="text-xs font-medium text-muted-foreground">{label}</p>}
      <div className="flex flex-1 flex-col justify-end gap-1.5">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-12 shrink-0 text-right text-[10px] text-muted-foreground">{d.label}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(d.value / max) * 100}%` }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + i * 0.06 }}
                className="h-2 rounded-full"
                style={{ background: d.color ?? "hsl(var(--foreground))" }}
              />
            </div>
            <span className="w-8 text-[10px] tabular-nums text-muted-foreground">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
