"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PressLink } from "@/components/app/press-link";
import { yearlyMonthlyPrice, yearlyTotal } from "./plans-data";
import type { Plan, BillingCycle } from "./plans-data";

const PRICE_SPRING = { type: "spring", stiffness: 400, damping: 30 };

interface PlanCardProps {
  plan: Plan;
  billing: BillingCycle;
  index: number;
}

function PriceDisplay({ plan, billing }: { plan: Plan; billing: BillingCycle }) {
  const ymp = yearlyMonthlyPrice(plan);
  const yt = yearlyTotal(plan);
  const price = billing === "yearly" ? ymp : plan.monthlyPrice;

  if (price === null) return null;

  if (price === 0) {
    return (
      <div className="flex items-end gap-1">
        <span className="text-4xl font-bold tracking-tight text-foreground">
          Free
        </span>
        <span className="mb-1.5 text-sm text-muted-foreground">forever</span>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-1">
      <span className="text-sm font-medium text-muted-foreground">$</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${plan.id}-${billing}`}
          initial={{ opacity: 0, y: -16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          transition={PRICE_SPRING}
          className="text-4xl font-bold tracking-tight text-foreground tabular-nums"
        >
          {price}
        </motion.span>
      </AnimatePresence>
      <div className="mb-1.5 flex flex-col leading-none">
        <span className="text-xs text-muted-foreground">/mo</span>
        <AnimatePresence>
          {billing === "yearly" && yt !== null && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] text-muted-foreground whitespace-nowrap overflow-hidden"
            >
              billed ${yt}/yr
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function PlanCard({ plan, billing, index }: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
        delay: index * 0.08,
      }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 transition-shadow duration-300",
        plan.featured
          ? "border-(--color-border-strong) bg-card shadow-xl shadow-black/10 dark:shadow-black/30"
          : "border-border bg-card/50 hover:bg-card hover:shadow-md hover:shadow-black/5",
      )}
    >
      {/* Featured glow ring */}
      {plan.featured && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/20" />
      )}

      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="min-h-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {plan.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground leading-snug">
            {plan.description}
          </p>
        </div>
        {plan.badge && (
          <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
            {plan.badge}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-6 min-h-[56px]">
        <PriceDisplay plan={plan} billing={billing} />
      </div>

      {/* CTA */}
      <PressLink
        href={plan.ctaHref}
        target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
        rel={plan.ctaHref.startsWith("http") ? "noreferrer noopener" : undefined}
        className={cn(
          "mb-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors",
          plan.ctaVariant === "primary" &&
            "bg-foreground text-background hover:bg-foreground/90",
          plan.ctaVariant === "accent" &&
            "bg-accent text-accent-foreground hover:bg-accent/90",
          plan.ctaVariant === "ghost" &&
            "border border-border bg-transparent text-foreground hover:bg-card",
        )}
        pressScale={0.97}
      >
        {plan.cta}
      </PressLink>

      {/* Divider */}
      <div className="mb-5 h-px bg-border" />

      {/* Features */}
      <ul className="flex flex-col gap-3">
        {plan.features.map((feat) => (
          <li key={feat.text} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                feat.included
                  ? feat.highlight
                    ? "bg-accent/15 text-accent"
                    : "bg-muted text-foreground"
                  : "bg-muted text-muted-foreground/40",
              )}
            >
              {feat.included ? (
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              ) : (
                <X className="h-2.5 w-2.5" strokeWidth={3} />
              )}
            </span>
            <span
              className={cn(
                "text-sm leading-snug",
                feat.included
                  ? feat.highlight
                    ? "font-medium text-foreground"
                    : "text-foreground"
                  : "text-muted-foreground/60 line-through",
              )}
            >
              <span className="sr-only">{feat.included ? "Included: " : "Not included: "}</span>
              {feat.text}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
