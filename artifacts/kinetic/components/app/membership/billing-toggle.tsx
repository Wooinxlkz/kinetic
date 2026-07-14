"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { BillingCycle } from "./plans-data";
import { YEARLY_DISCOUNT } from "./plans-data";

const SPRING = { type: "spring", stiffness: 400, damping: 30 };

const discountLabel = `Save ${Math.round(YEARLY_DISCOUNT * 100)}%`;

interface BillingToggleProps {
  value: BillingCycle;
  onChange: (v: BillingCycle) => void;
}

export function BillingToggle({ value, onChange }: BillingToggleProps) {
  const options: { id: BillingCycle; label: string }[] = [
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  return (
    <div className="inline-flex items-center gap-3" role="group" aria-label="Billing cycle">
      <div className="relative flex rounded-full border border-border bg-card p-1">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            aria-pressed={value === opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative z-10 rounded-full px-5 py-1.5 text-sm font-medium transition-colors duration-200",
              value === opt.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {value === opt.id && (
              <motion.span
                layoutId="billing-pill"
                transition={SPRING}
                className="absolute inset-0 rounded-full bg-background shadow-sm border border-border"
                style={{ zIndex: -1 }}
              />
            )}
            {opt.label}
          </button>
        ))}
      </div>

      {/* Discount badge — animates in/out based on yearly selection */}
      <motion.span
        aria-live="polite"
        animate={
          value === "yearly"
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.85, y: 4, pointerEvents: "none" }
        }
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="rounded-full bg-neon/15 px-2.5 py-1 text-xs font-semibold text-neon"
      >
        {discountLabel}
      </motion.span>
    </div>
  );
}
