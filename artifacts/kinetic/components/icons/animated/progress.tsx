"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

const RADIUS = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ProgressIcon({ size = 24, className, isPlaying }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {/* background track */}
      <circle cx="12" cy="12" r={RADIUS} opacity={0.18} />
      {/* animated arc */}
      <motion.circle
        cx="12"
        cy="12"
        r={RADIUS}
        strokeDasharray={CIRCUMFERENCE}
        initial={{ strokeDashoffset: CIRCUMFERENCE }}
        animate={{ strokeDashoffset: isPlaying ? 0 : CIRCUMFERENCE }}
        style={{ rotate: -90, originX: "12px", originY: "12px" }}
        transition={{
          duration: 1.4,
          ease: "easeInOut",
          repeat: isPlaying ? Infinity : 0,
          repeatType: "reverse",
        }}
      />
    </svg>
  );
}
