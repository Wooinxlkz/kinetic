"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useRef } from "react";
import { Switch } from "@/components/motion/switch";
import { Tooltip } from "@/components/motion/tooltip";
import { SPRING_LAYOUT } from "@/lib/ease";
import { CopyMenu } from "./copy-menu";
import { IconButton } from "./icon-button";
import { TimeSelect } from "./time-select";
import {
  type DayAvailability,
  type DayKey,
  type TimeOption,
  type TimeRange,
  dayHours,
  toMinutes,
  toValue,
  WEEKEND_KEYS,
} from "./types";

export function DayRow({
  day,
  label,
  state,
  options,
  reduce,
  depth,
  onChange,
  onCopy,
}: {
  day: DayKey;
  label: string;
  state: DayAvailability;
  options: TimeOption[];
  reduce: boolean;
  depth: number;
  onChange: (next: DayAvailability) => void;
  onCopy: (targets: DayKey[]) => void;
}) {
  const idRef = useRef(0);
  const nextId = () => `${day}-n${idRef.current++}`;
  const isWeekend = WEEKEND_KEYS.includes(day);
  const hours = dayHours(state);

  const setEnabled = (enabled: boolean) => {
    if (enabled && state.ranges.length === 0) {
      onChange({
        enabled,
        ranges: [{ id: nextId(), start: "09:00", end: "17:00" }],
      });
    } else {
      onChange({ ...state, enabled });
    }
  };

  const updateRange = (id: string, patch: Partial<TimeRange>) => {
    onChange({
      ...state,
      ranges: state.ranges.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    });
  };

  const addRange = () => {
    const last = state.ranges[state.ranges.length - 1];
    const start = last ? Math.min(toMinutes(last.end) + 60, 24 * 60 - 60) : 540;
    onChange({
      enabled: true,
      ranges: [
        ...state.ranges,
        { id: nextId(), start: toValue(start), end: toValue(start + 60) },
      ],
    });
  };

  const removeRange = (id: string) => {
    const ranges = state.ranges.filter((r) => r.id !== id);
    onChange({ enabled: ranges.length > 0, ranges });
  };

  const actions = (
    <>
      <Tooltip content="Add time slot">
        <IconButton
          label={`Add time range to ${label}`}
          reduce={reduce}
          onClick={addRange}
          disabled={!state.enabled}
        >
          <Plus className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <CopyMenu fromLabel={label} reduce={reduce} onApply={onCopy} />
    </>
  );

  return (
    <motion.div
      layout={reduce ? false : "position"}
      transition={SPRING_LAYOUT}
      style={{ zIndex: depth }}
      className={[
        "relative flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:gap-4",
        isWeekend ? "opacity-80" : "",
      ].join(" ")}
    >
      {/* Toggle + label + hours badge */}
      <div className="flex items-center justify-between sm:w-36 sm:shrink-0 sm:justify-start sm:pt-1">
        <div className="flex items-center gap-2.5">
          <Switch
            checked={state.enabled}
            onCheckedChange={setEnabled}
            className="scale-90"
          />
          <div className="flex flex-col">
            <span
              className={[
                "text-sm font-medium leading-tight",
                state.enabled ? "text-foreground" : "text-muted-foreground",
              ].join(" ")}
            >
              {label}
            </span>
            <AnimatePresence mode="wait">
              {state.enabled && hours > 0 ? (
                <motion.span
                  key="hours"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-[10px] tabular-nums text-muted-foreground"
                >
                  {hours % 1 === 0 ? hours : hours.toFixed(1)}h
                </motion.span>
              ) : (
                <motion.span
                  key="unavail"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-[10px] text-muted-foreground/50"
                >
                  Unavailable
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:hidden">{actions}</div>
      </div>

      {/* Ranges or unavailable placeholder */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <AnimatePresence initial={false} mode="popLayout">
          {state.enabled ? (
            state.ranges.map((r, i) => (
              <motion.div
                key={r.id}
                layout={reduce ? false : "position"}
                style={{ zIndex: state.ranges.length - i }}
                initial={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -6, filter: "blur(4px)" }
                }
                animate={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -4, filter: "blur(4px)", scale: 0.97 }
                }
                transition={SPRING_LAYOUT}
                className="flex items-center gap-2"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div className="w-[108px] shrink-0">
                    <TimeSelect
                      value={r.start}
                      onChange={(v) => updateRange(r.id, { start: v })}
                      options={options.filter(
                        (o) => toMinutes(o.value) < toMinutes(r.end),
                      )}
                    />
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">–</span>
                  <div className="w-[108px] shrink-0">
                    <TimeSelect
                      value={r.end}
                      onChange={(v) => updateRange(r.id, { end: v })}
                      options={options.filter(
                        (o) => toMinutes(o.value) > toMinutes(r.start),
                      )}
                    />
                  </div>
                </div>
                <Tooltip content="Remove slot">
                  <IconButton
                    label={`Remove time range from ${label}`}
                    reduce={reduce}
                    onClick={() => removeRange(r.id)}
                    className="shrink-0 text-muted-foreground/60 hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </IconButton>
                </Tooltip>
              </motion.div>
            ))
          ) : (
            <motion.div
              key="unavail-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex h-9 items-center"
            >
              <span className="text-sm text-muted-foreground/40 line-through decoration-muted-foreground/20">
                No availability
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop actions */}
      <div className="hidden shrink-0 items-center gap-1 pt-0.5 sm:flex">{actions}</div>
    </motion.div>
  );
}
