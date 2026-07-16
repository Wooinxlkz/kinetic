"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Check, Copy, ChevronDown, Plus, Minus, Equal } from "lucide-react";
import { SPRING_LAYOUT, EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type DiffLineKind = "add" | "remove" | "unchanged" | "hunk";

export interface DiffLine {
  kind: DiffLineKind;
  content: string;
  oldNo?: number;
  newNo?: number;
}

export interface DiffViewerProps {
  lines: DiffLine[];
  filename?: string;
  language?: string;
  collapseUnchanged?: number; // collapse runs of unchanged lines longer than N
  className?: string;
}

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

const LINE_STYLES: Record<DiffLineKind, string> = {
  add:       "bg-emerald-500/10 border-l-2 border-emerald-500",
  remove:    "bg-destructive/8 border-l-2 border-destructive",
  unchanged: "border-l-2 border-transparent",
  hunk:      "bg-primary/5 border-l-2 border-primary/30",
};

const LINE_GUTTER: Record<DiffLineKind, string> = {
  add:       "text-emerald-500",
  remove:    "text-destructive",
  unchanged: "text-muted-foreground/40",
  hunk:      "text-primary/40",
};

const KIND_ICON: Record<DiffLineKind, React.ComponentType<{ className?: string }> | null> = {
  add: Plus, remove: Minus, unchanged: null, hunk: null,
};

interface LineGroup {
  kind: "lines" | "collapsed";
  lines?: DiffLine[];
  count?: number;
}

function groupLines(lines: DiffLine[], threshold: number): LineGroup[] {
  const groups: LineGroup[] = [];
  let run: DiffLine[] = [];

  const flush = (ls: DiffLine[]) => {
    if (ls.length === 0) return;
    if (ls.every((l) => l.kind === "unchanged") && ls.length > threshold) {
      groups.push({ kind: "collapsed", count: ls.length });
    } else {
      groups.push({ kind: "lines", lines: ls });
    }
  };

  for (const line of lines) {
    if (line.kind === "hunk") { flush(run); run = []; groups.push({ kind: "lines", lines: [line] }); }
    else { run.push(line); }
  }
  flush(run);
  return groups;
}

function DiffLineRow({ line, index, total }: { line: DiffLine; index: number; total: number }) {
  const reduce = useReducedMotion();
  const Icon = KIND_ICON[line.kind];

  return (
    <motion.div
      initial={
        reduce
          ? { opacity: 0 }
          : line.kind === "add"
          ? { opacity: 0, x: 10, backgroundColor: "rgba(34,197,94,0.25)" }
          : line.kind === "remove"
          ? { opacity: 0, x: -10 }
          : { opacity: 0 }
      }
      animate={
        reduce
          ? { opacity: 1 }
          : line.kind === "add"
          ? { opacity: 1, x: 0, backgroundColor: "rgba(34,197,94,0)" }
          : { opacity: 1, x: 0 }
      }
      transition={
        reduce
          ? { duration: 0.1 }
          : { type: "spring", stiffness: 400, damping: 30, delay: Math.min(index * 0.018, 0.4) }
      }
      className={cn("group flex items-start gap-0", LINE_STYLES[line.kind])}
    >
      {/* Gutter numbers */}
      <div className={cn("flex w-16 shrink-0 select-none items-center gap-1 px-2 py-0.5 font-mono text-[11px]", LINE_GUTTER[line.kind])}>
        <span className="w-5 text-right">{line.oldNo ?? ""}</span>
        <span className="w-5 text-right">{line.newNo ?? ""}</span>
        <span className="w-4 text-center">
          {Icon ? <Icon className="h-3 w-3" /> : null}
        </span>
      </div>

      {/* Code */}
      <pre className={cn(
        "flex-1 overflow-x-auto py-0.5 pr-4 font-mono text-[12.5px] leading-relaxed",
        line.kind === "add" ? "text-emerald-700 dark:text-emerald-300"
          : line.kind === "remove" ? "text-destructive/80"
          : line.kind === "hunk" ? "text-primary/60 italic"
          : "text-foreground",
      )}>
        {line.content}
      </pre>
    </motion.div>
  );
}

export function DiffViewer({
  lines,
  filename,
  language,
  collapseUnchanged = 4,
  className,
}: DiffViewerProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());
  const reduce = useReducedMotion();

  const addedCount = lines.filter((l) => l.kind === "add").length;
  const removedCount = lines.filter((l) => l.kind === "remove").length;
  const allCode = lines.filter((l) => l.kind !== "hunk").map((l) => l.content).join("\n");
  const { copied, copy } = useCopy(allCode);

  const groups = groupLines(lines, collapseUnchanged);

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-[#0d1117] shadow-2xl", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/8 bg-white/4 px-4 py-2.5">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
            <div key={i} className="h-3 w-3 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>

        {filename && (
          <span className="ml-1 font-mono text-xs text-white/50">{filename}</span>
        )}
        {language && (
          <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/40">
            {language}
          </span>
        )}

        {/* Stats */}
        <div className="ml-auto flex items-center gap-3">
          {addedCount > 0 && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_LAYOUT, delay: 0.1 }}
              className="flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-400"
            >
              <Plus className="h-3 w-3" />
              {addedCount}
            </motion.span>
          )}
          {removedCount > 0 && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_LAYOUT, delay: 0.14 }}
              className="flex items-center gap-1 font-mono text-[11px] font-semibold text-destructive"
            >
              <Minus className="h-3 w-3" />
              {removedCount}
            </motion.span>
          )}
          <motion.button
            type="button"
            onClick={copy}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING_LAYOUT}
            className="flex h-6 w-6 items-center justify-center rounded-md text-white/40 hover:bg-white/10 hover:text-white/80 focus:outline-none"
          >
            <AnimatePresence mode="wait">
              {copied
                ? <motion.span key="c" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} transition={SPRING_LAYOUT}><Check className="h-3.5 w-3.5 text-emerald-400" /></motion.span>
                : <motion.span key="cp" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} transition={SPRING_LAYOUT}><Copy className="h-3.5 w-3.5" /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Diff body */}
      <div className="max-h-96 overflow-auto">
        {groups.map((group, gi) => {
          if (group.kind === "lines" && group.lines) {
            const offset = groups.slice(0, gi).reduce((s, g) => s + (g.lines?.length ?? 0), 0);
            return group.lines.map((line, li) => (
              <DiffLineRow key={`${gi}-${li}`} line={line} index={offset + li} total={lines.length} />
            ));
          }

          // collapsed group
          const isExpanded = expandedGroups.has(gi);
          return (
            <motion.button
              key={`collapse-${gi}`}
              type="button"
              onClick={() => setExpandedGroups((s) => { const n = new Set(s); n.has(gi) ? n.delete(gi) : n.add(gi); return n; })}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="flex w-full items-center gap-2 border-l-2 border-transparent px-4 py-1 text-left focus:outline-none"
            >
              <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={SPRING_LAYOUT}>
                <ChevronDown className="h-3 w-3 text-white/30" />
              </motion.span>
              <span className="font-mono text-[11px] text-white/30">
                {group.count} unchanged lines
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
