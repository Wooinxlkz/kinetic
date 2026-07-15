import { PricingSection } from "@/components/templates/pricing-section";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    description: "For personal projects.",
    features: ["Up to 3 projects", "Community support", "Basic analytics"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For growing teams.",
    features: ["Unlimited projects", "Priority support", "Advanced analytics", "Custom domains"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    description: "For large organisations.",
    features: ["Everything in Pro", "SSO", "SLA", "Dedicated support", "Custom contracts"],
    cta: "Contact sales",
  },
];

export function PricingSectionPreview() {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-border">
      <PricingSection plans={PLANS} />
    </div>
  );
}
