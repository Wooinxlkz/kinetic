import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentEntry } from "@/lib/registry";
import { NewBadge } from "@/components/app/docs/new-badge";
import { LazyPreview } from "@/components/app/landing/lazy-preview";

export type CardVariant = "default" | "feature" | "wide" | "tall" | "large" | "small";

const VARIANT_SPAN: Record<CardVariant, string> = {
  default: "",
  feature: "sm:col-span-2 sm:row-span-2",
  // Bento-mode variants — combined with `grid-auto-flow: dense` on the
  // parent grid so tiles pack tightly without leaving gaps.
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  large: "sm:col-span-2 sm:row-span-2",
  small: "",
};

// Variants that occupy more than a single grid cell need the card to fill
// that cell (h-full) instead of the fixed single-cell height used elsewhere.
const SPANNING_VARIANTS: ReadonlySet<CardVariant> = new Set(["feature", "wide", "tall", "large"]);

export function LandingComponentCard({
  component,
  category = "motion",
  variant = "default",
}: {
  component: ComponentEntry;
  category?: string;
  variant?: CardVariant;
}) {
  const spanning = SPANNING_VARIANTS.has(variant);
  return (
    <article
      className={cn(
        "group/card relative",
        spanning ? "h-full" : "h-64",
        VARIANT_SPAN[variant],
      )}
      style={
        spanning
          ? undefined
          : { contentVisibility: "auto", containIntrinsicBlockSize: "16rem" }
      }
    >
      <Link
        href={`/components/${category}/${component.slug}`}
        aria-label={`View ${component.name}`}
        className="absolute inset-0 z-20 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] contain-[paint] group-hover/card:border-foreground/20">
        <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3">
          <h3 className="truncate font-pixel text-base font-medium text-foreground">
            {component.name}
          </h3>
          {component.badge === "new" ? <NewBadge /> : null}
        </div>

        <div className="relative mx-2 mb-2 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-3xl bg-background px-5 py-5 contain-[paint]">
          <LazyPreview category={category} slug={component.slug} />

          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-transparent backdrop-blur-0 transition-[background-color,backdrop-filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:bg-card/55 group-hover/card:backdrop-blur-md group-focus-within/card:bg-card/55 group-focus-within/card:backdrop-blur-md">
            <div className="absolute inset-x-0 bottom-0 translate-y-full px-4 py-3 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:translate-y-0 group-focus-within/card:translate-y-0">
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {component.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
