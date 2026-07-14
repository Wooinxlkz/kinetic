"use client";

import { MorphingText } from "@/components/motion/morphing-text";

const ADJECTIVES = ["beautiful", "accessible", "performant", "delightful", "animated"];
const NOUNS = ["interfaces", "components", "products", "experiences", "software"];

export function MorphingTextPreview() {
  return (
    <div className="flex flex-col items-center gap-12 py-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Hero headline</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Build{" "}
          <MorphingText
            texts={ADJECTIVES}
            interval={2400}
            className="text-primary"
          />
          <br />
          <MorphingText
            texts={NOUNS}
            interval={2400}
            className="text-muted-foreground"
          />
        </h2>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Single word</p>
        <MorphingText
          texts={["Fast", "Smart", "Clean", "Bold", "Modern"]}
          interval={1800}
          className="text-5xl font-bold tracking-tight text-foreground"
        />
      </div>
    </div>
  );
}
