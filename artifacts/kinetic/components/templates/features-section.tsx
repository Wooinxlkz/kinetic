"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface FeaturesSectionProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  features: FeatureItem[];
  cols?: 2 | 3 | 4;
  className?: string;
}

/**
 * Marketing features section template with icon tiles and staggered entrance.
 */
export function FeaturesSection({
  eyebrow,
  headline,
  subheadline,
  features,
  cols = 3,
  className,
}: FeaturesSectionProps) {
  return (
    <section className={cn("bg-background px-6 py-24", className)}>
      <div className="mx-auto max-w-5xl">
        {(eyebrow || headline || subheadline) && (
          <div className="mb-16 text-center">
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary"
              >
                {eyebrow}
              </motion.p>
            )}
            {headline && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.06 }}
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {headline}
              </motion.h2>
            )}
            {subheadline && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.12 }}
                className="mt-4 text-lg text-muted-foreground"
              >
                {subheadline}
              </motion.p>
            )}
          </div>
        )}

        <div
          className={cn(
            "grid gap-8",
            cols === 2 && "sm:grid-cols-2",
            cols === 3 && "sm:grid-cols-2 lg:grid-cols-3",
            cols === 4 && "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 + i * 0.06 }}
              className="group flex flex-col gap-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
