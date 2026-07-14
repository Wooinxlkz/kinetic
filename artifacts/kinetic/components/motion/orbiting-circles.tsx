"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface OrbitingCirclesProps {
  children: ReactNode;
  className?: string;
}

export interface OrbitingCircleProps {
  children?: ReactNode;
  className?: string;
  /** Distance from the center in pixels. Default 80. */
  radius?: number;
  /** One full orbit in seconds. Default 20. */
  duration?: number;
  /**
   * Phase offset in seconds. Converts to a start angle so multiple items
   * can be spread without an actual pause. E.g. three items with delay 0,
   * duration/3, and 2*duration/3 are evenly spaced at 120° apart.
   */
  delay?: number;
  /** Orbit counter-clockwise. Default false. */
  reverse?: boolean;
}

/**
 * Container that provides the positioning context for OrbitingCircle
 * children. Place your center element and all OrbitingCircle items inside.
 */
export function OrbitingCircles({ children, className }: OrbitingCirclesProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {children}
    </div>
  );
}

/**
 * An element that continuously orbits the center of its OrbitingCircles
 * parent. The child is counter-rotated so it stays upright throughout.
 */
export function OrbitingCircle({
  children,
  className,
  radius = 80,
  duration = 20,
  delay = 0,
  reverse = false,
}: OrbitingCircleProps) {
  const reduce = useReducedMotion();
  const dir = reverse ? -1 : 1;
  // Convert delay (seconds) to an initial rotation angle — no actual pause,
  // just a phase offset so items can be pre-spread around the orbit.
  const startDeg = (delay / duration) * 360;

  return (
    <motion.div
      className="absolute"
      style={{ top: "50%", left: "50%", width: 0, height: 0 }}
      initial={{ rotate: startDeg * dir }}
      animate={reduce ? undefined : { rotate: (startDeg + 360) * dir }}
      transition={
        reduce
          ? undefined
          : { duration, ease: "linear", repeat: Infinity, repeatType: "loop" }
      }
    >
      {/* Offset outward to the orbit radius */}
      <div style={{ position: "absolute", left: radius, top: 0 }}>
        {/* Counter-rotate to keep the child element upright */}
        <motion.div
          style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
          initial={{ rotate: -startDeg * dir }}
          animate={reduce ? undefined : { rotate: (-startDeg - 360) * dir }}
          transition={
            reduce
              ? undefined
              : { duration, ease: "linear", repeat: Infinity, repeatType: "loop" }
          }
          className={cn(className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
