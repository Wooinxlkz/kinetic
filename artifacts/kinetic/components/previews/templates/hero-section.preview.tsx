import { HeroSection } from "@/components/templates/hero-section";

export function HeroSectionPreview() {
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border">
      <HeroSection
        eyebrow="Now in beta"
        headline="Build faster with motion"
        subheadline="A collection of production-ready animated components for React. Copy, paste, and ship."
        primaryAction={
          <button
            type="button"
            className="rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
          >
            Get started
          </button>
        }
        secondaryAction={
          <button
            type="button"
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground"
          >
            View docs
          </button>
        }
      />
    </div>
  );
}
