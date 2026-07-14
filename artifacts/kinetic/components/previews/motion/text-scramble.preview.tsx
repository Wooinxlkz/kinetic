"use client";

import { TextScramble } from "@/components/motion/text-scramble";

const LINES = [
  "Hello, world.",
  "Initializing system...",
  "Access granted.",
];

export function TextScramblePreview() {
  return (
    <div className="flex w-full flex-col items-center gap-10 py-10">
      {/* Mount trigger — scrambles in on load */}
      <div className="space-y-1 text-center">
        <p className="text-xs text-muted-foreground">Mount — scrambles once on load</p>
        {LINES.map((line, i) => (
          <TextScramble
            key={line}
            text={line}
            trigger="mount"
            delay={i * 180}
            duration={700}
            className="block text-xl font-semibold text-foreground"
          />
        ))}
      </div>

      {/* Hover trigger */}
      <div className="space-y-3 text-center">
        <p className="text-xs text-muted-foreground">Hover to scramble</p>
        <div className="inline-flex cursor-default flex-col gap-2 rounded-xl border border-border bg-card px-8 py-4">
          {["Username", "Password", "Remember me"].map((item) => (
            <TextScramble
              key={item}
              text={item}
              trigger="hover"
              duration={400}
              className="text-sm font-medium text-foreground"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
