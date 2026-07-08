"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  /** When true, renders a streaming indicator instead of content. */
  streaming?: boolean;
};

export type ChatBubbleProps = {
  message: ChatMessage;
  /** Custom avatar element shown for assistant messages. */
  avatar?: React.ReactNode;
  className?: string;
};

export type MessageListProps = {
  messages: ChatMessage[];
  /** Custom avatar element for all assistant messages. */
  avatar?: React.ReactNode;
  className?: string;
};

/* ------------------------------------------------------------------ */
/* Typing indicator                                                     */
/* ------------------------------------------------------------------ */

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block size-1.5 rounded-full bg-current"
      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function TypingIndicator() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      <TypingDot delay={0} />
      <TypingDot delay={0.18} />
      <TypingDot delay={0.36} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Single bubble                                                        */
/* ------------------------------------------------------------------ */

export function ChatBubble({ message, avatar, className }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.8 }}
      className={cn(
        "flex w-full gap-2.5",
        isUser ? "justify-end" : "justify-start",
        className,
      )}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] text-xs font-semibold text-muted-foreground">
          {avatar ?? (
            <svg viewBox="0 0 16 16" className="size-3.5 fill-current opacity-60">
              <path d="M8 1a3.5 3.5 0 1 0 0 7A3.5 3.5 0 0 0 8 1zM3.5 8A4.5 4.5 0 0 0 0 12.5v.5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-.5A4.5 4.5 0 0 0 12.5 8h-9z" />
            </svg>
          )}
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-foreground text-background"
            : "rounded-tl-sm bg-card text-foreground",
        )}
      >
        {message.streaming ? (
          <TypingIndicator />
        ) : (
          <span className="whitespace-pre-wrap break-words">{message.content}</span>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Message list                                                         */
/* ------------------------------------------------------------------ */

export function MessageList({ messages, avatar, className }: MessageListProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} avatar={avatar} />
        ))}
      </AnimatePresence>
    </div>
  );
}
