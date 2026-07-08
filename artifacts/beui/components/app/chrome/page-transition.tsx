"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { EASE_OUT } from "@/lib/ease";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Skip enter animation on first load so LCP element is visible immediately.
  // After mount, navigations animate normally.
  //
  // useLayoutEffect (not useEffect): fires synchronously before the browser
  // paints, so the mounted→true re-render completes before Framer Motion
  // starts tracking the element. Without this, a layout-switch remount
  // (e.g. Components → Playground changes SiteFrame's tree structure) could
  // cause the effect to fire AFTER paint with a new `initial` value, leaving
  // the motion.div stuck at opacity:0.
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => { setMounted(true); }, []);

  // No AnimatePresence / exit animation here. Giving the old page an explicit
  // exit (fade-to-transparent) before the new page enters creates a forced
  // "blank" window that feels worse than instantly swapping and letting the
  // new page fade in. The original pattern — instant unmount, new content
  // animates in from opacity 0 — is snappier and has no blank gap.
  return (
    <motion.div
      ref={ref}
      key={pathname}
      initial={mounted ? (reduce ? { opacity: 0 } : { opacity: 0, y: 8 }) : false}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.22, ease: EASE_OUT }}
      onAnimationComplete={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "none";
        el.style.willChange = "auto";
      }}
    >
      {children}
    </motion.div>
  );
}
