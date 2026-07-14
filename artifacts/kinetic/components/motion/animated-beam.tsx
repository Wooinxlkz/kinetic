"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface Point { x: number; y: number }

export interface AnimatedBeamProps {
  /**
   * A `position: relative` container that wraps both endpoint elements.
   * The SVG is sized and positioned to exactly match this container.
   */
  containerRef: RefObject<HTMLElement | null>;
  /** The element the beam originates from (its center is used). */
  fromRef: RefObject<HTMLElement | null>;
  /** The element the beam terminates at (its center is used). */
  toRef: RefObject<HTMLElement | null>;
  className?: string;
  /**
   * Bezier curvature amount. 0 = straight line. Positive values arch the
   * beam upward, negative downward, relative to the from→to direction.
   */
  curvature?: number;
  /** Play beam traveling from toRef → fromRef instead. Default false. */
  reverse?: boolean;
  /** Travel animation duration in seconds. Default 3. */
  duration?: number;
  /** Delay before the first cycle starts in seconds. Default 0. */
  delay?: number;
  /** Bright color at the leading edge of the beam spot. */
  gradientStartColor?: string;
  /** Trailing / transparent color. */
  gradientStopColor?: string;
  /** Color of the static dim track. */
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  /** Length of the traveling beam spot in px. Default 60. */
  beamLength?: number;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  className,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  gradientStartColor = "hsl(var(--primary))",
  gradientStopColor = "hsl(var(--primary) / 0)",
  pathColor = "hsl(var(--border))",
  pathWidth = 2,
  pathOpacity = 0.25,
  beamLength = 60,
}: AnimatedBeamProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<SVGPathElement>(null);
  const gradientId = useRef(`ab-${Math.random().toString(36).slice(2, 8)}`).current;

  const [pathState, setPathState] = useState<{
    d: string;
    length: number;
    size: { w: number; h: number };
    from: Point;
    to: Point;
  } | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!container || !fromEl || !toEl) return;

      const cr = container.getBoundingClientRect();
      const fr = fromEl.getBoundingClientRect();
      const tr = toEl.getBoundingClientRect();

      const rawFrom: Point = {
        x: fr.left - cr.left + fr.width / 2,
        y: fr.top - cr.top + fr.height / 2,
      };
      const rawTo: Point = {
        x: tr.left - cr.left + tr.width / 2,
        y: tr.top - cr.top + tr.height / 2,
      };

      // Apply reverse: swap start and end so the beam SVG itself encodes direction
      const from = reverse ? rawTo : rawFrom;
      const to = reverse ? rawFrom : rawTo;

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const cx = (from.x + to.x) / 2 - curvature * dy;
      const cy = (from.y + to.y) / 2 + curvature * dx;

      setPathState((prev) => {
        const d = `M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`;
        return {
          d,
          length: prev?.d === d ? prev.length : 0,
          size: { w: cr.width, h: cr.height },
          from,
          to,
        };
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", measure);
    };
  }, [containerRef, fromRef, toRef, curvature, reverse]);

  // Measure path length after the SVG track renders / path changes
  useLayoutEffect(() => {
    if (trackRef.current && pathState && pathState.length === 0) {
      const len = trackRef.current.getTotalLength();
      if (len > 0) {
        setPathState((prev) => (prev ? { ...prev, length: len } : null));
      }
    }
  });

  if (!pathState) return null;

  const { d, length, size, from, to } = pathState;

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 overflow-visible", className)}
      width={size.w}
      height={size.h}
    >
      <defs>
        {/* Gradient aligned along the actual beam path direction */}
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
        >
          <stop offset="0%" stopColor={gradientStopColor} stopOpacity={0} />
          <stop offset="30%" stopColor={gradientStartColor} />
          <stop offset="70%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Static dim track */}
      <path
        ref={trackRef}
        d={d}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        fill="none"
        strokeLinecap="round"
      />

      {/* Traveling beam — only rendered once path length is known */}
      {!reduce && length > 0 && (
        <motion.path
          d={d}
          stroke={`url(#${gradientId})`}
          strokeWidth={pathWidth + 2}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${beamLength} ${length}`}
          animate={{ strokeDashoffset: [beamLength, -(length + beamLength)] }}
          transition={{ duration, delay, ease: "linear", repeat: Infinity }}
        />
      )}
    </svg>
  );
}
