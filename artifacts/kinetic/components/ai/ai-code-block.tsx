"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Play, Square, RotateCcw, Terminal } from "lucide-react";
import { SPRING_PRESS, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

function useTypewriter(text: string, active: boolean, speed = 16) {
  const [displayed, setDisplayed] = useState(active ? "" : text);
  const [done, setDone] = useState(!active);
  const idx = useRef(0);

  useEffect(() => {
    if (!active) { setDisplayed(text); setDone(true); return; }
    setDisplayed(""); setDone(false); idx.current = 0;
    const tick = () => {
      idx.current++;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current < text.length) setTimeout(tick, speed);
      else setDone(true);
    };
    const t = setTimeout(tick, 100);
    return () => clearTimeout(t);
  }, [text, active, speed]);

  return { displayed, done };
}

export interface AiCodeBlockProps {
  code: string;
  language?: string;
  streaming?: boolean;
  onRun?: () => void | Promise<void>;
  output?: string;
  className?: string;
}

export function AiCodeBlock({
  code,
  language = "typescript",
  streaming = false,
  onRun,
  output,
  className,
}: AiCodeBlockProps) {
  const { displayed, done: streamDone } = useTypewriter(code, streaming);
  const { copied, copy } = useCopy(code);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const reduce = useReducedMotion();
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (streaming && codeRef.current) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [displayed, streaming]);

  const handleRun = async () => {
    if (running || ran) return;
    setRunning(true);
    await onRun?.();
    setTimeout(() => {
      setRunning(false);
      setRan(true);
      if (output) setShowOutput(true);
    }, 1400);
  };

  const reset = () => { setRan(false); setShowOutput(false); };

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-[#0d1117] shadow-2xl", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/4 px-4 py-2.5">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div key={i} className="h-3 w-3 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>

        {/* Language badge */}
        <motion.span
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -6, filter: "blur(4px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ ...SPRING_LAYOUT, delay: 0.08 }}
          className="ml-2 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/50"
        >
          {language}
        </motion.span>

        {/* Streaming badge */}
        <AnimatePresence>
          {streaming && !streamDone && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={SPRING_LAYOUT}
              className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400"
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.85, repeat: Infinity }}
              />
              streaming
            </motion.span>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1.5">
          {/* Copy */}
          <motion.button
            type="button"
            onClick={copy}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING_PRESS}
            title="Copy"
            className="flex h-6 w-6 items-center justify-center rounded-md text-white/40 hover:bg-white/10 hover:text-white/80 focus:outline-none"
          >
            <AnimatePresence mode="wait">
              {copied
                ? <motion.span key="c" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} transition={SPRING_LAYOUT}><Check className="h-3.5 w-3.5 text-emerald-400" /></motion.span>
                : <motion.span key="cp" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} transition={SPRING_LAYOUT}><Copy className="h-3.5 w-3.5" /></motion.span>
              }
            </AnimatePresence>
          </motion.button>

          {/* Run */}
          {onRun && (
            <motion.button
              type="button"
              onClick={ran ? reset : handleRun}
              disabled={running}
              whileHover={!running ? { scale: 1.06 } : {}}
              whileTap={!running ? { scale: 0.94 } : {}}
              transition={SPRING_PRESS}
              className={cn(
                "flex h-6 items-center gap-1.5 rounded-md px-2 text-[11px] font-semibold focus:outline-none transition-colors",
                ran
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  : running
                  ? "cursor-not-allowed bg-white/8 text-white/40"
                  : "bg-white/10 text-white/70 hover:bg-white/18",
              )}
            >
              <AnimatePresence mode="wait">
                {running
                  ? <motion.span key="s" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={SPRING_LAYOUT}><Square className="h-3 w-3 fill-current" /></motion.span>
                  : ran
                  ? <motion.span key="r" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={SPRING_LAYOUT}><RotateCcw className="h-3 w-3" /></motion.span>
                  : <motion.span key="p" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={SPRING_LAYOUT}><Play className="h-3 w-3 fill-current" /></motion.span>
                }
              </AnimatePresence>
              {running ? "Running" : ran ? "Reset" : "Run"}
            </motion.button>
          )}
        </div>
      </div>

      {/* Code body */}
      <pre
        ref={codeRef}
        className="max-h-72 overflow-auto p-4 font-mono text-[13px] leading-relaxed text-[#c9d1d9]"
      >
        {displayed}
        {streaming && !streamDone && (
          <motion.span
            className="ml-0.5 inline-block h-[14px] w-[2px] bg-emerald-400 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.75, repeat: Infinity }}
          />
        )}
      </pre>

      {/* Output panel */}
      <AnimatePresence>
        {showOutput && output && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/8"
          >
            <div className="flex items-center gap-2 bg-emerald-950/50 px-4 py-2">
              <Terminal className="h-3 w-3 text-emerald-400" />
              <span className="text-[11px] font-semibold text-emerald-400">Output</span>
            </div>
            <pre className="p-4 font-mono text-[12px] leading-relaxed text-emerald-300">{output}</pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
