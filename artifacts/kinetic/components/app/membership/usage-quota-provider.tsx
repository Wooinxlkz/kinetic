"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/app/auth/auth-provider";

/** Limits for signed-in users by plan. `null` = unlimited. */
const SIGNED_IN_LIMITS: Record<string, number | null | undefined> = {
  free: 10,
  pro: 25,
  sponsor: 100,
  lifetime: null,
  admin: null,
};

/** Anon (signed-out) visitors always get the lowest tier. */
const ANON_LIMIT = 4;

function resolveLimit(isAuthenticated: boolean, plan: string): number | null {
  if (!isAuthenticated) return ANON_LIMIT;
  if (!(plan in SIGNED_IN_LIMITS)) return 10; // safe fallback for unknown plans
  return SIGNED_IN_LIMITS[plan] ?? null;
}

interface UsageQuotaContextType {
  count: number;
  limit: number | null;
  isAtLimit: boolean;
  /** Call when the user copies or expands a component. Pass the component slug.
   *  De-duplicates: the same slug only counts once per day (server enforces this). */
  trackUsage: (slug: string) => void;
}

const UsageQuotaContext = createContext<UsageQuotaContextType>({
  count: 0,
  limit: 4,
  isAtLimit: false,
  trackUsage: () => {},
});

export function useUsageQuota() {
  return useContext(UsageQuotaContext);
}

export function UsageQuotaProvider({ children }: { children: React.ReactNode }) {
  const { status, user } = useAuth();
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  const isAuthenticated = status === "authenticated";
  const plan = isAuthenticated ? (user?.plan ?? "free") : "free";
  const limit = resolveLimit(isAuthenticated, plan);
  const isAtLimit = limit !== null && count >= limit;

  // Fetch today's count on mount and when auth status changes
  useEffect(() => {
    if (status === "loading") return;
    fetch("/copy-track", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setCount(typeof d.count === "number" ? d.count : 0);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [status]);

  const trackUsage = useCallback((slug: string) => {
    fetch("/copy-track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((d) => {
        // Only increment if the server actually counted it (new slug for today)
        if (d.counted === true) {
          setCount((c) => c + 1);
        }
      })
      .catch(() => {});
  }, []);

  const value: UsageQuotaContextType = {
    count,
    limit,
    isAtLimit: ready && isAtLimit,
    trackUsage,
  };

  return (
    <UsageQuotaContext.Provider value={value}>
      {children}
    </UsageQuotaContext.Provider>
  );
}
