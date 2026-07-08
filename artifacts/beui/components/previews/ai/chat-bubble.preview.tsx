"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { MessageList, type ChatMessage } from "@/components/ai/chat-bubble";
import { AgentInput } from "@/components/ai/agent-input";

const DEMO_REPLIES = [
  "Sure! This component renders animated chat bubbles with user and assistant messages. Each bubble springs in when added, and the assistant shows a typing indicator while the response is being generated.",
  "Great question. The MessageList takes an array of messages and animates each entry with spring physics — smooth even with rapid additions.",
  "You can pass a custom avatar element to replace the default assistant icon. File attachments and image previews are also supported on the input side.",
];

let idCounter = 0;
const uid = () => `msg-${++idCounter}`;

export function ChatBubblePreview() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      content: "Hey there! Try sending me a message.",
    },
  ]);
  const [streaming, setStreaming] = useState(false);
  const replyIndex = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(
    (text: string) => {
      const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
      const typingMsg: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: "",
        streaming: true,
      };

      setMessages((prev) => [...prev, userMsg, typingMsg]);
      setStreaming(true);

      const reply = DEMO_REPLIES[replyIndex.current % DEMO_REPLIES.length];
      replyIndex.current++;

      setTimeout(() => {
        setMessages((prev) => {
          const without = prev.filter((m) => !m.streaming);
          return [
            ...without,
            { id: uid(), role: "assistant", content: reply },
          ];
        });
        setStreaming(false);
      }, 1400);
    },
    [],
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="max-h-64 overflow-y-auto rounded-2xl bg-background p-3 scrollbar-hide">
        <MessageList messages={messages} />
        <div ref={bottomRef} />
      </div>
      <AgentInput
        onSend={handleSend}
        status={streaming ? "streaming" : "idle"}
        onStop={() => setStreaming(false)}
        placeholder="Type a message…"
      />
    </div>
  );
}
