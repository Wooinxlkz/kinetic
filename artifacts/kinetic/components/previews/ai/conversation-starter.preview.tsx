"use client";

import { ConversationStarter, type StarterPrompt } from "@/components/ai/conversation-starter";

const PROMPTS: StarterPrompt[] = [
  {
    id: "p1",
    icon: "🧠",
    category: "Strategy",
    title: "Help me plan a product launch",
    description: "Create a go-to-market strategy with tasks and timelines.",
  },
  {
    id: "p2",
    icon: "✍️",
    category: "Writing",
    title: "Write a blog post draft",
    description: "Generate a structured first draft on any topic you choose.",
  },
  {
    id: "p3",
    icon: "📊",
    category: "Analysis",
    title: "Analyse my data",
    description: "Upload a CSV and I'll surface key insights and trends.",
  },
  {
    id: "p4",
    icon: "🛠️",
    category: "Code",
    title: "Debug my code",
    description: "Paste an error or code snippet and I'll help you fix it.",
  },
];

export function ConversationStarterPreview() {
  return (
    <div className="mx-auto max-w-lg p-8">
      <ConversationStarter
        prompts={PROMPTS}
        onSelect={(p) => console.log("Selected:", p.title)}
      />
    </div>
  );
}
