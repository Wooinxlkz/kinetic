"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function useHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to let the page render fully
    const timer = setTimeout(() => {
      const content = document.getElementById("docs-content");
      if (!content) return;

      const nodes = content.querySelectorAll("h2, h3");
      const list: Heading[] = [];

      nodes.forEach((node) => {
        const text = node.textContent?.trim() ?? "";
        if (!node.id) {
          node.id = slugify(text);
        }
        if (node.id && text) {
          list.push({
            id: node.id,
            text,
            level: Number(node.tagName[1]),
          });
        }
      });

      setHeadings(list);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return headings;
}

export function DocsToc() {
  const headings = useHeadings();
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  // Reset active heading on navigation
  useEffect(() => {
    setActiveId("");
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    // Track all headings currently visible above the midpoint of the viewport.
    // When multiple are visible, pick the last one (= lowest on screen, which
    // matches the "currently reading" mental model when scrolling down).
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Pick the topmost visible heading in document order
        const top = headings.find((h) => visible.has(h.id));
        if (top) setActiveId(top.id);
      },
      {
        // Offset matches the two sticky headers: ~96px top + keep 60% for "above midpoint"
        rootMargin: "-96px 0px -40% 0px",
        threshold: 0,
      },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return <div className="hidden w-52 shrink-0 xl:block" />;
  }

  return (
    <aside className="hidden w-52 shrink-0 xl:block">
      {/* same sticky top as sidebar: 6rem (site header + docs top nav) */}
      <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto py-8 pl-4 scrollbar-hide">
        <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <AlignLeft className="h-3 w-3" />
          On this page
        </div>
        <nav className="flex flex-col gap-1">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) {
                  // Offset for fixed headers (site header + docs top nav = ~96px)
                  const y =
                    el.getBoundingClientRect().top +
                    window.scrollY -
                    104;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
                setActiveId(h.id);
              }}
              className={cn(
                "block py-0.5 text-sm leading-5 transition-colors",
                h.level === 3 ? "pl-3" : "",
                activeId === h.id
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
