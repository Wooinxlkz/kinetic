"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function TypingIndicatorIcon({ size = 24, className, isPlaying }: IconProps) {
  const dots = [0, 1, 2];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* chat bubble outline */}
      <path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* animated dots */}
      {dots.map((i) => (
        <motion.circle
          key={i}
          cx={8 + i * 4}
          cy={12}
          r={1.5}
          fill="currentColor"
          animate={isPlaying ? { y: [0, -4, 0] } : { y: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.15,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
