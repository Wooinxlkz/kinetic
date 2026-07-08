"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export interface BorderBeamProps {
  className?: string;
  /** Animation duration in seconds. Default 10. */
  duration?: number;
  /** The bright leading color of the comet. */
  colorFrom?: string;
  /** The trailing / transparent color. */
  colorTo?: string;
  /** Width of the visible border ring in pixels. Default 1.5. */
  borderWidth?: number;
}

/**
 * A sweeping gradient "comet" that travels clockwise around the border of
 * its parent. Add `position: relative` and `overflow: hidden` to the
 * parent and drop `<BorderBeam />` inside — it inherits the border-radius.
 *
 * The inner content of the parent is untouched; this is a purely decorative
 * layer positioned above the background but below the content.
 */
export function BorderBeam({
  className,
  duration = 10,
  colorFrom = "hsl(var(--primary))",
  colorTo = "transparent",
  borderWidth = 1.5,
}: BorderBeamProps) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={{
        padding: borderWidth,
        // Mask subtracts the content-box area, leaving only the padding ring visible
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "destination-out",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
      } as CSSProperties}
    >
      {/* Fills the full border-box area; only the ring shows through the mask */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${colorTo} 0%, ${colorFrom} 25%, ${colorTo} 45%)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      />
    </div>
  );
}
