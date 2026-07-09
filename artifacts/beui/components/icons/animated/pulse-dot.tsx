"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function PulseDotIcon({ size = 24, className, isPlaying }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* expanding ring */}
      <motion.circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={
          isPlaying
            ? { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }
            : { scale: 1, opacity: 0.3 }
        }
        style={{ originX: "12px", originY: "12px" }}
        transition={{ duration: 1.2, repeat: isPlaying ? Infinity : 0, ease: "easeOut" }}
      />
      {/* solid center dot */}
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}
