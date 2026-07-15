"use client";

import { useState } from "react";
import { PromptHistory } from "@/components/ai/prompt-history";

const INITIAL = [
  { id: "1", prompt: "Explain how React Server Components work", timestamp: "2 min ago" },
  { id: "2", prompt: "Write a Python script to rename files in bulk", timestamp: "15 min ago" },
  { id: "3", prompt: "What are the best practices for REST API design?", timestamp: "1 hr ago" },
  { id: "4", prompt: "Summarize the key points of the meeting transcript", timestamp: "3 hr ago" },
  { id: "5", prompt: "Convert this SQL query to use a CTE instead", timestamp: "Yesterday" },
  { id: "6", prompt: "Help me debug this TypeScript error", timestamp: "Yesterday" },
];

export function PromptHistoryPreview() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 p-6 w-full max-w-sm">
      <PromptHistory
        items={INITIAL}
        onSelect={(item) => setSelected(item.prompt)}
      />
      {selected && (
        <p className="text-xs text-muted-foreground truncate">Selected: {selected}</p>
      )}
    </div>
  );
}
