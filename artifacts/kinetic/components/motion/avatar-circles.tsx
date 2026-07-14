"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AvatarItem {
  /** Remote or local image URL. If omitted, `fallback` initials are shown. */
  src?: string;
  /** 1-3 character label shown when no image is available. */
  fallback: string;
  alt?: string;
}

export interface AvatarCirclesProps {
  avatars: AvatarItem[];
  /** Maximum visible avatars before the overflow badge appears. */
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const RING = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
} as const;

const TEXT = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
} as const;

export function AvatarCircles({
  avatars,
  max = 5,
  size = "md",
  className,
}: AvatarCirclesProps) {
  const visible = avatars.slice(0, max);
  const overflow = Math.max(0, avatars.length - max);

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((a, i) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          key={i}
          className={cn(
            RING[size],
            "-ml-2.5 first:ml-0 relative shrink-0 rounded-full border-2 border-background bg-muted overflow-hidden transition-transform hover:z-10 hover:scale-110",
          )}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.25, ease: "easeOut" }}
        >
          {a.src ? (
            <Image
              src={a.src}
              alt={a.alt ?? a.fallback}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <span
              className={cn(
                "flex h-full w-full items-center justify-center font-semibold text-muted-foreground",
                TEXT[size],
              )}
            >
              {a.fallback.slice(0, 2).toUpperCase()}
            </span>
          )}
        </motion.div>
      ))}

      {overflow > 0 && (
        <motion.div
          className={cn(
            RING[size],
            TEXT[size],
            "-ml-2.5 relative shrink-0 flex items-center justify-center rounded-full border-2 border-background bg-muted font-semibold text-muted-foreground",
          )}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: visible.length * 0.06,
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          +{overflow}
        </motion.div>
      )}
    </div>
  );
}
