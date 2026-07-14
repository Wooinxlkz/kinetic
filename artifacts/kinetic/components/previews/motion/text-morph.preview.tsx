"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "@/components/motion/text-morph";

const WORDS = ["Design", "Engineer", "Ship", "Iterate", "Improve"];
const STATUS_LABELS = ["Loading\u2026", "Processing\u2026", "Almost there\u2026", "Done!"];

export function TextMorphPreview() {
  const [wordIndex, setWordIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  // Auto-cycle for the status demo
  useEffect(() => {
    const id = setInterval(
      () => setStatusIndex((i) => (i + 1) % STATUS_LABELS.length),
      1400,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 py-4">
      {/* Status / auto-cycling demo */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Auto-cycling</p>
        <TextMorph className="text-lg font-medium text-foreground" aria-live="polite">
          {STATUS_LABELS[statusIndex]!}
        </TextMorph>
      </div>

      {/* Manual / click demo */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Click to morph</p>
        <TextMorph
          as="h2"
          className="text-3xl font-semibold tracking-tight text-foreground"
        >
          {WORDS[wordIndex]!}
        </TextMorph>
        <div className="flex flex-wrap justify-center gap-2">
          {WORDS.map((w, i) => (
            <button
              key={w}
              type="button"
              onClick={() => setWordIndex(i)}
              className={
                i === wordIndex
                  ? "rounded-lg bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
                  : "rounded-lg border border-border px-3 py-1 text-sm text-muted-foreground hover:text-foreground"
              }
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
