"use client";

import { Zap, Shield, Globe } from "lucide-react";
import { MagicCard } from "@/components/motion/magic-card";

const cards = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized rendering with zero unnecessary re-renders.",
  },
  {
    icon: Shield,
    title: "Accessible",
    desc: "ARIA-compliant, keyboard navigable, reduced-motion safe.",
  },
  {
    icon: Globe,
    title: "Framework Ready",
    desc: "Drop into any React or Next.js project via shadcn CLI.",
  },
];

export function MagicCardPreview() {
  return (
    <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3">
      {cards.map(({ icon: Icon, title, desc }) => (
        <MagicCard key={title} className="p-5">
          <Icon className="mb-3 h-5 w-5 text-primary" />
          <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </MagicCard>
      ))}
    </div>
  );
}
