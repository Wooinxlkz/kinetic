"use client";

import { motion } from "motion/react";

interface MenuCloseIconProps {
  size?: number;
  className?: string;
  isOpen?: boolean;
}

export function MenuCloseIcon({ size = 24, className, isOpen = false }: MenuCloseIconProps) {
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
      {/* Top line — rotates + translates into the X's top-left/bottom-right stroke */}
      <motion.g
        animate={isOpen ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      >
        <line x1={3} y1={7} x2={21} y2={7} />
      </motion.g>
      {/* Middle line — fades and shrinks away */}
      <motion.g
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ duration: 0.15 }}
      >
        <line x1={3} y1={12} x2={21} y2={12} />
      </motion.g>
      {/* Bottom line — rotates + translates into the X's bottom-left/top-right stroke */}
      <motion.g
        animate={isOpen ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      >
        <line x1={3} y1={17} x2={21} y2={17} />
      </motion.g>
    </svg>
  );
}
