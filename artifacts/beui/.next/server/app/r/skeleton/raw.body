"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// ─── Base Skeleton ────────────────────────────────────────────────────────────

export interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  /** Shape shorthand. */
  variant?: "rect" | "circle" | "text";
  /** Text lines (only used when variant="text"). Default 3. */
  lines?: number;
  /** Last line width as fraction. Default 0.6. */
  lastLineWidth?: number;
  width?: string | number;
  height?: string | number;
}

function shimmer(reduce: boolean | null) {
  if (reduce) {
    return "animate-pulse";
  }
  return "overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";
}

export function Skeleton({
  className,
  style,
  variant = "rect",
  lines = 3,
  lastLineWidth = 0.6,
  width,
  height,
}: SkeletonProps) {
  const reduce = useReducedMotion();

  if (variant === "text") {
    return (
      <div className={cn("flex flex-col gap-2", className)} style={style}>
        {Array.from({ length: lines }).map((_, i) => {
          const isLast = i === lines - 1;
          return (
            <div
              key={i}
              className={cn(
                "relative rounded-md bg-muted",
                shimmer(reduce),
              )}
              style={{
                height: height ?? "0.875rem",
                width: isLast ? `${lastLineWidth * 100}%` : "100%",
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-lg bg-muted",
        variant === "circle" && "rounded-full",
        shimmer(reduce),
        className,
      )}
      style={{ width, height, ...style }}
    />
  );
}

// ─── Avatar Skeleton ──────────────────────────────────────────────────────────

export function SkeletonAvatar({ size = 40, className }: { size?: number; className?: string }) {
  return <Skeleton variant="circle" width={size} height={size} className={className} />;
}

// ─── Card Skeleton ────────────────────────────────────────────────────────────

export function SkeletonCard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("rounded-xl border border-border p-4 space-y-3", className)}>
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton height="0.875rem" className="w-1/3" />
          <Skeleton height="0.75rem" className="w-1/4" />
        </div>
      </div>
      <Skeleton height="8rem" className="w-full" />
      <Skeleton variant="text" lines={2} lastLineWidth={0.7} />
    </div>
  );
}

// ─── Table Skeleton ───────────────────────────────────────────────────────────

export function SkeletonTable({
  rows = 5,
  cols = 4,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      {/* Header */}
      <div className="flex gap-3 pb-2 border-b border-border">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height="0.75rem" className="flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-3 py-1.5">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={c}
              height="0.875rem"
              className="flex-1"
              style={{ opacity: 1 - r * 0.1 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
