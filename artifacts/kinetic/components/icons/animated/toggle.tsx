"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isOpen?: boolean;
}

export function ToggleIcon({ size = 24, className, isOpen }: IconProps) {
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
      <rect x="2" y="8" width="20" height="8" rx="4" />
      {/* knob — starts at cx=8, translates +8 to reach cx=16 */}
      <motion.g
        animate={isOpen ? { x: 8 } : { x: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      >
        <circle cx={8} cy={12} r={3} fill="currentColor" stroke="none" />
      </motion.g>
    </svg>
  );
}
