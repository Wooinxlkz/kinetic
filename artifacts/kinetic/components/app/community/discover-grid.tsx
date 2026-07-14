"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { CommunityCategory, CommunityComponentDTO } from "@/lib/community/types";
import { CommunityCard } from "./community-card";

type SortMode      = "newest" | "popular";
type CategoryFilter = "all" | CommunityCategory;

function DiscoverGridInner({ items }: { items: CommunityComponentDTO[] }) {
  const searchParams = useSearchParams();

  const category = (searchParams.get("category") ?? "all") as CategoryFilter;
  const sort     = (searchParams.get("sort")     ?? "newest") as SortMode;
  const tag      = searchParams.get("tag");
  const query    = searchParams.get("q") ?? "";

  const filtered = useMemo(() => {
    let list = items;
    if (category !== "all") list = list.filter((i) => i.category === category);
    if (tag)                list = list.filter((i) => i.tags.includes(tag));
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.author.name.toLowerCase().includes(q),
      );
    }
    const sorted = [...list];
    if (sort === "popular")
      sorted.sort((a, b) => b.views - a.views);
    else
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return sorted;
  }, [items, category, tag, query, sort]);

  if (filtered.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-muted-foreground">
        {items.length === 0
          ? "Nothing published yet. Be the first to share your work."
          : "No published work matches this filter."}
      </p>
    );
  }

  return (
    <div>
      <p className="mb-4 text-xs text-muted-foreground">
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <CommunityCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export function DiscoverGrid({ items }: { items: CommunityComponentDTO[] }) {
  return (
    <Suspense fallback={<div className="py-10 text-center text-sm text-muted-foreground">Loading…</div>}>
      <DiscoverGridInner items={items} />
    </Suspense>
  );
}

export { COMMUNITY_CATEGORY_LABELS } from "@/lib/community/types";
