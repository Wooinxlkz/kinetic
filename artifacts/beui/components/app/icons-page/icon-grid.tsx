"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X, Tag, ChevronDown } from "lucide-react";
import { IconCard } from "@/components/app/icons-page/icon-card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/motion/popover";
import { Checkbox } from "@/components/motion/checkbox";
import type { IconEntry } from "@/lib/icons-registry";
import { cn } from "@/lib/utils";
import * as StaticIcons from "@/components/icons/static";
import * as AnimatedIcons from "@/components/icons/animated";

type AnyIconComponent = React.ComponentType<{
  size?: number;
  className?: string;
  isPlaying?: boolean;
  isOpen?: boolean;
}>;

const ALL_COMPONENTS = {
  ...StaticIcons,
  ...AnimatedIcons,
} as Record<string, AnyIconComponent>;

interface IconGridProps {
  icons: IconEntry[];
  categoryName: string;
}

function getAllTags(icons: IconEntry[]): string[] {
  const set = new Set<string>();
  for (const icon of icons) {
    for (const tag of icon.tags) set.add(tag);
  }
  return Array.from(set).sort();
}

function matchesQuery(icon: IconEntry, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (icon.name.toLowerCase().includes(q)) return true;
  if (icon.slug.toLowerCase().includes(q)) return true;
  return icon.tags.some((tag) => tag.toLowerCase().includes(q));
}

export function IconGrid({ icons, categoryName }: IconGridProps) {
  const components = ALL_COMPONENTS;
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const tags = useMemo(() => getAllTags(icons), [icons]);

  const filtered = useMemo(
    () =>
      icons.filter(
        (i) =>
          (activeTags.length > 0 ? i.tags.some((t) => activeTags.includes(t)) : true) &&
          matchesQuery(i, query),
      ),
    [icons, activeTags, query],
  );

  const isFiltering = activeTags.length > 0 || query.trim().length > 0;
  const newItems = isFiltering ? [] : filtered.filter((i) => i.badge === "new");
  const rest = isFiltering ? filtered : filtered.filter((i) => i.badge !== "new");

  return (
    <div className="mt-10">
      {/* Search + tag filter */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-[260px] sm:w-auto">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${categoryName.toLowerCase()}…`}
            aria-label={`Search ${categoryName.toLowerCase()}`}
            className="h-8 w-full rounded-full bg-foreground/[0.06] pl-8 pr-8 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-150 focus:bg-foreground/[0.10] sm:w-56"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <TagFilter tags={tags} active={activeTags} onChange={setActiveTags} />
        )}

        <span className="ml-auto text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "icon" : "icons"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTags.join(",")}::${query}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
        >
          {newItems.length > 0 && (
            <section className="mb-10">
              <p className="font-pixel text-xs font-medium uppercase text-muted-foreground">New</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {newItems.map((icon) => {
                  const Comp = components[icon.componentName];
                  if (!Comp) return null;
                  return <IconCard key={icon.slug} entry={icon} IconComponent={Comp} />;
                })}
              </div>
            </section>
          )}

          <section>
            {!isFiltering && (
              <p className="font-pixel text-xs font-medium uppercase text-muted-foreground">
                All {categoryName}
              </p>
            )}
            <div className={cn(
              "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
              !isFiltering && "mt-4",
            )}>
              {rest.map((icon) => {
                const Comp = components[icon.componentName];
                if (!Comp) return null;
                return <IconCard key={icon.slug} entry={icon} IconComponent={Comp} />;
              })}
            </div>

            {filtered.length === 0 && (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No icons match your search.
              </p>
            )}
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Multi-select tag filter — trigger shows selected count + tag icon, popover
 * holds a search-within-tags input and a checkable list, selections render
 * as removable chips next to the trigger. Mirrors the Linear-style filter
 * combobox pattern (search + checkbox multi-select + chip), rebuilt on this
 * app's own Popover/Checkbox primitives instead of shadcn/cmdk.
 */
function TagFilter({
  tags,
  active,
  onChange,
}: {
  tags: string[];
  active: string[];
  onChange: (tags: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [tagQuery, setTagQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // Remember whatever had focus right before the popover opened (the trigger
  // button, in practice) so it can be restored on close — PopoverTrigger
  // doesn't expose its internal ref, so we can't target it directly.
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      inputRef.current?.focus();
    } else {
      setTagQuery("");
      lastFocusedRef.current?.focus();
    }
  }, [open]);

  const visibleTags = useMemo(
    () => tags.filter((t) => t.toLowerCase().includes(tagQuery.trim().toLowerCase())),
    [tags, tagQuery],
  );

  const toggle = (tag: string) => {
    onChange(active.includes(tag) ? active.filter((t) => t !== tag) : [...active, tag]);
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            "flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors duration-150",
            active.length > 0
              ? "bg-foreground text-background"
              : "bg-foreground/[0.06] text-muted-foreground hover:bg-foreground/[0.10] hover:text-foreground",
          )}
        >
          <Tag className="h-3 w-3" />
          {active.length > 0 ? `${active.length} tag${active.length === 1 ? "" : "s"}` : "Tags"}
          <ChevronDown className="h-3 w-3 opacity-70" />
        </PopoverTrigger>
        <PopoverContent width="w-60" className="p-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={tagQuery}
              onChange={(e) => setTagQuery(e.target.value)}
              placeholder="Filter tags…"
              className="h-7 w-full rounded-md bg-foreground/[0.06] pl-7 pr-2 text-xs text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <div className="mt-2 max-h-64 space-y-0.5 overflow-y-auto">
            {visibleTags.length === 0 && (
              <p className="px-2 py-3 text-center text-xs text-muted-foreground">No tags found.</p>
            )}
            {visibleTags.map((tag) => (
              <div
                key={tag}
                className="rounded-md px-2 py-1 hover:bg-foreground/[0.06]"
              >
                <Checkbox
                  checked={active.includes(tag)}
                  onCheckedChange={() => toggle(tag)}
                  label={tag}
                  className="w-full capitalize"
                />
              </div>
            ))}
          </div>
          {active.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="mt-2 w-full rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </PopoverContent>
      </Popover>

      <AnimatePresence mode="popLayout">
        {active.map((tag) => (
          <motion.button
            key={tag}
            type="button"
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.14 }}
            onClick={() => toggle(tag)}
            aria-label={`Remove ${tag} filter`}
            className="flex h-7 items-center gap-1 rounded-full bg-foreground/[0.06] px-2.5 text-xs font-medium capitalize text-muted-foreground transition-colors hover:bg-foreground/[0.10] hover:text-foreground"
          >
            {tag}
            <X className="h-3 w-3" />
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
