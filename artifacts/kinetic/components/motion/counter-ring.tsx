"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface CounterRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  suffix?: string;
  color?: string;
  className?: string;
}

/**
 * Circular progress ring with an animated count-up number inside.
 * Triggers when it enters the viewport. Reduced-motion safe.
 */
export function CounterRing({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  label,
  suffix = "%",
  color = "hsl(var(--primary))",
  className,
}: CounterRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.min(value / max, 1);

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v * max).toString());
  const dash = useTransform(spring, (v) => `${v * circumference} ${circumference}`);

  useEffect(() => {
    if (inView) motionVal.set(fraction);
  }, [inView, fraction, motionVal]);

  return (
    <div ref={ref} className={cn("inline-flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={dash}
            strokeDashoffset={0}
          />
        </svg>
        {/* Center number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold tabular-nums text-foreground leading-none">
            <motion.span>{display}</motion.span>
            <span className="text-sm font-medium text-muted-foreground">{suffix}</span>
          </span>
        </div>
      </div>
      {label ? (
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      ) : null}
    </div>
  );
}
