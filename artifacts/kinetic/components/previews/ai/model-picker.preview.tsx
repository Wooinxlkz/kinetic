"use client";

import { useState } from "react";
import { ModelPicker } from "@/components/ai/model-picker";
import type { AIModel } from "@/components/ai/model-picker";

const MODELS: AIModel[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", badge: "Fast", speed: 3 },
  { id: "gpt-4o-mini", name: "GPT-4o mini", provider: "OpenAI", speed: 3 },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", badge: "Smart", speed: 2 },
  { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", provider: "Google", speed: 2 },
  { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", speed: 1 },
];

export function ModelPickerPreview() {
  const [model, setModel] = useState(MODELS[0]);

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Chat-style toolbar */}
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-sm overflow-visible">
        {/* Mock messages */}
        <div className="px-4 pt-4 pb-3 space-y-3 border-b border-border">
          <div className="flex gap-2.5 items-start">
            <div className="h-7 w-7 rounded-full bg-primary/20 shrink-0 flex items-center justify-center text-[10px] font-bold text-primary">U</div>
            <div className="rounded-xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-foreground max-w-[260px]">
              Summarise the quarterly report
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <div className="h-7 w-7 rounded-full bg-foreground/10 shrink-0 flex items-center justify-center text-[10px] font-bold text-foreground">AI</div>
            <div className="rounded-xl rounded-tl-sm border border-border bg-card px-3 py-2 text-sm text-foreground max-w-[260px]">
              Sure! Here's a summary using <span className="font-semibold">{model.name}</span>…
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-3 py-2.5">
          <ModelPicker
            models={MODELS}
            value={model.id}
            onChange={setModel}
          />
          <div className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
            Ask anything…
          </div>
        </div>
      </div>

      {/* Selected model info */}
      <p className="text-xs text-muted-foreground">
        Active model: <span className="font-medium text-foreground">{model.name}</span>
        {model.provider && <> · {model.provider}</>}
      </p>
    </div>
  );
}
