"use client";

import { useState } from "react";
import { ElasticSlider } from "@/components/motion/elastic-slider";

export function ElasticSliderPreview() {
  const [vol, setVol] = useState(65);
  const [bright, setBright] = useState(40);
  const [zoom, setZoom] = useState(1.0);

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-8 p-8">
      <ElasticSlider
        label="Volume"
        value={vol}
        onChange={setVol}
        min={0}
        max={100}
        step={1}
        formatValue={(v) => `${v}%`}
      />

      <ElasticSlider
        label="Brightness"
        value={bright}
        onChange={setBright}
        min={0}
        max={100}
        step={5}
        formatValue={(v) => `${v}%`}
        elasticity={28}
      />

      <ElasticSlider
        label="Zoom"
        value={zoom}
        onChange={setZoom}
        min={0.5}
        max={3.0}
        step={0.1}
        formatValue={(v) => `${v.toFixed(1)}×`}
        elasticity={12}
      />
    </div>
  );
}
