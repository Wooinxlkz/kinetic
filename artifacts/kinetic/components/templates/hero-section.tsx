"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface HeroSectionProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  media?: ReactNode;
  /** "center" (default) | "left" */
  align?: "center" | "left";
  className?: string;
}

const STAGGER = [0, 0.08, 0.16, 0.24, 0.32];

/**
 * Full-width hero section template with staggered entrance animations.
 * Slots for eyebrow badge, headline, subheadline, CTA buttons, and media.
 */
export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  primaryAction,
  secondaryAction,
  media,
  align = "center",
  className,
}: HeroSectionProps) {
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-background px-6 py-24 sm:py-32",
        className,
      )}
    >
      {/* Gradient orb */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -z-10 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]",
          isCenter ? "-top-32 left-1/2 -translate-x-1/2 bg-primary/40" : "-top-16 -left-32 bg-primary/30",
        )}
      />

      <div
        className={cn(
          "mx-auto max-w-4xl",
          isCenter && "text-center",
        )}
      >
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: STAGGER[0] }}
            className={cn("mb-5", isCenter && "flex justify-center")}
          >
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: STAGGER[1] }}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
        >
          {headline}
        </motion.h1>

        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: STAGGER[2] }}
            className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl"
          >
            {subheadline}
          </motion.p>
        )}

        {(primaryAction || secondaryAction) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT, delay: STAGGER[3] }}
            className={cn(
              "mt-10 flex flex-wrap gap-3",
              isCenter && "justify-center",
            )}
          >
            {primaryAction}
            {secondaryAction}
          </motion.div>
        )}

        {media && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: STAGGER[4] }}
            className="mt-14"
          >
            {media}
          </motion.div>
        )}
      </div>
    </section>
  );
}
