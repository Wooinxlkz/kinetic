"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Check, X, Loader2, Clock, Search, Zap, FileText, Send, ChevronDown } from "lucide-react";
import { SPRING_LAYOUT, SPRING_PANEL, EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type AgentStepStatus = "pending" | "running" | "done" | "error";
export type AgentStepKind = "plan" | "search" | "call" | "write" | "send" | "custom";

export interface AgentStep {
  id: string;
  kind?: AgentStepKind;
  title: string;
  detail?: string;
  status: AgentStepStatus;
  duration?: string;
}

export interface AgentTimelineProps {
  steps: AgentStep[];
  title?: string;
  className?: string;
}

const KIND_ICONS: Record<AgentStepKind, React.ComponentType<{ className?: string }>> = {
  plan: Clock, search: Search, call: Zap, write: FileText, send: Send, custom: Zap,
};

function StatusDot({ status }: { status: AgentStepStatus }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "pending" && (
        <motion.div key="p" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} transition={SPRING_LAYOUT}
          className="h-5 w-5 rounded-full border-2 border-muted-foreground/25 bg-background" />
      )}
      {status === "running" && (
        <motion.div key="r" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} transition={SPRING_LAYOUT}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
          <Loader2 className="h-3 w-3 animate-spin text-primary" />
        </motion.div>
      )}
      {status === "done" && (
        <motion.div key="d" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}
          transition={{ type: "spring", stiffness: 650, damping: 20 }}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </motion.div>
      )}
      {status === "error" && (
        <motion.div key="e" initial={{ scale: 0 }} animate={{ scale: 1, x: [0, 4, -4, 0] }} exit={{ scale: 0.5 }}
          transition={{ type: "spring", stiffness: 650, damping: 20, x: { duration: 0.32 } }}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive">
          <X className="h-3 w-3 text-white" strokeWidth={3} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StepRow({ step, index, isLast, doneCount }: {
  step: AgentStep; index: number; isLast: boolean; doneCount: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = KIND_ICONS[step.kind ?? "custom"];
  const lineProgress = doneCount > index ? 1 : doneCount === index && step.status === "running" ? 0.45 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 32, delay: index * 0.055 }}
      className="flex gap-3"
    >
      {/* Spine */}
      <div className="flex flex-col items-center">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
          <StatusDot status={step.status} />
        </div>
        {!isLast && (
          <div className="relative mt-1 w-0.5 flex-1 overflow-hidden rounded-full bg-border">
            <motion.div
              className="absolute top-0 w-full rounded-full bg-primary"
              animate={{ height: `${lineProgress * 100}%` }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-5", isLast && "pb-0")}>
        <button
          type="button"
          onClick={() => step.detail && setExpanded((o) => !o)}
          className={cn("flex w-full items-start gap-2 text-left", step.detail ? "cursor-pointer" : "cursor-default")}
        >
          <Icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0 transition-colors",
            step.status === "pending" ? "text-muted-foreground/30" : "text-muted-foreground")} />

          <p className={cn("flex-1 text-sm font-medium leading-tight",
            step.status === "pending" ? "text-muted-foreground/40" : "text-foreground")}>
            {step.title}
          </p>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            {step.duration && step.status === "done" && (
              <span className="text-[11px] tabular-nums text-muted-foreground">{step.duration}</span>
            )}
            {step.status === "running" && (
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="text-[11px] font-medium text-primary"
              >running</motion.span>
            )}
            {step.detail && (
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="text-muted-foreground/40">
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </div>
        </button>

        <AnimatePresence>
          {expanded && step.detail && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <p className="mt-1.5 rounded-lg bg-muted/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                {step.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function AgentTimeline({ steps, title = "Agent execution", className }: AgentTimelineProps) {
  const doneCount = steps.filter((s) => s.status === "done").length;
  const running = steps.find((s) => s.status === "running");
  const allDone = doneCount === steps.length;
  const hasError = steps.some((s) => s.status === "error");

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <motion.span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
            allDone ? "bg-emerald-500/10 text-emerald-600"
              : hasError ? "bg-destructive/10 text-destructive"
              : running ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground",
          )}
          animate={{ opacity: running ? [0.65, 1, 0.65] : 1 }}
          transition={{ duration: 1.5, repeat: running ? Infinity : 0 }}
        >
          {allDone ? "Completed" : hasError ? "Error" : running ? "Running…" : `${doneCount}/${steps.length}`}
        </motion.span>
      </div>

      <div className="flex flex-col">
        {steps.map((step, i) => (
          <StepRow key={step.id} step={step} index={i} isLast={i === steps.length - 1} doneCount={doneCount} />
        ))}
      </div>
    </div>
  );
}
