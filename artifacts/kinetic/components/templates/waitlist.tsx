"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_PRESS } from "@/lib/ease";

// ─── Flickering grid background ───────────────────────────────────────────────

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 24;
    const PROB = 0.08;
    let animFrame: number;
    let cells: number[][] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.ceil(canvas.width / CELL);
      const rows = Math.ceil(canvas.height / CELL);
      cells = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() < 0.2 ? Math.random() : 0)),
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cells.forEach((row, r) => {
        row.forEach((val, c) => {
          if (val > 0) {
            ctx.fillStyle = `rgba(139,92,246,${val * 0.25})`;
            ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
          }
          if (Math.random() < PROB) cells[r][c] = Math.random() < 0.3 ? Math.random() * 0.8 : 0;
        });
      });
      animFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const obs = new ResizeObserver(resize);
    obs.observe(canvas);

    return () => { cancelAnimationFrame(animFrame); obs.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

// ─── Animated typewriter headline ─────────────────────────────────────────────

function TypewriterHeadline({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = words[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, words]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block h-[1em] w-[3px] translate-y-[2px] bg-primary"
      />
    </span>
  );
}

// ─── Counter (animated on mount) ─────────────────────────────────────────────

function JoinCounter({ target }: { target: number }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 14 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => mv.set(target), 400);
    return () => clearTimeout(t);
  }, [mv, target]);

  useEffect(() => spring.on("change", (v) => setVal(Math.round(v))), [spring]);

  return <span className="tabular-nums">{val.toLocaleString()}</span>;
}

// ─── Avatar stack ─────────────────────────────────────────────────────────────

const AVATAR_INITIALS = ["AK", "MS", "YL", "JP", "RB", "HN"];
const AVATAR_COLORS = [
  "bg-violet-500", "bg-sky-500", "bg-emerald-500",
  "bg-orange-500", "bg-rose-500", "bg-indigo-500",
];

function AvatarStack() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex">
        {AVATAR_INITIALS.map((initials, i) => (
          <motion.div
            key={initials}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.6 + i * 0.06 }}
            style={{ zIndex: AVATAR_INITIALS.length - i, marginLeft: i > 0 ? -10 : 0 }}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-background",
              AVATAR_COLORS[i],
            )}
          >
            {initials}
          </motion.div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          <JoinCounter target={2847} />
        </span>{" "}
        people on the list
      </p>
    </div>
  );
}

// ─── Email form ───────────────────────────────────────────────────────────────

type FormState = "idle" | "loading" | "success";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const submit = () => {
    if (!email.includes("@")) { setError("Enter a valid email address"); return; }
    setError("");
    setState("loading");
    setTimeout(() => setState("success"), 1400);
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-5 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl text-white"
            >
              ✓
            </motion.div>
            <p className="font-semibold text-foreground">You're on the list!</p>
            <p className="mt-1 text-sm text-muted-foreground">We'll notify you at {email}</p>
          </motion.div>
        ) : (
          <motion.div key="form" className="flex flex-col gap-3">
            <div className="flex gap-2">
              <motion.input
                animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                type="email"
                placeholder="your@email.com"
                className={cn(
                  "h-12 flex-1 rounded-xl border bg-muted/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2",
                  error ? "border-destructive/60 focus:ring-destructive/20" : "border-border focus:ring-primary/30",
                )}
              />
              <motion.button
                type="button"
                onClick={submit}
                disabled={state === "loading"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_PRESS}
                className="h-12 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-70"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {state === "loading" ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      className="flex items-center gap-2"
                    >
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                    >
                      Join waitlist
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs text-destructive"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
            <p className="text-center text-xs text-muted-foreground">No spam, ever. Unsubscribe anytime.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Floating feature pills ────────────────────────────────────────────────────

const PILLS = [
  { label: "Edge deploys", emoji: "⚡" },
  { label: "Auth built-in", emoji: "🔐" },
  { label: "Zero config", emoji: "🎛️" },
  { label: "Open source", emoji: "🔓" },
];

// ─── Main template ────────────────────────────────────────────────────────────

/**
 * Full-page coming soon / waitlist template. Features: flickering grid background,
 * typewriter rotating headline, animated join counter with spring physics,
 * avatar stack, email capture with shake-on-error and success state,
 * and floating feature pills. Self-contained — no required props. Copy and ship.
 */
export function Waitlist() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-20 text-center">
      {/* Grid background */}
      <GridBackground />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,hsl(var(--primary)/0.12),transparent)]" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="relative mb-12 flex items-center gap-2"
      >
        <div className="h-8 w-8 rounded-xl bg-primary" />
        <span className="text-lg font-bold text-foreground">Nucleus</span>
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
        className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
      >
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full bg-primary"
        />
        Building something new
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.18 }}
        className="relative mb-4 max-w-2xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
      >
        The future of{" "}
        <span className="text-primary">
          <TypewriterHeadline words={["deployment", "shipping", "building", "scaling"]} />
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.28 }}
        className="relative mb-10 max-w-lg text-lg text-muted-foreground"
      >
        We're building the infrastructure layer that makes shipping software
        feel effortless. Get early access before we launch publicly.
      </motion.p>

      {/* Email form */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.36 }}
        className="relative mb-8 flex w-full max-w-md justify-center"
      >
        <EmailForm />
      </motion.div>

      {/* Avatar stack */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.48 }}
        className="relative mb-16"
      >
        <AvatarStack />
      </motion.div>

      {/* Feature pills */}
      <div className="relative flex flex-wrap justify-center gap-2">
        {PILLS.map((pill, i) => (
          <motion.div
            key={pill.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.6 + i * 0.07 }}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span>{pill.emoji}</span>
            {pill.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
