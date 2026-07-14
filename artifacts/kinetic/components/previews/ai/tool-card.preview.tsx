"use client";

import { useState, useEffect, useRef } from "react";
import { ToolCard, type ToolStatus } from "@/components/ai/tool-card";
import { Terminal, FileEdit, Search } from "lucide-react";

function LiveToolCard() {
  const [status, setStatus] = useState<ToolStatus>("running");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setStatus("done"), 1800);
    return () => clearTimeout(timerRef.current!);
  }, []);

  const restart = () => {
    setStatus("running");
    clearTimeout(timerRef.current!);
    timerRef.current = setTimeout(() => setStatus("done"), 1800);
  };

  return (
    <button type="button" onClick={restart} className="w-full text-left">
      <ToolCard
        name="Bash"
        icon={Terminal}
        status={status}
        label="pnpm run typecheck"
        input={`cd /workspace\npnpm run typecheck`}
        output={`✓ 0 errors found\n✓ Build artifacts generated`}
        defaultOpen={status === "running"}
      />
    </button>
  );
}

export function ToolCardPreview() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2.5">
      {/* Live card — auto-completes, click to restart */}
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
        Click to restart
      </p>
      <LiveToolCard />

      {/* Static examples */}
      <ToolCard
        name="Edit"
        icon={FileEdit}
        status="done"
        label="components/ai/tool-card.tsx"
        input={`- import { XCircle } from "lucide-react";\n+ import { XCircle, CheckCircle2 } from "lucide-react";`}
        output="File saved successfully."
      />

      <ToolCard
        name="Search"
        icon={Search}
        status="error"
        label={`"useStreamingText" in lib/`}
        input={`grep -r "useStreamingText" lib/`}
        error="No matches found in lib/ — did you mean components/ai/?"
      />

      <ToolCard
        name="Bash"
        icon={Terminal}
        status="running"
        label="npm install motion"
      />
    </div>
  );
}
