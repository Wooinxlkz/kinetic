"use client";

import { BorderBeam } from "@/components/motion/border-beam";

export function BorderBeamPreview() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Default */}
      <div className="relative w-72 overflow-hidden rounded-xl border border-border bg-card p-6">
        <BorderBeam />
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Featured</p>
        <h3 className="mt-2 text-lg font-semibold text-foreground">Pro Plan</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything you need to ship beautiful products.
        </p>
        <div className="mt-4 text-2xl font-bold text-foreground">
          $29<span className="text-sm font-normal text-muted-foreground">/mo</span>
        </div>
      </div>

      {/* Custom colors */}
      <div className="flex gap-3">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-card">
          <BorderBeam colorFrom="#ff6b6b" colorTo="transparent" duration={6} />
        </div>
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-card">
          <BorderBeam colorFrom="#4d96ff" colorTo="transparent" duration={8} />
        </div>
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-card">
          <BorderBeam colorFrom="#6bcb77" colorTo="transparent" duration={5} />
        </div>
      </div>
    </div>
  );
}
