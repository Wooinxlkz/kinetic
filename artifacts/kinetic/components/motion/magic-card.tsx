"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SPRING_MOUSE } from "@/lib/ease";

export interface MagicCardProps {
  children: ReactNode;
  className?: string;
  /** Color of the radial spotlight. Any CSS color. Default primary at 12% opacity. */
  gradientColor?: string;
  /** Radius of the spotlight in pixels. Default 250. */
  gradientSize?: number;
}

/**
 * Card with a spring-following radial gradient spotlight that tracks the
 * cursor. Compose around any content — the spotlight lives on a separate
 * pointer-events-none layer so interactive children still work normally.
 *
 * The parent must have `overflow: hidden` set (the component sets it by default
 * via className).
 */
export function MagicCard({
  children,
  className,
  gradientColor = "hsl(var(--primary) / 0.12)",
  gradientSize = 250,
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const x = useSpring(mouseX, SPRING_MOUSE);
  const y = useSpring(mouseY, SPRING_MOUSE);

  const background = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientColor}, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  };

  return (
    <div
      ref={ref}
      onMouseMove={reduce ? undefined : handleMouseMove}
      onMouseLeave={reduce ? undefined : handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
    >
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
