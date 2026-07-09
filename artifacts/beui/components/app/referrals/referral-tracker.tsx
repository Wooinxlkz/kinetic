"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const REFERRAL_CODE_KEY = "kinetic_ref_code";

/** Reads the ?ref= query param from the URL and persists it to localStorage.
 *  Must be wrapped in <Suspense> in the parent because useSearchParams
 *  opts the page into dynamic rendering on the server. */
export function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("ref");
    if (code && code.trim()) {
      // Only save if we don't already have a stored code — first referrer wins.
      const existing = localStorage.getItem(REFERRAL_CODE_KEY);
      if (!existing) {
        localStorage.setItem(REFERRAL_CODE_KEY, code.trim().toLowerCase());
      }
    }
  }, [searchParams]);

  return null;
}
