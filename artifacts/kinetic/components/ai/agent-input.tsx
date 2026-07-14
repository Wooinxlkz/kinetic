"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type KeyboardEvent,
  type TextareaHTMLAttributes,
} from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { ArrowUp, Square, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AgentInputStatus = "idle" | "streaming";

export type AgentInputSuggestion = {
  id: string;
  label: string;
};

export type AgentInputProps = {
  /** Called when the user submits a message. */
  onSend: (message: string) => void;
  /** Called when the user wants to stop a streaming response. */
  onStop?: () => void;
  /** Current chat status — controls send vs. stop button. */
  status?: AgentInputStatus;
  placeholder?: string;
  disabled?: boolean;
  /** Optional suggestion chips shown above the input. */
  suggestions?: AgentInputSuggestion[];
  /** Called when an attachment button is clicked. */
  onAttach?: () => void;
  /** Staged file names shown as chips inside the input area. */
  attachedFiles?: string[];
  /** Called when a staged file chip is removed. */
  onRemoveFile?: (filename: string) => void;
  className?: string;
};

const SEND_SPRING = {
  type: "spring",
  stiffness: 700,
  damping: 50,
  mass: 1,
} as const;

/** Auto-growing textarea that matches its content height. */
function AutoTextarea({
  value,
  onChange,
  onKeyDown,
  placeholder,
  disabled,
  inputRef,
  ...rest
}: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "ref"> & {
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
}) {
  const ref = inputRef ?? useRef<HTMLTextAreaElement>(null);

  // Sync height to content.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      placeholder={placeholder}
      className={cn(
        "w-full resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground",
        "disabled:opacity-60",
        "max-h-40 overflow-y-auto scrollbar-hide",
      )}
      {...rest}
    />
  );
}

export function AgentInput({
  onSend,
  onStop,
  status = "idle",
  placeholder = "Send a message…",
  disabled,
  suggestions,
  onAttach,
  attachedFiles = [],
  onRemoveFile,
  className,
}: AgentInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isStreaming = status === "streaming";
  const canSend = value.trim().length > 0 && !disabled && !isStreaming;

  const handleSend = useCallback(() => {
    const msg = value.trim();
    if (!msg || disabled || isStreaming) return;
    onSend(msg);
    setValue("");
  }, [value, disabled, isStreaming, onSend]);

  const handleStop = useCallback(() => {
    onStop?.();
  }, [onStop]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleActionClick = () => {
    if (isStreaming) {
      handleStop();
    } else {
      handleSend();
    }
  };

  return (
    <MotionConfig transition={SEND_SPRING}>
      <div className={cn("flex flex-col gap-2", className)}>
        {/* Suggestion chips */}
        <AnimatePresence>
          {suggestions && suggestions.length > 0 && !isStreaming && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="flex flex-wrap gap-1.5"
            >
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setValue(s.label);
                    textareaRef.current?.focus();
                  }}
                  className="inline-flex h-7 items-center rounded-full border border-border bg-card px-3 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-card/80 hover:text-foreground"
                >
                  {s.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input container */}
        <div
          className={cn(
            "relative rounded-2xl border border-border bg-card px-4 py-3 shadow-sm transition-colors focus-within:border-foreground/20",
            disabled && "opacity-60",
          )}
        >
          {/* Staged file chips */}
          <AnimatePresence>
            {attachedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-2 flex flex-wrap gap-1.5 overflow-hidden"
              >
                {attachedFiles.map((file) => (
                  <motion.span
                    key={file}
                    layout
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    className="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-background pl-2 pr-1 text-xs text-muted-foreground"
                  >
                    {file}
                    <button
                      type="button"
                      onClick={() => onRemoveFile?.(file)}
                      className="ml-0.5 flex items-center rounded p-0.5 text-muted-foreground/60 hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Row: attachment + textarea + send */}
          <div className="flex items-end gap-2">
            {onAttach && (
              <button
                type="button"
                onClick={onAttach}
                disabled={disabled || isStreaming}
                className="mb-0.5 shrink-0 rounded-lg p-1 text-muted-foreground/60 transition-colors hover:bg-foreground/[0.06] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <Paperclip className="size-4" />
              </button>
            )}

            <AutoTextarea
              inputRef={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled || isStreaming}
            />

            {/* Send / Stop button */}
            <motion.button
              type="button"
              onClick={handleActionClick}
              disabled={!isStreaming && !canSend}
              animate={{
                scale: canSend || isStreaming ? 1 : 0.9,
                opacity: canSend || isStreaming ? 1 : 0.35,
              }}
              whileTap={{ scale: 0.88 }}
              className={cn(
                "mb-0.5 flex size-7 shrink-0 items-center justify-center rounded-full transition-colors",
                isStreaming
                  ? "bg-foreground text-background"
                  : canSend
                    ? "bg-foreground text-background"
                    : "bg-foreground/[0.08] text-muted-foreground",
                "disabled:pointer-events-none",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isStreaming ? (
                  <motion.span
                    key="stop"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <Square className="size-3 fill-current" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <ArrowUp className="size-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
