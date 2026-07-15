"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface AIModel {
  id: string;
  name: string;
  provider?: string;
  badge?: string;
  /** Speed tier shown as icon count (1–3). */
  speed?: 1 | 2 | 3;
}

export interface ModelPickerProps {
  models: AIModel[];
  value?: string;
  defaultValue?: string;
  onChange?: (model: AIModel) => void;
  className?: string;
}

/**
 * Animated model selector dropdown for AI interfaces.
 * Spring enter/exit, selected checkmark, speed indicator and badge chips.
 */
export function ModelPicker({
  models,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
}: ModelPickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(
    defaultValue ?? models[0]?.id ?? "",
  );
  const activeId = controlledValue ?? selected;
  const activeModel = models.find((m) => m.id === activeId);

  function pick(model: AIModel) {
    setSelected(model.id);
    onChange?.(model);
    setOpen(false);
  }

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted"
      >
        <span className="truncate max-w-[140px]">{activeModel?.name ?? "Select model"}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
        >
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
            className="absolute left-0 z-50 mt-1.5 min-w-[200px] overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
          >
            <div className="p-1">
              {models.map((model) => {
                const isActive = model.id === activeId;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => pick(model)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block truncate font-medium text-foreground">
                        {model.name}
                      </span>
                      {model.provider ? (
                        <span className="text-[11px] text-muted-foreground">{model.provider}</span>
                      ) : null}
                    </span>
                    {model.badge ? (
                      <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        {model.badge}
                      </span>
                    ) : null}
                    {model.speed ? (
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Zap
                            key={i}
                            className={cn(
                              "h-2.5 w-2.5",
                              i < model.speed! ? "text-amber-400" : "text-foreground/20",
                            )}
                          />
                        ))}
                      </span>
                    ) : null}
                    {isActive ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                    ) : (
                      <span className="h-3.5 w-3.5 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
