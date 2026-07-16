"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MagneticButtonVariant = "primary" | "outline" | "ghost" | "glow";

export interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: MagneticButtonVariant;
  strength?: number;  // 0–1, how much it pulls
  radius?: number;    // px — detection radius
  size?: "sm" | "md" | "lg";
}

const VARIANT_STYLES: Record<MagneticButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground shadow-lg hover:shadow-primary/30",
  outline: "border border-border bg-background text-foreground hover:border-foreground/30",
  ghost:   "text-foreground hover:bg-accent",
  glow:    "bg-primary text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.45)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.65)]",
};

const SIZE_STYLES: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8  px-4  text-xs  rounded-xl gap-1.5",
  md: "h-10 px-6  text-sm  rounded-2xl gap-2",
  lg: "h-13 px-8  text-base rounded-2xl gap-2.5",
};

export function MagneticButton({
  children,
  variant = "primary",
  strength = 0.38,
  radius = 80,
  size = "md",
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  const SPRING = { stiffness: 260, damping: 26, mass: 0.6 };
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);
  const tx = useSpring(textX, SPRING);
  const ty = useSpring(textY, SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.max(0, 1 - dist / radius);
    rawX.set(dx * strength * pull);
    rawY.set(dy * strength * pull);
    textX.set(dx * strength * pull * 0.5);
    textY.set(dy * strength * pull * 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    textX.set(0);
    textY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      style={reduce ? {} : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold select-none overflow-hidden transition-shadow focus:outline-none disabled:opacity-50",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
      {...props}
    >
      {/* Shimmer sweep on hover */}
      {(variant === "primary" || variant === "glow") && (
        <motion.div
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/15"
          whileHover={{ translateX: "200%" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      <motion.span
        style={reduce ? {} : { x: tx, y: ty }}
        className="relative z-10 flex items-center gap-[inherit]"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
