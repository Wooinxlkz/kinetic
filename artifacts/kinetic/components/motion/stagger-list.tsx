"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface StaggerListProps {
  children: ReactNode[];
  /** Delay between each item in seconds. */
  stagger?: number;
  /** Direction items enter from. */
  direction?: "up" | "down" | "left" | "right";
  /** Initial distance to travel in px. */
  distance?: number;
  /** Duration of each item animation in seconds. */
  duration?: number;
  /** Overall delay before the first item starts. */
  delay?: number;
  className?: string;
  itemClassName?: string;
  as?: "ul" | "ol" | "div";
}

const DIRS = {
  up:    { y: 16, x: 0 },
  down:  { y: -16, x: 0 },
  left:  { x: 20, y: 0 },
  right: { x: -20, y: 0 },
};

export function StaggerList({
  children,
  stagger = 0.07,
  direction = "up",
  distance = 16,
  duration = 0.35,
  delay = 0,
  className,
  itemClassName,
  as: Tag = "ul",
}: StaggerListProps) {
  const initial = {
    opacity: 0,
    x: DIRS[direction].x !== 0 ? (DIRS[direction].x > 0 ? distance : -distance) : 0,
    y: DIRS[direction].y !== 0 ? (DIRS[direction].y > 0 ? distance : -distance) : 0,
  };

  return (
    <Tag className={cn("list-none p-0 m-0", className)}>
      {children.map((child, i) => (
        <motion.li
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          key={i}
          initial={initial}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration,
            ease: EASE_OUT,
            delay: delay + i * stagger,
          }}
          className={itemClassName}
        >
          {child}
        </motion.li>
      ))}
    </Tag>
  );
}
