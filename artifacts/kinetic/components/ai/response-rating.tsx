"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ThumbsUp, ThumbsDown, Check } from "lucide-react";
import { SPRING_PRESS, SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type RatingValue = "positive" | "negative" | null;

export interface ResponseRatingProps {
  onRate?: (value: RatingValue, reason?: string) => void;
  reasons?: { positive: string[]; negative: string[] };
  className?: string;
}

const DEFAULT_REASONS = {
  positive: ["Accurate", "Clear", "Helpful", "Well-structured", "Comprehensive"],
  negative: ["Inaccurate", "Unclear", "Not helpful", "Too long", "Missing context"],
};

export function ResponseRating({
  onRate,
  reasons = DEFAULT_REASONS,
  className,
}: ResponseRatingProps) {
  const [rating, setRating] = useState<RatingValue>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const reduce = useReducedMotion();

  const handleRate = (v: RatingValue) => {
    if (submitted) return;
    setRating((r) => (r === v ? null : v));
    setSelected(null);
  };

  const handleSubmit = () => {
    if (!rating || submitted) return;
    setSubmitted(true);
    onRate?.(rating, selected ?? undefined);
  };

  if (submitted) {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.88, filter: "blur(6px)" }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={SPRING_PANEL}
        className={cn("flex items-center gap-2.5 text-sm text-muted-foreground", className)}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 20, delay: 0.08 }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.div>
        Thanks for your feedback
      </motion.div>
    );
  }

  const currentReasons = rating === "positive" ? reasons.positive : reasons.negative;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Thumbs row */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Was this response helpful?</span>

        {(["positive", "negative"] as const).map((v) => (
          <motion.button
            key={v}
            type="button"
            onClick={() => handleRate(v)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.86 }}
            transition={SPRING_PRESS}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg border transition-colors focus:outline-none",
              rating === v
                ? v === "positive"
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
                  : "border-destructive/50 bg-destructive/10 text-destructive"
                : "border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground",
            )}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${v}-${rating === v}`}
                initial={reduce ? {} : { scale: 0.5, opacity: 0 }}
                animate={reduce ? {} : { scale: 1, opacity: 1 }}
                exit={reduce ? {} : { scale: 0.5, opacity: 0 }}
                transition={SPRING_LAYOUT}
              >
                {v === "positive"
                  ? <ThumbsUp className={cn("h-3.5 w-3.5", rating === v && "fill-current")} />
                  : <ThumbsDown className={cn("h-3.5 w-3.5", rating === v && "fill-current")} />
                }
              </motion.span>
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Reason chips + submit */}
      <AnimatePresence>
        {rating && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0, filter: "blur(4px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0, filter: "blur(4px)" }}
            transition={reduce ? { duration: 0.15 } : SPRING_PANEL}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 pb-0.5">
              {currentReasons.map((reason, i) => (
                <motion.button
                  key={reason}
                  type="button"
                  onClick={() => setSelected((s) => (s === reason ? null : reason))}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.75 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ ...SPRING_LAYOUT, delay: i * 0.04 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none",
                    selected === reason
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-foreground/25 hover:text-foreground",
                  )}
                >
                  {reason}
                </motion.button>
              ))}
            </div>
            <motion.button
              type="button"
              onClick={handleSubmit}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_LAYOUT}
              className="mt-2.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background focus:outline-none"
            >
              Submit feedback
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
