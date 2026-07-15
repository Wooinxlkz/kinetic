"use client";

import { FlipCard } from "@/components/motion/flip-card";

export function FlipCardPreview() {
  return (
    <div className="flex flex-wrap gap-6 p-6 items-start justify-center">
      <div className="w-48">
        <p className="mb-2 text-center text-xs text-muted-foreground">Hover</p>
        <FlipCard
          height={160}
          front={
            <div className="text-center">
              <p className="text-2xl">🎴</p>
              <p className="mt-2 text-sm font-medium text-foreground">Front</p>
              <p className="text-xs text-muted-foreground">Hover to flip</p>
            </div>
          }
          back={
            <div className="text-center">
              <p className="text-2xl">✨</p>
              <p className="mt-2 text-sm font-medium text-foreground">Back</p>
              <p className="text-xs text-muted-foreground">Leave to flip back</p>
            </div>
          }
        />
      </div>
      <div className="w-48">
        <p className="mb-2 text-center text-xs text-muted-foreground">Click</p>
        <FlipCard
          height={160}
          trigger="click"
          front={
            <div className="text-center">
              <p className="text-2xl">📦</p>
              <p className="mt-2 text-sm font-medium text-foreground">Front</p>
              <p className="text-xs text-muted-foreground">Click to flip</p>
            </div>
          }
          back={
            <div className="text-center">
              <p className="text-2xl">🎁</p>
              <p className="mt-2 text-sm font-medium text-foreground">Back</p>
              <p className="text-xs text-muted-foreground">Click again</p>
            </div>
          }
        />
      </div>
    </div>
  );
}
