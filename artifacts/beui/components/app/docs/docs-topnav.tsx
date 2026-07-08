"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/** Getting Started is the catch-all: every /docs path that isn't Motion or AI. */
function getSection(p: string) {
  if (p.startsWith("/docs/motion")) return "motion";
  if (p.startsWith("/docs/ai-agents")) return "ai";
  return "getting-started";
}

const SECTIONS = [
  { id: "getting-started", label: "Getting Started", href: "/docs" },
  { id: "motion",          label: "Motion",          href: "/docs/motion-patterns" },
  { id: "ai",              label: "AI Agents",        href: "/docs/ai-agents" },
] as const;

export function DocsTopNav() {
  const pathname = usePathname();
  const active   = getSection(pathname);

  return (
    <div className="sticky top-14 z-30 border-b border-border bg-background/90 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-10 items-center gap-0">
          {SECTIONS.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className={cn(
                "relative flex h-full items-center px-4 text-sm transition-colors",
                active === s.id
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
              {active === s.id && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
