"use client";

import { Check, Crown, Zap } from "lucide-react";
import { useAuth } from "@/components/app/auth/auth-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PRO_FEATURES = [
  "Unlimited component copies",
  "Full playground access",
  "Priority registry updates",
  "Early access to new components",
  "Discord sponsor role",
];

function PlanBadge({ plan }: { plan: string }) {
  const isPro = plan === "pro" || plan === "sponsor" || plan === "lifetime";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        isPro
          ? "bg-amber-500/12 text-amber-400 border border-amber-500/25"
          : "bg-muted/40 text-muted-foreground border border-border",
      )}
    >
      {isPro ? <Crown className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
      {isPro ? (plan === "lifetime" ? "Lifetime" : plan === "sponsor" ? "Sponsor" : "Pro") : "Free"}
    </div>
  );
}

export function MembershipTab() {
  const { user } = useAuth();
  if (!user) return null;

  const isPro = user.plan === "pro" || user.plan === "sponsor" || user.plan === "lifetime";

  return (
    <div className="flex flex-col gap-6 px-7 py-6">

      {/* Current plan */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/10 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Current plan</span>
          <PlanBadge plan={user.plan} />
        </div>
        {isPro ? (
          <p className="text-xs text-muted-foreground">
            You have full access to all Kinetic UI features. Thank you for supporting the project!
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Upgrade to Pro for unlimited access to all components, playground, and early releases.
          </p>
        )}
      </div>

      {/* Features list */}
      {!isPro && (
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
            What you get with Pro
          </p>
          <ul className="flex flex-col gap-2">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/80">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-2.5 w-2.5 text-primary" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      {!isPro && (
        <Link
          href="/sponsors"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <Crown className="h-4 w-4" />
          Upgrade to Pro
        </Link>
      )}

    </div>
  );
}
