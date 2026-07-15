"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps {
  children?: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "hsl(var(--primary) / 0.12)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    animate(mouseX, rect.width / 2, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    animate(mouseY, rect.height / 2, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Snap to cursor position immediately on enter
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card p-6",
        className,
      )}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity"
        style={{ background }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
