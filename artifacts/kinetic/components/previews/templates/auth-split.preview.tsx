"use client";

import { AuthSplit } from "@/components/templates/auth-split";

export function AuthSplitPreview() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl border border-border bg-background">
      <div
        className="absolute inset-0 origin-top-left"
        style={{ transform: "scale(0.6)", width: "166.67%", height: "166.67%" }}
      >
        <AuthSplit />
      </div>
    </div>
  );
}
