"use client";

import { motion } from "motion/react";

interface BellAnimatedIconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function BellAnimatedIcon({ size = 24, className, isPlaying = false }: BellAnimatedIconProps) {
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
      animate={isPlaying ? { rotate: [0, -18, 18, -14, 14, -8, 8, 0] } : { rotate: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ originX: "50%", originY: "10%" }}
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </motion.svg>
  );
}
