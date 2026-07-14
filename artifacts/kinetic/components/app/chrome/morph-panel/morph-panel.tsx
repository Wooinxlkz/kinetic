"use client";

import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ColorOrb } from "./color-orb";
import { findAnswer, SUGGESTIONS, getFollowUps } from "@/components/kinetic";

// ─── constants ────────────────────────────────────────────────────────────────
//
// The panel morphs between a fixed set of pixel sizes — never `height:
// "auto"`. The <form> below is always laid out at its full target size
// (absolutely positioned, bottom-anchored) and simply gets revealed as the
// outer wrapper's `overflow-hidden` box grows to uncover it. Only the
// form's *opacity* animates. This means there is exactly one thing
// computing size on every frame (the outer spring), so nothing can race.

const FORM_WIDTH        = 360;
const FORM_HEIGHT_EMPTY = 200;  // no conversation yet
const FORM_HEIGHT_CHAT  = 460;  // conversation in progress
const CHAR_DELAY        = 8;    // ms per character typewriter

const SPRING = {
  type: "spring",
  stiffness: 550,
  damping: 45,
  mass: 0.7,
} as const;

// ─── types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  streaming?: boolean;
}

// ─── context ──────────────────────────────────────────────────────────────────

interface ContextShape {
  showForm: boolean;
  triggerOpen: () => void;
  triggerClose: () => void;
}

const FormContext = React.createContext({} as ContextShape);
const useFormContext = () => React.useContext(FormContext);

// ─── MorphPanel ───────────────────────────────────────────────────────────────

export function MorphPanel() {
  const wrapperRef  = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const bottomRef   = React.useRef<HTMLDivElement>(null);

  const DEBUG_OPEN = typeof window !== "undefined" && window.location.search.includes("debugAiOpen");
  const DEBUG_CHAT = typeof window !== "undefined" && window.location.search.includes("debugAiChat");
  const [showForm,   setShowForm]   = React.useState(DEBUG_OPEN || DEBUG_CHAT);
  const [messages,   setMessages]   = React.useState<Message[]>(
    DEBUG_CHAT
      ? [
          { id: "u-1", role: "user", text: "How do I install a component?" },
          { id: "a-1", role: "assistant", text: "Run `bunx --bun shadcn add @kineticui/tilt-card` in your project root." },
        ]
      : [],
  );
  const [isThinking, setIsThinking] = React.useState(false);
  const [followUps,  setFollowUps]  = React.useState<string[]>([]);
  const usedQs = React.useRef<string[]>([]);

  const hasMessages = messages.length > 0;
  const formHeight  = hasMessages ? FORM_HEIGHT_CHAT : FORM_HEIGHT_EMPTY;

  const triggerClose = React.useCallback(() => {
    setShowForm(false);
    textareaRef.current?.blur();
  }, []);

  const triggerOpen = React.useCallback(() => {
    setShowForm(true);
    setTimeout(() => textareaRef.current?.focus());
  }, []);

  // Close on outside click
  React.useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (
        showForm &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) triggerClose();
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [showForm, triggerClose]);

  // Auto-scroll to latest message
  React.useEffect(() => {
    if (hasMessages)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
  }, [messages, hasMessages]);

  const handleAsk = React.useCallback((query: string) => {
    const q = query.trim();
    if (!q || isThinking) return;

    usedQs.current.push(q);
    setFollowUps([]);
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: "user", text: q }]);
    setIsThinking(true);

    setTimeout(() => {
      const full = findAnswer(q).answer;
      const aid  = `a-${Date.now()}`;
      setMessages(prev => [...prev, { id: aid, role: "assistant", text: "", streaming: true }]);
      setIsThinking(false);

      let i = 0;
      const tick = () => {
        i++;
        const done = i >= full.length;
        setMessages(prev =>
          prev.map(m => m.id === aid
            ? { ...m, text: full.slice(0, i), streaming: !done }
            : m
          )
        );
        if (!done) {
          setTimeout(tick, CHAR_DELAY);
        } else {
          setFollowUps(getFollowUps(usedQs.current));
        }
      };
      setTimeout(tick, CHAR_DELAY);
    }, 300);
  }, [isThinking]);

  const handleClear = React.useCallback(() => {
    setMessages([]);
    setFollowUps([]);
    usedQs.current = [];
  }, []);

  const ctx = React.useMemo(
    () => ({ showForm, triggerOpen, triggerClose }),
    [showForm, triggerOpen, triggerClose],
  );

  return (
    <FormContext.Provider value={ctx}>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showForm && (
              <motion.div
                key="morph-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[39] bg-black/25 backdrop-blur-[2px]"
                onClick={triggerClose}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
      <motion.div
        ref={wrapperRef}
        className="relative flex flex-col items-center overflow-hidden border border-foreground/8 bg-background/20 shadow-lg backdrop-blur-md"
        initial={false}
        animate={{
          width:        showForm ? FORM_WIDTH : "auto",
          height:       showForm ? formHeight : 44,
          borderRadius: showForm ? 14 : 20,
        }}
        transition={{ ...SPRING, delay: showForm ? 0 : 0.08 }}
      >
        <DockBar />
        <InputForm
          ref={textareaRef}
          bottomRef={bottomRef}
          formHeight={formHeight}
          messages={messages}
          isThinking={isThinking}
          followUps={followUps}
          onAsk={handleAsk}
          onClear={handleClear}
        />
      </motion.div>
    </FormContext.Provider>
  );
}

