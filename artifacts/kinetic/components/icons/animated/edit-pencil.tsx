"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function EditPencilAnimatedIcon({ size = 24, className, isPlaying }: IconProps) {
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
      animate={isPlaying ? { x: 1, y: -1, rotate: -8 } : { x: 0, y: 0, rotate: 0 }}
      style={{ originX: "3px", originY: "21px" }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      <path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z" />
    </motion.svg>
  );
}
