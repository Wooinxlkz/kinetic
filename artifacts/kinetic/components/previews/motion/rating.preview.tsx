"use client";

import { useState } from "react";
import { Rating } from "@/components/motion/rating";

export function RatingPreview() {
  const [v1, setV1] = useState(3);
  const [v2, setV2] = useState(3.5);
  return (
    <div className="flex flex-col items-center gap-10 p-8">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-foreground">Full stars</p>
        <Rating value={v1} onChange={setV1} size="lg" showLabel />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-foreground">Half stars</p>
        <Rating value={v2} onChange={setV2} half size="lg" showLabel />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-foreground">Read-only</p>
        <Rating value={4.5} readonly half size="md" showLabel />
      </div>
    </div>
  );
}
