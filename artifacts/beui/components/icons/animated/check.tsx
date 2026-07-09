"use client";

import { motion } from "motion/react";

interface CheckAnimatedIconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function CheckAnimatedIcon({ size = 24, className, isPlaying = false }: CheckAnimatedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <motion.polyline
        points="20 6 9 17 4 12"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isPlaying ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      />
    </svg>
  );
}
