"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function MagnetAnimatedIcon({ size = 24, className, isPlaying }: IconProps) {
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
      animate={
        isPlaying
          ? { rotate: [-8, 8, -8, 8, 0], scale: [1, 1.05, 1] }
          : { rotate: 0, scale: 1 }
      }
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <path d="M6 15V9a6 6 0 0112 0v6" />
      <path d="M5 9h2v6H5V9zM17 9h2v6h-2V9z" />
      <line x1="5" y1="21" x2="7" y2="21" />
      <line x1="17" y1="21" x2="19" y2="21" />
    </motion.svg>
  );
}
