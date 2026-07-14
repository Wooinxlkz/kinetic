"use client";

import { useState } from "react";
import { Avatar, AvatarGroup } from "@/components/motion/avatar";
import { Button } from "@/components/motion/button";

const TEAM = [
  { fallback: "Alex Kim", src: "https://i.pravatar.cc/150?img=1" },
  { fallback: "Sam Rivera" },
  { fallback: "Jordan Lee", src: "https://i.pravatar.cc/150?img=3" },
  { fallback: "Morgan Chen" },
  { fallback: "Taylor Park", src: "https://i.pravatar.cc/150?img=5" },
  { fallback: "Riley Wu" },
];

const STATUSES = ["online", "away", "busy", "offline"] as const;

export function AvatarPreview() {
  const [broken, setBroken] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-7">
      {/* Sizes */}
      <div className="space-y-2">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">Sizes</span>
        <div className="flex flex-wrap items-end gap-3">
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
            <Avatar key={size} fallback="Alex Kim" size={size} />
          ))}
        </div>
      </div>

      {/* Image vs fallback */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">
            Image / fallback
          </span>
          <Button variant="ghost" size="sm" onClick={() => setBroken((v) => !v)}>
            {broken ? "Restore image" : "Break image"}
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Avatar
            src={broken ? "broken-url" : "https://i.pravatar.cc/150?img=1"}
            fallback="Alex Kim"
            size="lg"
          />
          <div>
            <p className="text-sm font-medium">Alex Kim</p>
            <p className="text-xs text-muted-foreground">
              {broken ? "Showing initials fallback" : "Showing image"}
            </p>
          </div>
        </div>
      </div>

      {/* Status indicators */}
      <div className="space-y-2">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">
          Status indicators
        </span>
        <div className="flex items-center gap-4">
          {STATUSES.map((status) => (
            <div key={status} className="flex flex-col items-center gap-1.5">
              <Avatar fallback={status[0].toUpperCase()} size="md" status={status} />
              <span className="text-xs capitalize text-muted-foreground">{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Avatar group */}
      <div className="space-y-2">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">
          Avatar group
        </span>
        <div className="flex flex-col gap-3">
          <AvatarGroup items={TEAM} size="sm" max={4} />
          <AvatarGroup items={TEAM} size="md" max={5} />
          <AvatarGroup items={TEAM} size="lg" max={3} />
        </div>
      </div>
    </div>
  );
}
