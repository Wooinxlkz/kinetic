"use client";

import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  isOpen?: boolean;
}

export function PlusMinusAnimatedIcon({ size = 24, className, isOpen }: IconProps) {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <motion.line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        animate={isOpen ? { rotate: 90, opacity: 0 } : { rotate: 0, opacity: 1 }}
        style={{ originX: "12px", originY: "12px" }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      />
    </svg>
  );
}
