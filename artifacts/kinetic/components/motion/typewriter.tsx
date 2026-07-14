"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TypewriterProps {
  /** Array of strings to cycle through. */
  words: string[];
  /** Milliseconds per character when typing. */
  typingSpeed?: number;
  /** Milliseconds per character when deleting. */
  deletingSpeed?: number;
  /** Milliseconds to pause after fully typed. */
  pauseDuration?: number;
  /** Whether to show the blinking cursor. */
  showCursor?: boolean;
  className?: string;
  cursorClassName?: string;
}

export function Typewriter({
  words,
  typingSpeed = 75,
  deletingSpeed = 35,
  pauseDuration = 1800,
  showCursor = true,
  className,
  cursorClassName,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );

  useEffect(() => {
    if (!words.length) return;
    const word = words[wordIdx % words.length];

    if (phase === "typing") {
      if (displayed.length < word.length) {
        const t = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          typingSpeed,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pauseDuration);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      setPhase("deleting");
      return;
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed((d) => d.slice(0, -1)),
          deletingSpeed,
        );
        return () => clearTimeout(t);
      }
      setWordIdx((i) => (i + 1) % words.length);
      setPhase("typing");
    }
  }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={cn("inline-flex items-baseline gap-px", className)}>
      <span>{displayed}</span>
      {showCursor && (
        <motion.span
          aria-hidden
          className={cn(
            "ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[1px] rounded-full bg-current",
            cursorClassName,
          )}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
      )}
    </span>
  );
}
