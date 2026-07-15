"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface CtaSectionProps {
  headline: string;
  subheadline?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  /** "default" (bordered card) | "gradient" (gradient bg fill) */
  variant?: "default" | "gradient";
  className?: string;
}

/**
 * Full-width call-to-action section template.
 * Two variants: a bordered card and a gradient fill.
 */
export function CtaSection({
  headline,
  subheadline,
  primaryAction,
  secondaryAction,
  variant = "default",
  className,
}: CtaSectionProps) {
  return (
    <section className={cn("px-6 py-24 bg-background", className)}>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className={cn(
          "mx-auto max-w-3xl rounded-3xl p-10 text-center sm:p-16",
          variant === "default"
            ? "border border-border bg-card"
            : "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20",
        )}
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.08 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {headline}
        </motion.h2>

        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.14 }}
            className="mt-5 text-lg text-muted-foreground"
          >
            {subheadline}
          </motion.p>
        )}

        {(primaryAction || secondaryAction) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {primaryAction}
            {secondaryAction}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
