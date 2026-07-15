"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  maxTags?: number;
  className?: string;
}

export function TagInput({
  value = [],
  onChange,
  suggestions = [],
  placeholder = "Add tag…",
  maxTags = 10,
  className,
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = useCallback((raw: string) => {
    const tag = raw.trim().toLowerCase();
    if (!tag || value.includes(tag) || value.length >= maxTags) return;
    onChange?.([...value, tag]);
    setInput("");
  }, [value, onChange, maxTags]);

  const removeTag = useCallback((tag: string) => {
    onChange?.(value.filter((t) => t !== tag));
  }, [value, onChange]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const suggestions_filtered = suggestions
    .filter((s) => !value.includes(s) && s.toLowerCase().includes(input.toLowerCase()) && input.length > 0)
    .slice(0, 5);

  const TAG_VARIANTS = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, filter: "blur(4px)" },
    animate: reduce
      ? { opacity: 1 }
      : { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 } },
    exit: reduce
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.7, x: -6, filter: "blur(4px)", transition: { duration: 0.13 } },
  };

  return (
    <div className={cn("relative", className)}>
      <motion.div
        animate={{ boxShadow: focused ? "0 0 0 2px hsl(var(--ring))" : "none" }}
        transition={{ duration: 0.15 }}
        onClick={() => inputRef.current?.focus()}
        className="flex min-h-10 flex-wrap gap-1.5 rounded-xl border border-border bg-background px-2.5 py-2 cursor-text transition-colors"
      >
        <AnimatePresence initial={false}>
          {value.map((tag) => (
            <motion.span
              key={tag}
              layout
              variants={TAG_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
              <motion.button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.85 }}
                transition={SPRING_LAYOUT}
                className="flex items-center justify-center rounded-full text-primary/50 hover:text-primary focus:outline-none"
              >
                <X className="h-3 w-3" />
              </motion.button>
            </motion.span>
          ))}
        </AnimatePresence>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={value.length >= maxTags}
          className="min-w-24 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
        />
      </motion.div>

      {/* Suggestions */}
      <AnimatePresence>
        {suggestions_filtered.length > 0 && focused && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97, filter: "blur(4px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97, filter: "blur(4px)" }}
            transition={reduce ? { duration: 0.12 } : SPRING_PANEL}
            className="absolute left-0 top-full z-50 mt-1.5 w-full rounded-xl border border-border bg-popover p-1 shadow-xl"
          >
            {suggestions_filtered.map((s, i) => (
              <motion.button
                key={s}
                type="button"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING_LAYOUT, delay: i * 0.03 }}
                onMouseDown={(e) => { e.preventDefault(); addTag(s); }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm text-foreground hover:bg-accent focus:outline-none"
              >
                <span className="text-muted-foreground">#</span>
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-1.5 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Press Enter or comma to add</p>
        {maxTags && (
          <p className={cn("text-xs tabular-nums", value.length >= maxTags ? "text-destructive" : "text-muted-foreground")}>
            {value.length}/{maxTags}
          </p>
        )}
      </div>
    </div>
  );
}
