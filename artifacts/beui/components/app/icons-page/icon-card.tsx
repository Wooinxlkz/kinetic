"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IconEntry } from "@/lib/icons-registry";
import { IconSourceDialog } from "@/components/app/icons-page/icon-source-dialog";

interface IconCardProps {
  entry: IconEntry;
  IconComponent: React.ComponentType<{ size?: number; className?: string; isPlaying?: boolean; isOpen?: boolean }>;
}

export function IconCard({ entry, IconComponent }: IconCardProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const active = hovered || focused;

  return (
    <>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative flex flex-col items-center gap-3 rounded-2xl bg-card p-5 transition-colors duration-200 hover:bg-card/80 focus-within:bg-card/80"
      >
        {/* Icon preview */}
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-background text-foreground">
          <IconComponent
            size={28}
            isPlaying={active}
            isOpen={active}
          />
        </div>

        {/* Name */}
        <p className="text-center text-xs font-medium text-foreground/80">{entry.name}</p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1">
          {entry.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View code button — top-right. Always mounted (so it's reachable by
            Tab) but only visible on hover or keyboard focus, matching the
            hover-reveal pattern used elsewhere without hiding it from
            keyboard/AT users. */}
        <motion.button
          type="button"
          onClick={() => setDialogOpen(true)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.12 }}
          className={cn(
            "absolute top-2.5 right-2.5 flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium",
            "bg-foreground/10 text-muted-foreground hover:text-foreground",
            "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            !active && "pointer-events-none",
          )}
        >
          <Code2 className="h-3 w-3" /> Code
        </motion.button>
      </motion.div>

      <IconSourceDialog
        entry={entry}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        IconComponent={IconComponent}
      />
    </>
  );
}
