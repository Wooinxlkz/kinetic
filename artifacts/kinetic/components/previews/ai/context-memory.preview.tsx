"use client";

import { ContextMemory, type MemoryChip } from "@/components/ai/context-memory";

const MEMORIES: MemoryChip[] = [
  {
    id: "m1",
    content: "Prefers TypeScript over JavaScript",
    category: "preference",
    relevance: 0.96,
    snippet: "The user explicitly stated 'I always use TypeScript' during onboarding.",
  },
  {
    id: "m2",
    content: "Working on a SaaS app called Meridian",
    category: "context",
    relevance: 0.91,
  },
  {
    id: "m3",
    content: "Goal: launch v1 by end of Q3",
    category: "goal",
    relevance: 0.87,
    snippet: "From roadmap discussion: 'We need to ship v1 by September 30th no matter what.'",
  },
  {
    id: "m4",
    content: "Team uses Vercel for deployments",
    category: "fact",
    relevance: 0.73,
  },
];

export function ContextMemoryPreview() {
  return (
    <div className="mx-auto max-w-sm p-6">
      <ContextMemory memories={MEMORIES} />
    </div>
  );
}
