"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ElasticSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  formatValue?: (v: number) => string;
  elasticity?: number;
  className?: string;
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function snap(v: number, min: number, max: number, step: number) {
  const snapped = Math.round((v - min) / step) * step + min;
  return clamp(snapped, min, max);
}

export function ElasticSlider({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  formatValue = (v) => String(v),
  elasticity = 18,
  className,
}: ElasticSliderProps) {
  const [localVal, setLocalVal] = useState(value);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);

  // Spring-backed thumb position
  const rawPct = useMotionValue((localVal - min) / (max - min));
  const springPct = useSpring(rawPct, { stiffness: reduce ? 800 : 320, damping: reduce ? 80 : 24, mass: 0.6 });

  // Elastic overflow tracking during drag
  const overflowX = useMotionValue(0);
  const springOverflow = useSpring(overflowX, { stiffness: 260, damping: 20, mass: 0.5 });

  const thumbX = useTransform(springPct, (p) => `${p * 100}%`);

  // Thumb scale + shadow on drag
  const thumbScale = useSpring(useMotionValue(1), { stiffness: 600, damping: 30 });

  const getValueFromEvent = useCallback((e: MouseEvent | TouchEvent) => {
    if (!trackRef.current) return localVal;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    return snap(ratio * (max - min) + min, min, max, step);
  }, [localVal, min, max, step]);

  const startDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    thumbScale.set(1.22);

    const onMove = (ev: MouseEvent | TouchEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clientX = "touches" in ev ? ev.touches[0].clientX : ev.clientX;
      const rawRatio = (clientX - rect.left) / rect.width;
      const clampedRatio = clamp(rawRatio, 0, 1);
      const overflow = (rawRatio - clampedRatio) * rect.width;
      const newVal = snap(clampedRatio * (max - min) + min, min, max, step);

      rawPct.set(clampedRatio);
      overflowX.set(clamp(overflow * 0.22, -elasticity, elasticity));
      setLocalVal(newVal);
      onChange?.(newVal);
    };

    const onUp = () => {
      setDragging(false);
      thumbScale.set(1);
      overflowX.set(0);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove as EventListener);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove as EventListener, { passive: false });
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
  }, [min, max, step, onChange, rawPct, overflowX, thumbScale, elasticity]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const newVal = snap(ratio * (max - min) + min, min, max, step);
    rawPct.set(ratio);
    setLocalVal(newVal);
    onChange?.(newVal);
  };

  const pctDisplay = ((localVal - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <p className="text-sm font-semibold text-foreground">{label}</p>}
          {showValue && (
            <motion.p
              animate={dragging && !reduce ? { scale: 1.1, color: "hsl(var(--primary))" } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="min-w-10 text-right font-mono text-sm font-semibold tabular-nums text-foreground"
            >
              {formatValue(localVal)}
            </motion.p>
          )}
        </div>
      )}

      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative flex h-10 cursor-pointer items-center"
      >
        {/* Track background */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
          {/* Fill */}
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-primary"
            animate={{ width: `${pctDisplay}%` }}
            transition={reduce ? { duration: 0.1 } : { type: "spring", stiffness: 380, damping: 28 }}
          />
        </div>

        {/* Thumb */}
        <motion.div
          style={{ left: thumbX, x: springOverflow, scale: thumbScale }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          className={cn(
            "absolute -translate-x-1/2 flex h-5 w-5 cursor-grab items-center justify-center rounded-full border-2 border-primary bg-background shadow-md active:cursor-grabbing",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
        >
          {/* Inner pulse dot */}
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={dragging && !reduce ? { scale: [1, 1.6, 1] } : { scale: 1 }}
            transition={{ duration: 0.6, repeat: dragging && !reduce ? Infinity : 0 }}
          />
        </motion.div>
      </div>

      {/* Min / Max labels */}
      <div className="flex justify-between">
        <span className="text-[11px] text-muted-foreground">{formatValue(min)}</span>
        <span className="text-[11px] text-muted-foreground">{formatValue(max)}</span>
      </div>
    </div>
  );
}
