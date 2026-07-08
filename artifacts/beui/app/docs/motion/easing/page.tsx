import type { Metadata } from "next";
import { CodeBlock } from "@/components/app/docs/code-block";

export const metadata: Metadata = {
  title: "Easing Reference",
  description:
    "Easing curves used in Kinetic UI — how they're defined, when to use each one, and how to import them in your own animations.",
  alternates: { canonical: "/docs/motion/easing" },
  openGraph: {
    title: "Easing Reference · Kinetic UI",
    description: "Easing curves used in Kinetic UI and when to use each one.",
    url: "/docs/motion/easing",
    type: "article",
    siteName: "Kinetic UI",
    images: ["/api/og"],
  },
};

const IMPORT_SNIPPET = `import { EASE_OUT, EASE_IN_OUT } from "@/lib/ease";`;

const EASE_OUT_USAGE = `// Recommended for most UI transitions (elements entering the screen)
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.22, ease: EASE_OUT }}
/>`;

const EASE_IN_OUT_USAGE = `// Good for elements that move across the screen (e.g. dialogs, sheets)
<motion.div
  initial={{ x: "-100%" }}
  animate={{ x: 0 }}
  exit={{ x: "-100%" }}
  transition={{ duration: 0.3, ease: EASE_IN_OUT }}
/>`;

const EASE_LINEAR_USAGE = `// Use for continuous loops — never for UI state transitions
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
/>`;

const DEFINITION = `// lib/ease.ts
export const EASE_OUT     = [0.16, 1, 0.3, 1]  as const; // fast start, slow finish
export const EASE_IN_OUT  = [0.45, 0, 0.55, 1] as const; // symmetric S-curve`;

type Curve = {
  name: string;
  bezier: string;
  feel: string;
  when: string;
  avoid: string;
};

const CURVES: Curve[] = [
  {
    name:    "EASE_OUT",
    bezier:  "cubic-bezier(0.16, 1, 0.3, 1)",
    feel:    "Fast start, slow elegant finish",
    when:    "Entering elements, tooltips, menus, modals appearing",
    avoid:   "Exiting elements — it reads as the thing reluctant to leave",
  },
  {
    name:    "EASE_IN_OUT",
    bezier:  "cubic-bezier(0.45, 0, 0.55, 1)",
    feel:    "Slow in, peak speed midpoint, slow out",
    when:    "Sliding panels, cross-fades, layout rearrangements",
    avoid:   "Short durations — the slow start feels laggy under ~200ms",
  },
  {
    name:    "linear",
    bezier:  "linear",
    feel:    "Constant velocity throughout",
    when:    "Infinite spin indicators, progress bars",
    avoid:   "Any state transition — feels mechanical and digital",
  },
  {
    name:    "easeOut (Framer default)",
    bezier:  "cubic-bezier(0.25, 0, 0, 1)",
    feel:    "Similar to EASE_OUT but less dramatic",
    when:    "When you want subtle, understated motion",
    avoid:   "When you need the animation to feel premium",
  },
];

export default function EasingPage() {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Motion
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        Easing Reference
      </h1>
      <p className="mt-3 text-muted-foreground">
        Easing defines how a value changes over time. The right curve makes an
        animation feel natural; the wrong one makes it feel mechanical or slow.
        Kinetic UI uses two named curves for 95% of transitions.
      </p>

      <h2 id="the-constants" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        The constants
      </h2>
      <p className="mt-2 text-muted-foreground">
        Two bezier arrays live in{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">lib/ease.ts</code>.
        Import them wherever you write animations.
      </p>
      <div className="mt-4">
        <CodeBlock code={DEFINITION} lang="ts" filename="lib/ease.ts" />
      </div>
      <div className="mt-4">
        <CodeBlock code={IMPORT_SNIPPET} lang="ts" filename="your-component.ts" />
      </div>

      <h2 id="curve-reference" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Curve reference
      </h2>
      <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {CURVES.map((c) => (
          <div key={c.name} className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <code className="rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-sm font-medium text-foreground">
                {c.name}
              </code>
              <span className="text-xs text-muted-foreground">{c.bezier}</span>
            </div>
            <p className="mt-2 text-sm text-foreground">{c.feel}</p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Use for</p>
                <p className="text-sm text-muted-foreground">{c.when}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Avoid</p>
                <p className="text-sm text-muted-foreground">{c.avoid}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 id="usage-examples" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Usage examples
      </h2>

      <h3 id="ease-out-enter" className="mt-6 text-base font-semibold tracking-tight text-foreground">
        EASE_OUT — entering elements
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        The default for anything appearing on screen. Feels snappy and confident.
      </p>
      <div className="mt-3">
        <CodeBlock code={EASE_OUT_USAGE} lang="tsx" filename="component.tsx" />
      </div>

      <h3 id="ease-in-out-slide" className="mt-6 text-base font-semibold tracking-tight text-foreground">
        EASE_IN_OUT — sliding panels
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Symmetrical S-curve. Great for drawers, sheets, and anything that
        traverses significant distance.
      </p>
      <div className="mt-3">
        <CodeBlock code={EASE_IN_OUT_USAGE} lang="tsx" filename="component.tsx" />
      </div>

      <h3 id="linear-loops" className="mt-6 text-base font-semibold tracking-tight text-foreground">
        linear — infinite loops only
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Constant velocity. Reserve it for spinners and progress indicators.
        Never use it for state transitions.
      </p>
      <div className="mt-3">
        <CodeBlock code={EASE_LINEAR_USAGE} lang="tsx" filename="component.tsx" />
      </div>

      <h2 id="duration-guide" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Duration guide
      </h2>
      <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {[
          { range: "80–120ms", use: "Micro-interactions: button press, toggle, checkbox" },
          { range: "150–200ms", use: "Tooltip appear, dropdown open, inline state change" },
          { range: "200–300ms", use: "Modal / dialog enter, page element reveal" },
          { range: "300–500ms", use: "Full-page transitions, sheet/drawer slide" },
          { range: "500ms+",   use: "Decorative hero animations only — never for functional UI" },
        ].map((row) => (
          <div key={row.range} className="flex items-start gap-4 px-5 py-3">
            <code className="mt-0.5 w-28 shrink-0 text-xs font-medium text-foreground">{row.range}</code>
            <p className="text-sm text-muted-foreground">{row.use}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
