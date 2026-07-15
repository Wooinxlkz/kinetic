"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TokenCounterProps {
  current: number;
  max: number;
  label?: string;
  className?: string;
}

function getColor(ratio: number) {
  if (ratio < 0.7) return "bg-primary";
  if (ratio < 0.9) return "bg-amber-500";
  return "bg-red-500";
}

/**
 * Live token / character counter with an animated fill bar.
 * Color shifts from primary → amber → red as usage approaches the limit.
 */
export function TokenCounter({ current, max, label, className }: TokenCounterProps) {
  const ratio = Math.min(current / max, 1);
  const pct = `${Math.round(ratio * 100)}%`;
  const color = getColor(ratio);
  const over = current > max;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        {label ? (
          <span className="text-xs text-muted-foreground">{label}</span>
        ) : (
          <span className="text-xs text-muted-foreground">Tokens</span>
        )}
        <span
          className={cn(
            "tabular-nums text-xs font-medium",
            over ? "text-red-500" : "text-muted-foreground",
          )}
        >
          {current.toLocaleString()}
          <span className="text-muted-foreground/50">/{max.toLocaleString()}</span>
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn("h-full rounded-full transition-colors duration-500", color)}
          initial={{ width: 0 }}
          animate={{ width: pct }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
