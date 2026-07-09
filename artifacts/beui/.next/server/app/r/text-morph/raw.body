"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useMemo, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/utils";

export interface TextMorphProps {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * Morphs between strings by animating each character independently via
 * layoutId — shared characters physically glide to their new positions,
 * removed ones fade out, and new ones fade in.
 *
 * Usage: bind `children` to a state variable and change it; the characters
 * automatically figure out what moved, what left, and what arrived.
 */
export function TextMorph({
  children,
  as: Component = "p",
  className,
  style,
}: TextMorphProps) {
  const uid = useId();
  const reduce = useReducedMotion();

  const characters = useMemo(() => {
    const counts: Record<string, number> = {};
    return children.split("").map((char) => {
      const key = char.toLowerCase();
      counts[key] = (counts[key] ?? 0) + 1;
      return { id: `${uid}-${key}${counts[key]}`, label: char };
    });
  }, [children, uid]);

  if (reduce) {
    return (
      <Component className={cn(className)} style={style}>
        {children}
      </Component>
    );
  }

  return (
    <Component className={cn(className)} aria-label={children} style={style}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((ch) => (
          <motion.span
            key={ch.id}
            layoutId={ch.id}
            className="inline-block"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18, mass: 0.3 }}
          >
            {ch.label === " " ? "\u00A0" : ch.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}
