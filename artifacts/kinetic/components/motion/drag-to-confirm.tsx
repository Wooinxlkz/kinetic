"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DragToConfirmProps {
  label?: string;
  confirmedLabel?: string;
  onConfirm?: () => void;
  className?: string;
}

const TRACK_PADDING = 4;
const HANDLE_SIZE = 40;

/**
 * Drag-to-confirm slider. Drag the handle all the way right to trigger onConfirm.
 * Spring-snaps back if not completed. Shows a success state when confirmed.
 */
export function DragToConfirm({
  label = "Slide to confirm",
  confirmedLabel = "Confirmed!",
  onConfirm,
  className,
}: DragToConfirmProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [confirmed, setConfirmed] = useState(false);

  const maxX = () => {
    if (!trackRef.current) return 0;
    return trackRef.current.offsetWidth - HANDLE_SIZE - TRACK_PADDING * 2;
  };

  const progress = useTransform(x, [0, maxX()], [0, 1]);
  const labelOpacity = useTransform(progress, [0, 0.5], [1, 0]);
  const trackColor = useTransform(progress, [0, 1], ["hsl(var(--muted))", "hsl(var(--primary) / 0.15)"]);

  function handleDragEnd() {
    const threshold = maxX() * 0.88;
    if (x.get() >= threshold) {
      animate(x, maxX(), { type: "spring", stiffness: 400, damping: 30 });
      setConfirmed(true);
      onConfirm?.();
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  }

  function handleReset() {
    setConfirmed(false);
    animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
  }

  return (
    <motion.div
      ref={trackRef}
      style={{ backgroundColor: trackColor }}
      className={cn(
        "relative flex h-12 select-none items-center rounded-full p-[4px] overflow-hidden cursor-default",
        className,
      )}
    >
      {/* Track label */}
      <motion.span
        style={{ opacity: labelOpacity }}
        className="absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground pointer-events-none"
      >
        {confirmed ? confirmedLabel : label}
      </motion.span>

      {/* Handle */}
      <motion.div
        drag={confirmed ? false : "x"}
        dragConstraints={{ left: 0, right: maxX() }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        onClick={confirmed ? handleReset : undefined}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-md transition-colors duration-300",
          confirmed
            ? "bg-emerald-500 text-white cursor-pointer"
            : "bg-background text-foreground cursor-grab active:cursor-grabbing",
        )}
      >
        {confirmed ? (
          <Check className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </motion.div>
    </motion.div>
  );
}
