"use client";

import { motion, useInView, useReducedMotion, AnimatePresence } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { SPRING_LAYOUT, EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type TimelineStatus = "done" | "current" | "upcoming";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status?: TimelineStatus;
  icon?: ReactNode;
  badge?: string;
  detail?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

function TimelineRow({ item, index, isLast }: { item: TimelineItem; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const status = item.status ?? "done";

  const dotBg = {
    done: "bg-primary border-primary",
    current: "bg-primary border-primary",
    upcoming: "bg-background border-muted-foreground/30",
  }[status];

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-4"
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={reduce
        ? { duration: 0.2, delay: index * 0.04 }
        : { type: "spring", stiffness: 360, damping: 32, mass: 0.7, delay: index * 0.08 }}
    >
      {/* Spine column */}
      <div className="flex flex-col items-center">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
          {/* Pulse ring for current */}
          {status === "current" && !reduce && (
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/40"
              animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.div
            initial={reduce ? {} : { scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={reduce ? {} : { type: "spring", stiffness: 550, damping: 26, delay: index * 0.08 + 0.1 }}
            className={cn(
              "z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 shadow-sm",
              dotBg,
            )}
          >
            {item.icon && (
              <span className="text-[9px] text-primary-foreground">{item.icon}</span>
            )}
          </motion.div>
        </div>

        {/* Connector line */}
        {!isLast && (
          <div className="relative mt-0.5 w-0.5 flex-1 overflow-hidden rounded-full bg-border">
            <motion.div
              className={cn(
                "absolute top-0 w-full rounded-full",
                status === "done" ? "bg-primary" : "bg-muted-foreground/30",
              )}
              initial={reduce ? {} : { scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={reduce ? {} : { duration: 0.45, ease: EASE_OUT, delay: index * 0.08 + 0.2 }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-8 pt-0.5", isLast && "pb-0")}>
        <div className="flex flex-wrap items-start gap-x-2 gap-y-0.5">
          <p className={cn(
            "text-sm font-semibold leading-tight",
            status === "upcoming" ? "text-muted-foreground/60" : "text-foreground",
          )}>{item.title}</p>

          {item.badge && (
            <motion.span
              initial={reduce ? {} : { scale: 0.6, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={reduce ? {} : { ...SPRING_LAYOUT, delay: index * 0.08 + 0.15 }}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {item.badge}
            </motion.span>
          )}
          {item.date && (
            <span className="ml-auto text-[11px] text-muted-foreground">{item.date}</span>
          )}
        </div>

        {item.description && (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        )}

        {item.detail && (
          <>
            <button
              type="button"
              onClick={() => setExpanded((o) => !o)}
              className="mt-1.5 flex items-center gap-0.5 text-xs text-muted-foreground/70 hover:text-foreground focus:outline-none transition-colors"
            >
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
              {expanded ? "Collapse" : "Expand"}
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="mt-1.5 rounded-lg bg-muted/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <TimelineRow key={item.id} item={item} index={i} isLast={i === items.length - 1} />
      ))}
    </div>
  );
}
