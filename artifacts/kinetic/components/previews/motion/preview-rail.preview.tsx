"use client";

import { PreviewRail, type PreviewRailItem } from "@/components/motion/preview-rail";

const ITEMS: PreviewRailItem[] = [
  {
    id: "overview",
    label: "Overview",
    description:
      "Bird's-eye status, blockers, and recent activity in one place.",
    href: "#overview",
  },
  {
    id: "components",
    label: "Components",
    description: "Browse and preview every motion primitive with live demos.",
    href: "#components",
  },
  {
    id: "tokens",
    label: "Tokens",
    description:
      "Color, spacing, radius, and animation easing design tokens.",
    href: "#tokens",
  },
  {
    id: "playground",
    label: "Playground",
    description:
      "Tune spring physics and keyframes interactively in real time.",
    href: "#playground",
  },
  {
    id: "docs",
    label: "Docs",
    description:
      "Installation guides, API references, and usage examples.",
    href: "#docs",
  },
];

export function PreviewRailPreview() {
  return (
    <div className="flex h-80 w-full items-center justify-center px-8">
      <PreviewRail items={ITEMS} className="max-w-md" />
    </div>
  );
}