// ─── DockBar (collapsed pill) ─────────────────────────────────────────────────

function DockBar() {
  const { showForm, triggerOpen } = useFormContext();
  return (
    <footer className="mt-auto flex h-[44px] items-center justify-center whitespace-nowrap select-none">
      <div className="flex items-center justify-center gap-2 px-3">
        <div className="flex w-fit items-center gap-2">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="h-5 w-5"
              />
            ) : (
              <motion.div
                key="orb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ColorOrb dimension="22px" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={triggerOpen}
          className="flex h-fit flex-1 cursor-pointer items-center justify-end rounded-full px-2 py-0.5 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
        >
          <span className="truncate">Ask AI</span>
        </button>
      </div>
    </footer>
  );
}

// ─── InputForm ────────────────────────────────────────────────────────────────

interface InputFormProps {
  bottomRef: React.RefObject<HTMLDivElement | null>;
  formHeight: number;
  messages: Message[];
  isThinking: boolean;
  followUps: string[];
  onAsk: (q: string) => void;
  onClear: () => void;
}

const InputForm = React.forwardRef<HTMLTextAreaElement, InputFormProps>(
  function InputForm({ bottomRef, formHeight, messages, isThinking, followUps, onAsk, onClear }, ref) {
    const { showForm, triggerClose } = useFormContext();
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const hasMessages = messages.length > 0;

    React.useEffect(() => {
      function handler(e: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setDropdownOpen(false);
        }
      }
      if (dropdownOpen) document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [dropdownOpen]);

    function handleSubmit(e?: React.FormEvent) {
      e?.preventDefault();
      const ta = (ref as React.RefObject<HTMLTextAreaElement>)?.current;
      const val = ta?.value?.trim();
      if (!val || isThinking) return;
      onAsk(val);
      if (ta) ta.value = "";
    }

    function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key === "Escape") { triggerClose(); return; }
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    }

    function handleClear() {
      setDropdownOpen(false);
      onClear();
    }

    return (
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0"
        style={{
          width: FORM_WIDTH,
          height: formHeight,
          pointerEvents: showForm ? "all" : "none",
        }}
      >
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
              className="flex h-full flex-col rounded-[13px] bg-background/70 p-1"
            >
              {/* Header row */}
              <div className="flex items-start justify-between py-1">
                <p className="z-[2] ml-[38px] flex items-center gap-[6px] text-sm text-foreground/70 select-none">
                  Kinetic AI
                </p>
                <div className="flex items-center gap-1 pr-1">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(v => !v)}
                      className="-translate-y-[3px] flex h-6 w-6 items-center justify-center rounded-md text-foreground/50 transition-colors hover:bg-accent hover:text-foreground text-base leading-none select-none"
                      title="Options"
                    >
                      ···
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute right-0 top-7 z-50 min-w-[148px] overflow-hidden rounded-[10px] border border-foreground/15 bg-background/90 shadow-lg backdrop-blur-md"
                        >
                          <button
                            type="button"
                            onClick={handleClear}
                            disabled={!hasMessages}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent/60 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <span className="text-xs opacity-60">⌫</span>
                            Clear chat
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    ref={btnRef}
                    disabled={isThinking}
                    className="-translate-y-[3px] flex cursor-pointer items-center justify-center gap-1 rounded-[12px] bg-transparent pr-1 text-center text-foreground select-none disabled:opacity-40"
                  >
                    <KeyHint>⌘</KeyHint>
                    <KeyHint>↵</KeyHint>
                  </button>
                </div>
              </div>

              {/* Messages area — only shown once there's a conversation */}
              {(hasMessages || isThinking) && (
                <div className="morph-messages flex-1 space-y-3 overflow-y-auto px-3 py-1 min-h-0">
                  {messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))}
                  {isThinking && <ThinkingDots />}
                  <AnimatePresence>
                    {followUps.length > 0 && !isThinking && (
                      <motion.div
                        key="followups"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex flex-wrap gap-1 pb-1"
                      >
                        {followUps.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => onAsk(s)}
                            className="rounded-full border border-border/40 bg-muted/20 px-2 py-0.5 text-[10.5px] text-muted-foreground/70 transition-colors hover:bg-muted/50 hover:text-foreground"
                          >
                            {s}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={bottomRef} />
                </div>
              )}

              {/* Suggestions — only before the first message */}
              {!hasMessages && !isThinking && (
                <div className="flex flex-wrap gap-1 px-1 pb-1">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onAsk(s)}
                      className="rounded-full border border-border/40 bg-muted/20 px-2 py-0.5 text-[10.5px] text-muted-foreground/70 transition-colors hover:bg-muted/50 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Textarea */}
              <textarea
                ref={ref}
                placeholder={isThinking ? "Thinking…" : "Ask me anything…"}
                name="message"
                disabled={isThinking}
                className={cn(
                  "resize-none scroll-py-2 rounded-md bg-transparent p-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50",
                  hasMessages ? "h-[72px]" : "h-full",
                )}
                required
                onKeyDown={handleKeys}
                spellCheck={false}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orb — decoupled from header flex flow, always pinned top-left */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-2 left-3"
            >
              <ColorOrb dimension="20px" />
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    );
  },
);

