"use client";

import { useEffect, useState } from "react";
import { Progress, StackedProgress } from "@/components/motion/progress";
import { Button } from "@/components/motion/button";

export function ProgressPreview() {
  const [value, setValue] = useState(40);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (value >= 100) {
      setRunning(false);
      return;
    }
    const t = setTimeout(
      () => setValue((v) => Math.min(100, v + Math.random() * 12 + 3)),
      180,
    );
    return () => clearTimeout(t);
  }, [running, value]);

  const reset = () => { setValue(0); setRunning(false); };
  const start = () => { if (value >= 100) reset(); setRunning(true); };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {/* Animated demo */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Upload progress</span>
          <span className="text-xs tabular-nums text-muted-foreground">{Math.round(value)}%</span>
        </div>
        <Progress
          value={value}
          variant={value >= 100 ? "success" : "default"}
          size="md"
          aria-label="Upload progress"
        />
        <div className="flex gap-2">
          <Button variant="primary" size="sm" onClick={start} disabled={running}>
            {value >= 100 ? "Restart" : "Start"}
          </Button>
          <Button variant="outline" size="sm" onClick={reset} disabled={running && value === 0}>
            Reset
          </Button>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-2.5">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">Variants</span>
        {(["default", "success", "warning", "error", "info"] as const).map((v) => (
          <div key={v} className="flex items-center gap-3">
            <span className="w-16 text-xs capitalize text-muted-foreground">{v}</span>
            <Progress value={65} variant={v} size="sm" className="flex-1" />
          </div>
        ))}
      </div>

      {/* Sizes */}
      <div className="space-y-2.5">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">Sizes</span>
        {(["xs", "sm", "md", "lg"] as const).map((s) => (
          <div key={s} className="flex items-center gap-3">
            <span className="w-6 text-xs text-muted-foreground">{s}</span>
            <Progress value={72} size={s} className="flex-1" />
          </div>
        ))}
      </div>

      {/* Indeterminate */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">Indeterminate</span>
        <Progress size="sm" aria-label="Loading" />
        <Progress size="sm" variant="info" aria-label="Loading" />
      </div>

      {/* Stacked */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">Stacked</span>
        <StackedProgress
          showLegend
          segments={[
            { value: 45, variant: "success", label: "Done" },
            { value: 30, variant: "info", label: "In progress" },
            { value: 25, variant: "warning", label: "Blocked" },
          ]}
        />
      </div>
    </div>
  );
}
