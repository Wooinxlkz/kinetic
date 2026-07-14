"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react";
import { ActionSwapIcon } from "@/components/motion/action-swap";
import { cn } from "@/lib/utils";

export type ThemeVariant = "rectangle" | "circle" | "circle-blur";

export type RectStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "bottom-up";

export interface ThemeToggleProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick"> {
  /** Animation variant. Default: "rectangle". */
  variant?: ThemeVariant;
  /** Origin direction for the reveal. Default: "bottom-up". */
  start?: RectStart;
  iconClassName?: string;
}

// ─── constants ────────────────────────────────────────────────────────────────

const VT_STYLE_ID = "kinetic-theme-toggle-vt";

const RECT_FROM: Record<RectStart, string> = {
  "top-left": "inset(0 100% 100% 0)",
  "top-right": "inset(0 0 100% 100%)",
  "bottom-left": "inset(100% 100% 0 0)",
  "bottom-right": "inset(100% 0 0 100%)",
  center: "inset(50% 50% 50% 50%)",
  "bottom-up": "inset(100% 0 0 0)",
};

const CIRCLE_ORIGIN: Record<RectStart, string> = {
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-left": "0% 100%",
  "bottom-right": "100% 100%",
  center: "50% 50%",
  "bottom-up": "50% 100%",
};

// ─── style injection ──────────────────────────────────────────────────────────

/**
 * Inject (or replace) a scoped <style> block that drives the current toggle.
 * We rewrite it on every call so the clip-path values are always correct.
 */
function injectVtStyle(
  clipFrom: string,
  clipTo: string,
  durationMs: number,
  ease: string,
  blur: boolean,
) {
  let el = document.getElementById(VT_STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = VT_STYLE_ID;
    document.head.appendChild(el);
  }

  el.textContent = `
html[data-kinetic-vt]::view-transition-old(root) {
  animation: none;
  mix-blend-mode: normal;
}
html[data-kinetic-vt]::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: kinetic-vt-reveal ${durationMs}ms ${ease} both${blur ? `, kinetic-vt-blur ${durationMs}ms ${ease} both` : ""};
  will-change: clip-path;
}
@keyframes kinetic-vt-reveal {
  from { clip-path: ${clipFrom}; }
  to   { clip-path: ${clipTo}; }
}${
    blur
      ? `
@keyframes kinetic-vt-blur {
  from { filter: blur(10px); }
  to   { filter: blur(0px); }
}`
      : ""
  }
html[data-kinetic-vt] *,
html[data-kinetic-vt] *::before,
html[data-kinetic-vt] *::after {
  transition: none !important;
  animation-play-state: paused !important;
}
`.trim();
}

// ─── hook ─────────────────────────────────────────────────────────────────────

