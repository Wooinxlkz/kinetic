"use client";

import { AvatarRing } from "@/components/motion/avatar-ring";

const USERS = [
  { fallback: "AK", ring: "story"  as const, label: "Story"  },
  { fallback: "JD", ring: "live"   as const, label: "Live"   },
  { fallback: "MR", ring: "active" as const, label: "Active" },
  { fallback: "TS", ring: "typing" as const, label: "Typing" },
  { fallback: "NL", ring: "none"   as const, label: "None"   },
];

export function AvatarRingPreview() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-10 p-12">
      {USERS.map(({ fallback, ring, label }) => (
        <div key={ring} className="flex flex-col items-center gap-3">
          <AvatarRing fallback={fallback} ring={ring} size="lg" />
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
