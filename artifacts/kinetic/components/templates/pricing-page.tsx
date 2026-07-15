"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_PRESS, SPRING_LAYOUT } from "@/lib/ease";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for side projects and personal experiments.",
    cta: "Get started free",
    features: [
      "3 projects",
      "5 GB storage",
      "100 GB bandwidth / mo",
      "Community support",
      "Shared compute",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 19,
    description: "For teams shipping real products that need reliability.",
    cta: "Start free trial",
    highlighted: true,
    badge: "Most popular",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "1 TB bandwidth / mo",
      "Priority support (24 h)",
      "Dedicated compute",
      "Preview environments",
      "Custom domains",
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "SLA guarantees, SAML SSO, and white-glove onboarding.",
    cta: "Talk to sales",
    features: [
      "Everything in Pro",
      "99.99% uptime SLA",
      "SAML SSO & SCIM",
      "Dedicated support",
      "Custom contracts",
      "On-premise option",
      "SOC 2 Type II",
    ],
  },
];

const FAQ: { q: string; a: string }[] = [
  { q: "Can I change plans anytime?", a: "Yes, you can upgrade, downgrade, or cancel at any time. Prorated credits are applied automatically." },
  { q: "How does the free trial work?", a: "Every paid plan starts with a 14-day free trial, no credit card required. You'll only be charged when the trial ends." },
  { q: "What happens if I exceed my bandwidth?", a: "We'll send you an alert at 80% usage. If you go over, we charge $0.02 per additional GB — no sudden shutdowns." },
  { q: "Do you offer non-profit or student discounts?", a: "Yes. Email us with proof of eligibility and we'll apply a 40% discount to any paid plan." },
  { q: "Can I self-host Nucleus?", a: "Enterprise customers can request an on-premise license. Reach out to our sales team for details." },
];

// ─── Billing toggle ───────────────────────────────────────────────────────────

function BillingToggle({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="inline-flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn("text-sm transition-colors", !yearly ? "font-semibold text-foreground" : "text-muted-foreground")}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange(!yearly)}
        className="relative h-6 w-11 rounded-full border border-border bg-muted"
      >
        <motion.span
          layout
          layoutId="billing-thumb"
          transition={SPRING_LAYOUT}
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-foreground shadow-sm",
            yearly ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn("flex items-center gap-1.5 text-sm transition-colors", yearly ? "font-semibold text-foreground" : "text-muted-foreground")}
      >
        Yearly
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Save 35%
        </span>
      </button>
    </div>
  );
}

// ─── Check icon ───────────────────────────────────────────────────────────────

function Check() {
  return (
    <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Plan card ────────────────────────────────────────────────────────────────

function PlanCard({ plan, yearly, delay = 0 }: { plan: Plan; yearly: boolean; delay?: number }) {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-6",
        plan.highlighted
          ? "border-primary/40 bg-primary/5 ring-2 ring-primary/20"
          : "border-border bg-card",
      )}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-5">
        <h3 className={cn("mb-1 font-semibold", plan.highlighted ? "text-foreground" : "text-muted-foreground")}>
          {plan.name}
        </h3>
        <div className="flex items-end gap-1">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${plan.name}-${yearly}`}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="text-3xl font-bold tabular-nums text-foreground"
            >
              {price === 0 ? "Free" : `$${price}`}
            </motion.span>
          </AnimatePresence>
          {price > 0 && <span className="mb-1 text-sm text-muted-foreground">/ mo</span>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING_PRESS}
        className={cn(
          "mb-6 h-10 w-full rounded-xl text-sm font-semibold transition-colors",
          plan.highlighted
            ? "bg-foreground text-background"
            : "border border-border bg-muted text-foreground hover:bg-muted/70",
        )}
      >
        {plan.cta}
      </motion.button>

      <ul className="mt-auto space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Check />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="pr-6 text-sm font-medium text-foreground">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="shrink-0 text-xl leading-none text-muted-foreground"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main template ────────────────────────────────────────────────────────────

/**
 * Full pricing page with animated billing period toggle (monthly / yearly),
 * price swap animation, 3-plan card grid, and FAQ accordion with collapse animation.
 * Self-contained — no required props. Copy and ship.
 */
export function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="border-b border-border px-6 py-4"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary" />
            <span className="text-sm font-bold text-foreground">Nucleus</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">Product</a>
            <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">Docs</a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_PRESS}
              className="rounded-lg bg-foreground px-4 py-1.5 text-sm font-medium text-background"
            >
              Sign in
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary"
        >
          Pricing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.08 }}
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Simple, transparent pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.16 }}
          className="mb-8 text-lg text-muted-foreground"
        >
          Start for free. Scale as you grow. No hidden fees.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.24 }}
          className="flex justify-center"
        >
          <BillingToggle yearly={yearly} onChange={setYearly} />
        </motion.div>
      </section>

      {/* Plan cards */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} yearly={yearly} delay={i * 0.08} />
          ))}
        </div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          Trusted by <span className="font-semibold text-foreground">12,000+</span> developers at{" "}
          <span className="font-semibold text-foreground">2,400+</span> companies worldwide.
        </motion.p>
      </section>

      {/* Comparison callout */}
      <section className="border-y border-border bg-muted/30 py-12 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mb-3 text-xl font-bold text-foreground"
          >
            Not sure which plan fits?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.08 }}
            className="mb-6 text-sm text-muted-foreground"
          >
            Start free — no credit card required. Upgrade when you're ready.
            Every plan includes a 14-day Pro trial.
          </motion.p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_PRESS}
              className="rounded-xl bg-foreground px-6 py-2.5 text-sm font-semibold text-background"
            >
              Start free trial
            </motion.a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Compare all features →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mb-10 text-center text-2xl font-bold text-foreground"
          >
            Frequently asked questions
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {FAQ.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            Still have questions?{" "}
            <a href="#" className="text-foreground underline-offset-4 hover:underline">
              Chat with us
            </a>
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-primary" />
            <span className="font-semibold text-foreground">Nucleus</span>
          </div>
          <span>© 2025 Nucleus, Inc.</span>
        </div>
      </footer>
    </div>
  );
}
