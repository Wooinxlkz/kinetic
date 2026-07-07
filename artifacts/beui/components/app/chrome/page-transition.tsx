"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { EASE_OUT } from "@/lib/ease";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    // initial={false} on AnimatePresence: the first child that enters after
    // any mount (including remounts caused by SiteFrame switching between
    // sidebar / no-sidebar layouts) skips its enter animation and renders
    // immediately at the `animate` state. Subsequent key-changes (real
    // navigations) still run the full exit + enter sequence.
    //
    // Previously we tracked a `mounted` boolean to achieve the same goal,
    // but it caused a race in React 18 concurrent mode: useEffect fires
    // after paint, which could re-render the motion.div with a new `initial`
    // value while Framer Motion's enter bookkeeping was still in flight —
    // leaving the element stuck at opacity:0 on the Playground page.
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        ref={ref}
        key={pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
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
