"use client";

import { Code2, Globe, Zap, Star, Layers, Cpu } from "lucide-react";
import { OrbitingCircles, OrbitingCircle } from "@/components/motion/orbiting-circles";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm">
      {children}
    </div>
  );
}

export function OrbitingCirclesPreview() {
  return (
    <OrbitingCircles className="h-72 w-72">
      {/* Center */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md">
        Kinetic
      </div>

      {/* Inner orbit — 3 items evenly spread (delay = 0, 5, 10 of duration 15) */}
      <OrbitingCircle radius={58} duration={15} delay={0}>
        <Icon><Zap className="h-4 w-4" /></Icon>
      </OrbitingCircle>
      <OrbitingCircle radius={58} duration={15} delay={5}>
        <Icon><Globe className="h-4 w-4" /></Icon>
      </OrbitingCircle>
      <OrbitingCircle radius={58} duration={15} delay={10}>
        <Icon><Code2 className="h-4 w-4" /></Icon>
      </OrbitingCircle>

      {/* Outer orbit — 3 items going reverse */}
      <OrbitingCircle radius={108} duration={28} delay={0} reverse>
        <Icon><Star className="h-4 w-4" /></Icon>
      </OrbitingCircle>
      <OrbitingCircle radius={108} duration={28} delay={9.3} reverse>
        <Icon><Layers className="h-4 w-4" /></Icon>
      </OrbitingCircle>
      <OrbitingCircle radius={108} duration={28} delay={18.6} reverse>
        <Icon><Cpu className="h-4 w-4" /></Icon>
      </OrbitingCircle>
    </OrbitingCircles>
  );
}
