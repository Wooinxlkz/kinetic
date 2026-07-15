"use client";

import { useState } from "react";
import { Lightbulb, Zap, BookOpen, Code2 } from "lucide-react";
import { SuggestionChips } from "@/components/ai/suggestion-chips";

const CHIPS = [
  { id: "1", label: "Explain this code", icon: <Code2 className="h-3 w-3" /> },
  { id: "2", label: "Summarize", icon: <BookOpen className="h-3 w-3" /> },
  { id: "3", label: "Improve performance", icon: <Zap className="h-3 w-3" /> },
  { id: "4", label: "Give me ideas", icon: <Lightbulb className="h-3 w-3" /> },
  { id: "5", label: "Write tests" },
  { id: "6", label: "Add comments" },
];

export function SuggestionChipsPreview() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 p-6 w-full max-w-md">
      <SuggestionChips
        chips={CHIPS}
        onSelect={(c) => setSelected(c.id)}
      />
      {selected && (
        <p className="text-xs text-muted-foreground text-center">
          Selected: {CHIPS.find((c) => c.id === selected)?.label}
        </p>
      )}
    </div>
  );
}
