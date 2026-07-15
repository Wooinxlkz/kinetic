"use client";

import { useState } from "react";
import { TokenCounter } from "@/components/ai/token-counter";

export function TokenCounterPreview() {
  const [val, setVal] = useState(1280);

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-xs">
      <TokenCounter current={val} max={4096} label="Context window" />
      <TokenCounter current={3800} max={4096} label="Near limit" />
      <TokenCounter current={4096} max={4096} label="At limit" />
      <input
        type="range"
        min={0}
        max={4096}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
