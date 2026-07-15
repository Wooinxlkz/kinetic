"use client";

import { ModelPicker } from "@/components/ai/model-picker";

const MODELS = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", badge: "Fast", speed: 3 as const },
  { id: "gpt-4o-mini", name: "GPT-4o mini", provider: "OpenAI", speed: 3 as const },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", badge: "Smart", speed: 2 as const },
  { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", provider: "Google", speed: 2 as const },
  { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", speed: 1 as const },
];

export function ModelPickerPreview() {
  return (
    <div className="flex items-start justify-center p-10">
      <ModelPicker models={MODELS} defaultValue="gpt-4o" />
    </div>
  );
}
