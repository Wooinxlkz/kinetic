"use client";

import { useEffect, useState } from "react";
import { NumberFlow } from "@/components/motion/number-flow";

const PRICES = [1204.5, 987.0, 1352.75, 1100.0, 1489.99];
const PERCENTS = [2.4, -1.8, 5.3, -0.6, 3.1];

export function NumberFlowPreview() {
  const [priceIndex, setPriceIndex] = useState(0);
  const [percentIndex, setPercentIndex] = useState(0);
  const [count, setCount] = useState(1248);

  // Auto-cycle price
  useEffect(() => {
    const id = setInterval(() => {
      setPriceIndex((i) => (i + 1) % PRICES.length);
      setPercentIndex((i) => (i + 1) % PERCENTS.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 p-8">
      {/* Stock ticker */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          AAPL
        </p>
        <NumberFlow
          value={PRICES[priceIndex]}
          prefix="$"
          decimals={2}
          className="text-4xl font-bold text-foreground"
        />
        <NumberFlow
          value={Math.abs(PERCENTS[percentIndex])}
          prefix={PERCENTS[percentIndex] >= 0 ? "▲ " : "▼ "}
          suffix="%"
          decimals={1}
          className={
            PERCENTS[percentIndex] >= 0
              ? "text-sm font-medium text-emerald-500"
              : "text-sm font-medium text-destructive"
          }
        />
      </div>

      {/* Live counter */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-muted-foreground">Users online</p>
        <NumberFlow value={count} className="text-2xl font-semibold text-foreground" />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCount((c) => c + Math.floor(Math.random() * 50 + 10))}
            className="inline-flex h-8 items-center rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground"
          >
            +join
          </button>
          <button
            type="button"
            onClick={() => setCount((c) => Math.max(0, c - Math.floor(Math.random() * 30 + 5)))}
            className="inline-flex h-8 items-center rounded-full border border-border px-4 text-xs font-medium text-foreground"
          >
            −leave
          </button>
        </div>
      </div>

      {/* Simple percent */}
      <div className="flex items-baseline gap-1">
        <NumberFlow value={87} className="text-5xl font-bold text-foreground" />
        <span className="text-xl text-muted-foreground">%</span>
        <span className="ml-2 text-sm text-muted-foreground">satisfaction</span>
      </div>
    </div>
  );
}
