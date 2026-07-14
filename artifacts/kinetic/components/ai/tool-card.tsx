"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import {
  Terminal,
  FileEdit,
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export type ToolStatus = "running" | "done" | "error";

export type ToolCardProps = {
  /** Tool name displayed in the header (e.g. "Bash", "Edit", "Search"). */
  name: string;
  /** Lucide icon to show left of the name. Defaults to Terminal. */
  icon?: LucideIcon;
  /** Current status of the tool invocation. */
  status?: ToolStatus;
  /** Short label shown inside the header (e.g. the command or file path). */
  label?: string;
  /** Raw input shown in the expanded body. */
  input?: string;
  /** Output shown in the expanded body once done. */
  output?: string;
  /** Error message shown when status is "error". */
  error?: string;
  /** Start collapsed or expanded. Default: true (collapsed when done). */
  defaultOpen?: boolean;
  className?: string;
};

/* ------------------------------------------------------------------ */
/* Status dot + icon                                                    */
/* ------------------------------------------------------------------ */

function StatusIcon({ status }: { status: ToolStatus }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "running" && (
        <motion.span
          key="running"
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
          transition={{ type: "spring", stiffness: 600, damping: 40 }}
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
          transition={{ type: "spring", stiffness: 700, damping: 45 }}
        >
          <CheckCircle2 className="size-3.5 text-green-500" />
        </motion.span>
      )}
      {status === "error" && (
        <motion.span
          key="error"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 700, damping: 45 }}
        >
          <XCircle className="size-3.5 text-destructive" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Code block inside the card                                          */
/* ------------------------------------------------------------------ */

function InlineCode({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl bg-background px-3.5 py-3 text-xs leading-relaxed text-foreground/80 scrollbar-hide",
        className,
      )}
    >
      <code>{children}</code>
    </pre>
  );
}

/* ------------------------------------------------------------------ */
/* ToolCard                                                             */
/* ------------------------------------------------------------------ */

const KNOWN_ICONS: Record<string, LucideIcon> = {
  bash: Terminal,
  terminal: Terminal,
  edit: FileEdit,
  write: FileEdit,
  search: Search,
};

export function ToolCard({
  name,
  icon: IconProp,
  status = "running",
  label,
  input,
  output,
  error,
  defaultOpen,
  className,
}: ToolCardProps) {
  const reduce = useReducedMotion();
  const resolvedDefault = defaultOpen ?? status !== "done";
  const [open, setOpen] = useState(resolvedDefault);

  const Icon =
    IconProp ??
    KNOWN_ICONS[name.toLowerCase()] ??
    Terminal;

  const hasBody = !!(input ?? output ?? error);

  const spring = { type: "spring", stiffness: 400, damping: 38, mass: 0.8 } as const;

  return (
    <MotionConfig transition={reduce ? { duration: 0 } : spring}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border bg-card",
          className,
        )}
      >
        {/* Header */}
        <button
          type="button"
          onClick={() => hasBody && setOpen((o) => !o)}
          className={cn(
            "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors",
            hasBody
              ? "cursor-pointer hover:bg-foreground/[0.03]"
              : "cursor-default",
          )}
        >
          {/* Tool icon */}
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-foreground/[0.06] text-muted-foreground">
            <Icon className="size-3.5" />
          </span>

          {/* Name + label */}
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-xs font-semibold text-foreground">{name}</span>
            {label && (
              <span className="truncate font-mono text-[11px] text-muted-foreground">
                {label}
              </span>
            )}
          </span>

          {/* Status icon */}
          <span className="flex shrink-0 items-center gap-1.5">
            <StatusIcon status={status} />
            {hasBody && (
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className="text-muted-foreground/50"
              >
                <ChevronDown className="size-3.5" />
              </motion.span>
            )}
          </span>
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {open && hasBody && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: "hidden" }}
            >
              <div className="flex flex-col gap-2 border-t border-border px-3.5 py-3">
                {input && (
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Input
                    </p>
                    <InlineCode>{input}</InlineCode>
                  </div>
                )}
                {output && status === "done" && (
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Output
                    </p>
                    <InlineCode>{output}</InlineCode>
                  </div>
                )}
                {error && status === "error" && (
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-destructive/60">
                      Error
                    </p>
                    <InlineCode className="border border-destructive/20 text-destructive">
                      {error}
                    </InlineCode>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
