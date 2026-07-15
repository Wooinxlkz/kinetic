import { Zap, Shield, Globe, Code2, Palette, BarChart2 } from "lucide-react";
import { FeaturesSection } from "@/components/templates/features-section";

const FEATURES = [
  { icon: <Zap className="h-5 w-5" />, title: "Blazing fast", description: "Optimised for performance with zero layout shift and minimal bundle impact." },
  { icon: <Shield className="h-5 w-5" />, title: "Accessible by default", description: "Every component ships with proper ARIA labels and keyboard navigation." },
  { icon: <Globe className="h-5 w-5" />, title: "Works everywhere", description: "SSR-safe, edge-compatible, and works with all major React frameworks." },
  { icon: <Code2 className="h-5 w-5" />, title: "Copy and paste", description: "No library lock-in. Own your code — copy what you need." },
  { icon: <Palette className="h-5 w-5" />, title: "Themeable", description: "Driven by CSS variables. Adapts to your design system out of the box." },
  { icon: <BarChart2 className="h-5 w-5" />, title: "Analytics ready", description: "Structured event hooks let you track interactions without wiring up your own observers." },
];

export function FeaturesSectionPreview() {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-border">
      <FeaturesSection
        eyebrow="Features"
        headline="Everything you need"
        subheadline="Production-ready components that just work."
        features={FEATURES}
        cols={3}
      />
    </div>
  );
}
