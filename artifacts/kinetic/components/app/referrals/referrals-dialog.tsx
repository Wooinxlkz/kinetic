"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Copy, Check, Gift, Users, Sparkles, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReferral } from "./referral-context";
import { useReferralData, type ReferralEntry } from "./use-referral-data";

/* ─── helpers ────────────────────────────────────────────────────────────── */

function buildLink(code: string): string {
  if (typeof window === "undefined") return `/?ref=${code}`;
  return `${window.location.origin}/?ref=${code}`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_CONFIG: Record<
  "pending" | "subscribed" | "rewarded",
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "bg-zinc-500/15 text-zinc-400",
    icon: <Clock className="h-3 w-3" />,
  },
  subscribed: {
    label: "Subscribed",
    color: "bg-blue-500/15 text-blue-400",
    icon: <Check className="h-3 w-3" />,
  },
  rewarded: {
    label: "Rewarded",
    color: "bg-amber-500/15 text-amber-400",
    icon: <Sparkles className="h-3 w-3" />,
  },
};

/* ─── sub-components ─────────────────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
        copied
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-foreground/8 text-foreground hover:bg-foreground/15",
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </button>
  );
}

function ProgressDots({ earned, max }: { earned: number; max: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.2 }}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors",
            i < earned ? "bg-amber-400" : "bg-foreground/10",
          )}
        />
      ))}
    </div>
  );
}

function ReferralRow({ entry }: { entry: ReferralEntry }) {
  const cfg = STATUS_CONFIG[entry.status] ?? STATUS_CONFIG.pending;

  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          entry.status === "rewarded"
            ? "bg-amber-500/15 text-amber-400"
            : "bg-foreground/8 text-muted-foreground",
        )}
      >
        {entry.status === "rewarded" ? (
          <Sparkles className="h-3.5 w-3.5" />
        ) : entry.status === "subscribed" ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Clock className="h-3.5 w-3.5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">
          {entry.status === "rewarded"
            ? "1 free month earned"
            : entry.status === "subscribed"
              ? "Friend subscribed"
              : "Invitation sent"}
        </p>
        <p className="text-xs text-muted-foreground">{fmtDate(entry.createdAt)}</p>
      </div>

      <span
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
          cfg.color,
        )}
      >
        {cfg.icon}
        {cfg.label}
      </span>
    </div>
  );
}

/* ─── main dialog ────────────────────────────────────────────────────────── */

export function ReferralsDialog() {
  const { open, closeReferrals } = useReferral();
  const { data, loading, error } = useReferralData(open);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeReferrals();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closeReferrals]);

  const link = data ? buildLink(data.code) : "";
  const { rewardedThisYear = 0, maxPerYear = 3 } = data?.stats ?? {};
  const remaining = maxPerYear - rewardedThisYear;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeReferrals}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Referrals"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-popover/95 p-1 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15">
                <Gift className="h-4 w-4 text-amber-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-foreground">Referrals</h2>
                <p className="text-xs text-muted-foreground">
                  Invite friends, earn free months
                </p>
              </div>
              <button
                type="button"
                onClick={closeReferrals}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-1 px-2 pb-2">
              {/* How it works banner */}
              <div className="rounded-xl bg-card px-4 py-3">
                <p className="mb-2 text-xs font-medium text-foreground">How it works</p>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-400 text-[9px] font-bold">1</div>
                  <p>Share your invite link with friends</p>
                </div>
                <div className="my-1 ml-2 h-3 w-px bg-border" />
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-400 text-[9px] font-bold">2</div>
                  <p>They sign up and subscribe to any plan</p>
                </div>
                <div className="my-1 ml-2 h-3 w-px bg-border" />
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-400 text-[9px] font-bold">3</div>
                  <p>You get <span className="font-medium text-amber-400">1 free month</span> — up to 3 times per year</p>
                </div>
              </div>

              {/* Loading / error */}
              {loading && (
                <div className="flex items-center justify-center py-6 text-xs text-muted-foreground">
                  Loading your referral info…
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              {data && (
                <>
                  {/* Referral link */}
                  <div className="rounded-xl bg-card px-3 py-3">
                    <p className="mb-2 text-xs font-medium text-foreground">Your invite link</p>
                    <div className="flex items-center gap-2">
                      <div className="min-w-0 flex-1 rounded-lg bg-background px-3 py-2 font-mono text-xs text-muted-foreground">
                        <span className="truncate block">{link}</span>
                      </div>
                      <CopyButton text={link} />
                    </div>
                    <p className="mt-2 text-[10px] text-muted-foreground">
                      Referral code: <span className="font-mono text-foreground">{data.code}</span>
                    </p>
                  </div>

                  {/* Progress this year */}
                  <div className="rounded-xl bg-card px-4 py-3">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-medium text-foreground">
                        This year&apos;s rewards
                      </p>
                      <span className="text-xs text-muted-foreground">
                        <span className="font-semibold text-amber-400">{rewardedThisYear}</span>
                        <span> / {maxPerYear} free months earned</span>
                      </span>
                    </div>

                    <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(rewardedThisYear / maxPerYear) * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full bg-amber-400"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <ProgressDots earned={rewardedThisYear} max={maxPerYear} />
                      {remaining > 0 ? (
                        <p className="text-[10px] text-muted-foreground">
                          {remaining} reward{remaining !== 1 ? "s" : ""} remaining this year
                        </p>
                      ) : (
                        <p className="text-[10px] text-amber-400 font-medium">
                          Cap reached — resets Jan 1
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Referrals list */}
                  <div className="rounded-xl bg-card px-1 py-1">
                    <div className="flex items-center gap-2 px-3 py-2">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-medium text-foreground">
                        Your referrals
                        {data.referrals.length > 0 && (
                          <span className="ml-1.5 rounded-full bg-foreground/8 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            {data.referrals.length}
                          </span>
                        )}
                      </p>
                    </div>

                    {data.referrals.length === 0 ? (
                      <div className="flex flex-col items-center gap-2 py-6 text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5">
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          No referrals yet — share your link to get started
                        </p>
                      </div>
                    ) : (
                      <div className="max-h-48 overflow-y-auto">
                        {data.referrals.map((entry) => (
                          <ReferralRow key={entry.id} entry={entry} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Total earned */}
                  {data.stats.totalRewarded > 0 && (
                    <p className="px-3 pb-1 text-center text-[10px] text-muted-foreground">
                      {data.stats.totalRewarded} free month{data.stats.totalRewarded !== 1 ? "s" : ""} earned all time
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
