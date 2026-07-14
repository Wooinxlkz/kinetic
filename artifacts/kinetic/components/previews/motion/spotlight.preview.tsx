"use client";

import { SpotlightCard } from "@/components/motion/spotlight";

const FEATURES = [
  {
    icon: "⚡",
    title: "Instant performance",
    body: "60 fps animations backed by the Web Animations API.",
  },
  {
    icon: "🎨",
    title: "Theme-aware",
    body: "Reads your design tokens automatically. Zero config.",
  },
  {
    icon: "♿",
    title: "Accessible",
    body: "Reduced-motion respected. Keyboard & screen-reader safe.",
  },
  {
    icon: "📦",
    title: "Copy & paste",
    body: "No build step. Drop the file in and ship.",
  },
];

export function SpotlightPreview() {
  return (
    <div className="grid grid-cols-2 gap-3 p-5">
      {FEATURES.map((f) => (
        <SpotlightCard key={f.title}>
          <div className="flex flex-col gap-2 p-5">
            <span className="text-2xl">{f.icon}</span>
            <p className="text-sm font-semibold leading-snug">{f.title}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{f.body}</p>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}
