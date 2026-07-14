"use client";

import { FlickeringGrid } from "@/components/motion/flickering-grid";

export function FlickeringGridPreview() {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Light variant */}
      <div className="relative h-36 w-full overflow-hidden rounded-xl border border-border bg-white">
        <FlickeringGrid
          className="absolute inset-0"
          color="#000"
          maxOpacity={0.2}
          flickerChance={0.04}
          squareSize={4}
          gridGap={6}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-lg bg-white/80 px-3 py-1 text-sm font-medium text-gray-900 backdrop-blur-sm">
            Light background
          </span>
        </div>
      </div>

      {/* Dark variant */}
      <div className="relative h-36 w-full overflow-hidden rounded-xl border border-border bg-zinc-950">
        <FlickeringGrid
          className="absolute inset-0"
          color="#fff"
          maxOpacity={0.15}
          flickerChance={0.05}
          squareSize={3}
          gridGap={5}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-lg bg-zinc-950/80 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            Dark background
          </span>
        </div>
      </div>
    </div>
  );
}
