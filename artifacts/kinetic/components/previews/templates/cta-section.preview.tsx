import { CtaSection } from "@/components/templates/cta-section";

export function CtaSectionPreview() {
  return (
    <div className="w-full max-w-3xl space-y-6 p-6">
      <div className="overflow-hidden rounded-xl border border-border">
        <CtaSection
          headline="Start building today"
          subheadline="Join thousands of developers already using Kinetic in production."
          primaryAction={
            <button type="button" className="rounded-xl bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
              Get started free
            </button>
          }
          secondaryAction={
            <button type="button" className="rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground">
              View docs
            </button>
          }
          variant="default"
        />
      </div>
      <div className="overflow-hidden rounded-xl border border-border">
        <CtaSection
          headline="Ready to ship?"
          subheadline="Upgrade to Pro for unlimited projects and priority support."
          primaryAction={
            <button type="button" className="rounded-xl bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
              Upgrade now
            </button>
          }
          variant="gradient"
        />
      </div>
    </div>
  );
}
