"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function ChevronDownAnimatedIcon({ size = 24, className, isPlaying }: IconProps) {
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
      <motion.g
        animate={isPlaying ? { y: 4 } : { y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 16 }}
      >
        <polyline points="6 9 12 15 18 9" />
      </motion.g>
    </svg>
  );
}
