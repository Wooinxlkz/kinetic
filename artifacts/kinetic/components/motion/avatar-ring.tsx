"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export type RingState = "story" | "live" | "typing" | "active" | "none";
export type AvatarRingSize = "sm" | "md" | "lg" | "xl";

// Outer size / padding (= ring thickness) / text size
const SIZE: Record<AvatarRingSize, { outer: string; pad: string; text: string }> = {
  sm: { outer: "h-14 w-14",   pad: "p-[3px]",  text: "text-sm"  },
  md: { outer: "h-[72px] w-[72px]", pad: "p-1",       text: "text-base" },
  lg: { outer: "h-24 w-24",   pad: "p-[5px]",  text: "text-lg"  },
  xl: { outer: "h-32 w-32",   pad: "p-[6px]",  text: "text-xl"  },
};

// Instagram-style story gradient
const STORY_GRADIENT =
  "conic-gradient(from 0deg, #f09433 0%, #e6683c 10%, #dc2743 25%, #cc2366 40%, #bc1888 55%, #833ab4 68%, #4c68d7 80%, #cd486b 90%, #f09433 100%)";

export interface AvatarRingProps {
  src?: string;
  alt?: string;
  /** Up to 2 characters shown when no image. */
  fallback?: string;
  size?: AvatarRingSize;
  ring?: RingState;
  onClick?: () => void;
  className?: string;
}

export function AvatarRing({
  src,
  alt,
  fallback,
  size = "md",
  ring = "story",
  onClick,
  className,
}: AvatarRingProps) {
  const reduced = useReducedMotion();
  const [imgErr, setImgErr] = useState(false);
  const { outer, pad, text } = SIZE[size];
  const initials = fallback?.slice(0, 2).toUpperCase() ?? "";

  // ── ring background element ──────────────────────────────────────────────────
  const RingLayer = () => {
    if (ring === "none") return null;

    if (ring === "story") {
      return (
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ background: STORY_GRADIENT }}
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      );
    }

    if (ring === "live") {
      return (
        <>
          {/* pulsing glow */}
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-red-500"
            animate={reduced ? {} : { scale: [1, 1.14, 1], opacity: [0.9, 0.5, 0.9] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* solid ring underneath */}
          <div aria-hidden className="absolute inset-0 rounded-full bg-red-500" />
        </>
      );
    }

    if (ring === "active") {
      return (
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent"
        />
      );
    }

    if (ring === "typing") {
      return (
        <div
          aria-hidden
          className="absolute inset-0 rounded-full border-[3px] border-dashed border-muted-foreground/40"
        />
      );
    }

    return null;
  };

  return (
    <div className={cn("relative inline-flex flex-col items-center gap-2", className)}>
      {/* ── Avatar button ── */}
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        className={cn(
          "relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          outer,
          !onClick && "cursor-default",
        )}
      >
        <RingLayer />

        {/* White gap + avatar */}
        <div className={cn("absolute inset-0 rounded-full", ring !== "none" ? pad : "")}>
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-muted">
            {src && !imgErr ? (
              <img
                src={src}
                alt={alt ?? fallback ?? "avatar"}
                className="h-full w-full object-cover"
                onError={() => setImgErr(true)}
              />
            ) : initials ? (
              <span className={cn("select-none font-semibold text-foreground", text)}>
                {initials}
              </span>
            ) : (
              <User className="h-2/5 w-2/5 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* LIVE badge */}
        {ring === "live" && (
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-red-500 px-2 py-px text-[9px] font-bold uppercase tracking-widest text-white shadow">
            Live
          </span>
        )}
      </button>

      {/* ── Typing dots ── */}
      {ring === "typing" && (
        <div className="flex items-center gap-1" aria-label="typing">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
              animate={reduced ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 0.55, delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
