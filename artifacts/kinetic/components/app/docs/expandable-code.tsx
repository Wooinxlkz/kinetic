"use client";

import { useState, useRef, useEffect } from "react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUsageQuota } from "@/components/app/membership/usage-quota-provider";

export function ExpandableCode({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState<boolean | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isAtLimit, trackUsage } = useUsageQuota();

  const trackSlug = slug ?? "misc";

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkHeight = () => {
      if (el.scrollHeight > 320) {
        setCanExpand(true);
      } else {
        setCanExpand(false);
      }
    };

    const observer = new ResizeObserver(checkHeight);
    observer.observe(el);
    checkHeight();

    return () => observer.disconnect();
  }, []);

  // When at limit: blur the code and show a lock overlay
  if (isAtLimit) {
    return (
      <div className="relative">
        <div className="pointer-events-none max-h-[320px] select-none overflow-hidden blur-sm">
          {children}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/60 backdrop-blur-[2px]">
          <div className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 shadow-lg ring-1 ring-border">
            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Daily limit reached</span>
          </div>
          <Link
            href="/sponsors"
            className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Upgrade plan →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={cn(
          "transition-[max-height] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          expanded
            ? "max-h-[640px] overflow-auto"
            : canExpand === false
              ? "max-h-none"
              : "max-h-[320px] overflow-hidden",
        )}
      >
        {children}
      </div>
      {!expanded && canExpand && (
        <div className="absolute bottom-0 left-0 right-0 flex h-32 items-end justify-center bg-gradient-to-t from-card to-transparent pb-4">
          <button
            type="button"
            onClick={() => {
              setExpanded(true);
              trackUsage(trackSlug);
            }}
            className="rounded-full bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background border border-border"
          >
            Expand Code
          </button>
        </div>
      )}
    </div>
  );
}
