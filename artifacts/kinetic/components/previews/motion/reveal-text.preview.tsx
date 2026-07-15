"use client";

import { RevealText } from "@/components/motion/reveal-text";

export function RevealTextPreview() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-10 px-8 py-12">
      <RevealText
        as="h1"
        text="Motion that feels alive and intentional."
        delay={0.06}
        className="text-3xl font-bold leading-tight text-foreground"
      />

      <RevealText
        as="h2"
        text="Every interaction is a chance to delight."
        delay={0.05}
        className="text-xl font-semibold text-foreground"
      />

      <RevealText
        as="p"
        text="Scroll-triggered animations bring your content to life word by word, drawing the reader's eye naturally down the page and giving each idea room to breathe."
        delay={0.035}
        className="text-base leading-relaxed text-muted-foreground"
      />
    </div>
  );
}
