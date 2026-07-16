"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

// Static sparkle positions: [left%, top%, sizePx, animDelay]
const SPARKLES: [number, number, number, number][] = [
  [12, 18, 3, 0.0],
  [33, 8,  2, 0.5],
  [58, 22, 3, 0.9],
  [80, 12, 2, 0.2],
  [90, 42, 3, 1.3],
  [72, 68, 2, 0.7],
  [48, 82, 3, 0.4],
  [20, 72, 2, 1.1],
  [6,  50, 2, 1.6],
  [44, 52, 2, 1.9],
  [66, 44, 3, 0.3],
  [26, 38, 2, 1.5],
];

export interface HolographicCardProps {
  children?: ReactNode;
  className?: string;
  /** 0–1 — controls tilt and shimmer strength. Default 1. */
  intensity?: number;
}

export function HolographicCard({
  children,
  className,
  intensity = 1,
}: HolographicCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Cursor position as –0.5 → +0.5 fractions
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const spring = { stiffness: 180, damping: 28, mass: 0.6 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  // 3-D tilt
  const rotateX = useTransform(y, [-0.5, 0.5], [14 * intensity, -14 * intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-14 * intensity, 14 * intensity]);

  // Foil shimmer — percentage positions for the gradient
  const shimmerX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const shimmerY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const hueRotate = useTransform(x, [-0.5, 0.5], [100, 260]);

  // Glare spotlight
  const glareX = useTransform(x, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(y, [-0.5, 0.5], [10, 90]);

  const foilBg = useMotionTemplate`
    radial-gradient(ellipse 80% 60% at ${shimmerX}% ${shimmerY}%, rgba(255,255,255,0.18) 0%, transparent 55%),
    linear-gradient(
      ${hueRotate}deg,
      hsl(0   100% 60% / 0.35) 0%,
      hsl(50  100% 60% / 0.35) 14%,
      hsl(120 100% 55% / 0.35) 28%,
      hsl(185 100% 60% / 0.35) 43%,
      hsl(230 100% 65% / 0.35) 57%,
      hsl(280 100% 65% / 0.35) 71%,
      hsl(320 100% 60% / 0.35) 85%,
      hsl(360 100% 60% / 0.35) 100%
    )
  `;

  const glareBg = useMotionTemplate`
    radial-gradient(ellipse 45% 35% at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, transparent 70%)
  `;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [reduced, rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    /* Perspective wrapper — must be a separate element */
    <div ref={wrapRef} style={{ perspective: 900 }} className="w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={reduced ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border bg-card",
          className,
        )}
      >
        {/* ── Prismatic foil ── */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: foilBg, mixBlendMode: "color-dodge" }}
        />

        {/* ── Glare highlight ── */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: glareBg,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
          }}
        />

        {/* ── Sparkle dots ── */}
        {!reduced &&
          SPARKLES.map(([cx, cy, size, delay], i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute rounded-full bg-white opacity-0 group-hover:opacity-100"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                width: size,
                height: size,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.4, 0.4] }}
              transition={{
                duration: 2,
                delay,
                repeat: Infinity,
                repeatDelay: 0.8 + delay * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* ── Content — lifted slightly in Z for depth ── */}
        <div
          className="relative z-10"
          style={reduced ? {} : { transform: "translateZ(12px)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
