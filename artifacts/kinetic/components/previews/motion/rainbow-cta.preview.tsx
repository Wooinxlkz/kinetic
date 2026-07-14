"use client";

import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { RainbowCta } from "@/components/motion/rainbow-cta";

export function RainbowCtaPreview() {
  return (
    <div className="flex min-h-56 w-full flex-col items-center justify-center gap-6 px-8 py-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <RainbowCta href="#">
          <Sparkles className="h-4 w-4" />
          Get started free
        </RainbowCta>

        <RainbowCta href="#" shape="pill">
          <Zap className="h-4 w-4" />
          Upgrade to Pro
        </RainbowCta>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <RainbowCta href="#" innerClassName="px-5 py-2.5 text-base">
          Start building
          <ArrowRight className="h-4 w-4" />
        </RainbowCta>

        <RainbowCta href="#" shape="pill" innerClassName="px-5 py-2.5 text-base">
          Go Pro
          <ArrowRight className="h-4 w-4" />
        </RainbowCta>
      </div>
    </div>
  );
}
