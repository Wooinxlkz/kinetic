"use client";

import { Typewriter } from "@/components/motion/typewriter";

export function TypewriterPreview() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center px-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
          We help you
        </p>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-primary">
            <Typewriter
              words={[
                "build faster",
                "ship smarter",
                "scale easier",
                "move better",
              ]}
            />
          </span>
        </h2>
      </div>
      <p className="text-xs text-muted-foreground max-w-48">
        Cycles through strings with configurable speed, pause, and cursor.
      </p>
    </div>
  );
}
