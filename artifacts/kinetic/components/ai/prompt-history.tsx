"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Clock, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface PromptHistoryItem {
  id: string;
  prompt: string;
  timestamp?: string;
}

export interface PromptHistoryProps {
  items: PromptHistoryItem[];
  onSelect?: (item: PromptHistoryItem) => void;
  maxVisible?: number;
  className?: string;
}

/**
 * Collapsible list of previous AI prompts with spring reveal.
 * Click an item to reuse it via onSelect.
 */
export function PromptHistory({
  items,
  onSelect,
  maxVisible = 4,
  className,
}: PromptHistoryProps) {
  const [open, setOpen] = useState(false);
  const visible = open ? items : items.slice(0, maxVisible);

  return (
    <div className={cn("w-full rounded-xl border border-border bg-card", className)}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left"
      >
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="flex-1 text-sm font-medium text-foreground">Recent prompts</span>
        <span className="text-xs text-muted-foreground">{items.length}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>

      {/* List */}
      <div className="overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key="list"
            layout
            className="divide-y divide-border border-t border-border"
          >
            {visible.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT, delay: i * 0.03 }}
                onClick={() => onSelect?.(item)}
                className="group flex w-full items-start gap-3 px-4 py-2.5 text-left hover:bg-muted/60 transition-colors"
              >
                <CornerDownLeft className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                <span className="flex-1 min-w-0">
                  <span className="block truncate text-sm text-foreground/80 group-hover:text-foreground">
                    {item.prompt}
                  </span>
                  {item.timestamp ? (
                    <span className="text-[11px] text-muted-foreground/60">{item.timestamp}</span>
                  ) : null}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Show more / less */}
      {items.length > maxVisible && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full px-4 py-2 text-center text-xs text-muted-foreground hover:text-foreground border-t border-border transition-colors"
        >
          {open ? "Show less" : `Show ${items.length - maxVisible} more`}
        </button>
      )}
    </div>
  );
}
