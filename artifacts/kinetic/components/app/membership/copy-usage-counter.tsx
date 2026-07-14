"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { useAuth } from "@/components/app/auth/auth-provider";

/** Signed-in limits by plan. `null` = unlimited. */
const SIGNED_IN_LIMITS: Record<string, number | null | undefined> = {
  free: 10,
  pro: 25,
  sponsor: 100,
  lifetime: null,
  admin: null,
};

const ANON_LIMIT = 4;

function getLimit(isAuthenticated: boolean, plan: string): number | null | "unknown" {
  if (!isAuthenticated) return ANON_LIMIT;
  if (!(plan in SIGNED_IN_LIMITS)) return "unknown";
  return SIGNED_IN_LIMITS[plan] ?? null;
}

function planLabel(plan: string): string {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

export function CopyUsageCounter({ inline = false }: { inline?: boolean }) {
  const { status, user } = useAuth();
  const [count, setCount] = useState<number | null>(null);

  const isAuthenticated = status === "authenticated";
  const plan = isAuthenticated ? (user?.plan ?? "free") : "free";
  const rawLimit = getLimit(isAuthenticated, plan);

  // Re-fetch whenever auth resolves so the count is fresh after sign-in/out.
  useEffect(() => {
    if (status === "loading") return;
    fetch("/copy-track", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setCount(typeof d.count === "number" ? d.count : 0))
      .catch(() => setCount(0));
  }, [status]);

  // Don't render until we have a count, or if the plan is unrecognised
  if (count === null || rawLimit === "unknown") return null;

  const limit = rawLimit; // number | null
  const pct = limit !== null ? Math.min(count / limit, 1) : 0;
  const isUnlimited = limit === null;
  const isNearLimit = !isUnlimited && pct >= 0.75;
  const isAtLimit = !isUnlimited && count >= limit;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={inline ? "flex flex-col items-center gap-1.5" : "mx-auto mb-10 flex w-fit flex-col items-center gap-2"}
    >
      {/* Pill label */}
      <div
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium ${
          isAtLimit
            ? "border-destructive/30 bg-destructive/8 text-destructive"
            : isNearLimit
              ? "border-amber-500/30 bg-amber-500/8 text-amber-600 dark:text-amber-400"
              : "border-border bg-card text-muted-foreground"
        }`}
      >
        <Heart className="h-3 w-3 text-accent shrink-0" />
        <span>
          Today&apos;s usage
        </span>
        <span className="h-3 w-px bg-current opacity-20" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="tabular-nums font-semibold text-foreground"
          >
            {count}
          </motion.span>
        </AnimatePresence>
        {!isUnlimited && (
          <span className="text-muted-foreground">/ {limit}</span>
        )}
        <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
          {planLabel(plan)}
        </span>
      </div>

      {/* Progress bar — hidden for unlimited plans */}
      {!isUnlimited && (
        <div className="h-0.5 w-48 overflow-hidden rounded-full bg-border">
          <motion.div
            className={`h-full rounded-full ${
              isAtLimit
                ? "bg-destructive"
                : isNearLimit
                  ? "bg-amber-500"
                  : "bg-accent"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${pct * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.1 }}
          />
        </div>
      )}
    </motion.div>
  );
}
