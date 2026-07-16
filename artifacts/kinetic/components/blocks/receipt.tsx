"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Check, Clock, AlertCircle } from "lucide-react";
import { SPRING_LAYOUT, EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type ReceiptStatus = "paid" | "pending" | "overdue";

export interface ReceiptLineItem {
  id: string;
  label: string;
  description?: string;
  qty?: number;
  unit?: string;
  amount: number;
}

export interface ReceiptProps {
  title?: string;
  number?: string;
  date?: string;
  dueDate?: string;
  status?: ReceiptStatus;
  from?: { name: string; detail?: string };
  to?: { name: string; detail?: string };
  items: ReceiptLineItem[];
  currency?: string;
  taxRate?: number;
  note?: string;
  className?: string;
}

function fmt(n: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
}

const STATUS_STYLES: Record<ReceiptStatus, { cls: string; icon: React.ComponentType<{ className?: string }> }> = {
  paid:    { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20", icon: Check },
  pending: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",   icon: Clock },
  overdue: { cls: "bg-destructive/10 text-destructive border border-destructive/20",                  icon: AlertCircle },
};

function LineItemRow({ item, index, currency }: { item: ReceiptLineItem; index: number; currency: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14, filter: "blur(4px)" }}
      animate={inView ? (reduce ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" }) : {}}
      transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 380, damping: 30, delay: 0.05 + index * 0.055 }}
      className="flex items-start justify-between gap-4 py-2.5"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-tight">{item.label}</p>
        {item.description && (
          <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{item.description}</p>
        )}
      </div>
      {(item.qty !== undefined || item.unit) && (
        <p className="shrink-0 text-xs tabular-nums text-muted-foreground pt-0.5">
          {item.qty ?? 1}{item.unit ? ` ${item.unit}` : ""}
        </p>
      )}
      <p className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
        {fmt(item.amount, currency)}
      </p>
    </motion.div>
  );
}

function AnimatedAmount({ value, currency, index }: { value: number; currency: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 380, damping: 30, delay: 0.15 + index * 0.08 }}
    >
      {fmt(value, currency)}
    </motion.span>
  );
}

export function Receipt({
  title = "Invoice",
  number,
  date,
  dueDate,
  status = "pending",
  from,
  to,
  items,
  currency = "USD",
  taxRate = 0,
  note,
  className,
}: ReceiptProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const StatusIcon = STATUS_STYLES[status].icon;

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={reduce ? { duration: 0.2 } : { type: "spring", stiffness: 320, damping: 32 }}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-border bg-card shadow-xl",
        className,
      )}
    >
      {/* Decorative perforated top edge */}
      <div className="relative flex h-3 items-center">
        <div className="absolute inset-x-0 top-0 flex gap-3 px-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="h-3 w-1.5 flex-1 rounded-b-full bg-background" />
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 pt-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <motion.h2
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ ...SPRING_LAYOUT, delay: 0.05 }}
              className="text-xl font-bold tracking-tight text-foreground"
            >
              {title}
            </motion.h2>
            {number && (
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">{number}</p>
            )}
          </div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...SPRING_LAYOUT, delay: 0.1 }}
            className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize", STATUS_STYLES[status].cls)}
          >
            <StatusIcon className="h-3 w-3" />
            {status}
          </motion.div>
        </div>

        {/* Dates */}
        {(date || dueDate) && (
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            {date && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Date</p>
                <p className="text-sm text-foreground">{date}</p>
              </div>
            )}
            {dueDate && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Due</p>
                <p className="text-sm text-foreground">{dueDate}</p>
              </div>
            )}
          </div>
        )}

        {/* From / To */}
        {(from || to) && (
          <div className="mt-4 flex flex-wrap gap-6">
            {from && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">From</p>
                <p className="text-sm font-semibold text-foreground">{from.name}</p>
                {from.detail && <p className="text-xs text-muted-foreground">{from.detail}</p>}
              </div>
            )}
            {to && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Bill To</p>
                <p className="text-sm font-semibold text-foreground">{to.name}</p>
                {to.detail && <p className="text-xs text-muted-foreground">{to.detail}</p>}
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <div className="h-1.5 w-1.5 rotate-45 rounded-sm bg-border" />
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Column headers */}
        <div className="mb-1 flex gap-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <span className="flex-1">Description</span>
          <span className="shrink-0">Qty</span>
          <span className="shrink-0 min-w-16 text-right">Amount</span>
        </div>

        {/* Line items */}
        <div className="divide-y divide-border/60">
          {items.map((item, i) => (
            <LineItemRow key={item.id} item={item} index={i} currency={currency} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <div className="h-1.5 w-1.5 rotate-45 rounded-sm bg-border" />
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Totals */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <AnimatedAmount value={subtotal} currency={currency} index={0} />
          </div>
          {taxRate > 0 && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
              <AnimatedAmount value={tax} currency={currency} index={1} />
            </div>
          )}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING_LAYOUT, delay: 0.35 }}
            className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground"
          >
            <span>Total</span>
            <span>{fmt(total, currency)}</span>
          </motion.div>
        </div>

        {/* Note */}
        {note && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-4 rounded-xl bg-muted/50 px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground"
          >
            {note}
          </motion.p>
        )}

        {/* Decorative tear line + thank you */}
        <div className="relative mt-5 flex items-center gap-2">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="h-0.5 flex-1 rounded-full bg-border/70" />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/50"
        >
          Thank you for your business
        </motion.p>
      </div>
    </motion.div>
  );
}
