"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type ConfidenceLevel = "very-low" | "low" | "medium" | "high" | "very-high";

export interface ConfidenceMeterProps {
  value: number;             // 0–1
  label?: string;
  reasoning?: string;
  variant?: "arc" | "bar" | "segments";
  showLevel?: boolean;
  showTrend?: "up" | "down" | "neutral";
  className?: string;
}

function getLevel(v: number): ConfidenceLevel {
  if (v < 0.2) return "very-low";
  if (v < 0.4) return "low";
  if (v < 0.65) return "medium";
  if (v < 0.85) return "high";
  return "very-high";
}

const LEVEL_LABELS: Record<ConfidenceLevel, string> = {
  "very-low": "Very Low", low: "Low", medium: "Medium", high: "High", "very-high": "Very High",
};

const LEVEL_COLORS: Record<ConfidenceLevel, { bar: string; text: string; glow: string }> = {
  "very-low": { bar: "bg-destructive",       text: "text-destructive",       glow: "shadow-destructive/30" },
  low:        { bar: "bg-orange-500",         text: "text-orange-500",         glow: "shadow-orange-500/30" },
  medium:     { bar: "bg-amber-500",          text: "text-amber-500",          glow: "shadow-amber-500/30" },
  high:       { bar: "bg-emerald-500",        text: "text-emerald-500",        glow: "shadow-emerald-500/30" },
  "very-high":{ bar: "bg-emerald-400",        text: "text-emerald-400",        glow: "shadow-emerald-400/30" },
};

/* Radial arc variant — SVG arc path */
function ArcMeter({ value, level, reduce }: { value: number; level: ConfidenceLevel; reduce: boolean | null }) {
  const inView = useInView(useRef<SVGSVGElement>(null), { once: true });
  const ref = useRef<SVGSVGElement>(null);
  const inViewRef = useInView(ref, { once: true });
  const pct = reduce ? value : inViewRef ? value : 0;

  // Arc geometry: radius 44, center 56,56, sweep 220°
  const R = 44;
  const CX = 56, CY = 58;
  const START_DEG = -200, SWEEP = 220;
  const startRad = (START_DEG * Math.PI) / 180;
  const endRad = ((START_DEG + SWEEP * pct) * Math.PI) / 180;
  const sx = CX + R * Math.cos(startRad);
  const sy = CY + R * Math.sin(startRad);
  const ex = CX + R * Math.cos(endRad);
  const ey = CY + R * Math.sin(endRad);
  const trackEndRad = ((START_DEG + SWEEP) * Math.PI) / 180;
  const tx = CX + R * Math.cos(trackEndRad);
  const ty = CY + R * Math.sin(trackEndRad);
  const largeArc = SWEEP * pct > 180 ? 1 : 0;
  const trackLargeArc = SWEEP > 180 ? 1 : 0;

  const colors: Record<ConfidenceLevel, string> = {
    "very-low": "#ef4444", low: "#f97316", medium: "#eab308", high: "#22c55e", "very-high": "#34d399",
  };

  return (
    <svg ref={ref} viewBox="0 0 112 80" className="h-24 w-28 overflow-visible">
      {/* Track */}
      <path
        d={`M ${sx} ${sy} A ${R} ${R} 0 ${trackLargeArc} 1 ${tx} ${ty}`}
        fill="none" stroke="hsl(var(--muted))" strokeWidth="7" strokeLinecap="round"
      />
      {/* Fill */}
      <motion.path
        d={`M ${sx} ${sy} A ${R} ${R} 0 ${largeArc} 1 ${ex} ${ey}`}
        fill="none" stroke={colors[level]} strokeWidth="7" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inViewRef ? { pathLength: value } : { pathLength: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      {/* Value text */}
      <text x={CX} y={CY + 6} textAnchor="middle" fontSize="15" fontWeight="700"
        fill={colors[level]} fontFamily="ui-monospace, monospace">
        {Math.round(value * 100)}%
      </text>
    </svg>
  );
}

/* Bar variant */
function BarMeter({ value, level, reduce }: { value: number; level: ConfidenceLevel; reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const colors = LEVEL_COLORS[level];

  return (
    <div ref={ref} className="w-full">
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn("absolute left-0 top-0 h-full rounded-full", colors.bar)}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value * 100}%` } : { width: 0 }}
          transition={reduce ? { duration: 0.1 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] tabular-nums text-muted-foreground">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

/* Segments variant */
const SEG_COUNT = 10;
function SegmentsMeter({ value, level, reduce }: { value: number; level: ConfidenceLevel; reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const filled = Math.round(value * SEG_COUNT);
  const colors = LEVEL_COLORS[level];

  return (
    <div ref={ref} className="flex w-full gap-1">
      {Array.from({ length: SEG_COUNT }, (_, i) => (
        <motion.div
          key={i}
          className={cn("h-4 flex-1 rounded-sm", i < filled ? colors.bar : "bg-muted")}
          initial={reduce ? {} : { scaleY: 0, originY: 1 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={reduce ? {} : { type: "spring", stiffness: 500, damping: 28, delay: 0.05 + i * 0.05 }}
        />
      ))}
    </div>
  );
}

const TREND_ICONS = { up: TrendingUp, down: TrendingDown, neutral: Minus };

export function ConfidenceMeter({
  value,
  label = "Confidence",
  reasoning,
  variant = "arc",
  showLevel = true,
  showTrend,
  className,
}: ConfidenceMeterProps) {
  const clamped = Math.max(0, Math.min(1, value));
  const level = getLevel(clamped);
  const colors = LEVEL_COLORS[level];
  const reduce = useReducedMotion();
  const TrendIcon = showTrend ? TREND_ICONS[showTrend] : null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Label + trend */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {TrendIcon && showTrend && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING_LAYOUT}
            className={cn("flex items-center gap-0.5 text-xs font-medium", colors.text)}
          >
            <TrendIcon className="h-3.5 w-3.5" />
          </motion.div>
        )}
        {showLevel && (
          <motion.span
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING_LAYOUT}
            className={cn("ml-auto text-xs font-bold", colors.text)}
          >
            {LEVEL_LABELS[level]}
          </motion.span>
        )}
      </div>

      {/* Meter */}
      {variant === "arc" && <ArcMeter value={clamped} level={level} reduce={reduce} />}
      {variant === "bar" && <BarMeter value={clamped} level={level} reduce={reduce} />}
      {variant === "segments" && <SegmentsMeter value={clamped} level={level} reduce={reduce} />}

      {/* Reasoning */}
      {reasoning && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_LAYOUT, delay: 0.3 }}
          className="text-xs leading-relaxed text-muted-foreground"
        >
          {reasoning}
        </motion.p>
      )}
    </div>
  );
}
