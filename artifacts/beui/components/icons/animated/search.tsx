"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function SearchAnimatedIcon({ size = 24, className, isPlaying }: IconProps) {
  return (
    <motion.svg
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
      animate={isPlaying ? { scale: 1.12 } : { scale: 1 }}
      style={{ originX: 0.46, originY: 0.46 }}
      transition={{ type: "spring", stiffness: 400, damping: 16 }}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </motion.svg>
  );
}
