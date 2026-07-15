import { TestimonialsSection } from "@/components/templates/testimonials-section";

const TESTIMONIALS = [
  { quote: "Kinetic saved us weeks of UI work. The components are polished and easy to customise.", author: "Alex Kim", role: "CTO", company: "Layercraft", rating: 5 as const },
  { quote: "Every animation feels intentional. Our product feels dramatically more professional.", author: "Sam Chen", role: "Product Lead", company: "Orbit", rating: 5 as const },
  { quote: "Copy-paste components that actually match our design system. Rare find.", author: "Jordan Rivera", role: "Senior Engineer", company: "Relay", rating: 4 as const },
];

export function TestimonialsSectionPreview() {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-border">
      <TestimonialsSection testimonials={TESTIMONIALS} />
    </div>
  );
}
