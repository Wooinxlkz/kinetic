"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { SPRING_PRESS, SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type VoiceState = "idle" | "recording" | "processing";

export interface VoiceInputProps {
  onResult?: (transcript: string) => void;
  className?: string;
}

const BAR_COUNT = 22;

function fmtTime(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function VoiceInput({ onResult, className }: VoiceInputProps) {
  const [state, setState] = useState<VoiceState>("idle");
  const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(0.08));
  const [elapsed, setElapsed] = useState(0);
  const reduce = useReducedMotion();
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(0);

  const stopAll = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setBars(Array(BAR_COUNT).fill(0.08));
    setElapsed(0);
  }, []);

  const animateBars = useCallback(() => {
    setBars(Array.from({ length: BAR_COUNT }, () => 0.05 + Math.random() * 0.95));
    rafRef.current = setTimeout(animateBars, 85);
  }, []);

  const startRecording = useCallback(() => {
    setState("recording");
    startRef.current = Date.now();
    timerRef.current = setInterval(() => setElapsed(Date.now() - startRef.current), 100);
    animateBars();
  }, [animateBars]);

  const stopRecording = useCallback(() => {
    stopAll();
    setState("processing");
    setTimeout(() => {
      setState("idle");
      onResult?.("Voice input captured successfully.");
    }, 1500);
  }, [stopAll, onResult]);

  useEffect(() => () => stopAll(), [stopAll]);

  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      {/* Waveform bars */}
      <div className="flex h-16 items-center gap-0.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-primary"
            animate={
              state === "recording" && !reduce
                ? { height: `${Math.max(4, h * 52)}px`, opacity: 0.6 + h * 0.4 }
                : state === "processing"
                ? { height: `${4 + Math.sin((i / BAR_COUNT) * Math.PI) * 18}px`, opacity: 0.4 }
                : { height: "4px", opacity: 0.2 }
            }
            transition={
              state === "recording"
                ? { type: "spring", stiffness: 700, damping: 18, mass: 0.25 }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      {/* Timer */}
      <AnimatePresence>
        {state === "recording" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={SPRING_LAYOUT}
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
            {fmtTime(elapsed)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button + pulse ring */}
      <div className="relative flex items-center justify-center">
        {state === "recording" && !reduce && (
          <motion.div
            className="absolute rounded-full border border-primary/30"
            animate={{ width: [64, 100], height: [64, 100], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <motion.button
          type="button"
          onClick={state === "idle" ? startRecording : state === "recording" ? stopRecording : undefined}
          disabled={state === "processing"}
          whileHover={state !== "processing" ? { scale: 1.08 } : {}}
          whileTap={state !== "processing" ? { scale: 0.92 } : {}}
          transition={SPRING_PRESS}
          className={cn(
            "relative z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-xl focus:outline-none transition-colors",
            state === "idle" && "bg-primary text-primary-foreground",
            state === "recording" && "bg-red-500 text-white",
            state === "processing" && "bg-muted text-muted-foreground cursor-not-allowed",
          )}
        >
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.span key="mic" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={SPRING_LAYOUT}>
                <Mic className="h-6 w-6" />
              </motion.span>
            )}
            {state === "recording" && (
              <motion.span key="stop" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={SPRING_LAYOUT}>
                <Square className="h-5 w-5 fill-current" />
              </motion.span>
            )}
            {state === "processing" && (
              <motion.span key="proc" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={SPRING_LAYOUT}>
                <Loader2 className="h-6 w-6 animate-spin" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Status label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={state}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={SPRING_LAYOUT}
          className="text-xs text-muted-foreground"
        >
          {state === "idle" ? "Tap to start recording" : state === "recording" ? "Tap to stop" : "Processing…"}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
