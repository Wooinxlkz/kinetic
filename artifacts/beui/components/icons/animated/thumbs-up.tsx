"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function ThumbsUpAnimatedIcon({ size = 24, className, isPlaying }: IconProps) {
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
      animate={isPlaying ? { y: -4, scale: 1.18, rotate: -8 } : { y: 0, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 12 }}
    >
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
    </motion.svg>
  );
}
