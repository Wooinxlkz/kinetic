"use client";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

export function MagneticButtonPreview() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center gap-10 p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Hover slowly over each button
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <MagneticButton variant="primary" size="lg">
          <Sparkles className="h-4 w-4" />
          Get started
        </MagneticButton>

        <MagneticButton variant="glow" size="lg">
          <Zap className="h-4 w-4" />
          Upgrade
        </MagneticButton>

        <MagneticButton variant="outline" size="md">
          Learn more
          <ArrowRight className="h-4 w-4" />
        </MagneticButton>

        <MagneticButton variant="ghost" size="md">
          Sign in
        </MagneticButton>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <MagneticButton variant="primary" size="sm">Small</MagneticButton>
        <MagneticButton variant="outline" size="sm">Outline sm</MagneticButton>
        <MagneticButton variant="primary" strength={0.65} size="md">
          High pull
        </MagneticButton>
      </div>
    </div>
  );
}
