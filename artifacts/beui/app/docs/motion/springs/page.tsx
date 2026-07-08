import type { Metadata } from "next";
import { CodeBlock } from "@/components/app/docs/code-block";

export const metadata: Metadata = {
  title: "Spring Config",
  description:
    "Spring physics presets used in Kinetic UI — bounce, stiffness, damping, and when to reach for a spring over a tween.",
  alternates: { canonical: "/docs/motion/springs" },
  openGraph: {
    title: "Spring Config · Kinetic UI",
    description: "Spring physics presets and when to use them in Kinetic UI animations.",
    url: "/docs/motion/springs",
    type: "article",
    siteName: "Kinetic UI",
    images: ["/api/og"],
  },
};

const SPRING_VS_TWEEN = `// Tween — you control duration exactly
transition={{ duration: 0.22, ease: EASE_OUT }}

// Spring — duration is emergent from physics; feels alive
transition={{ type: "spring", stiffness: 400, damping: 30 }}`;

const BOUNCE_API = `// Short-hand bounce API (Framer Motion 11+)
// bounce: 0 → critically damped (no overshoot)
// bounce: 1 → maximum wobble
transition={{ type: "spring", duration: 0.4, bounce: 0.25 }}`;

const PRESET_SNAPPY = `// Snappy — tight response for buttons, toggles, and small elements
const SPRING_SNAPPY = { type: "spring", stiffness: 500, damping: 35 } as const;

<motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY} />`;

const PRESET_GENTLE = `// Gentle — smooth, relaxed for layout shifts and reveals
const SPRING_GENTLE = { type: "spring", stiffness: 200, damping: 28 } as const;

<motion.div
  layout
  transition={SPRING_GENTLE}
/>`;

const PRESET_BOUNCY = `// Bouncy — playful overshoot for icons, badges, and delight moments
const SPRING_BOUNCY = { type: "spring", stiffness: 350, damping: 18 } as const;

<motion.div
  animate={{ scale: 1 }}
  initial={{ scale: 0 }}
  transition={SPRING_BOUNCY}
/>`;

const LAYOUT_SPRING = `// Recommended layout spring — fast enough to feel responsive
//   but smooth enough not to jar
<motion.ul layout>
  {items.map((item) => (
    <motion.li
      key={item.id}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  ))}
</motion.ul>`;

type Preset = {
  name: string;
  stiffness: number;
  damping: number;
  feel: string;
  use: string;
};

const PRESETS: Preset[] = [
  { name: "Snappy",  stiffness: 500, damping: 35, feel: "Tight, immediate, no overshoot",     use: "Buttons, toggles, checkboxes, small interactive elements" },
  { name: "Gentle",  stiffness: 200, damping: 28, feel: "Smooth, relaxed, slight overshoot",   use: "Layout shifts, list reordering, content reveals" },
  { name: "Bouncy",  stiffness: 350, damping: 18, feel: "Playful, clear overshoot, wobbles",   use: "Badges, notification dots, celebration moments" },
  { name: "Stiff",   stiffness: 700, damping: 50, feel: "Near-instant, physically rigid",      use: "Drag handles, sliders, things that must feel 1:1 with input" },
];

export default function SpringsPage() {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Motion
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        Spring Config
      </h1>
      <p className="mt-3 text-muted-foreground">
        Springs simulate physics. Instead of a fixed duration and easing curve,
        a spring's timing emerges from stiffness, damping, and mass — making
        motion feel alive rather than scripted.
      </p>

      <h2 id="spring-vs-tween" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Spring vs tween
      </h2>
      <p className="mt-2 text-muted-foreground">
        Use a tween when you need exact timing control (page transitions, synced
        animations). Use a spring when the motion should feel interactive and
        physical — especially for anything that responds to user input.
      </p>
      <div className="mt-4">
        <CodeBlock code={SPRING_VS_TWEEN} lang="tsx" filename="component.tsx" />
      </div>

      <h2 id="parameters" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Parameters
      </h2>
      <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {[
          { param: "stiffness",  type: "number",  desc: "How strong the spring pulls toward the target. Higher = snappier. Typical range: 100–800." },
          { param: "damping",    type: "number",  desc: "How much the spring resists oscillation. Lower = more bouncy, higher = critically damped. Typical range: 15–60." },
          { param: "mass",       type: "number",  desc: "Inertia of the element. Rarely changed from the default of 1. Increase for a heavier, slower feel." },
          { param: "bounce",     type: "0–1",     desc: "Shorthand for combined stiffness + damping. 0 = no overshoot, 1 = max wobble. Use with duration." },
          { param: "duration",   type: "seconds", desc: "Approximate settle time. Only meaningful when using the bounce API — not combined with stiffness/damping." },
          { param: "restDelta",  type: "number",  desc: "Distance threshold below which the spring is considered settled. Default 0.01." },
        ].map(({ param, type, desc }) => (
          <div key={param} className="px-5 py-4">
            <div className="flex items-center gap-2">
              <code className="font-mono text-sm font-medium text-foreground">{param}</code>
              <span className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{type}</span>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <h2 id="bounce-shorthand" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Bounce shorthand
      </h2>
      <p className="mt-2 text-muted-foreground">
        Framer Motion 11 introduced a simpler API: set{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">bounce</code> (0–1)
        and{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">duration</code>{" "}
        instead of stiffness and damping. Good for quick prototyping; reach for
        the explicit params when you need fine control.
      </p>
      <div className="mt-4">
        <CodeBlock code={BOUNCE_API} lang="tsx" filename="component.tsx" />
      </div>

      <h2 id="presets" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Presets
      </h2>
      <p className="mt-2 text-muted-foreground">
        Four named presets cover the majority of use cases in Kinetic UI.
        Define them as constants and import where needed.
      </p>
      <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {PRESETS.map((p) => (
          <div key={p.name} className="px-5 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-foreground">{p.name}</span>
              <code className="text-xs text-muted-foreground">stiffness: {p.stiffness}, damping: {p.damping}</code>
            </div>
            <p className="mt-1 text-sm text-foreground">{p.feel}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.use}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <CodeBlock code={PRESET_SNAPPY}  lang="tsx" filename="spring-snappy.tsx" />
        <CodeBlock code={PRESET_GENTLE}  lang="tsx" filename="spring-gentle.tsx" />
        <CodeBlock code={PRESET_BOUNCY}  lang="tsx" filename="spring-bouncy.tsx" />
      </div>

      <h2 id="layout-animations" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Layout animations
      </h2>
      <p className="mt-2 text-muted-foreground">
        Springs are the only sensible choice for{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">layout</code>{" "}
        animations. Tweens with fixed durations feel mismatched when elements
        move different distances — springs naturally scale timing to distance.
      </p>
      <div className="mt-4">
        <CodeBlock code={LAYOUT_SPRING} lang="tsx" filename="list.tsx" />
      </div>

      <h2 id="rules" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Rules
      </h2>
      <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {[
          "Never use stiffness/damping and duration/bounce together — they're two separate APIs.",
          "Damping below ~15 produces visible oscillation; use it only for deliberate bouncy effects.",
          "Don't use springs for opacity — opacity has no physical analogy and the overshoot reads as a flicker.",
          "Keep mass at 1 unless you're intentionally simulating something heavy.",
          "Springs don't have a fixed end time. If you need to chain animations with exact timing, use a tween.",
        ].map((rule, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[10px] font-bold text-foreground">
              {i + 1}
            </span>
            <p className="text-sm text-muted-foreground">{rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
