"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Clock,
  TrendingUp,
  LayoutGrid,
  Code2,
  Boxes,
  Puzzle,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { CommunityComponentDTO } from "@/lib/community/types";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest", icon: Clock },
  { value: "popular", label: "Popular", icon: TrendingUp },
];

const CATEGORY_OPTIONS = [
  { value: "all",       label: "All",        icon: LayoutGrid },
  { value: "component", label: "Components", icon: Code2      },
  { value: "block",     label: "Blocks",     icon: Boxes      },
  { value: "pattern",   label: "Patterns",   icon: Puzzle     },
];

function CommunitySidebarInner({ items }: { items: CommunityComponentDTO[] }) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "all";
  const sort     = searchParams.get("sort")     ?? "newest";
  const tag      = searchParams.get("tag")      ?? null;
  const query    = searchParams.get("q")        ?? "";

  // Which category rows are expanded (start with the active one open)
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => ({
    [category]: true,
  }));

  // Count items per category
  const counts: Record<string, number> = { all: items.length };
  for (const item of items) {
    counts[item.category] = (counts[item.category] ?? 0) + 1;
  }

  // Tags per category, sorted by frequency
  function tagsForCategory(cat: string) {
    const tc: Record<string, number> = {};
    for (const item of items) {
      if (cat === "all" || item.category === cat) {
        for (const t of item.tags) {
          tc[t] = (tc[t] ?? 0) + 1;
        }
      }
    }
    return Object.entries(tc).sort((a, b) => b[1] - a[1]);
  }

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key);
      else params.set(key, value);
    }
    router.replace(`/discover?${params.toString()}`, { scroll: false });
  }

  function toggleExpand(cat: string) {
    setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }

  function selectCategory(cat: string) {
    const isAll = cat === "all";
    updateParams({ category: isAll ? null : cat, tag: null });
    // Auto-expand on selection
    setExpanded((prev) => ({ ...prev, [cat]: true }));
  }

  function selectTag(cat: string, t: string) {
    // Activate the category + tag
    const isAll = cat === "all";
    updateParams({ category: isAll ? null : cat, tag: tag === t ? null : t });
  }

  return (
    <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-4 scrollbar-hide">
      {/* Search */}
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => updateParams({ q: e.target.value || null })}
          placeholder="Search community…"
          className="h-8 w-full rounded-md border border-border bg-card/60 pl-8 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 transition-colors focus:border-foreground/20"
        />
      </div>

      {/* Sort */}
      <NavSection label="Sort">
        {SORT_OPTIONS.map(({ value, label, icon: Icon }) => {
          const active = sort === value;
          return (
            <SidebarItem
              key={value}
              active={active}
              layoutId="community-sort-indicator"
              icon={<Icon className={cn("h-3.5 w-3.5 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />}
              onClick={() => updateParams({ sort: value })}
            >
              {label}
            </SidebarItem>
          );
        })}
      </NavSection>

      {/* Browse (categories as accordion) */}
      <NavSection label="Browse">
        {CATEGORY_OPTIONS.map(({ value, label, icon: Icon }) => {
          const isCatActive = category === value;
          const count       = counts[value] ?? 0;
          const tags        = tagsForCategory(value);
          const isOpen      = !!expanded[value];
          const hasTags     = tags.length > 0;

          return (
            <div key={value}>
              {/* Category row */}
              <div
                className={cn(
                  "group relative flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors duration-100",
                  isCatActive ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isCatActive && (
                  <motion.span
                    layoutId="community-cat-indicator"
                    className="absolute inset-0 rounded-md bg-primary/10"
                    transition={{ type: "spring", bounce: 0.12, duration: 0.32 }}
                  />
                )}

                {/* Chevron — always shown, rotates when open */}
                <button
                  type="button"
                  aria-label={isOpen ? "Collapse" : "Expand"}
                  onClick={(e) => { e.stopPropagation(); toggleExpand(value); }}
                  className="relative -ml-0.5 shrink-0"
                >
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isOpen ? "rotate-90" : "rotate-0",
                      isCatActive ? "text-primary/60" : "text-muted-foreground/40 group-hover:text-muted-foreground",
                    )}
                  />
                </button>

                {/* Label — click to select category */}
                <button
                  type="button"
                  onClick={() => selectCategory(value)}
                  className="relative flex flex-1 items-center gap-2.5 text-left"
                >
                  <Icon className={cn("h-3.5 w-3.5 shrink-0", isCatActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                  <span className="flex-1">{label}</span>
                  <span className={cn("text-xs tabular-nums", isCatActive ? "text-primary/70" : "text-muted-foreground/50")}>{count}</span>
                </button>
              </div>

              {/* Tag sub-items */}
              <AnimatePresence initial={false}>
                {isOpen && hasTags && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    {tags.map(([t, cnt]) => {
                      const active = isCatActive && tag === t;
                      return (
                        <li key={t}>
                          <button
                            type="button"
                            onClick={() => selectTag(value, t)}
                            className={cn(
                              "group relative flex w-full items-center gap-2 rounded-md py-1.5 pl-9 pr-3 text-sm transition-colors duration-100",
                              active ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {active && (
                              <motion.span
                                layoutId="community-tag-indicator"
                                className="absolute inset-0 rounded-md bg-primary/8"
                                transition={{ type: "spring", bounce: 0.12, duration: 0.32 }}
                              />
                            )}
                            <span className="relative flex-1 capitalize text-left">{t}</span>
                            <span className={cn("relative text-xs tabular-nums", active ? "text-primary/70" : "text-muted-foreground/50")}>{cnt}</span>
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </NavSection>
    </div>
  );
}

// ── small helpers ─────────────────────────────────────────────────────────────

function NavSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function SidebarItem({
  active,
  layoutId,
  icon,
  badge,
  onClick,
  children,
}: {
  active: boolean;
  layoutId: string;
  icon?: React.ReactNode;
  badge?: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors duration-100",
        active ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-md bg-primary/10"
          transition={{ type: "spring", bounce: 0.12, duration: 0.32 }}
        />
      )}
      {icon && <span className="relative">{icon}</span>}
      <span className="relative flex-1 text-left">{children}</span>
      {badge !== undefined && (
        <span className={cn("relative text-xs tabular-nums", active ? "text-primary/70" : "text-muted-foreground/50")}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ── public export ─────────────────────────────────────────────────────────────

export function CommunitySidebar({ items }: { items: CommunityComponentDTO[] }) {
  return (
    <aside className="hidden w-52 shrink-0 md:block">
      <Suspense fallback={<div className="py-8" />}>
        <CommunitySidebarInner items={items} />
      </Suspense>
    </aside>
  );
}
