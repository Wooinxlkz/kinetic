"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MarkerVariant = "highlight" | "underline" | "wavy" | "circle";
export type MarkerColor =
  | "yellow"
  | "green"
  | "blue"
  | "pink"
  | "orange"
  | "accent";

const COLOR_MAP: Record<MarkerColor, { stroke: string; fill: string }> = {
  yellow:  { stroke: "#facc15", fill: "#facc1555" },
  green:   { stroke: "#4ade80", fill: "#4ade8055" },
  blue:    { stroke: "#60a5fa", fill: "#60a5fa55" },
  pink:    { stroke: "#f472b6", fill: "#f472b655" },
  orange:  { stroke: "#fb923c", fill: "#fb923c55" },
  accent:  { stroke: "hsl(var(--accent))", fill: "hsl(var(--accent) / 0.28)" },
};

export interface MarkerProps {
  children: ReactNode;
  variant?: MarkerVariant;
  color?: MarkerColor;
  /** Delay before the stroke draws in (seconds). */
  delay?: number;
  /** Duration of the draw animation (seconds). */
  duration?: number;
  className?: string;
}

export function Marker({
  children,
  variant = "highlight",
  color = "yellow",
  delay = 0,
  duration = 0.55,
  className,
}: MarkerProps) {
  const reduced = useReducedMotion();
  const { stroke, fill } = COLOR_MAP[color];

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {/* SVG annotation layer */}
      <span aria-hidden className="pointer-events-none absolute inset-0">
        {variant === "highlight" && (
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <motion.rect
              x="0" y="20%" width="100%" height="72%"
              rx="3"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.5"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: reduced ? 1 : 1 }}
              style={{ transformOrigin: "left center" }}
            />
            {/* Animate via pathLength on a rect path for cleaner control */}
            <motion.rect
              x="0" y="20%" width="100%" height="72%"
              rx="3"
              fill={fill}
              initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left center" }}
            />
          </svg>
        )}

        {variant === "underline" && (
          <svg
            className="absolute bottom-0 left-0 h-[6px] w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0" y1="3" x2="100%" y2="3"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        )}

        {variant === "wavy" && (
          <svg
            className="absolute -bottom-1 left-0 h-[8px] w-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 8"
          >
            <motion.path
              d="M0,4 C12,0 25,8 37,4 C50,0 63,8 75,4 C87,0 95,8 100,4"
              fill="none"
              stroke={stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: duration * 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        )}

        {variant === "circle" && (
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <motion.ellipse
              cx="50%" cy="52%"
              rx="51%" ry="44%"
              fill="none"
              stroke={stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={reduced ? { pathLength: 1, rotate: -90 } : { pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1, rotate: -90 }}
              style={{ transformOrigin: "center" }}
              transition={{ duration: duration * 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        )}
      </span>

      {/* Text sits above the annotation */}
      <span className="relative">{children}</span>
    </span>
  );
}
