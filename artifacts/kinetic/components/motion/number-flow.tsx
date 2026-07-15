"use client";

import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface NumberFlowProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Locale string for number formatting, e.g. "en-US" */
  locale?: string;
  /** Decimal places */
  decimals?: number;
  className?: string;
}

function formatNumber(
  value: number,
  locale: string,
  decimals?: number,
): string {
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

interface DigitSlotProps {
  char: string;
  position: number;
}

function DigitSlot({ char, position }: DigitSlotProps) {
  const isDigit = /\d/.test(char);

  if (!isDigit) {
    // Punctuation/separators: no animation
    return (
      <span className="inline-block tabular-nums text-muted-foreground">
        {char}
      </span>
    );
  }

  return (
    <span className="relative inline-block overflow-hidden align-bottom tabular-nums" style={{ minWidth: "0.6em" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${position}-${char}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="inline-block"
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function NumberFlow({
  value,
  prefix,
  suffix,
  locale = "en-US",
  decimals,
  className,
}: NumberFlowProps) {
  const formatted = formatNumber(value, locale, decimals);
  const chars = formatted.split("");

  return (
    <span className={cn("inline-flex items-baseline font-tabular-nums", className)}>
      {prefix ? (
        <span className="mr-0.5 text-muted-foreground">{prefix}</span>
      ) : null}
      {chars.map((char, i) => (
        <DigitSlot key={i} char={char} position={i} />
      ))}
      {suffix ? (
        <span className="ml-0.5 text-muted-foreground">{suffix}</span>
      ) : null}
    </span>
  );
}
