"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageNavItem {
  /** Must match the `id` attribute on the target heading/section. */
  id: string;
  label: string;
  /** Heading depth for indentation. 1 = top-level, 2 = sub, 3 = sub-sub. */
  depth?: 1 | 2 | 3;
}

export interface PageNavProps {
  items: PageNavItem[];
  /** Optional section title rendered above the list. */
  title?: string;
  /** Additional class applied to the root element. */
  className?: string;
  /**
   * Top offset (px) added to the root-margin so sections register as active
   * slightly before they reach the very top of the viewport.
   */
  offsetPx?: number;
}

// ─── PageNav ──────────────────────────────────────────────────────────────────

/**
 * PageNav — a scroll-spy table of contents. Mount it alongside long-form
 * content; it observes the sections by their IDs and highlights the active one
 * with an animated sliding bar. Works with window scroll (no scroll container
 * prop needed — uses `rootMargin` on an `IntersectionObserver`).
 */
export function PageNav({
  items,
  title = "On this page",
  className,
  offsetPx = 80,
}: PageNavProps) {
  const reduce = useReducedMotion();
  const uid = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  // ── IntersectionObserver scroll spy ─────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || !items.length) return;

    const map = new Map<string, IntersectionObserverEntry>();

    const pick = () => {
      // Prefer the topmost entry that is intersecting
      const visible = [...map.values()].filter((e) => e.isIntersecting);
      if (!visible.length) return;
      visible.sort(
        (a, b) =>
          a.boundingClientRect.top - b.boundingClientRect.top,
      );
      const top = visible[0];
      if (top) setActiveId(top.target.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) map.set(e.target.id, e);
        pick();
      },
      {
        rootMargin: `-${offsetPx}px 0px -40% 0px`,
        threshold: 0,
      },
    );

    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items, offsetPx]);

  const depthPad: Record<number, string> = {
    1: "pl-0",
    2: "pl-3",
    3: "pl-6",
  };

  return (
    <nav aria-label="Page navigation" className={cn("w-full", className)}>
      {title ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
          {title}
        </p>
      ) : null}

      <ul ref={listRef} className="relative flex flex-col gap-0.5">
        {/* Sliding active indicator bar */}
        {items.map((item) => {
          const active = item.id === activeId;
          const depth = item.depth ?? 1;
          return (
            <li key={item.id} className="relative">
              {active && (
                <motion.span
                  layoutId={`${uid}-indicator`}
                  transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                  className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-foreground"
                />
              )}
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveId(item.id);
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
                }}
                className={cn(
                  "block rounded-md py-1 pr-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  depthPad[depth] ?? depthPad[1],
                  "pl-3",
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
