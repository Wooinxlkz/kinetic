"use client";

import { useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  size?: "sm" | "md";
  className?: string;
}

const SIZE = {
  sm: { pill: "h-7", label: "text-xs px-3", icon: "gap-1.5" },
  md: { pill: "h-9", label: "text-sm px-4", icon: "gap-2" },
};

/**
 * iOS-style segmented control with a spring-animated selection pill.
 * Supports icons, disabled options, and controlled/uncontrolled usage.
 */
export function SegmentedControl<T extends string = string>({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  size = "md",
  className,
}: SegmentedControlProps<T>) {
  const layoutId = useId();
  const [internal, setInternal] = useState<T>(
    defaultValue ?? options[0]?.value ?? ("" as T),
  );
  const value = controlledValue ?? internal;
  const sz = SIZE[size];

  function handleSelect(opt: SegmentedControlOption<T>) {
    if (opt.disabled) return;
    setInternal(opt.value);
    onChange?.(opt.value);
  }

  return (
    <div
      role="radiogroup"
      className={cn(
        "relative inline-flex items-center rounded-xl bg-muted p-1",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-disabled={opt.disabled}
            disabled={opt.disabled}
            onClick={() => handleSelect(opt)}
            className={cn(
              "relative z-10 flex items-center justify-center rounded-lg font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40",
              sz.pill,
              sz.label,
              opt.icon ? sz.icon : "",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-lg bg-background shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 34, mass: 0.8 }}
              />
            )}
            {opt.icon ? (
              <span className="relative z-10 shrink-0">{opt.icon}</span>
            ) : null}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
