"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  /** "hover" flips on mouse enter/leave; "click" flips on press. Default: "hover". */
  trigger?: "hover" | "click";
  /** Height of the card in px. Default: 200. */
  height?: number;
  className?: string;
}

/**
 * 3-D flip card with a CSS perspective transform.
 * Front and back are composable slots.
 * Supports hover and click triggers; reduced-motion skips the rotation.
 */
export function FlipCard({
  front,
  back,
  trigger = "hover",
  height = 200,
  className,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const hoverProps =
    trigger === "hover"
      ? {
          onHoverStart: () => setFlipped(true),
          onHoverEnd: () => setFlipped(false),
        }
      : {};

  const clickProps =
    trigger === "click"
      ? { onClick: () => setFlipped((f) => !f) }
      : {};

  return (
    <motion.div
      {...hoverProps}
      {...clickProps}
      className={cn("relative w-full cursor-pointer", className)}
      style={{ height, perspective: 1000 }}
    >
      {/* Front */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
        className="absolute inset-0 rounded-2xl border border-border bg-card"
      >
        <div className="flex h-full w-full items-center justify-center p-5">
          {front}
        </div>
      </motion.div>

      {/* Back */}
      <motion.div
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        style={{
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
          rotateY: -180,
        }}
        className="absolute inset-0 rounded-2xl border border-border bg-card"
      >
        <div className="flex h-full w-full items-center justify-center p-5">
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
}
