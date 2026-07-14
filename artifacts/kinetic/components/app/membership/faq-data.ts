export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    q: "Is Kinetic UI really free?",
    a: "Yes — all components are open-source under the MIT license. The Free tier is permanent, not a trial.",
  },
  {
    q: "How does the yearly discount work?",
    a: "Switching to yearly billing gives you 22% off. You're charged once a year instead of monthly, and the per-month rate drops accordingly.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel from GitHub Sponsors at any time. Monthly plans stop at end of the billing cycle; yearly plans are non-refundable but you keep Pro access until expiry.",
  },
  {
    q: "What counts as a team seat?",
    a: "A seat is one GitHub account that gets Pro-level perks. The Sponsor plan includes 3. Need more? Reach out and we'll sort it.",
  },
  {
    q: "Do you offer refunds?",
    a: "Monthly plans: yes, within 7 days of first payment. Yearly plans: reach out within 14 days and we'll handle it case-by-case.",
  },
  {
    q: "Where does the money go?",
    a: "100% funds active development — new components, docs, tooling, and keeping everything free for the community.",
  },
];
