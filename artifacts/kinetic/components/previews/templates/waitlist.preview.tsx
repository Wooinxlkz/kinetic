"use client";

import { Waitlist } from "@/components/templates/waitlist";

export function WaitlistPreview() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl border border-border bg-background">
      <div
        className="absolute inset-0 origin-top-left"
        style={{ transform: "scale(0.6)", width: "166.67%", height: "166.67%" }}
      >
        <Waitlist />
      </div>
    </div>
  );
}
