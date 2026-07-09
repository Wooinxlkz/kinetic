"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function AlertPulseIcon({ size = 24, className, isPlaying }: IconProps) {
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
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        animate={
          isPlaying
            ? { scale: [1, 1.3, 1], opacity: [1, 0.15, 1] }
            : { scale: 1, opacity: 1 }
        }
        style={{ originX: "12px", originY: "12px" }}
        transition={{
          duration: 0.75,
          ease: "easeOut",
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.25,
        }}
      />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
