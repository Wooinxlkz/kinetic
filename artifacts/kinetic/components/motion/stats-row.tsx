"use client";

import { motion } from "motion/react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface StatItem {
  label: string;
  value: string;
  delta?: number;
  icon?: React.ReactNode;
}

export interface StatsRowProps {
  stats: StatItem[];
  className?: string;
}

/**
 * Horizontal row of KPI stat tiles with staggered entrance animation.
 * Each tile shows a label, value, and optional trend delta.
 */
export function StatsRow({ stats, className }: StatsRowProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        stats.length === 2 && "grid-cols-2",
        stats.length === 3 && "grid-cols-3",
        stats.length >= 4 && "grid-cols-2 sm:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat, i) => {
        const positive = typeof stat.delta === "number" && stat.delta >= 0;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.32, ease: EASE_OUT, delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
              {stat.icon ? (
                <span className="text-muted-foreground">{stat.icon}</span>
              ) : null}
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {stat.value}
            </p>
            {typeof stat.delta === "number" ? (
              <div
                className={cn(
                  "mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                  positive
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-red-500/10 text-red-500",
                )}
              >
                {positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(stat.delta)}%
              </div>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}
