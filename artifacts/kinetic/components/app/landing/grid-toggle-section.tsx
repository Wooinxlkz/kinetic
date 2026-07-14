"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LandingComponentCard, type CardVariant } from "./landing-component-card";
import type { ComponentEntry } from "@/lib/registry";

type GridMode = "normal" | "bento";

const STORAGE_KEY = "kinetic-grid-mode";

const NORMAL_GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4";
const BENTO_GRID  = "grid grid-cols-1 gap-4 [grid-auto-rows:17rem] sm:grid-cols-2 sm:grid-flow-dense md:grid-cols-3 xl:grid-cols-4";

// Repeating pattern of tile shapes, mirroring a hand-arranged bento layout
// (a big square, a couple of wide tiles, some tall ones, small squares to
// fill gaps). Deterministic — driven by `index`, not `Math.random()` — so
// server-rendered HTML always matches what the client hydrates, avoiding
// hydration-mismatch flicker/errors.
const BENTO_PATTERN: CardVariant[] = [
  "large",
  "wide",
  "tall",
  "small",
  "tall",
  "wide",
  "small",
  "default",
];

// Widest breakpoint has 4 columns. Any spanning tile (wide/tall/large)
// placed among the last few items can be left dangling with nothing after
// it to fill the gap `grid-flow-dense` would otherwise close — that's what
// caused an isolated tile with empty space around it. Keeping the tail of
// the list as single-cell "default" tiles guarantees the last row always
// packs flush with no leftover empty space.
const TAIL_SAFE_ZONE = 4;

function bentoVariant(index: number, total: number): CardVariant {
  // Keep the very first tile "large" as a hero feature, same as before, as
  // long as there's enough items to fill around it.
  if (index === 0 && total >= 3) return "large";
  if (total - index <= TAIL_SAFE_ZONE) return "default";
  return BENTO_PATTERN[index % BENTO_PATTERN.length];
}

// ─── Toggle button ────────────────────────────────────────────────────────────

function GridToggle({
  mode,
  onChange,
}: {
  mode: GridMode;
  onChange: (m: GridMode) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-card p-0.5">
      <button
        type="button"
        onClick={() => onChange("normal")}
        aria-label="Normal grid"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
          mode === "normal"
            ? "bg-foreground/10 text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {/* 4 equal squares */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onChange("bento")}
        aria-label="Bento grid"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
          mode === "bento"
            ? "bg-foreground/10 text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {/* large tile + 2 small */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="8" height="8" rx="1" fill="currentColor" />
          <rect x="10" y="1" width="3" height="3.5" rx="0.75" fill="currentColor" />
          <rect x="10" y="5.5" width="3" height="3.5" rx="0.75" fill="currentColor" />
          <rect x="1" y="10" width="12" height="3" rx="1" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

// ─── GridToggleSection ────────────────────────────────────────────────────────

export function GridToggleSection({
  items,
}: {
  items: { category: string; component: ComponentEntry }[];
}) {
  const [mode, setMode] = useState<GridMode>("normal");
  const [mounted, setMounted] = useState(false);

  // Read preference from localStorage after mount (avoid SSR mismatch)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as GridMode | null;
    if (stored === "bento" || stored === "normal") setMode(stored);
    setMounted(true);
  }, []);

  function handleChange(m: GridMode) {
    setMode(m);
    localStorage.setItem(STORAGE_KEY, m);
  }

  const bento = mode === "bento";

  return (
    <>
      {/* Toggle — rendered inline so the parent can place it in a header */}
      <div className="flex justify-end pb-4">
        {mounted && <GridToggle mode={mode} onChange={handleChange} />}
      </div>

      <div className={bento ? BENTO_GRID : NORMAL_GRID}>
        {items.map(({ category, component }, i) => (
          <LandingComponentCard
            key={`${category}-${component.slug}`}
            component={component}
            category={category}
            variant={bento ? bentoVariant(i, items.length) : "default"}
          />
        ))}
      </div>
    </>
  );
}
