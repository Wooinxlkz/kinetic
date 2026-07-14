"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { SPRING_PANEL } from "@/lib/ease";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VariantProps = Record<string, any>;

interface VariantDef {
  hidden: VariantProps;
  visible: VariantProps;
}

const VARIANTS: Record<AnimationStyle, VariantDef> = {
  "from-bottom": {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
  },
  "from-center": {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  "from-top": {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
  },
  "from-left": {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
  },
  "from-right": {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export interface HeroVideoDialogProps {
  /** YouTube embed URL, Vimeo embed URL, or any direct video src. */
  videoSrc: string;
  /** URL for the thumbnail image shown before the dialog opens. */
  thumbnailSrc: string;
  thumbnailAlt?: string;
  /** How the dialog animates in. Default "from-center". */
  animationStyle?: AnimationStyle;
  className?: string;
}

/**
 * A thumbnail with a play button that opens a fullscreen video dialog.
 * Supports YouTube / Vimeo embed URLs or direct video files.
 * The dialog renders in a portal to escape any overflow constraints.
 */
export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  animationStyle = "from-center",
  className,
}: HeroVideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => { setIsMounted(true); }, []);

  const v = VARIANTS[animationStyle];
  const reducedVariant = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const variant = reduce ? reducedVariant : v;

  const dialog = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
              initial={variant.hidden}
              animate={variant.visible}
              exit={variant.hidden}
              transition={reduce ? { duration: 0.15 } : SPRING_PANEL}
            >
              <button
                type="button"
                aria-label="Close video"
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-video bg-black">
                {isOpen && (
                  <iframe
                    src={videoSrc}
                    title="Video"
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Thumbnail trigger */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Play video"
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-2xl",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/30">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl"
            whileHover={reduce ? {} : { scale: 1.1 }}
            whileTap={reduce ? {} : { scale: 0.93 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Play className="h-6 w-6 translate-x-0.5 fill-current text-gray-900" />
          </motion.div>
        </div>
      </div>

      {/* Portal dialog */}
      {isMounted && createPortal(dialog, document.body)}
    </>
  );
}
