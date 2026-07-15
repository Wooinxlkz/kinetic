"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ThinkingIndicatorProps {
  label?: string;
  /** "dots" (default) | "bar" | "pulse" */
  variant?: "dots" | "bar" | "pulse";
  size?: "sm" | "md";
  className?: string;
}

const SIZE = { sm: "h-1.5 w-1.5", md: "h-2 w-2" };

/**
 * Animated "AI is thinking" indicator.
 * Three variants: bouncing dots, indeterminate bar, and radial pulse ring.
 */
export function ThinkingIndicator({
  label = "Thinking…",
  variant = "dots",
  size = "md",
  className,
}: ThinkingIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {variant === "dots" && (
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className={cn("rounded-full bg-foreground/40", SIZE[size])}
              animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      )}

      {variant === "bar" && (
        <div className={cn("relative overflow-hidden rounded-full bg-muted", size === "sm" ? "h-1 w-16" : "h-1.5 w-20")}>
          <motion.div
            className="absolute inset-y-0 w-1/2 rounded-full bg-foreground/30"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {variant === "pulse" && (
        <div className="relative flex items-center justify-center">
          <motion.span
            className={cn("absolute rounded-full bg-primary/20", size === "sm" ? "h-5 w-5" : "h-6 w-6")}
            animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
          />
          <span className={cn("relative rounded-full bg-primary", SIZE[size])} />
        </div>
      )}

      {label && (
        <span className={cn("text-muted-foreground", size === "sm" ? "text-[11px]" : "text-xs")}>
          {label}
        </span>
      )}
    </div>
  );
}
