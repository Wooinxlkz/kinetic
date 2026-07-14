"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PressLink } from "@/components/app/press-link";
import { useAuth } from "@/components/app/auth/auth-provider";
import { LIFETIME_PLAN } from "./plans-data";

/**
 * Lifetime is a one-time purchase, so it doesn't fit the monthly/yearly
 * billing toggle the other three plans share. Rendered as a wide banner
 * below the main grid instead of a fourth grid column.
 */
export function LifetimeCard() {
  const plan = LIFETIME_PLAN;
  const { status, user, open, updateUser } = useAuth();
  const [devSwitching, setDevSwitching] = useState(false);
  const userPlan = status === "authenticated" ? (user?.plan ?? "free") : "free";
  const isCurrentPlan = userPlan === plan.id;
  const isDevAccount = status === "authenticated" && user?.isDev === true;

  function handleCtaClick(e: { preventDefault: () => void }) {
    if (status !== "authenticated") {
      e.preventDefault();
      open("sign-in");
    }
  }

  async function handleDevSwitch() {
    if (!user) return;
    setDevSwitching(true);
    try {
      const res = await fetch(`/auth/admin/users/${user.id}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan: plan.id, planExpiresAt: null }),
      });
      if (res.ok) updateUser({ plan: plan.id });
    } finally {
      setDevSwitching(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.24 }}
      className="relative flex w-full flex-col gap-6 overflow-hidden rounded-2xl border border-(--color-border-strong) bg-card p-6 shadow-lg shadow-black/5 sm:flex-row sm:items-center sm:gap-10 sm:p-8 dark:shadow-black/20"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/15" />

      {/* Left: name, description, price, CTA */}
      <div className="flex flex-col sm:w-72 sm:shrink-0">
        <div className="mb-3 flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {plan.name}
          </p>
          {plan.badge && (
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {plan.badge}
            </span>
          )}
        </div>
        <p className="mb-5 text-sm leading-snug text-muted-foreground">{plan.description}</p>

        <div className="mb-5 flex items-end gap-1">
          <span className="text-sm font-medium text-muted-foreground">$</span>
          <span className="text-4xl font-bold tracking-tight text-foreground tabular-nums">
            {plan.monthlyPrice}
          </span>
          <span className="mb-1.5 text-xs text-muted-foreground">one-time</span>
        </div>

        {isCurrentPlan ? (
          <span
            className="inline-flex w-full cursor-default items-center justify-center rounded-xl border border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-muted-foreground"
            aria-current="true"
          >
            Current plan
          </span>
        ) : isDevAccount ? (
          <button
            type="button"
            disabled={devSwitching}
            onClick={handleDevSwitch}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-50"
          >
            {devSwitching ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Switch to {plan.name}
          </button>
        ) : (
          <PressLink
            href={plan.ctaHref}
            target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
            rel={plan.ctaHref.startsWith("http") ? "noreferrer noopener" : undefined}
            onClick={handleCtaClick}
            className={cn(
              "inline-flex w-full items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors",
              plan.ctaVariant === "accent" && "bg-accent text-accent-foreground hover:bg-accent/90",
            )}
            pressScale={0.97}
          >
            {plan.cta}
          </PressLink>
        )}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-border sm:h-full sm:w-px" />

      {/* Right: features, two columns on wider screens */}
      <ul className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {plan.features.map((feat) => (
          <li key={feat.text} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                feat.highlight ? "bg-accent/15 text-accent" : "bg-muted text-foreground",
              )}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <span
              className={cn(
                "text-sm leading-snug",
                feat.highlight ? "font-medium text-foreground" : "text-foreground",
              )}
            >
              {feat.text}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
