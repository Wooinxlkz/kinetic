"use client";

import { type ElementType, useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export interface TextScrambleProps {
  text: string;
  /** Characters used during scramble. Defaults to alphanumeric + symbols. */
  characters?: string;
  /** Duration of the scramble effect in ms. */
  duration?: number;
  /** Delay before scramble starts (ms). */
  delay?: number;
  /** Trigger: 'mount' runs once on mount, 'hover' runs on mouse enter. */
  trigger?: "mount" | "hover";
  as?: ElementType;
  className?: string;
}

export function TextScramble({
  text,
  characters = DEFAULT_CHARS,
  duration = 600,
  delay = 0,
  trigger = "mount",
  as: Tag = "span",
  className,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(trigger === "mount" ? "" : text);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now();
      const totalFrames = Math.max(1, Math.round((duration / 1000) * 60));

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Reveal chars left-to-right as progress increases
        const revealedCount = Math.floor(progress * text.length);

        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            result += " ";
          } else if (i < revealedCount) {
            result += text[i];
          } else {
            result += characters[Math.floor(Math.random() * characters.length)];
          }
        }
        setDisplay(result);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          setDisplay(text);
        }
      };

      frameRef.current = requestAnimationFrame(step);
    }, delay);
  }, [text, characters, duration, delay]);

  // Run on mount
  useEffect(() => {
    if (trigger === "mount") scramble();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [trigger, scramble]);

  // Re-run when text changes (mount mode)
  useEffect(() => {
    if (trigger === "mount") scramble();
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  const hoverProps =
    trigger === "hover"
      ? { onMouseEnter: scramble }
      : {};

  return (
    <Tag
      className={cn("font-mono", className)}
      {...hoverProps}
    >
      {display || "\u00A0"}
    </Tag>
  );
}
