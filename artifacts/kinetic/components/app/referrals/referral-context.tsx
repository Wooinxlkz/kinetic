"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ReferralContextValue {
  open: boolean;
  openReferrals: () => void;
  closeReferrals: () => void;
}

const ReferralContext = createContext<ReferralContextValue | null>(null);

export function ReferralProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ReferralContext.Provider
      value={{
        open,
        openReferrals: () => setOpen(true),
        closeReferrals: () => setOpen(false),
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferral() {
  const ctx = useContext(ReferralContext);
  if (!ctx) throw new Error("useReferral must be used inside ReferralProvider");
  return ctx;
}