// ─── MessageBubble ────────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      {isUser ? (
        <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-foreground/[0.08] px-2.5 py-1.5 text-[12px] leading-relaxed text-foreground">
          {message.text}
        </span>
      ) : (
        <div className="max-w-full text-[12px] leading-relaxed text-foreground/80">
          <FormattedAnswer text={message.text} streaming={message.streaming} />
        </div>
      )}
    </motion.div>
  );
}

// ─── FormattedAnswer — **bold**, `code`, newlines ─────────────────────────────

function FormattedAnswer({ text, streaming }: { text: string; streaming?: boolean }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-0.5">
      {lines.map((line, li) => {
        if (!line) return <div key={li} className="h-1" />;
        const parts: React.ReactNode[] = [];
        let rest = line, k = 0;
        while (rest.length) {
          const b = rest.indexOf("**"), c = rest.indexOf("`");
          if (b === -1 && c === -1) { parts.push(<span key={k++}>{rest}</span>); break; }
          const next = b === -1 ? c : c === -1 ? b : Math.min(b, c);
          if (next > 0) { parts.push(<span key={k++}>{rest.slice(0, next)}</span>); rest = rest.slice(next); continue; }
          if (rest.startsWith("**")) {
            const e = rest.indexOf("**", 2);
            if (e === -1) { parts.push(<span key={k++}>{rest}</span>); break; }
            parts.push(<strong key={k++} className="font-semibold text-foreground">{rest.slice(2, e)}</strong>);
            rest = rest.slice(e + 2);
          } else {
            const e = rest.indexOf("`", 1);
            if (e === -1) { parts.push(<span key={k++}>{rest}</span>); break; }
            parts.push(<code key={k++} className="rounded bg-muted/50 px-1 py-0.5 font-mono text-[10.5px]">{rest.slice(1, e)}</code>);
            rest = rest.slice(e + 1);
          }
        }
        return <p key={li}>{parts}</p>;
      })}
      {streaming && <span className="inline-block h-3 w-px animate-pulse bg-foreground/40 align-middle ml-px" />}
    </div>
  );
}

// ─── ThinkingDots ─────────────────────────────────────────────────────────────

function ThinkingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-1 px-1 py-1"
    >
      {[0, 0.14, 0.28].map(delay => (
        <motion.span
          key={delay}
          className="h-1.5 w-1.5 rounded-full bg-foreground/25"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 0.75, repeat: Infinity, delay, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

// ─── KeyHint ──────────────────────────────────────────────────────────────────

function KeyHint({ children }: { children: string }) {
  return (
    <kbd className="flex h-6 w-fit items-center justify-center rounded-sm border border-border/50 px-[6px] font-sans text-xs text-muted-foreground/70">
      {children}
    </kbd>
  );
}

export default MorphPanel;
