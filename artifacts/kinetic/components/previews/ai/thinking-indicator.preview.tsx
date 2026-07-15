import { ThinkingIndicator } from "@/components/ai/thinking-indicator";

export function ThinkingIndicatorPreview() {
  return (
    <div className="flex flex-col gap-6 p-8 items-start">
      <ThinkingIndicator variant="dots" label="Thinking…" />
      <ThinkingIndicator variant="bar" label="Generating response…" />
      <ThinkingIndicator variant="pulse" label="Processing…" />
      <div className="flex gap-6">
        <ThinkingIndicator variant="dots" size="sm" label="Small dots" />
        <ThinkingIndicator variant="pulse" size="sm" label="Small pulse" />
      </div>
    </div>
  );
}
