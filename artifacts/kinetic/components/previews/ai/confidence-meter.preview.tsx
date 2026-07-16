"use client";

import { ConfidenceMeter } from "@/components/ai/confidence-meter";

export function ConfidenceMeterPreview() {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-10 p-8">
      {/* Arc */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Arc</p>
        <ConfidenceMeter
          value={0.87}
          label="Answer confidence"
          variant="arc"
          showTrend="up"
          reasoning="The model is highly confident based on 12 retrieved sources with relevance score > 0.90."
        />
      </div>

      {/* Bar */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Bar</p>
        <ConfidenceMeter
          value={0.52}
          label="Fact-check score"
          variant="bar"
          showTrend="neutral"
          reasoning="Mixed evidence found — some claims are well-supported, others need further verification."
        />
      </div>

      {/* Segments */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Segments</p>
        <ConfidenceMeter
          value={0.3}
          label="Citation coverage"
          variant="segments"
          showTrend="down"
        />
      </div>
    </div>
  );
}
