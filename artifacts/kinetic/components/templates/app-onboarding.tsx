"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_PRESS, SPRING_LAYOUT } from "@/lib/ease";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const STEPS: Step[] = [
  { id: "welcome", title: "Welcome to Nucleus", description: "You're about to set up your workspace. This takes about 2 minutes.", icon: "👋" },
  { id: "profile", title: "Tell us about you", description: "Personalize your experience and let your team know who you are.", icon: "👤" },
  { id: "team", title: "Set up your team", description: "Invite teammates to collaborate on projects right from the start.", icon: "🏠" },
  { id: "plan", title: "Choose your plan", description: "Start free or pick a plan that fits your team's needs.", icon: "✨" },
  { id: "done", title: "You're all set!", description: "Your workspace is ready. Let's build something great.", icon: "🎉" },
];

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = (step / (total - 1)) * 100;
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
      <motion.div
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="h-full rounded-full bg-primary"
      />
    </div>
  );
}

// ─── Step dots ────────────────────────────────────────────────────────────────

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 24 : 8,
            backgroundColor: i <= current
              ? "hsl(var(--primary))"
              : "hsl(var(--border))",
          }}
          transition={SPRING_LAYOUT}
          className="h-2 rounded-full"
        />
      ))}
    </div>
  );
}

// ─── Welcome step ─────────────────────────────────────────────────────────────

