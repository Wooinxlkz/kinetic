"use client";

import { ProCardSlider } from "@/components/motion/pro-card";

export function ProCardPreview() {
  return (
    <div className="flex w-full items-center justify-center px-8 py-10">
      <div className="w-full max-w-xs">
        <ProCardSlider />
      </div>
    </div>
  );
}
