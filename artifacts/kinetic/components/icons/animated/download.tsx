"use client";

import { motion } from "motion/react";

interface DownloadAnimatedIconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function DownloadAnimatedIcon({ size = 24, className, isPlaying = false }: DownloadAnimatedIconProps) {
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
        animate={isPlaying ? { y: [0, 5, -2, 3, 0] } : { y: 0 }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.4,
        }}
      >
        <line x1="12" y1="3" x2="12" y2="15" />
        <polyline points="8 11 12 15 16 11" />
      </motion.g>
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}
