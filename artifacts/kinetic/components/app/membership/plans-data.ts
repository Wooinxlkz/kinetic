export type BillingCycle = "monthly" | "yearly";

/** Single source of truth for the yearly discount. */
export const YEARLY_DISCOUNT = 0.22;

export interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  /** Price in USD/month on the monthly cycle. null = custom / contact. */
  monthlyPrice: number | null;
  cta: string;
  ctaHref: string;
  /** Optional per-billing-cycle checkout links. When present, these override
   * `ctaHref` depending on the selected billing cycle. */
  ctaHrefByBilling?: Record<BillingCycle, string>;
  ctaVariant: "ghost" | "primary" | "accent";
  featured: boolean;
  features: PlanFeature[];
  /** One-time purchase instead of recurring monthly/yearly billing. */
  oneTime?: boolean;
}

/** Derived helpers — always computed from monthlyPrice + YEARLY_DISCOUNT. */
export function yearlyMonthlyPrice(plan: Plan): number | null {
  if (plan.monthlyPrice === null) return null;
  return Math.round(plan.monthlyPrice * (1 - YEARLY_DISCOUNT));
}

export function yearlyTotal(plan: Plan): number | null {
  const ymp = yearlyMonthlyPrice(plan);
  if (ymp === null) return null;
  return ymp * 12;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Everything open-source, forever.",
    monthlyPrice: 0,
    cta: "Get started",
    ctaHref: "/components/motion",
    ctaVariant: "ghost",
    featured: false,
    features: [
      { text: "10 published components", included: true, highlight: true },
      { text: "All motion components", included: true, highlight: true },
      { text: "Blocks & page templates", included: true },
      { text: "shadcn registry install", included: true },
      { text: "Community support", included: true },
      { text: "Early access to new components", included: false },
      { text: "Download source files", included: false },
      { text: "GIF avatars & banners", included: false },
      { text: "Private Discord channel", included: false },
      { text: "Logo on site & README", included: false },
      { text: "Custom component requests", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Most popular",
    description: "For developers who ship fast and want more.",
    monthlyPrice: 9,
    cta: "Start Pro",
    ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NisoGPJcM5Teg8zGdfT8",
    ctaHrefByBilling: {
      monthly: "https://checkout.dodopayments.com/buy/pdt_0NisoGPJcM5Teg8zGdfT8",
      yearly: "https://checkout.dodopayments.com/buy/pdt_0NisoOelj1LjqeOSXwk6y",
    },
    ctaVariant: "primary",
    featured: true,
    features: [
      { text: "25 published components", included: true, highlight: true },
      { text: "Everything in Free", included: true, highlight: true },
      { text: "Early access to new components", included: true, highlight: true },
      { text: "GIF avatars & banners", included: true },
      { text: "Download source files", included: true },
      { text: "Private Discord channel", included: true },
      { text: "Priority GitHub issues", included: true },
      { text: "Monthly newsletter & updates", included: true },
      { text: "Logo on site & README", included: false },
      { text: "Custom component requests", included: false },
    ],
  },
  {
    id: "sponsor",
    name: "Sponsor",
    description: "For teams and companies that rely on Kinetic UI.",
    monthlyPrice: 29,
    cta: "Become a Sponsor",
    ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NisodeF2cjOsGDoA6AhR",
    ctaHrefByBilling: {
      monthly: "https://checkout.dodopayments.com/buy/pdt_0NisodeF2cjOsGDoA6AhR",
      yearly: "https://checkout.dodopayments.com/buy/pdt_0NisojMMWshe713iX5u4P",
    },
    ctaVariant: "accent",
    featured: false,
    features: [
      { text: "60 published components", included: true, highlight: true },
      { text: "Everything in Pro", included: true, highlight: true },
      { text: "Logo on site & README", included: true, highlight: true },
      { text: "GIF avatars & banners", included: true },
      { text: "Custom component requests", included: true },
      { text: "3 team seats", included: true },
      { text: "48 h priority support", included: true },
      { text: "Commercial invoice & receipt", included: true },
      { text: "Direct Slack / Discord access", included: true },
      { text: "Early architecture feedback", included: true },
    ],
  },
];

/**
 * Lifetime is a one-time purchase, not a recurring plan — rendered as a
 * separate wide banner below the main 3-plan grid, not part of `PLANS`.
 */
export const LIFETIME_PLAN: Plan = {
  id: "lifetime",
  name: "Lifetime",
  badge: "Pay once",
  description: "All Pro features, forever. One payment, no renewals.",
  monthlyPrice: 229,
  oneTime: true,
  cta: "Get Lifetime access",
  ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NitbpqTmtc9SMVC0aPEM",
  ctaVariant: "accent",
  featured: false,
  features: [
    { text: "Unlimited published components", included: true, highlight: true },
    { text: "Everything in Pro", included: true, highlight: true },
    { text: "Unlimited copies, forever", included: true, highlight: true },
    { text: "GIF avatars & banners", included: true },
    { text: "Early access to new components", included: true },
    { text: "Download source files", included: true },
    { text: "Private Discord channel", included: true },
    { text: "Priority GitHub issues", included: true },
    { text: "No subscription, ever", included: true },
  ],
};
