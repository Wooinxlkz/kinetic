"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRecentComponents } from "@/lib/hooks/use-recent-components";

// Formats "preview-rail" → "Preview Rail"
function slugToName(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function HistoryTracker() {
  const pathname = usePathname();
  const { push } = useRecentComponents();

  useEffect(() => {
    // Match /components/[category]/[slug]
    const match = pathname.match(/^\/components\/([^/]+)\/([^/]+)/);
    if (!match) return;
    const [, categorySlug, slug] = match;

    push({
      id: slug,
      label: slugToName(slug),
      category: slugToName(categorySlug),
      href: `/components/${categorySlug}/${slug}`,
    });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
