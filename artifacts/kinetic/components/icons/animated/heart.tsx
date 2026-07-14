"use client";

import { motion } from "motion/react";

interface HeartIconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function HeartIcon({ size = 24, className, isPlaying = false }: HeartIconProps) {
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
      animate={isPlaying ? { scale: [1, 1.4, 0.9, 1.15, 1] } : { scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        animate={isPlaying ? { fill: ["transparent", "currentColor", "transparent"] } : { fill: "transparent" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
