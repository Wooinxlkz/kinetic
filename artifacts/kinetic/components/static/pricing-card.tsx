import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingCardFeature {
  text: string;
  included?: boolean;
}

export interface PricingCardProps {
  plan: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingCardFeature[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** Highlights the card as the recommended plan. */
  featured?: boolean;
  className?: string;
}

/**
 * Plain pricing card pattern: plan name, price, feature checklist and a CTA.
 * No motion — a static composed block for pricing sections.
 */
export function PricingCard({
  plan,
  price,
  period = "/mo",
  description,
  features,
  ctaLabel = "Get started",
  onCtaClick,
  featured = false,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border p-6",
        featured
          ? "border-accent bg-card shadow-[0_0_0_1px_var(--accent)]"
          : "border-border bg-card",
        className,
      )}
    >
      {featured ? (
        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
          Most popular
        </span>
      ) : null}

      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {plan}
      </h3>

      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-foreground">
          {price}
        </span>
        {period ? (
          <span className="text-sm text-muted-foreground">{period}</span>
        ) : null}
      </div>

      {description ? (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      ) : null}

      <button
        type="button"
        onClick={onCtaClick}
        className={cn(
          "mt-6 inline-flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors",
          featured
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : "bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.1]",
        )}
      >
        {ctaLabel}
      </button>

      <ul className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
        {features.map((feature) => (
          <li
            key={feature.text}
            className={cn(
              "flex items-start gap-2 text-sm",
              feature.included === false
                ? "text-muted-foreground/50 line-through"
                : "text-foreground",
            )}
          >
            <Check
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                feature.included === false ? "text-muted-foreground/40" : "text-accent",
              )}
            />
            {feature.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
