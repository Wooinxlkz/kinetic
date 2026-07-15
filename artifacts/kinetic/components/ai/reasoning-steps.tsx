"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, Loader2, Circle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPRING_PANEL, SPRING_LAYOUT, EASE_OUT } from "@/lib/ease";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export type StepStatus = "pending" | "running" | "done" | "error";

export interface ReasoningStep {
  id: string;
  title: string;
  body?: string;
  status: StepStatus;
}

export interface ReasoningStepsProps {
  steps: ReasoningStep[];
  defaultOpen?: boolean;
  title?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Status icon                                                          */
/* ------------------------------------------------------------------ */

function StepStatusIcon({ status }: { status: StepStatus }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "running" && (
        <motion.span
          key="running"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={SPRING_PANEL}
        >
          <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
        </motion.span>
      )}
      {status === "done" && (
        <motion.span
          key="done"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={SPRING_PANEL}
        >
          <CheckCircle2 className="size-3.5 text-emerald-500" />
        </motion.span>
      )}
      {status === "error" && (
        <motion.span
          key="error"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, x: [0, 4, -4, 4, 0] }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ ...SPRING_PANEL, x: { duration: 0.35, ease: "easeInOut" } }}
        >
          <XCircle className="size-3.5 text-destructive" />
        </motion.span>
      )}
      {status === "pending" && (
        <motion.span
          key="pending"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={SPRING_PANEL}
        >
          <Circle className="size-3.5 text-muted-foreground/40" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Individual step row                                                  */
/* ------------------------------------------------------------------ */

function StepRow({ step, index }: { step: ReasoningStep; index: number }) {
  const [bodyOpen, setBodyOpen] = useState(false);
  const hasBody = !!step.body;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_LAYOUT, delay: index * 0.06 }}
      className="flex flex-col"
    >
      <button
        type="button"
        onClick={() => hasBody && setBodyOpen((o) => !o)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors",
          hasBody ? "cursor-pointer hover:bg-foreground/[0.04]" : "cursor-default",
        )}
      >
        <span className="flex shrink-0 items-center justify-center size-4">
          <StepStatusIcon status={step.status} />
        </span>
        <span className={cn(
          "flex-1 text-sm",
          step.status === "pending" ? "text-muted-foreground" : "text-foreground",
        )}>
          {step.title}
        </span>
        {hasBody && (
          <motion.span
            animate={{ rotate: bodyOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 38 }}
            className="shrink-0 text-muted-foreground/40"
          >
            <ChevronDown className="size-3.5" />
          </motion.span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {bodyOpen && step.body && (
          <motion.div
            key="step-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING_PANEL}
            style={{ overflow: "hidden" }}
          >
            <p className="mx-3 mb-2 mt-1 rounded-md bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* ReasoningSteps                                                       */
/* ------------------------------------------------------------------ */

export function ReasoningSteps({
  steps,
  defaultOpen = false,
  title = "Reasoning",
  className,
}: ReasoningStepsProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const update = () => setContentHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [steps]);

  return (
    <div className={cn("rounded-2xl border border-border bg-card", className)}>
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-foreground/[0.03]"
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 38 }}
          className="text-muted-foreground/50"
        >
          <ChevronDown className="size-4" />
        </motion.span>
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {open ? "Hide reasoning" : "Show reasoning"}
        </span>
      </button>

      {/* Animated height wrapper */}
      <motion.div
        animate={{ height: open ? contentHeight : 0, opacity: open ? 1 : 0 }}
        transition={{ ease: EASE_OUT, duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div ref={contentRef} className="border-t border-border px-1 py-2">
          <AnimatePresence initial={false}>
            {steps.map((step, i) => (
              <StepRow key={step.id} step={step} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
