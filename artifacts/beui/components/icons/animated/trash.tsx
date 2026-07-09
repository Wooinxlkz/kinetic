"use client";

import { motion } from "motion/react";

interface TrashAnimatedIconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function TrashAnimatedIcon({ size = 24, className, isPlaying = false }: TrashAnimatedIconProps) {
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
      animate={isPlaying ? { rotate: [0, -12, 12, -8, 8, -4, 0] } : { rotate: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </motion.svg>
  );
}
