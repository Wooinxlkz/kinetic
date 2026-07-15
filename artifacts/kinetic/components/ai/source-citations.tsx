"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPRING_PANEL, SPRING_LAYOUT } from "@/lib/ease";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export interface CitationSource {
  title: string;
  url: string;
  snippet?: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* ------------------------------------------------------------------ */
/* CitationBadge                                                        */
/* ------------------------------------------------------------------ */

export interface CitationBadgeProps {
  index: number;
  source: CitationSource;
  className?: string;
}

export function CitationBadge({ index, source, className }: CitationBadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  const domain = extractDomain(source.url);

  return (
    <span ref={ref} className={cn("relative inline-block align-super", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-4 min-w-4 items-center justify-center rounded px-1 text-[10px] font-semibold leading-none transition-colors",
          open
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
        )}
      >
        {index}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="popover"
            initial={{ opacity: 0, scale: 0.92, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 4 }}
            transition={SPRING_PANEL}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-xl border border-border bg-card p-3 shadow-lg"
            style={{ transformOrigin: "bottom center" }}
          >
            {/* Domain row */}
            <div className="mb-1.5 flex items-center gap-1.5">
              <Globe className="size-3 shrink-0 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">{domain}</span>
            </div>

            {/* Title */}
            <p className="mb-1 text-xs font-semibold leading-snug text-foreground line-clamp-2">
              {source.title}
            </p>

            {/* URL */}
            <p className="mb-2 truncate font-mono text-[10px] text-muted-foreground/70">
              {source.url}
            </p>

            {/* Snippet */}
            {source.snippet && (
              <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-3">
                {source.snippet}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* CitationList                                                         */
/* ------------------------------------------------------------------ */

export interface CitationListProps {
  sources: CitationSource[];
  className?: string;
}

export function CitationList({ sources, className }: CitationListProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
        Sources
      </p>
      {sources.map((source, i) => {
        const domain = extractDomain(source.url);
        return (
          <motion.a
            key={source.url + i}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_LAYOUT, delay: i * 0.05 }}
            className="group flex items-start gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5 transition-colors hover:bg-foreground/[0.03]"
          >
            {/* Number badge */}
            <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-semibold text-muted-foreground">
              {i + 1}
            </span>

            {/* Text */}
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs font-medium text-foreground">
                {source.title}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Globe className="size-2.5 shrink-0" />
                {domain}
              </span>
            </span>

            {/* External link */}
            <ExternalLink className="mt-px size-3 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
          </motion.a>
        );
      })}
    </div>
  );
}
