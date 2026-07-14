import { PricingCard } from "@/components/static/pricing-card";

export function PricingCardPreview() {
  return (
    <div className="flex w-full max-w-sm p-6">
      <PricingCard
        plan="Pro"
        price="$19"
        description="For teams shipping product every week."
        featured
        features={[
          { text: "Unlimited projects" },
          { text: "Priority support" },
          { text: "Team roles & permissions" },
          { text: "Custom domains", included: false },
        ]}
      />
    </div>
  );
}
