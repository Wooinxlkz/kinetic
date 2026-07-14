"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   SpotlightCard
   A card where the cursor-tracked radial glow
   is expressed as a bright gradient *border*
   + an inner soft fill. Effect is visible at
   all times; hover intensifies it.
───────────────────────────────────────────── */

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Diameter of the glow circle in px. Default 400. */
  spotSize?: number;
}

export function SpotlightCard({
  children,
  className,
  spotSize = 400,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(-999);
  const rawY = useMotionValue(-999);
  const x = useSpring(rawX, { stiffness: 200, damping: 30, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 200, damping: 30, mass: 0.4 });

  // The glow: a radial gradient used as a mask on the border layer
  const borderGlow = useMotionTemplate`radial-gradient(${spotSize}px circle at ${x}px ${y}px, hsl(var(--primary)/0.9), hsl(var(--primary)/0.15) 40%, transparent 65%)`;
  const bgGlow = useMotionTemplate`radial-gradient(${spotSize}px circle at ${x}px ${y}px, hsl(var(--primary)/0.06), transparent 60%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  const onMouseLeave = () => {
    rawX.set(-999);
    rawY.set(-999);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("group relative rounded-xl p-px", className)}
    >
      {/* Glow border layer — sits behind the card */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ background: borderGlow }}
      />
      {/* Static dim border for when mouse is away */}
      <div className="absolute inset-0 rounded-xl border border-border/60" />
      {/* Inner background glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[1px] rounded-[11px]"
        style={{ background: bgGlow }}
      />
      {/* Content */}
      <div className="relative z-10 rounded-[11px] bg-card">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Spotlight
   A dramatic cone of light that follows the
   cursor across a container — use as a direct
   child of a `relative` hero section.
───────────────────────────────────────────── */

export interface SpotlightProps {
  className?: string;
  /** Cone width in px. Default 600. */
  size?: number;
}

export function Spotlight({ className, size = 600 }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(-0.1);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  // Ellipse center tracks cursor as a 0-1 fraction of container
  const cx = useMotionTemplate`${x}`;
  const cy = useMotionTemplate`${y}`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className={cn("pointer-events-auto absolute inset-0 overflow-hidden", className)}
    >
      <svg
        aria-hidden
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sg" cx={cx as unknown as string} cy={cy as unknown as string} r="55%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
            <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#sg)" />
      </svg>
    </div>
  );
}
