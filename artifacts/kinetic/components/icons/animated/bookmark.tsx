"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function BookmarkAnimatedIcon({ size = 24, className, isPlaying }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* outline — always visible */}
      <path
        d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* fill layer — fades in on trigger */}
      <motion.path
        d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
        fill="currentColor"
        stroke="none"
        animate={{ opacity: isPlaying ? 1 : 0, scale: isPlaying ? 1 : 0.88 }}
        style={{ originX: "12px", originY: "11px" }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </svg>
  );
}
