"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DayRow } from "./day-row";
import {
  type DayAvailability,
  type DayKey,
  WEEKDAYS,
  type WeekAvailability,
  buildOptions,
  clearWeek,
  dayHours,
  defaultWeek,
  everydayWeek,
  weekendsWeek,
} from "./types";

export type {
  DayAvailability,
  DayKey,
  TimeRange,
  WeekAvailability,
} from "./types";
export { defaultWeek } from "./types";

export interface AvailabilitySchedulerProps {
  value?: WeekAvailability;
  defaultValue?: WeekAvailability;
  onChange?: (value: WeekAvailability) => void;
  /** Minutes between selectable times. Default 30. */
  step?: number;
  /** Show the week summary bar at the bottom. Default true. */
  showSummary?: boolean;
  className?: string;
}

// ─── Presets ──────────────────────────────────────────────────────────────────

type PresetId = "9to5" | "everyday" | "weekends" | "clear";

const PRESETS: { id: PresetId; label: string; build: () => WeekAvailability }[] = [
  { id: "9to5",     label: "Weekdays",    build: defaultWeek    },
  { id: "everyday", label: "Every day",   build: everydayWeek   },
  { id: "weekends", label: "Weekends",    build: weekendsWeek   },
  { id: "clear",    label: "Clear all",   build: clearWeek      },
];

function detectPreset(week: WeekAvailability): PresetId | null {
  for (const p of PRESETS) {
    const ref = p.build();
    const match = WEEKDAYS.every(({ key }) => {
      const a = week[key];
      const b = ref[key];
      if (a.enabled !== b.enabled) return false;
      if (a.ranges.length !== b.ranges.length) return false;
      return a.ranges.every(
        (r, i) => r.start === b.ranges[i]?.start && r.end === b.ranges[i]?.end,
      );
    });
    if (match) return p.id;
  }
  return null;
}

// ─── Week summary bar ─────────────────────────────────────────────────────────

function WeekSummary({ week }: { week: WeekAvailability }) {
  const max = 8; // scale reference in hours
  return (
    <div className="flex items-end gap-1.5 px-1 pt-3">
      {WEEKDAYS.map(({ key, short }) => {
        const h = dayHours(week[key]);
        const pct = Math.min(h / max, 1);
        return (
          <div key={key} className="flex flex-1 flex-col items-center gap-1">
            <div className="relative h-8 w-full overflow-hidden rounded-sm bg-muted/40">
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-sm bg-foreground/20"
                initial={false}
                animate={{ height: `${pct * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.6 }}
              />
              {h > 0 && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 rounded-sm bg-foreground/60"
                  initial={false}
                  animate={{ height: `${Math.min(pct * 0.4, 0.35) * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.6 }}
                />
              )}
            </div>
            <span className="text-[9px] font-medium tabular-nums text-muted-foreground">
              {short}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AvailabilityScheduler({
  value,
  defaultValue,
  onChange,
  step = 30,
  showSummary = true,
  className,
}: AvailabilitySchedulerProps) {
  const reduce = useReducedMotion() ?? false;
  const groupId = useId();
  const options = useMemo(() => buildOptions(step), [step]);
  const idRef = useRef(0);

  const [internal, setInternal] = useState<WeekAvailability>(
    () => defaultValue ?? defaultWeek(),
  );
  const controlled = value !== undefined;
  const week = controlled ? value : internal;
  const activePreset = detectPreset(week);

  const commit = useCallback(
    (next: WeekAvailability) => {
      if (!controlled) setInternal(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );

  const setDay = useCallback(
    (day: DayKey, next: DayAvailability) => {
      commit({ ...week, [day]: next });
    },
    [commit, week],
  );

  const copyDay = useCallback(
    (from: DayKey, targets: DayKey[]) => {
      const source = week[from];
      const next = { ...week };
      for (const t of targets) {
        next[t] = {
          enabled: source.enabled,
          ranges: source.ranges.map((r) => ({
            ...r,
            id: `${t}-c${idRef.current++}`,
          })),
        };
      }
      commit(next);
    },
    [commit, week],
  );

  return (
    <div className={cn("w-full max-w-xl", className)}>
      {/* Preset bar */}
      <div className="relative mb-2 flex items-center gap-1 rounded-xl border border-border bg-muted/30 p-1">
        <LayoutGroup id={`${groupId}-presets`}>
          {PRESETS.map((p) => {
            const active = activePreset === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => commit(p.build())}
                className={cn(
                  "relative z-10 flex-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId={`${groupId}-preset-pill`}
                    className="absolute inset-0 rounded-lg bg-background shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.5 }}
                  />
                )}
                <span className="relative">{p.label}</span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      {/* Day rows */}
      <LayoutGroup id={groupId}>
        <div className="divide-y divide-border">
          {WEEKDAYS.map(({ key, label }, i) => (
            <DayRow
              key={key}
              day={key}
              label={label}
              state={week[key]}
              options={options}
              reduce={reduce}
              depth={WEEKDAYS.length - i}
              onChange={(next) => setDay(key, next)}
              onCopy={(targets) => copyDay(key, targets)}
            />
          ))}
        </div>
      </LayoutGroup>

      {/* Week summary */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-xl border border-border bg-muted/20 px-3 pb-3 pt-2"
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
              Weekly overview
            </p>
            <WeekSummary week={week} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
