"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface SuggestionChip {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SuggestionChipsProps {
  chips: SuggestionChip[];
  onSelect?: (chip: SuggestionChip) => void;
  className?: string;
}

/**
 * Horizontally scrollable prompt suggestion chips for AI interfaces.
 * Each chip springs in with stagger and scales on hover/tap.
 */
export function SuggestionChips({ chips, onSelect, className }: SuggestionChipsProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto scrollbar-hide pb-1",
        className,
      )}
    >
      <AnimatePresence initial={true}>
        {chips.map((chip, i) => (
          <motion.button
            key={chip.id}
            type="button"
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.22,
              ease: EASE_OUT,
              delay: i * 0.04,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect?.(chip)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            {chip.icon ? (
              <span className="shrink-0 text-muted-foreground">{chip.icon}</span>
            ) : null}
            {chip.label}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
