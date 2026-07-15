"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Brain, X, ChevronDown } from "lucide-react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type MemoryCategory = "fact" | "preference" | "context" | "goal" | "custom";

export interface MemoryChip {
  id: string;
  content: string;
  category?: MemoryCategory;
  snippet?: string;
  relevance?: number;
}

export interface ContextMemoryProps {
  memories: MemoryChip[];
  onDismiss?: (id: string) => void;
  title?: string;
  className?: string;
}

const CAT_STYLES: Record<MemoryCategory, string> = {
  fact:       "border-blue-500/20   bg-blue-500/5   text-blue-700   dark:text-blue-400",
  preference: "border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-400",
  context:    "border-amber-500/20  bg-amber-500/5  text-amber-700  dark:text-amber-400",
  goal:       "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400",
  custom:     "border-border bg-muted text-muted-foreground",
};

const CAT_LABELS: Record<MemoryCategory, string> = {
  fact: "Fact", preference: "Preference", context: "Context", goal: "Goal", custom: "Memory",
};

function Chip({ chip, onDismiss, index }: { chip: MemoryChip; onDismiss?: (id: string) => void; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();
  const cat = chip.category ?? "custom";

  return (
    <motion.div
      layout
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.82, filter: "blur(6px)" }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 460, damping: 30, delay: index * 0.05 } }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, x: -10, filter: "blur(6px)", transition: { duration: 0.18 } }}
      className={cn("group relative rounded-xl border p-3", CAT_STYLES[cat])}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              {CAT_LABELS[cat]}
            </span>
            {chip.relevance !== undefined && (
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-12 overflow-hidden rounded-full bg-current/15">
                  <motion.div
                    className="h-full rounded-full bg-current"
                    initial={{ width: 0 }}
                    animate={{ width: `${chip.relevance * 100}%` }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 + 0.15 }}
                  />
                </div>
                <span className="text-[10px] tabular-nums opacity-50">{Math.round(chip.relevance * 100)}%</span>
              </div>
            )}
          </div>
          <p className="text-sm font-medium leading-snug">{chip.content}</p>

          {chip.snippet && (
            <>
              <button
                type="button"
                onClick={() => setExpanded((o) => !o)}
                className="mt-1.5 flex items-center gap-0.5 text-[11px] opacity-50 hover:opacity-80 focus:outline-none transition-opacity"
              >
                <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                  <ChevronDown className="h-3 w-3" />
                </motion.span>
                {expanded ? "Hide" : "Show context"}
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-1 overflow-hidden text-[11px] italic leading-relaxed opacity-60"
                  >
                    {chip.snippet}
                  </motion.p>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {onDismiss && (
          <motion.button
            type="button"
            onClick={() => onDismiss(chip.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            transition={SPRING_LAYOUT}
            className="shrink-0 rounded-md p-0.5 opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100 focus:outline-none"
          >
            <X className="h-3 w-3" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export function ContextMemory({ memories, onDismiss, title = "Retrieved memories", className }: ContextMemoryProps) {
  const [chips, setChips] = useState(memories);

  const dismiss = (id: string) => {
    setChips((c) => c.filter((m) => m.id !== id));
    onDismiss?.(id);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={chips.length}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={SPRING_LAYOUT}
            className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground"
          >
            {chips.length}
          </motion.span>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="popLayout">
        {chips.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            No memories retrieved for this query.
          </motion.p>
        ) : (
          chips.map((chip, i) => (
            <Chip key={chip.id} chip={chip} onDismiss={onDismiss ? dismiss : undefined} index={i} />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
