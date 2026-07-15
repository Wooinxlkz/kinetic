"use client";

import { useState } from "react";
import { ReasoningSteps, type ReasoningStep } from "@/components/ai/reasoning-steps";

const INITIAL_STEPS: ReasoningStep[] = [
  {
    id: "1",
    title: "Parse user query and identify intent",
    body: "Detected a multi-part question about climate change impacts on agriculture. Splitting into sub-tasks: (1) regional crop yield data, (2) temperature trend analysis, (3) policy implications.",
    status: "done",
  },
  {
    id: "2",
    title: "Retrieve relevant climate datasets",
    body: "Querying IPCC AR6 database, FAO crop statistics (2000–2023), and NOAA temperature anomaly records. Found 847 relevant citations.",
    status: "done",
  },
  {
    id: "3",
    title: "Cross-reference findings with peer-reviewed literature",
    body: "Matching retrieved data against 142 peer-reviewed studies. Checking for consensus on yield reduction projections under RCP 4.5 and RCP 8.5 scenarios.",
    status: "running",
  },
  {
    id: "4",
    title: "Synthesize regional impact summary",
    status: "pending",
  },
  {
    id: "5",
    title: "Draft final response with citations",
    status: "pending",
  },
];

const ERROR_STEPS: ReasoningStep[] = [
  {
    id: "e1",
    title: "Attempt to access real-time data feed",
    body: "Tried to connect to live weather API endpoint. Connection timed out after 5s.",
    status: "error",
  },
  {
    id: "e2",
    title: "Fall back to cached dataset (2023-Q4)",
    body: "Using the most recent cached snapshot from the data warehouse.",
    status: "done",
  },
];

export function ReasoningStepsPreview() {
  const [steps, setSteps] = useState<ReasoningStep[]>(INITIAL_STEPS);

  const simulateProgress = () => {
    setSteps(INITIAL_STEPS.map((s, i) =>
      i < 2 ? { ...s, status: "done" } :
      i === 2 ? { ...s, status: "running" } :
      { ...s, status: "pending" }
    ));
    setTimeout(() => {
      setSteps((prev) =>
        prev.map((s, i) =>
          i <= 2 ? { ...s, status: "done" } :
          i === 3 ? { ...s, status: "running" } :
          { ...s, status: "pending" }
        )
      );
    }, 1200);
    setTimeout(() => {
      setSteps((prev) => prev.map((s) => ({ ...s, status: "done" as const })));
    }, 2400);
  };

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <button
        type="button"
        onClick={simulateProgress}
        className="self-start rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
      >
        Simulate progress →
      </button>

      <ReasoningSteps
        steps={steps}
        defaultOpen={true}
        title="Chain of thought"
      />

      <ReasoningSteps
        steps={ERROR_STEPS}
        defaultOpen={true}
        title="With error step"
      />
    </div>
  );
}
