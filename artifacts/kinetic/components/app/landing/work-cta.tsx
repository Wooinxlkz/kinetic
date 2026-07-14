"use client";

import {
  ArrowUpRight,
  Component,
  Layers,
  Mail,
  MousePointerClick,
  Palette,
  Plus,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { PressLink } from "@/components/app/press-link";
import { ContactDialog } from "@/components/app/contact-dialog";

const CAL_URL = "https://cal.com/saurra3h/30min";
const EMAIL = "saurabh10102@gmail.com";

// Faint ambient icons drifting in the empty side space — pure texture, kept
// low-opacity and slow so they never compete with the copy.
const AMBIENT = [
  { Icon: Sparkles, top: "18%", left: "9%", size: 22, duration: 9, delay: 0 },
  { Icon: Component, top: "62%", left: "5%", size: 26, duration: 11, delay: 1.2 },
  { Icon: Wand2, top: "40%", left: "14%", size: 18, duration: 8, delay: 2.4 },
  { Icon: Palette, top: "20%", left: "91%", size: 24, duration: 10, delay: 0.6 },
  { Icon: Layers, top: "60%", left: "95%", size: 20, duration: 9, delay: 1.8 },
  { Icon: Zap, top: "38%", left: "86%", size: 18, duration: 7, delay: 3 },
  { Icon: MousePointerClick, top: "80%", left: "10%", size: 18, duration: 10, delay: 2 },
] as const;

export function WorkCta() {
  const reduce = useReducedMotion();
  const [contactOpen, setContactOpen] = useState(false);

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { type: "spring" as const, stiffness: 300, damping: 28, delay },
        };

  return (
    <section className="px-4 py-20 md:py-28">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-y-6 border-y border-border bg-[radial-gradient(35%_80%_at_50%_0%,theme(colors.primary/12%),transparent)] px-4 py-14 text-center md:py-16">
        {/* corner plus marks, sitting exactly on the border intersections */}
        <Plus className="absolute -left-3 -top-3 z-10 size-6 text-muted-foreground" strokeWidth={1} />
        <Plus className="absolute -right-3 -top-3 z-10 size-6 text-muted-foreground" strokeWidth={1} />
        <Plus className="absolute -bottom-3 -left-3 z-10 size-6 text-muted-foreground" strokeWidth={1} />
        <Plus className="absolute -bottom-3 -right-3 z-10 size-6 text-muted-foreground" strokeWidth={1} />

        {/* side rails, taller than the box itself */}
        <div className="pointer-events-none absolute -inset-y-6 left-0 w-px border-l border-border" />
        <div className="pointer-events-none absolute -inset-y-6 right-0 w-px border-r border-border" />

        {/* dashed centerline, behind content */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full border-l border-dashed border-border" />

        {/* ambient floating icons in the side space, low-opacity texture */}
        {!reduce &&
          AMBIENT.map(({ Icon, top, left, size, duration, delay }, i) => (
            <motion.div
              key={i}
              aria-hidden
              className="pointer-events-none absolute -z-10 hidden text-foreground/10 md:block"
              style={{ top, left, width: size, height: size }}
              animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
            >
              <Icon className="h-full w-full" strokeWidth={1.2} />
            </motion.div>
          ))}

        {/* ambient UI fragments, right side only — mixed in with the icons */}
        {!reduce && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -z-10 hidden items-center gap-1 rounded-full border border-foreground/10 px-1.5 py-1 md:flex"
              style={{ top: "10%", left: "80%" }}
              animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="block h-2.5 w-5 rounded-full bg-foreground/10">
                <span className="block h-2.5 w-2.5 translate-x-2.5 rounded-full bg-foreground/20" />
              </span>
            </motion.div>

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -z-10 hidden w-16 flex-col gap-1 rounded-md border border-foreground/10 p-1.5 md:flex"
              style={{ top: "72%", left: "88%" }}
              animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
            >
              <span className="block h-1 w-6 rounded-full bg-foreground/15" />
              <span className="block h-2 w-full rounded-sm bg-foreground/10" />
            </motion.div>
          </>
        )}

        <motion.span
          {...fadeUp(0)}
          className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          Contact us
        </motion.span>

        <motion.h2
          {...fadeUp(0.08)}
          className="font-pixel text-3xl font-semibold text-foreground md:text-5xl md:leading-[1.15]"
        >
          Want bespoke components for your product?
        </motion.h2>

        <motion.p
          {...fadeUp(0.16)}
          className="max-w-md text-base leading-7 text-muted-foreground"
        >
          Custom motion components, icon sets, and frontend systems, built to
          spec. Book a call or drop a line, whichever's easier.
        </motion.p>

        <motion.div
          {...fadeUp(0.24)}
          className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <PressLink
            href={CAL_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book a call
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </PressLink>

          <PressLink
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-transparent px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Mail className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Email me
          </PressLink>
        </motion.div>

        <motion.button
          {...fadeUp(0.3)}
          type="button"
          onClick={() => setContactOpen(true)}
          className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Or send us feedback
        </motion.button>
      </div>

      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
