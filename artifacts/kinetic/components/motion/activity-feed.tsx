"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target?: string;
  time: string;
  avatarUrl?: string;
  icon?: React.ReactNode;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
}

function Initials({ name }: { name: string }) {
  return (
    <span className="text-[11px] font-semibold text-muted-foreground">
      {name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()}
    </span>
  );
}

/**
 * Timestamped activity timeline with staggered entrance.
 * Each row shows an avatar, actor, action, optional target, and relative time.
 */
export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("w-full space-y-0", className)}>
      <AnimatePresence initial={true}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease: EASE_OUT, delay: i * 0.04 }}
              className="relative flex gap-3"
            >
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-4 top-9 bottom-0 w-px bg-border" />
              )}

              {/* Avatar */}
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted border border-border overflow-hidden">
                {item.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.avatarUrl} alt={item.actor} className="h-full w-full object-cover" />
                ) : item.icon ? (
                  <span className="text-muted-foreground">{item.icon}</span>
                ) : (
                  <Initials name={item.actor} />
                )}
              </div>

              {/* Content */}
              <div className={cn("flex-1 pb-4", isLast && "pb-0")}>
                <p className="text-sm text-foreground leading-snug">
                  <span className="font-medium">{item.actor}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>
                  {item.target ? (
                    <> <span className="font-medium">{item.target}</span></>
                  ) : null}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground/60">{item.time}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
