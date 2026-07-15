"use client";

import { useState } from "react";
import { VoiceInput } from "@/components/ai/voice-input";

export function VoiceInputPreview() {
  const [transcript, setTranscript] = useState<string | null>(null);
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center gap-8 p-8">
      <VoiceInput onResult={setTranscript} />
      {transcript && (
        <div className="max-w-xs rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground">
          &ldquo;{transcript}&rdquo;
        </div>
      )}
    </div>
  );
}
