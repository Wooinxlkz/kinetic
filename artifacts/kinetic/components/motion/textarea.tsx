"use client";

import { animate, motion, useReducedMotion } from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type TextareaHTMLAttributes,
} from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TextareaState = "idle" | "error" | "success";

export interface TextareaClassNames {
  root?: string;
  label?: string;
  wrapper?: string;
  textarea?: string;
  hint?: string;
}

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label?: string;
  hint?: string;
  state?: TextareaState;
  /** Auto-grow to fit content. */
  autoResize?: boolean;
  /** Min number of visible rows. Default 3. */
  minRows?: number;
  /** Max rows before scrolling (only with autoResize). */
  maxRows?: number;
  classNames?: TextareaClassNames;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATE_RING: Record<TextareaState, string> = {
  idle: "ring-border focus-within:ring-ring",
  error: "ring-destructive focus-within:ring-destructive",
  success: "ring-emerald-500 focus-within:ring-emerald-500",
};

// ─── Component ───────────────────────────────────────────────────────────────

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      hint,
      state = "idle",
      autoResize = true,
      minRows = 3,
      maxRows,
      classNames,
      className,
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    forwardedRef,
  ) {
    const id = useId();
    const hintId = useId();
    const reduce = useReducedMotion();
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Merge refs
    const ref = useCallback(
      (el: HTMLTextAreaElement | null) => {
        (internalRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
        if (typeof forwardedRef === "function") forwardedRef(el);
        else if (forwardedRef) forwardedRef.current = el;
      },
      [forwardedRef],
    );

    // Auto-resize
    const resize = useCallback(() => {
      const el = internalRef.current;
      if (!el || !autoResize) return;
      el.style.height = "auto";
      const lineH = parseInt(getComputedStyle(el).lineHeight) || 20;
      const paddingV =
        parseInt(getComputedStyle(el).paddingTop) +
        parseInt(getComputedStyle(el).paddingBottom);
      const minH = minRows * lineH + paddingV;
      const maxH = maxRows ? maxRows * lineH + paddingV : Infinity;
      const desired = Math.max(minH, Math.min(el.scrollHeight, maxH));
      el.style.height = `${desired}px`;
      el.style.overflowY = el.scrollHeight > desired ? "auto" : "hidden";
    }, [autoResize, minRows, maxRows]);

    useEffect(() => {
      resize();
    }, [resize]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        resize();
        onChange?.(e);
      },
      [onChange, resize],
    );

    // Error shake
    const prevState = useRef(state);
    useEffect(() => {
      if (prevState.current === state) return;
      prevState.current = state;
      if (state === "error" && !reduce && wrapperRef.current) {
        animate(
          wrapperRef.current,
          { x: [0, -6, 5, -4, 3, -2, 0] },
          { duration: 0.4, ease: EASE_OUT },
        );
      }
    }, [state, reduce]);

    return (
      <div className={cn("flex flex-col gap-1.5", classNames?.root, className)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium",
              state === "error" ? "text-destructive" : "text-foreground",
              classNames?.label,
            )}
          >
            {label}
          </label>
        )}

        <motion.div
          ref={wrapperRef}
          className={cn(
            "relative flex rounded-xl bg-background ring-1 ring-inset transition-shadow",
            STATE_RING[state],
            classNames?.wrapper,
          )}
        >
          <textarea
            ref={ref}
            id={id}
            rows={minRows}
            aria-describedby={hint ? hintId : undefined}
            aria-invalid={state === "error"}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={cn(
              "w-full resize-none rounded-xl bg-transparent px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
              autoResize && "overflow-hidden",
              classNames?.textarea,
            )}
            {...rest}
          />

          {/* State icon */}
          {(state === "error" || state === "success") && (
            <span className="pointer-events-none absolute right-3 top-3">
              {state === "error" ? (
                <AlertCircle className="h-4 w-4 text-destructive" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              )}
            </span>
          )}
        </motion.div>

        {hint && (
          <p
            id={hintId}
            className={cn(
              "text-xs",
              state === "error" ? "text-destructive" : "text-muted-foreground",
              classNames?.hint,
            )}
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);
