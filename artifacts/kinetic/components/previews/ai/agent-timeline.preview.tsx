"use client";

import { AgentTimeline, type AgentStep } from "@/components/ai/agent-timeline";

const STEPS: AgentStep[] = [
  { id: "1", kind: "plan",   title: "Analysing request",       status: "done",    duration: "0.4s" },
  { id: "2", kind: "search", title: "Searching knowledge base", status: "done",    duration: "1.2s",
    detail: "Retrieved 8 documents matching the query with relevance > 0.82." },
  { id: "3", kind: "call",   title: "Calling weather API",      status: "done",    duration: "0.8s" },
  { id: "4", kind: "write",  title: "Generating response",      status: "running",
    detail: "Streaming tokens using GPT-4o with system prompt v3." },
  { id: "5", kind: "send",   title: "Streaming to client",      status: "pending" },
];

export function AgentTimelinePreview() {
  return (
    <div className="mx-auto max-w-sm p-6">
      <AgentTimeline steps={STEPS} title="Trip planning agent" />
    </div>
  );
}
