"use client";

import { motion } from "motion/react";

interface RefreshIconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function RefreshIcon({ size = 24, className, isPlaying = false }: RefreshIconProps) {
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
      animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </motion.svg>
  );
}
