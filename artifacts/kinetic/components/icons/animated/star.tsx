"use client";

import { motion } from "motion/react";

interface StarAnimatedIconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function StarAnimatedIcon({ size = 24, className, isPlaying = false }: StarAnimatedIconProps) {
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
      animate={isPlaying ? { scale: [1, 1.3, 0.85, 1.1, 1], rotate: [0, -12, 12, -6, 0] } : { scale: 1, rotate: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <motion.polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        animate={isPlaying ? { fill: ["transparent", "currentColor", "transparent"] } : { fill: "transparent" }}
        transition={{ duration: 0.55 }}
      />
    </motion.svg>
  );
}
