"use client";

import { useState, useCallback } from "react";
import { AgentInput, type AgentInputStatus } from "@/components/ai/agent-input";

export function AgentInputPreview() {
  const [status, setStatus] = useState<AgentInputStatus>("idle");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = useCallback((msg: string) => {
    setMessages((prev) => [...prev, msg]);
    setStatus("streaming");
    setTimeout(() => setStatus("idle"), 2200);
  }, []);

  const handleStop = useCallback(() => {
    setStatus("idle");
  }, []);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {messages.length > 0 && (
        <div className="flex flex-col gap-1.5 text-sm">
          {messages.slice(-3).map((m, i) => (
            <div
              key={i}
              className="self-end rounded-2xl rounded-tr-sm bg-foreground px-3.5 py-2 text-background"
            >
              {m}
            </div>
          ))}
          {status === "streaming" && (
            <div className="self-start rounded-2xl rounded-tl-sm bg-card px-3.5 py-2.5 text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-sm">
                <span className="inline-block size-1.5 animate-bounce rounded-full bg-current [animation-delay:0ms]" />
                <span className="inline-block size-1.5 animate-bounce rounded-full bg-current [animation-delay:180ms]" />
                <span className="inline-block size-1.5 animate-bounce rounded-full bg-current [animation-delay:360ms]" />
              </span>
            </div>
          )}
        </div>
      )}

      <AgentInput
        onSend={handleSend}
        onStop={handleStop}
        status={status}
        placeholder="Send a message…"
        suggestions={
          messages.length === 0
            ? [
                { id: "1", label: "Explain this component" },
                { id: "2", label: "Show usage example" },
                { id: "3", label: "What props does it accept?" },
              ]
            : undefined
        }
      />
    </div>
  );
}
