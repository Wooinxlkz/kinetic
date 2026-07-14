import { TESTIMONIALS } from "@/components/app/landing/testimonials-data";
import { TestimonialCard } from "@/components/app/landing/testimonial-card";
import { Marquee } from "@/components/motion/marquee";

const mid = Math.ceil(TESTIMONIALS.length / 2);
const rowOne = TESTIMONIALS.slice(0, mid);
const rowTwo = TESTIMONIALS.slice(mid);

export function Testimonials() {
  return (
    <section className="pb-16">
      <div className="mx-auto mb-8 max-w-7xl border-t border-border px-4 pt-12">
        <p className="font-pixel text-xs font-medium uppercase text-muted-foreground">
          Testimonials
        </p>
        <h2 className="mt-2 font-pixel text-3xl font-medium leading-tight text-foreground md:text-4xl">
          Loved by the people shipping.
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <Marquee direction="left" speed={60} gap="1rem" fade>
          {rowOne.map((item) => (
            <TestimonialCard key={item.id} item={item} compact />
          ))}
        </Marquee>
        <Marquee direction="right" speed={60} gap="1rem" fade>
          {rowTwo.map((item) => (
            <TestimonialCard key={item.id} item={item} compact />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
