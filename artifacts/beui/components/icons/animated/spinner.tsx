"use client";

import { motion } from "motion/react";

interface SpinnerIconProps {
  size?: number;
  className?: string;
}

export function SpinnerIcon({ size = 24, className }: SpinnerIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="20 48"
        opacity={0.9}
      />
    </motion.svg>
  );
}
