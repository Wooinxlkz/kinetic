"use client";

import { useEffect, useState } from "react";

export type ReferralStatus = "pending" | "subscribed" | "rewarded";

export interface ReferralEntry {
  id: number;
  status: ReferralStatus;
  createdAt: string;
  subscribedAt: string | null;
  rewardedAt: string | null;
}

export interface ReferralStats {
  rewardedThisYear: number;
  totalRewarded: number;
  maxPerYear: number;
}

export interface ReferralData {
  code: string;
  stats: ReferralStats;
  referrals: ReferralEntry[];
}

interface UseReferralDataResult {
  data: ReferralData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useReferralData(enabled: boolean): UseReferralDataResult {
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch("/api/referrals/me", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error((body as { error?: string }).error ?? "Failed to load referrals");
        }
        return res.json() as Promise<ReferralData>;
      })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, tick]);

  return { data, loading, error, refetch: () => setTick((t) => t + 1) };
}

/** Register a referral code for the current (newly signed-in) user. */
export async function registerReferralCode(code: string): Promise<void> {
  const res = await fetch("/api/referrals/register", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? "Failed to register referral");
  }
}
