import { TestimonialCard } from "@/components/static/testimonial-card";

export function TestimonialCardPreview() {
  return (
    <div className="flex w-full max-w-sm p-6">
      <TestimonialCard
        quote="We shipped our new dashboard in half the time. The components just work."
        name="Amara Okoye"
        role="Engineering Lead, Fenwick"
        rating={5}
      />
    </div>
  );
}
