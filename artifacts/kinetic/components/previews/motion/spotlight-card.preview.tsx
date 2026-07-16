"use client";

import { HolographicCard } from "@/components/motion/spotlight-card";
import { Zap, Shield, Globe } from "lucide-react";

const CARDS = [
  {
    icon: Zap,
    title: "Blazing fast",
    description: "Sub-100ms response times globally. Optimised for the edge from day one.",
    accent: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: Shield,
    title: "Secure by default",
    description: "End-to-end encryption and SOC 2 Type II compliance out of the box.",
    accent: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Globe,
    title: "Global reach",
    description: "Deploy to 30+ regions with automatic failover and geo-routing.",
    accent: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

export function SpotlightCardPreview() {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-4 p-8 sm:grid-cols-3">
      {CARDS.map(({ icon: Icon, title, description, accent, bg }) => (
        <HolographicCard key={title}>
          <div className="p-6">
            <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
              <Icon className={`h-5 w-5 ${accent}`} />
            </div>
            <h3 className="mb-1.5 text-sm font-semibold text-foreground">{title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </HolographicCard>
      ))}
    </div>
  );
}
