"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { SPRING_PRESS, SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface StarterPrompt {
  id: string;
  title: string;
  description: string;
  category?: string;
  icon?: string;
}

export interface ConversationStarterProps {
  prompts: StarterPrompt[];
  onSelect?: (prompt: StarterPrompt) => void;
  title?: string;
  className?: string;
}

const CARD_COLORS = [
  "border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10",
  "border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10",
  "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10",
  "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10",
  "border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10",
  "border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10",
];

const ARROW_COLORS = [
  "text-blue-500", "text-violet-500", "text-amber-500",
  "text-emerald-500", "text-rose-500", "text-cyan-500",
];

export function ConversationStarter({
  prompts,
  onSelect,
  title = "What would you like to explore?",
  className,
}: ConversationStarterProps) {
  const [flash, setFlash] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const handleSelect = (prompt: StarterPrompt) => {
    setFlash(prompt.id);
    onSelect?.(prompt);
    setTimeout(() => setFlash(null), 500);
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Header */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={reduce ? { duration: 0.2 } : SPRING_PANEL}
        className="flex flex-col items-center gap-3 text-center"
      >
        <motion.div
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10"
          animate={reduce ? {} : {
            rotate: [0, -8, 8, -4, 4, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
        >
          <Sparkles className="h-5 w-5 text-primary" />
        </motion.div>
        <div>
          <p className="text-base font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Pick a prompt to get started</p>
        </div>
      </motion.div>

      {/* Prompt grid */}
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {prompts.map((prompt, i) => (
          <motion.button
            key={prompt.id}
            type="button"
            onClick={() => handleSelect(prompt)}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={reduce
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 380, damping: 30, delay: 0.05 + i * 0.07 }}
            whileHover={reduce ? {} : { y: -3, scale: 1.015 }}
            whileTap={reduce ? {} : { scale: 0.97 }}
            className={cn(
              "group flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors focus:outline-none",
              CARD_COLORS[i % CARD_COLORS.length],
              flash === prompt.id && "ring-2 ring-primary ring-offset-2",
            )}
          >
            {prompt.icon && (
              <span className="text-xl leading-none">{prompt.icon}</span>
            )}
            <div className="flex w-full items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                {prompt.category && (
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {prompt.category}
                  </p>
                )}
                <p className="text-sm font-semibold text-foreground">{prompt.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{prompt.description}</p>
              </div>
              <motion.span
                className={cn(
                  "mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                  ARROW_COLORS[i % ARROW_COLORS.length],
                )}
                animate={flash === prompt.id ? { x: 6, opacity: 1 } : {}}
                transition={SPRING_LAYOUT}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
