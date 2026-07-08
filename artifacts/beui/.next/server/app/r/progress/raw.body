"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProgressVariant = "default" | "success" | "warning" | "error" | "info";

export interface ProgressProps {
  /** 0–100. Omit for indeterminate. */
  value?: number;
  variant?: ProgressVariant;
  size?: "xs" | "sm" | "md" | "lg";
  /** Show numeric label. */
  showLabel?: boolean;
  className?: string;
  /** Accessible label. */
  "aria-label"?: string;
}

// ─── Tokens ───────────────────────────────────────────────────────────────────

const TRACK_SIZES: Record<NonNullable<ProgressProps["size"]>, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const FILL_COLORS: Record<ProgressVariant, string> = {
  default: "bg-foreground",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-destructive",
  info: "bg-blue-500",
};

const LABEL_COLORS: Record<ProgressVariant, string> = {
  default: "text-muted-foreground",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-destructive",
  info: "text-blue-600 dark:text-blue-400",
};

// ─── Indeterminate fill ───────────────────────────────────────────────────────

function IndeterminateFill({ color }: { color: string }) {
  return (
    <motion.div
      className={cn("absolute inset-y-0 rounded-full", color)}
      animate={{
        left: ["-35%", "100%"],
        width: ["35%", "45%", "35%"],
      }}
      transition={{
        duration: 1.4,
        ease: EASE_OUT,
        repeat: Infinity,
        repeatDelay: 0.1,
      }}
    />
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Progress({
  value,
  variant = "default",
  size = "md",
  showLabel = false,
  className,
  "aria-label": ariaLabel = "Progress",
}: ProgressProps) {
  const reduce = useReducedMotion();
  const isIndeterminate = value === undefined;
  const clampedValue = Math.max(0, Math.min(100, value ?? 0));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && !isIndeterminate && (
        <div className="mb-1 flex items-center justify-between">
          <span className={cn("text-xs font-medium tabular-nums", LABEL_COLORS[variant])}>
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-border",
          TRACK_SIZES[size],
        )}
      >
        {isIndeterminate ? (
          reduce ? (
            <div className={cn("absolute inset-y-0 left-0 w-1/2 rounded-full opacity-60", FILL_COLORS[variant])} />
          ) : (
            <IndeterminateFill color={FILL_COLORS[variant]} />
          )
        ) : (
          <motion.div
            className={cn("absolute inset-y-0 left-0 rounded-full", FILL_COLORS[variant])}
            initial={reduce ? false : { width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 120, damping: 20, mass: 0.5 }
            }
          />
        )}
      </div>
    </div>
  );
}

// ─── Stacked Progress ─────────────────────────────────────────────────────────

export interface ProgressSegment {
  value: number;
  variant?: ProgressVariant;
  label?: string;
}

export interface StackedProgressProps {
  segments: ProgressSegment[];
  size?: ProgressProps["size"];
  showLegend?: boolean;
  className?: string;
}

export function StackedProgress({
  segments,
  size = "md",
  showLegend = false,
  className,
}: StackedProgressProps) {
  const reduce = useReducedMotion();
  const total = segments.reduce((s, seg) => s + seg.value, 0);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex w-full overflow-hidden rounded-full bg-border",
          TRACK_SIZES[size],
        )}
      >
        {segments.map((seg, i) => {
          const pct = total > 0 ? (seg.value / total) * 100 : 0;
          return (
            <motion.div
              key={i}
              className={cn(FILL_COLORS[seg.variant ?? "default"])}
              initial={reduce ? false : { width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 120, damping: 20, mass: 0.5, delay: i * 0.06 }
              }
            />
          );
        })}
      </div>
      {showLegend && (
        <div className="mt-2 flex flex-wrap gap-3">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={cn("h-2.5 w-2.5 rounded-full", FILL_COLORS[seg.variant ?? "default"])} />
              <span className="text-xs text-muted-foreground">
                {seg.label ?? seg.variant ?? "segment"}{" "}
                <span className="font-medium text-foreground">{seg.value}%</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
