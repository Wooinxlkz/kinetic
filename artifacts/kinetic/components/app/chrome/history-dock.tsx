"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PreviewRail } from "@/components/motion/preview-rail";
import { useRecentComponents } from "@/lib/hooks/use-recent-components";
import { cn } from "@/lib/utils";

export function HistoryDock() {
  const { items, visible } = useRecentComponents();
  const [isHovered, setIsHovered] = useState(false);

  // When the dock is open, watch the cursor globally.
  // onMouseLeave on the wrapper doesn't fire until the cursor leaves ALL
  // descendants — including the overflowing w-72 PreviewRail div — which
  // means the dock stayed open until x > 288px. This fires as soon as
  // the cursor passes the actual strip edge (~56px from left).
  useEffect(() => {
    if (!isHovered) return;
    const close = (e: PointerEvent) => {
      if (e.clientX > 64) setIsHovered(false);
    };
    window.addEventListener("pointermove", close, { passive: true });
    return () => window.removeEventListener("pointermove", close);
  }, [isHovered]);

  const onEnter = useCallback(() => setIsHovered(true), []);

  const railItems = items.map((item) => ({
    id: item.id,
    label: item.label,
    description: (
      <span className="text-xs capitalize text-muted-foreground/70">
        {item.category}
      </span>
    ),
    href: item.href,
  }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-none fixed left-0 top-0 bottom-0 z-40 hidden lg:flex items-center"
        >
          <div
            className={cn(
              "pointer-events-auto w-14 overflow-visible",
              "transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-[0.08]",
            )}
            onMouseEnter={onEnter}
          >
            <PreviewRail
              items={railItems}
              orientation="vertical"
              className="w-72"
              railClassName="pl-2"
              interactive={isHovered}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
