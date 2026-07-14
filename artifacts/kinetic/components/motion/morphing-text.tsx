"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface MorphingTextProps {
  /** List of strings to cycle through. */
  texts: string[];
  className?: string;
  /** Milliseconds between word changes. Default 2800. */
  interval?: number;
}

/**
 * Auto-cycles through a list of words. Each character blurs in from below
 * and blurs out upward with a staggered delay, creating a melting-and-
 * reforming morph effect. Use it in hero headings to rotate through
 * value props or keywords.
 */
export function MorphingText({ texts, className, interval = 2800 }: MorphingTextProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), interval);
    return () => clearInterval(id);
  }, [texts.length, interval]);

  const word = texts[index] ?? "";

  if (reduce) {
    return (
      <span className={cn("inline-block", className)} aria-live="polite">
        {word}
      </span>
    );
  }

  return (
    <span
      className={cn("inline-block", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="popLayout">
        <motion.span key={index} className="inline-block whitespace-nowrap">
          {word.split("").map((char, i) => (
            <motion.span
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, filter: "blur(8px)", y: 4 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(8px)", y: -4 }}
              transition={{ duration: 0.35, delay: i * 0.028, ease: EASE_OUT }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
