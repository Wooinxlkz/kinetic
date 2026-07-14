import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FeatureGridItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  items: FeatureGridItem[];
  /** Number of columns at the desktop breakpoint. */
  columns?: 2 | 3 | 4;
  className?: string;
}

const COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Plain feature grid pattern: icon, title and description tiles in a
 * responsive grid. No motion — a static composed block for marketing pages.
 */
export function FeatureGrid({ items, columns = 3, className }: FeatureGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4", COLS[columns], className)}>
      {items.map((item) => (
        <div
          key={item.title}
          className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
            {item.icon}
          </span>
          <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
