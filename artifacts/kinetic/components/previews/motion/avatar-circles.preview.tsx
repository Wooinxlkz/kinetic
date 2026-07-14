"use client";

import { AvatarCircles } from "@/components/motion/avatar-circles";

const AVATARS = [
  { fallback: "Alice", src: "/avatars/avatar-01.png", alt: "Alice" },
  { fallback: "Bob",   src: "/avatars/avatar-02.png", alt: "Bob" },
  { fallback: "Clara", src: "/avatars/avatar-03.png", alt: "Clara" },
  { fallback: "Dave",  src: "/avatars/avatar-04.png", alt: "Dave" },
  { fallback: "Eve",   src: "/avatars/avatar-05.png", alt: "Eve" },
  { fallback: "Frank", src: "/avatars/avatar-06.png", alt: "Frank" },
  { fallback: "Grace", src: "/avatars/avatar-07.png", alt: "Grace" },
];

export function AvatarCirclesPreview() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <AvatarCircles avatars={AVATARS} max={5} size="lg" />
        <p className="text-xs text-muted-foreground">Large · 5 shown · +2</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarCircles avatars={AVATARS} max={4} size="md" />
        <p className="text-xs text-muted-foreground">Medium · 4 shown · +3</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarCircles avatars={AVATARS} max={3} size="sm" />
        <p className="text-xs text-muted-foreground">Small · 3 shown · +4</p>
      </div>
    </div>
  );
}
