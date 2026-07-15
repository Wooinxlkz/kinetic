"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { SPRING_PRESS, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  half?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  readonly?: boolean;
  className?: string;
}

const LABELS: Record<number, string> = {
  0.5: "Terrible", 1: "Poor", 1.5: "Below average",
  2: "Fair", 2.5: "Average", 3: "Good",
  3.5: "Very good", 4: "Great", 4.5: "Excellent", 5: "Outstanding",
};

const SIZES = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };

function HalfStar({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <span className="relative inline-block">
      <Star className={cn(SIZES[size], "text-muted-foreground/25")} />
      <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
        <Star className={cn(SIZES[size], "fill-amber-400 text-amber-400")} />
      </span>
    </span>
  );
}

export function Rating({
  value = 0,
  onChange,
  max = 5,
  half = false,
  size = "md",
  showLabel = true,
  readonly = false,
  className,
}: RatingProps) {
  const [hovered, setHovered] = useState(0);
  const reduce = useReducedMotion();
  const display = hovered || value;
  const label = LABELS[Math.round(display * 2) / 2] ?? "";

  const getVal = (starIdx: number, e?: React.MouseEvent) => {
    if (!half || !e) return starIdx;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return e.clientX - rect.left < rect.width / 2 ? starIdx - 0.5 : starIdx;
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className="flex items-center gap-1"
        onMouseLeave={() => !readonly && setHovered(0)}
      >
        {Array.from({ length: max }, (_, i) => {
          const n = i + 1;
          const filled = display >= n;
          const halfFilled = !filled && display >= n - 0.5;

          return (
            <motion.button
              key={i}
              type="button"
              disabled={readonly}
              onMouseMove={(e) => !readonly && setHovered(getVal(n, e))}
              onClick={(e) => !readonly && onChange?.(getVal(n, e))}
              whileHover={!readonly && !reduce ? { scale: 1.3 } : {}}
              whileTap={!readonly && !reduce ? { scale: 0.85 } : {}}
              transition={SPRING_PRESS}
              className="focus:outline-none disabled:cursor-default"
            >
              <motion.span
                animate={
                  reduce
                    ? {}
                    : filled
                    ? { scale: [1, 1.25, 1], rotate: [0, -12, 8, 0] }
                    : { scale: halfFilled ? 1 : 0.88 }
                }
                transition={reduce ? {} : { type: "spring", stiffness: 500, damping: 22 }}
                className="block"
              >
                {halfFilled ? (
                  <HalfStar size={size} />
                ) : (
                  <Star
                    className={cn(
                      SIZES[size],
                      "transition-colors duration-100",
                      filled
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/25",
                    )}
                  />
                )}
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      {showLabel && (
        <AnimatePresence mode="wait">
          {display > 0 && (
            <motion.p
              key={label}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 5, filter: "blur(4px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -5, filter: "blur(4px)" }}
              transition={reduce ? { duration: 0.12 } : SPRING_LAYOUT}
              className="text-sm font-semibold text-foreground"
            >
              {label}
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