export function useThemeToggle({
  variant = "rectangle",
  start = "bottom-up",
}: { variant?: ThemeVariant; start?: RectStart } = {}) {
  const { setTheme, resolvedTheme } = useTheme();
  const reduce = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  // Guard: prevents a second VT from starting while the first is in flight.
  const vtActive = useRef(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = (event?: MouseEvent<HTMLButtonElement>) => {
    // Don't fire before the resolved theme is known or while a VT is running.
    if (!mounted || !resolvedTheme || vtActive.current) return;

    const nextIsDark = resolvedTheme !== "dark";
    const next = nextIsDark ? "dark" : "light";

    // No View Transition: reduced motion or API not supported → just switch.
    if (reduce || !("startViewTransition" in document)) {
      setTheme(next);
      return;
    }

    // ── Compute animation parameters ──────────────────────────────────────────
    let clipFrom: string;
    let clipTo: string;

    if (variant === "rectangle") {
      clipFrom = RECT_FROM[start];
      clipTo = "inset(0 0 0 0)";
    } else {
      let origin: string;
      if (event?.currentTarget instanceof Element) {
        const r = event.currentTarget.getBoundingClientRect();
        origin = `${Math.round(r.left + r.width / 2)}px ${Math.round(r.top + r.height / 2)}px`;
      } else {
        origin = CIRCLE_ORIGIN[start];
      }
      clipFrom = `circle(0% at ${origin})`;
      clipTo = `circle(150% at ${origin})`;
    }

    const isCircle = variant !== "rectangle";
    const durationMs = isCircle ? 350 : 220;
    const ease = isCircle
      ? "cubic-bezier(0.22, 1, 0.36, 1)"
      : "cubic-bezier(0.4, 0, 0.2, 1)";
    const blur = variant === "circle-blur";

    // ── Inject CSS, mark VT active ─────────────────────────────────────────────
    injectVtStyle(clipFrom, clipTo, durationMs, ease, blur);
    document.documentElement.dataset.kineticVt = "1";
    vtActive.current = true;

    const cleanup = () => {
      vtActive.current = false;
      delete document.documentElement.dataset.kineticVt;
    };

    // ── Pause running WAAPI + CSS animations that are in the viewport ─────────
    // Framer Motion drives its repeat:Infinity loops via the Web Animations API
    // (WAAPI), which is a completely separate engine from CSS @keyframes — our
    // CSS `animation-play-state: paused` rule does NOT reach it. Pausing them
    // before the VT snapshot eliminates compositor flush cost.
    //
    // We scope this to viewport-visible elements only. Pages like the landing
    // page can have 100+ WAAPI animations running on off-screen preview cards;
    // pausing all of them synchronously on the main thread costs more than it
    // saves — the browser doesn't need to snapshot off-screen elements anyway.
    const vh = window.innerHeight;
    const pausedAnimations = document.getAnimations().filter((a) => {
      if (a.playState !== "running") return false;
      const target = (a.effect as KeyframeEffect | null)?.target;
      if (!(target instanceof Element)) return false;
      const rect = target.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < vh;
    });
    pausedAnimations.forEach((a) => a.pause());

    // Declared as `let` so the safety timer closure captures it by reference
    // and calls the real implementation even though the timer is registered
    // before pausedAnimations is collected.
    let resumeAnimations = () => {};
    resumeAnimations = () => {
      for (const a of pausedAnimations) {
        if (a.playState === "paused") a.play();
      }
    };

    // Safety net: always release the lock AND resume animations even if
    // finished/ready never settle. Proxied iframes (e.g. Replit preview) can
    // abort a VT without the browser rejecting either promise — leaving paused
    // animations frozen and vtActive permanently locked.
    // setTheme() is included as a last-resort localStorage sync: if vt.finished
    // never resolved, the .dark class on the DOM is already correct (toggled
    // inside startViewTransition) but next-themes storage would be stale.
    const safetyTimer = setTimeout(() => {
      cleanup();
      resumeAnimations();
      setTheme(next);
    }, durationMs + 500);

    try {
      const vt = (
        document as Document & {
          startViewTransition(cb: () => void): {
            ready: Promise<void>;
            finished: Promise<void>;
          };
        }
      ).startViewTransition(() => {
        // ── KEY FIX ────────────────────────────────────────────────────────────
        // Directly toggle the CSS class instead of calling setTheme() here.
        //
        // Why: setTheme() schedules a React state update. In React 18 concurrent
        // mode, flushSync() cannot guarantee that ALL components render before the
        // VT "after" snapshot is taken — Suspense boundaries and deferred updates
        // are skipped. This leaves some elements at the old theme in the snapshot,
        // causing the "some things switch, others don't until reload" bug.
        //
        // Direct class manipulation is purely synchronous DOM — the CSS cascade
        // updates every element that depends on CSS variables *instantly*, so the
        // VT "after" snapshot is always complete and correct.
        //
        // setTheme() is called after VT ends (see vt.finished) to persist the
        // choice to localStorage and sync the React context.
        document.documentElement.classList.toggle("dark", nextIsDark);
      });

      // If VT fails to start (e.g. browser skipped it), fall back cleanly.
      vt.ready.catch(() => {
        clearTimeout(safetyTimer);
        cleanup();
        resumeAnimations();
        setTheme(next);
      });

      // After animation completes: sync React context + localStorage.
      // The DOM class is already correct; setTheme() is idempotent here.
      //
      // ── WHY the 80 ms delay ───────────────────────────────────────────────
      // setTheme() schedules an async React re-render. cleanup() removes
      // data-kinetic-vt from <html>, which re-enables the 0.3 s CSS color
      // transitions defined in globals.css via :not([data-kinetic-vt] *).
      // If cleanup() fires before React paints the re-render, elements that
      // change color during that render undergo the transition *after* the
      // VT wipe ends, producing a visible post-wipe color fade ("sluggish").
      // Holding data-kinetic-vt for 80 ms gives React's microtask + one rAF
      // time to commit and paint with transitions still suppressed.
      //
      // ── WHY the .catch ────────────────────────────────────────────────────
      // If the VT was interrupted after it started (e.g. the browser aborted
      // it mid-animation), vt.finished rejects. The .then() is skipped, so
      // setTheme() would never be called — the .dark class on the DOM is
      // already correct but next-themes localStorage would stay stale,
      // reverting the theme on next page load.
      vt.finished
        .then(
          () =>
            new Promise<void>((resolve) => {
              setTheme(next);
              setTimeout(resolve, 80);
            }),
        )
        .catch(() => {
          // VT interrupted after starting — persist theme to localStorage.
          setTheme(next);
        })
        .finally(() => {
          clearTimeout(safetyTimer);
          cleanup();
          resumeAnimations();
        });
    } catch {
      // startViewTransition threw — fall back to an instant switch.
      clearTimeout(safetyTimer);
      cleanup();
      resumeAnimations();
      setTheme(next);
    }
  };

  return { isDark, mounted, toggle };
}

// ─── component ────────────────────────────────────────────────────────────────

export function ThemeToggle({
  variant = "rectangle",
  start = "bottom-up",
  className,
  iconClassName,
  ...rest
}: ThemeToggleProps) {
  const { isDark, mounted, toggle } = useThemeToggle({ variant, start });

  return (
    <button
      type="button"
      aria-label={
        mounted && isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      onClick={(e) => toggle(e)}
      className={cn("flex items-center justify-center", className)}
      {...rest}
    >
      {mounted ? (
        <ActionSwapIcon
          value={isDark ? "dark" : "light"}
          animation="blur"
          className={iconClassName}
        >
          {isDark ? (
            <Sun className={iconClassName} />
          ) : (
            <Moon className={iconClassName} />
          )}
        </ActionSwapIcon>
      ) : (
        <span className={iconClassName} aria-hidden="true" />
      )}
    </button>
  );
}
