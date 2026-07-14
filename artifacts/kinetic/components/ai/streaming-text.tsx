"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Hook                                                                 */
/* ------------------------------------------------------------------ */

export type UseStreamingTextOptions = {
  /** Characters revealed per second. Default: 60. */
  speed?: number;
  /** Called once when the full text has been revealed. */
  onComplete?: () => void;
};

export type StreamingTextState = {
  displayed: string;
  done: boolean;
};

/**
 * Reveals a target string character-by-character at a configurable speed.
 * Tracks the previous target so it only streams the *new* suffix when the
 * target string grows (simulating streaming token arrival).
 */
export function useStreamingText(
  target: string,
  options: UseStreamingTextOptions = {},
): StreamingTextState {
  const { speed = 60, onComplete } = options;
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (displayed.length >= target.length) {
      if (!done) {
        setDone(true);
        onCompleteRef.current?.();
      }
      return;
    }

    setDone(false);
    const ms = Math.max(8, 1000 / speed);

    intervalRef.current = setInterval(() => {
      setDisplayed((prev) => {
        if (prev.length >= target.length) {
          clearInterval(intervalRef.current!);
          setDone(true);
          onCompleteRef.current?.();
          return prev;
        }
        return target.slice(0, prev.length + 1);
      });
    }, ms);

    return () => clearInterval(intervalRef.current!);
  }, [target, speed]); // eslint-disable-line react-hooks/exhaustive-deps

  return { displayed, done };
}

/* ------------------------------------------------------------------ */
/* Blinking cursor                                                      */
/* ------------------------------------------------------------------ */

export function StreamingCursor({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "ml-0.5 inline-block h-[1em] w-[2px] translate-y-[1px] rounded-sm bg-current align-middle",
        className,
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* StreamingText component                                              */
/* ------------------------------------------------------------------ */

export type StreamingTextProps = {
  /** The full target string to stream. May grow over time (append-only). */
  text: string;
  /** Characters revealed per second. Default: 60. */
  speed?: number;
  /** Show a blinking cursor while streaming. Default: true. */
  showCursor?: boolean;
  /** Called once all text has been revealed. */
  onComplete?: () => void;
  className?: string;
};

export function StreamingText({
  text,
  speed = 60,
  showCursor = true,
  onComplete,
  className,
}: StreamingTextProps) {
  const { displayed, done } = useStreamingText(text, { speed, onComplete });

  return (
    <span className={cn("inline", className)}>
      {displayed}
      <AnimatePresence>
        {showCursor && !done && (
          <motion.span
            key="cursor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <StreamingCursor />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* TokenStream — word-level reveal (feels like GPT streaming)          */
/* ------------------------------------------------------------------ */

export type TokenStreamProps = {
  /** Array of tokens to reveal sequentially. */
  tokens: string[];
  /** Delay in ms between each token. Default: 60. */
  delay?: number;
  /** Show a blinking cursor after the last token. Default: true. */
  showCursor?: boolean;
  className?: string;
};

export function TokenStream({
  tokens,
  delay = 60,
  showCursor = true,
  className,
}: TokenStreamProps) {
  const [count, setCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (count >= tokens.length) return;
    timerRef.current = setTimeout(() => {
      setCount((n) => n + 1);
    }, delay);
    return () => clearTimeout(timerRef.current!);
  }, [count, tokens.length, delay]);

  const done = count >= tokens.length;
  const displayed = tokens.slice(0, count).join("");

  return (
    <span className={cn("inline", className)}>
      {displayed}
      <AnimatePresence>
        {showCursor && !done && (
          <motion.span
            key="cursor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StreamingCursor />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
