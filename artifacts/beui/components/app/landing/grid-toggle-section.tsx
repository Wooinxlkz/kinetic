"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LandingComponentCard, type CardVariant } from "./landing-component-card";
import type { ComponentEntry } from "@/lib/registry";

type GridMode = "normal" | "bento";

const STORAGE_KEY = "beui-grid-mode";

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
// the list as single-cell "default" tiles guarantees the last full rows
// pack flush with no leftover empty space.
const COLS = 4;
const TAIL_SAFE_ZONE = 2 * COLS;

// If the list doesn't divide evenly into full rows of `COLS`, the trailing
// row would otherwise have 1-3 lonely single-cell tiles with empty space
// next to them. Grow tiles in that final partial row to close the gap
// instead of leaving it blank. Uses "full" (spans every column, at any
// breakpoint) for a single lonely trailing item so it never leaves a gap
// no matter how many columns the current screen size has.
function lastRowFillVariant(index: number, total: number): CardVariant | null {
  const remainder = total % COLS;
  if (remainder === 0) return null;
  const fromEnd = total - index; // 1 = last item, 2 = second-to-last, ...
  if (remainder === 1 && fromEnd === 1) return "full";
  if (remainder === 2 && fromEnd === 1) return "wide";
  if (remainder === 3 && fromEnd === 2) return "wide";
  return null;
}

function bentoVariant(index: number, total: number): CardVariant {
  // Keep the very first tile "large" as a hero feature, same as before, as
  // long as there's enough items to fill around it.
  if (index === 0 && total >= 3) return "large";

  if (total - index <= TAIL_SAFE_ZONE) {
    return lastRowFillVariant(index, total) ?? "default";
  }

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
  eyebrow,
  title,
  browseHref,
  browseLabel,
}: {
  items: { category: string; component: ComponentEntry }[];
  /** Small uppercase label shown above the title (e.g. "New"). */
  eyebrow?: string;
  /** Section heading, e.g. "Motion primitives." */
  title?: string;
  /** Optional "Browse all" style link shown next to the title. */
  browseHref?: string;
  browseLabel?: ReactNode;
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

  const toggle = mounted ? <GridToggle mode={mode} onChange={handleChange} /> : null;

  return (
    <>
      {title ? (
        <div className="mb-2 flex flex-col gap-4 border-t border-border pt-12 md:flex-row md:items-center md:justify-between">
          <div>
            {eyebrow ? (
              <p className="font-pixel text-xs font-medium uppercase text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-2 font-pixel text-3xl font-medium leading-tight text-foreground md:text-4xl">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-4 self-start md:self-center">
            {browseHref ? (
              <Link
                href={browseHref}
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {browseLabel}
              </Link>
            ) : null}
            {toggle}
          </div>
        </div>
      ) : (
        // Fallback for any usage without a title: keep toggle on its own row.
        <div className="flex justify-end pb-4">{toggle}</div>
      )}

      <div className={bento ? BENTO_GRID : NORMAL_GRID}>
        {items.map(({ category, component }, i) => (
          <LandingComponentCard
            key={`${category}-${component.slug}`}
            component={component}
            category={category}
            variant={
              bento
                ? bentoVariant(i, items.length)
                : lastRowFillVariant(i, items.length) ?? "default"
            }
          />
        ))}
      </div>
    </>
  );
}
