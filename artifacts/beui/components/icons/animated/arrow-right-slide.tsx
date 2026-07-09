"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function ArrowRightSlideAnimatedIcon({ size = 24, className, isPlaying }: IconProps) {
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
      animate={isPlaying ? { x: 3 } : { x: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </motion.svg>
  );
}
