"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useState, type ReactNode } from "react";
import { User } from "lucide-react";
import { EASE_OUT, SPRING_SWAP } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

// ─── Tokens ───────────────────────────────────────────────────────────────────

const SIZE: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
  "2xl": "h-20 w-20 text-xl",
};

const STATUS_PX: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5 -bottom-0 -right-0",
  sm: "h-2 w-2 bottom-0 right-0",
  md: "h-2.5 w-2.5 bottom-0 right-0",
  lg: "h-3 w-3 bottom-0.5 right-0.5",
  xl: "h-3.5 w-3.5 bottom-0.5 right-0.5",
  "2xl": "h-4 w-4 bottom-1 right-1",
};

const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  busy: "bg-red-500",
  offline: "bg-muted-foreground/50",
};

// ─── Variants ────────────────────────────────────────────────────────────────

const SWAP_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.6, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { ...SPRING_SWAP, opacity: { duration: 0.15, ease: EASE_OUT } },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(4px)",
    transition: { duration: 0.12, ease: EASE_OUT },
  },
};

const REDUCED_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(fallback: string) {
  const parts = fallback.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return fallback.slice(0, 2).toUpperCase();
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  status,
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const showImage = src && !imgError;
  const variants = reduce ? REDUCED_VARIANTS : SWAP_VARIANTS;

  return (
    <div className={cn("relative inline-flex flex-shrink-0", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-full bg-muted ring-2 ring-background",
          SIZE[size],
        )}
      >
        <AnimatePresence mode="wait">
          {showImage ? (
            <motion.img
              key="image"
              src={src}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              onError={() => setImgError(true)}
            />
          ) : fallback ? (
            <motion.span
              key="initials"
              className="absolute inset-0 flex items-center justify-center font-semibold text-muted-foreground"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {initials(fallback)}
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              className="absolute inset-0 flex items-center justify-center text-muted-foreground"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <User className="h-1/2 w-1/2" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {status && (
        <span
          aria-label={status}
          className={cn(
            "absolute rounded-full ring-2 ring-background",
            STATUS_PX[size],
            STATUS_COLORS[status],
          )}
        />
      )}
    </div>
  );
}

// ─── Avatar Group ─────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  items: Omit<AvatarProps, "size">[];
  size?: AvatarSize;
  max?: number;
  className?: string;
}

export function AvatarGroup({ items, size = "md", max = 4, className }: AvatarGroupProps) {
  const reduce = useReducedMotion();
  const visible = items.slice(0, max);
  const overflow = items.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visible.map((item, i) => (
        <motion.div
          key={i}
          initial={reduce ? undefined : { opacity: 0, x: -8, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 28, delay: i * 0.04 }
          }
          className="relative z-[1] hover:z-10"
          style={{ zIndex: i + 1 }}
        >
          <Avatar {...item} size={size} />
        </motion.div>
      ))}
      {overflow > 0 && (
        <motion.div
          initial={reduce ? undefined : { opacity: 0, x: -8, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 28, delay: visible.length * 0.04 }
          }
          className={cn(
            "relative flex items-center justify-center rounded-full bg-muted ring-2 ring-background font-medium text-muted-foreground",
            SIZE[size],
          )}
        >
          +{overflow}
        </motion.div>
      )}
    </div>
  );
}
