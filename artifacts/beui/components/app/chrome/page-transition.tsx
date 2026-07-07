"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE_OUT } from "@/lib/ease";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Skip enter animation on first load so LCP element is visible immediately.
  // After mount, navigations animate normally.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    // mode="wait": exit finishes (80 ms) before enter starts, eliminating
    // the blank-gap where the old page vanished but the new one hadn't yet
    // appeared. The fast exit makes the total feel snappier than the current
    // instant-disappear + blank + slow-fade-in sequence.
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        ref={ref}
        key={pathname}
        initial={mounted ? (reduce ? { opacity: 0 } : { opacity: 0, y: 8 }) : false}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduce
          ? { opacity: 0, transition: { duration: 0.06 } }
          : { opacity: 0, y: -4, transition: { duration: 0.08, ease: EASE_OUT } }
        }
        transition={{ duration: reduce ? 0.1 : 0.18, ease: EASE_OUT }}
        onAnimationComplete={() => {
          const el = ref.current;
          if (!el) return;
          el.style.transform = "none";
          el.style.willChange = "auto";
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
