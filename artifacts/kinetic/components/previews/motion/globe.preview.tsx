"use client";

import { Globe } from "@/components/motion/globe";

export function GlobePreview() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <Globe size={260} />
      <p className="text-xs text-muted-foreground">Rotate, connect, explore.</p>
    </div>
  );
}
