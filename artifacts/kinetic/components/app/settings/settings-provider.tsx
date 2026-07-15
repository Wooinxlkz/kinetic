"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SettingsContextValue {
  open: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const debugOpen = typeof window !== "undefined" && window.location.search.includes("debugSettingsOpen");
  const [open, setOpen] = useState(debugOpen);
  return (
    <SettingsContext.Provider
      value={{
        open,
        openSettings: () => setOpen(true),
        closeSettings: () => setOpen(false),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
