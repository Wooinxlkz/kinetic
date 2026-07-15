"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface PricingSectionProps {
  eyebrow?: string;
  headline?: string;
  plans: PricingPlan[];
  className?: string;
}

/**
 * 3-column pricing section template with staggered entrance.
 * The highlighted plan gets a primary border and subtle glow.
 */
export function PricingSection({
  eyebrow = "Pricing",
  headline = "Simple, transparent pricing",
  plans,
  className,
}: PricingSectionProps) {
  return (
    <section className={cn("bg-background px-6 py-24", className)}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14 text-center">
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
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {headline}
          </motion.h2>
        </div>

        {/* Plans */}
        <div
          className={cn(
            "grid gap-6",
            plans.length === 2 && "sm:grid-cols-2",
            plans.length === 3 && "sm:grid-cols-3",
            plans.length >= 4 && "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.38, ease: EASE_OUT, delay: 0.1 + i * 0.07 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                plan.highlighted
                  ? "border-primary bg-primary/[0.04] shadow-[0_0_40px_-10px_hsl(var(--primary)/0.25)]"
                  : "border-border bg-card",
              )}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-flex self-start rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                  Most popular
                </div>
              )}
              <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                )}
              </div>
              {plan.description && (
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              )}

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "mt-8 w-full rounded-xl py-2.5 text-sm font-semibold transition-colors",
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
