"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  activeStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Multi-step progress indicator with a spring-animated active marker
 * and blur cross-fade on step labels. Works horizontally or vertically.
 */
export function Stepper({
  steps,
  activeStep,
  orientation = "horizontal",
  className,
}: StepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex",
        isVertical ? "flex-col gap-0" : "flex-row items-start gap-0",
        className,
      )}
    >
      {steps.map((step, i) => {
        const completed = i < activeStep;
        const active = i === activeStep;
        const isLast = i === steps.length - 1;

        return (
          <div
            key={i}
            className={cn(
              "flex",
              isVertical ? "flex-row gap-3" : "flex-col items-center",
              !isLast && !isVertical && "flex-1",
            )}
          >
            {/* Step circle */}
            <div
              className={cn(
                "relative flex shrink-0 flex-col items-center",
                isVertical && "items-center",
              )}
            >
              <motion.div
                animate={{
                  backgroundColor: completed
                    ? "hsl(var(--foreground))"
                    : active
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted))",
                  scale: active ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="flex h-8 w-8 items-center justify-center rounded-full"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {completed ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                    >
                      <Check className="h-4 w-4 text-background" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="number"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                      className={cn(
                        "text-xs font-semibold",
                        active ? "text-primary-foreground" : "text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "relative overflow-hidden bg-muted",
                    isVertical ? "ml-0 mt-1 h-8 w-[2px]" : "mx-auto mt-3.5 h-[2px] w-full",
                  )}
                >
                  <motion.div
                    className="absolute inset-0 bg-foreground origin-left"
                    animate={{ scaleX: completed ? 1 : 0, scaleY: 1 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    style={{ transformOrigin: isVertical ? "top" : "left" }}
                  />
                </div>
              )}
            </div>

            {/* Label */}
            <div
              className={cn(
                isVertical ? "mb-8 pb-0" : "mt-2 text-center",
                "min-w-0",
              )}
            >
              <motion.p
                animate={{ opacity: active ? 1 : completed ? 0.7 : 0.45 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "text-xs font-medium",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </motion.p>
              {step.description ? (
                <p className="mt-0.5 text-[11px] text-muted-foreground/60 hidden sm:block">
                  {step.description}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
