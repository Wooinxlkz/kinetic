"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function VolumeWaveIcon({ size = 24, className, isPlaying }: IconProps) {
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
      {/* speaker body */}
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {/* wave 1 */}
      <motion.path
        d="M15.54 8.46a5 5 0 010 7.07"
        animate={isPlaying ? { opacity: [0.3, 1, 0.3], x: [0, 1, 0] } : { opacity: 1 }}
        transition={{ duration: 0.9, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
      />
      {/* wave 2 */}
      <motion.path
        d="M19.07 4.93a10 10 0 010 14.14"
        animate={isPlaying ? { opacity: [0.15, 1, 0.15], x: [0, 2, 0] } : { opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
      />
    </svg>
  );
}
