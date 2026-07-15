"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function firstDay(y: number, m: number) { return new Date(y, m, 1).getDay(); }
function sameDay(a: Date, b: Date) { return a.toDateString() === b.toDateString(); }
function fmt(d: Date) { return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }

function CalendarGrid({ year, month, selected, onSelect, dir }: {
  year: number; month: number; selected: Date | null; onSelect: (d: Date) => void; dir: number;
}) {
  const reduce = useReducedMotion();
  const today = new Date();
  const pad = firstDay(year, month);
  const total = daysInMonth(year, month);
  const cells: (number | null)[] = [...Array(pad).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <motion.div
      key={`${year}-${month}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 28, filter: "blur(6px)" }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -28, filter: "blur(6px)" }}
      transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 380, damping: 36 }}
    >
      <div className="mb-1 grid grid-cols-7">
        {DAYS.map((d) => (
          <div key={d} className="flex h-8 items-center justify-center text-[11px] font-medium text-muted-foreground">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const date = new Date(year, month, day);
          const isSel = selected ? sameDay(date, selected) : false;
          const isToday = sameDay(date, today);
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => onSelect(date)}
              whileHover={!isSel ? { scale: 1.18 } : {}}
              whileTap={{ scale: 0.9 }}
              transition={SPRING_LAYOUT}
              className={cn(
                "relative flex h-8 w-full items-center justify-center rounded-lg text-sm font-medium focus:outline-none",
                isSel ? "text-primary-foreground" : "text-foreground hover:bg-accent",
                isToday && !isSel && "text-primary font-bold",
              )}
            >
              {isSel && (
                <motion.div
                  layoutId="cal-selected"
                  className="absolute inset-0 rounded-lg bg-primary"
                  transition={SPRING_LAYOUT}
                />
              )}
              <span className="relative z-10">{day}</span>
              {isToday && !isSel && (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ value, onChange, placeholder = "Pick a date", className }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const now = new Date();
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? now.getFullYear());
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? now.getMonth());
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const navigate = (delta: number) => {
    setDir(delta);
    const d = new Date(viewYear, viewMonth + delta);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={SPRING_LAYOUT}
        className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-3 text-sm shadow-sm focus:outline-none"
      >
        <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className={value ? "font-medium text-foreground" : "text-muted-foreground"}>
          {value ? fmt(value) : placeholder}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -8, filter: "blur(8px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -6, filter: "blur(8px)" }}
            transition={reduce ? { duration: 0.15 } : SPRING_PANEL}
            className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-border bg-popover p-4 shadow-2xl"
          >
            {/* Month nav */}
            <div className="mb-3 flex items-center justify-between">
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.12, backgroundColor: "rgba(128,128,128,0.1)" }}
                whileTap={{ scale: 0.9 }}
                transition={SPRING_LAYOUT}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground focus:outline-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.button>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`${viewYear}-${viewMonth}`}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: dir * 8, filter: "blur(4px)" }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: dir * -8, filter: "blur(4px)" }}
                  transition={reduce ? { duration: 0.12 } : { type: "spring", stiffness: 400, damping: 30 }}
                  className="text-sm font-semibold text-foreground"
                >
                  {MONTHS[viewMonth]} {viewYear}
                </motion.p>
              </AnimatePresence>

              <motion.button
                type="button"
                onClick={() => navigate(1)}
                whileHover={{ scale: 1.12, backgroundColor: "rgba(128,128,128,0.1)" }}
                whileTap={{ scale: 0.9 }}
                transition={SPRING_LAYOUT}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground focus:outline-none"
              >
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <CalendarGrid
                  key={`${viewYear}-${viewMonth}`}
                  year={viewYear}
                  month={viewMonth}
                  selected={value ?? null}
                  onSelect={(d) => { onChange?.(d); setOpen(false); }}
                  dir={dir}
                />
              </AnimatePresence>
            </div>

            {/* Today shortcut */}
            <div className="mt-3 border-t border-border pt-2.5">
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  setViewYear(today.getFullYear());
                  setViewMonth(today.getMonth());
                  onChange?.(today);
                  setOpen(false);
                }}
                className="text-xs font-medium text-primary hover:underline focus:outline-none"
              >
                Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
