"use client";

import { motion } from "motion/react";

interface LoadingDotsIconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function LoadingDotsIcon({ size = 24, className, isPlaying = true }: LoadingDotsIconProps) {
  const dots = [0, 1, 2];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {dots.map((i) => (
        <motion.circle
          key={i}
          cx={6 + i * 6}
          cy="12"
          r="2"
          animate={isPlaying ? { y: [0, -5, 0] } : { y: 0 }}
          transition={{
            duration: 0.7,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
