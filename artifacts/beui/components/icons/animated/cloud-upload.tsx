"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function CloudUploadIcon({ size = 24, className, isPlaying }: IconProps) {
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
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
      <motion.g
        animate={isPlaying ? { y: [0, -6, 0] } : { y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: isPlaying ? Infinity : 0,
        }}
      >
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
      </motion.g>
    </svg>
  );
}
