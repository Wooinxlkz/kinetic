"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ComponentCard } from "@/components/app/docs/component-card";
import type { ComponentEntry } from "@/lib/registry";
import { cn } from "@/lib/utils";

function getAllTags(components: ComponentEntry[]): string[] {
  const tagSet = new Set<string>();
  for (const comp of components) {
    for (const tag of comp.tags ?? []) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function ComponentFilter({
  categorySlug,
  categoryName,
  components,
}: {
  categorySlug: string;
  categoryName: string;
  components: ComponentEntry[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const tags = useMemo(() => getAllTags(components), [components]);

  const filtered = useMemo(() => {
    if (!activeTag) return components;
    return components.filter((c) => c.tags?.includes(activeTag));
  }, [components, activeTag]);

  const newItems = activeTag ? [] : filtered.filter((c) => c.badge === "new");
  const rest = activeTag ? filtered : filtered.filter((c) => c.badge !== "new");

  return (
    <div className="mt-10">
      {/* Filter pills — only render if tags exist */}
      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-1.5">
          <FilterPill
            label="All"
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          />
          {tags.map((tag) => (
            <FilterPill
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>
      )}

      {/* Grid — fades when active filter changes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag ?? "__all__"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
        >
          {newItems.length > 0 && (
            <section className="mb-10">
              <p className="font-pixel text-xs font-medium uppercase text-muted-foreground">
                New
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {newItems.map((comp) => (
                  <ComponentCard
                    key={comp.slug}
                    categorySlug={categorySlug}
                    slug={comp.slug}
                    name={comp.name}
                    description={comp.description}
                    badge={comp.badge}
                    file={comp.file}
                  />
                ))}
              </div>
            </section>
          )}

          <section>
            {!activeTag && (
              <p className="font-pixel text-xs font-medium uppercase text-muted-foreground">
                All {categoryName}
              </p>
            )}
            <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3", !activeTag && "mt-4")}>
              {rest.map((comp) => (
                <ComponentCard
                  key={comp.slug}
                  categorySlug={categorySlug}
                  slug={comp.slug}
                  name={comp.name}
                  description={comp.description}
                  badge={comp.badge}
                  file={comp.file}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No components match this filter.
              </p>
            )}
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 600, damping: 40 }}
      className={cn(
        "h-7 rounded-full px-3 text-xs font-medium transition-colors duration-150",
        active
          ? "bg-foreground text-background"
          : "bg-foreground/[0.06] text-muted-foreground hover:bg-foreground/[0.10] hover:text-foreground",
      )}
    >
      {label}
    </motion.button>
  );
}
