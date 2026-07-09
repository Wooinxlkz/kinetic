"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

const stars = [
  { cx: 12, cy: 12, r: 2.5, delay: 0 },
  { cx: 5, cy: 6, r: 1.5, delay: 0.15 },
  { cx: 19, cy: 6, r: 1.2, delay: 0.3 },
  { cx: 6, cy: 18, r: 1.2, delay: 0.2 },
  { cx: 18, cy: 18, r: 1.5, delay: 0.1 },
];

export function SparkleIcon({ size = 24, className, isPlaying }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* central 4-pointed star */}
      <motion.path
        d="M12 2l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5L12 2z"
        fill="currentColor"
        animate={
          isPlaying
            ? { scale: [0.85, 1.15, 0.9, 1.1, 1], rotate: [0, 15, -10, 5, 0] }
            : { scale: 1, rotate: 0 }
        }
        style={{ originX: "12px", originY: "12px" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      {/* satellite sparkles */}
      {stars.slice(1).map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="currentColor"
          animate={isPlaying ? { scale: [0, 1.4, 0], opacity: [0, 1, 0] } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: s.delay, repeat: isPlaying ? Infinity : 0, repeatDelay: 0.8 }}
          style={{ originX: `${s.cx}px`, originY: `${s.cy}px` }}
        />
      ))}
    </svg>
  );
}
