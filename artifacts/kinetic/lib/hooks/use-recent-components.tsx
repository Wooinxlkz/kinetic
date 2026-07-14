"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "recent-components-v1";
const ENABLED_KEY = "history-dock-enabled";
const MAX_ITEMS = 7;
const MIN_TO_SHOW = 1;

export interface RecentComponentItem {
  id: string;
  label: string;
  category: string;
  href: string;
  visitedAt: number;
}

interface StoredData {
  date: string; // YYYY-MM-DD local time
  items: RecentComponentItem[];
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function readStorage(): RecentComponentItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredData;
    // Reset if the stored day is not today — daily reset, refresh-safe
    if (parsed.date !== todayKey()) return [];
    return parsed.items ?? [];
  } catch {
    return [];
  }
}

function writeStorage(items: RecentComponentItem[]) {
  if (typeof window === "undefined") return;
  try {
    const data: StoredData = { date: todayKey(), items };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage disabled/full — fail silently
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface RecentComponentsContextValue {
  items: RecentComponentItem[];
  /** True once hydrated AND at least MIN_TO_SHOW unique components visited today AND dock is enabled */
  visible: boolean;
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  push: (item: Omit<RecentComponentItem, "visitedAt">) => void;
  clear: () => void;
}

const RecentComponentsContext = createContext<RecentComponentsContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function RecentComponentsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RecentComponentItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [enabled, setEnabledState] = useState(true);

  // Hydrate once from localStorage — survives refresh, resets only daily
  useEffect(() => {
    setItems(readStorage());
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(ENABLED_KEY) : null;
    if (stored === "false") setEnabledState(false);
    setHydrated(true);
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    try { window.localStorage.setItem(ENABLED_KEY, String(v)); } catch { /* ignore */ }
  }, []);

  const push = useCallback((item: Omit<RecentComponentItem, "visitedAt">) => {
    setItems((prev) => {
      const withoutCurrent = prev.filter((i) => i.id !== item.id);
      const next = [{ ...item, visitedAt: Date.now() }, ...withoutCurrent].slice(0, MAX_ITEMS);
      writeStorage(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    writeStorage([]);
  }, []);

  const visible = hydrated && enabled && items.length >= MIN_TO_SHOW;

  return (
    <RecentComponentsContext.Provider value={{ items, visible, enabled, setEnabled, push, clear }}>
      {children}
    </RecentComponentsContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useRecentComponents() {
  const ctx = useContext(RecentComponentsContext);
  if (!ctx) {
    throw new Error("useRecentComponents must be used inside <RecentComponentsProvider>");
  }
  return ctx;
}