function WelcomeStep() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl ring-2 ring-primary/20"
      >
        👋
      </motion.div>
      <p className="mb-6 text-muted-foreground">
        Nucleus helps teams ship faster with instant deploys, built-in auth,
        and a 200+ component library. Let's get your workspace set up.
      </p>
      <div className="grid grid-cols-3 gap-3 w-full">
        {["⚡ Deploy", "🔐 Auth", "🧩 Components"].map((item) => (
          <div key={item} className="rounded-xl border border-border bg-muted/50 px-3 py-3 text-sm font-medium text-muted-foreground">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Profile step ─────────────────────────────────────────────────────────────

function ProfileStep() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const Field = ({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) => (
    <div className="relative">
      <motion.label
        animate={{ y: (focused === id || value) ? -20 : 0, scale: (focused === id || value) ? 0.82 : 1, color: focused === id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
        transition={SPRING_LAYOUT}
        className="pointer-events-none absolute left-3 top-3 origin-left text-sm"
      >
        {label}
      </motion.label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(id)}
        onBlur={() => setFocused(null)}
        className={cn(
          "h-12 w-full rounded-xl border bg-muted/40 px-3 pt-4 pb-1 text-sm text-foreground focus:outline-none focus:ring-2",
          focused === id ? "border-primary/50 ring-primary/20" : "border-border",
        )}
      />
    </div>
  );

  const ROLES = ["Engineer", "Designer", "Product", "Founder", "Other"];

  return (
    <div className="space-y-4">
      <Field id="name" label="Full name" value={name} onChange={setName} />
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Your role</p>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <motion.button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_PRESS}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                role === r
                  ? "border-primary/40 bg-primary/10 font-medium text-primary"
                  : "border-border bg-muted/50 text-muted-foreground hover:text-foreground",
              )}
            >
              {r}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Team step ────────────────────────────────────────────────────────────────

function TeamStep() {
  const [invites, setInvites] = useState([""]);
  const addInvite = () => setInvites((p) => [...p, ""]);
  const updateInvite = (i: number, v: string) => setInvites((p) => p.map((x, j) => j === i ? v : x));

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Invite teammates by email. You can always do this later from settings.
      </p>
      <AnimatePresence>
        {invites.map((inv, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <input
              type="email"
              value={inv}
              onChange={(e) => updateInvite(i, e.target.value)}
              placeholder={`teammate${i + 1}@company.com`}
              className="h-11 w-full rounded-xl border border-border bg-muted/40 px-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={addInvite}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING_PRESS}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-border text-lg leading-none">+</span>
        Add another
      </motion.button>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
        <span>🔗</span>
        Or share your invite link:{" "}
        <code className="rounded bg-border/60 px-1 py-0.5 text-foreground">nucleus.dev/join/abc123</code>
      </div>
    </div>
  );
}

// ─── Plan step ────────────────────────────────────────────────────────────────

const PLAN_OPTIONS = [
  { name: "Starter", price: "Free", description: "3 projects, 5 GB storage", features: ["Shared compute", "Community support"], highlighted: false },
  { name: "Pro", price: "$29/mo", description: "Unlimited projects, priority support", features: ["Dedicated compute", "Preview environments"], highlighted: true },
];

function PlanStep() {
  const [selected, setSelected] = useState("Pro");

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PLAN_OPTIONS.map((plan) => (
        <motion.button
          key={plan.name}
          type="button"
          onClick={() => setSelected(plan.name)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={SPRING_PRESS}
          className={cn(
            "relative rounded-2xl border p-4 text-left transition-colors",
            selected === plan.name
              ? "border-primary/40 bg-primary/5 ring-2 ring-primary/20"
              : "border-border bg-card hover:border-border/80",
          )}
        >
          {plan.highlighted && (
            <span className="absolute -top-2.5 right-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
              Popular
            </span>
          )}
          <AnimatePresence>
            {selected === plan.name && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
              >
                ✓
              </motion.div>
            )}
          </AnimatePresence>
          <p className="font-semibold text-foreground">{plan.name}</p>
          <p className="mb-1 text-lg font-bold text-foreground">{plan.price}</p>
          <p className="mb-3 text-xs text-muted-foreground">{plan.description}</p>
          <ul className="space-y-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="text-primary">✓</span> {f}
              </li>
            ))}
          </ul>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Done step ────────────────────────────────────────────────────────────────

function DoneStep() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
        className="mb-4 text-6xl"
      >
        🎉
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.3 }}
        className="mb-6 text-muted-foreground"
      >
        Your workspace is configured and ready. Start deploying, building,
        and collaborating immediately.
      </motion.p>
      <div className="w-full space-y-2">
        {[
          { label: "Read the docs", icon: "📄" },
          { label: "Explore components", icon: "🧩" },
          { label: "Deploy your first project", icon: "⚡" },
        ].map((item, i) => (
          <motion.a
            key={item.label}
            href="#"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.4 + i * 0.08 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-sm text-foreground transition-colors hover:bg-muted/50"
          >
            <span>{item.icon}</span>
            {item.label}
            <span className="ml-auto text-muted-foreground">→</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

// ─── Step content map ─────────────────────────────────────────────────────────

const STEP_CONTENT: Record<string, React.ReactNode> = {
  welcome: <WelcomeStep />,
  profile: <ProfileStep />,
  team: <TeamStep />,
  plan: <PlanStep />,
  done: <DoneStep />,
};

// ─── Main template ────────────────────────────────────────────────────────────

/**
 * Full multi-step onboarding flow with animated step transitions, floating-label
 * inputs, role picker, team invite, plan selection, and a completion screen.
 * AnimatePresence drives slide-in/out between steps. Self-contained — no required
 * props. Copy and ship.
 */
export function AppOnboarding() {
  const [stepIdx, setStepIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;
  const isFirst = stepIdx === 0;

  const goTo = (idx: number) => {
    setDirection(idx > stepIdx ? 1 : -1);
    setStepIdx(idx);
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40, filter: "blur(4px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40, filter: "blur(4px)" }),
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,hsl(var(--primary)/0.08),transparent)]" />

      <div className="relative w-full max-w-lg">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="rounded-3xl border border-border bg-card shadow-xl"
        >
          {/* Top bar */}
          <div className="border-b border-border px-6 pt-6 pb-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-primary" />
                <span className="text-sm font-bold text-foreground">Nucleus</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Step {stepIdx + 1} of {STEPS.length}
              </span>
            </div>
            <ProgressBar step={stepIdx} total={STEPS.length} />
          </div>

          {/* Step header */}
          <div className="px-6 pt-5 pb-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`header-${stepIdx}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: EASE_OUT }}
              >
                <h2 className="mb-1 text-xl font-bold text-foreground">{step.title}</h2>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step content */}
          <div className="px-6 pb-4 min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`content-${stepIdx}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="pt-2"
              >
                {STEP_CONTENT[step.id]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            <motion.button
              type="button"
              onClick={() => goTo(stepIdx - 1)}
              disabled={isFirst}
              whileHover={!isFirst ? { scale: 1.02 } : {}}
              whileTap={!isFirst ? { scale: 0.97 } : {}}
              transition={SPRING_PRESS}
              className={cn(
                "h-10 rounded-xl px-4 text-sm font-medium transition-colors",
                isFirst
                  ? "pointer-events-none opacity-0"
                  : "border border-border text-muted-foreground hover:text-foreground",
              )}
            >
              Back
            </motion.button>

            <StepDots current={stepIdx} total={STEPS.length} />

            <motion.button
              type="button"
              onClick={() => !isLast ? goTo(stepIdx + 1) : undefined}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_PRESS}
              className="h-10 rounded-xl bg-foreground px-5 text-sm font-semibold text-background"
            >
              {isLast ? "Open workspace" : stepIdx === 0 ? "Get started" : "Continue"}
            </motion.button>
          </div>
        </motion.div>

        {/* Skip link */}
        {!isLast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <button
              type="button"
              onClick={() => goTo(STEPS.length - 1)}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Skip setup
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
