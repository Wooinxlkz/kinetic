"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_PRESS, SPRING_LAYOUT } from "@/lib/ease";

// ─── Left brand panel ─────────────────────────────────────────────────────────

const BRAND_FEATURES = [
  { icon: "⚡", text: "Deploy in under 30 seconds" },
  { icon: "🔐", text: "Enterprise-grade auth, built in" },
  { icon: "📊", text: "Real-time analytics, no setup" },
  { icon: "🔄", text: "Automatic rollbacks on every deploy" },
];

function BrandPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-foreground p-10 lg:flex">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-[100px]" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="relative flex items-center gap-2"
      >
        <div className="h-8 w-8 rounded-xl bg-background/20 ring-1 ring-white/20" />
        <span className="text-lg font-bold text-background">Nucleus</span>
      </motion.div>

      {/* Features list */}
      <div className="relative space-y-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-8 text-2xl font-bold leading-tight text-background"
        >
          Everything you need to
          <br />
          <span className="text-background/60">ship production apps.</span>
        </motion.p>
        {BRAND_FEATURES.map((f, i) => (
          <motion.div
            key={f.text}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.1 + i * 0.08 }}
            className="flex items-center gap-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/15 text-sm ring-1 ring-white/10">
              {f.icon}
            </span>
            <span className="text-sm text-background/80">{f.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Testimonial */}
      <motion.blockquote
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.55 }}
        className="relative border-t border-white/10 pt-6"
      >
        <p className="mb-3 text-sm text-background/70">
          "Nucleus cut our time-to-production by 10×. We shipped our
          entire backend in a single afternoon."
        </p>
        <footer className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-background/20 text-xs font-bold text-background">
            SC
          </div>
          <div>
            <span className="text-xs font-semibold text-background">Sarah Chen</span>
            <span className="ml-1.5 text-xs text-background/50">Head of Eng, Finmark</span>
          </div>
        </footer>
      </motion.blockquote>
    </div>
  );
}

// ─── Input field ─────────────────────────────────────────────────────────────

function Field({ label, type = "text", value, onChange, error }: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        layout
        animate={{ y: active ? -22 : 0, scale: active ? 0.82 : 1, color: focused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
        transition={SPRING_LAYOUT}
        className="pointer-events-none absolute left-3 top-3 origin-left text-sm"
      >
        {label}
      </motion.label>
      <motion.input
        animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "h-12 w-full rounded-xl border bg-muted/40 px-3 pt-4 pb-1 text-sm text-foreground transition-colors focus:outline-none focus:ring-2",
          error
            ? "border-destructive/60 focus:ring-destructive/20"
            : focused
            ? "border-primary/50 focus:ring-primary/20"
            : "border-border",
        )}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="mt-1 text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Submit button ────────────────────────────────────────────────────────────

type BtnState = "idle" | "loading" | "success" | "error";

function SubmitButton({ state, onClick }: { state: BtnState; onClick: () => void }) {
  const label: Record<BtnState, string> = {
    idle: "Sign in",
    loading: "Signing in…",
    success: "Welcome back!",
    error: "Try again",
  };
  const bg: Record<BtnState, string> = {
    idle: "bg-foreground text-background",
    loading: "bg-foreground/80 text-background/70",
    success: "bg-emerald-500 text-white",
    error: "bg-destructive text-destructive-foreground",
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={state === "loading"}
      whileHover={state === "idle" ? { scale: 1.02 } : {}}
      whileTap={state === "idle" ? { scale: 0.97 } : {}}
      transition={SPRING_PRESS}
      className={cn(
        "relative h-11 w-full overflow-hidden rounded-xl text-sm font-semibold transition-colors",
        bg[state],
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="flex items-center justify-center gap-2"
        >
          {state === "loading" && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          )}
          {state === "success" && "✓"}
          {label[state]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Right auth form ──────────────────────────────────────────────────────────

type FormView = "signin" | "signup" | "reset";

function AuthForm() {
  const [view, setView] = useState<FormView>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnState, setBtnState] = useState<BtnState>("idle");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = () => {
    const errs: typeof errors = {};
    if (!email.includes("@")) errs.email = "Enter a valid email address";
    if (view !== "reset" && password.length < 6) errs.password = "Password must be at least 6 characters";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setBtnState("loading");
    setTimeout(() => setBtnState("success"), 1600);
    setTimeout(() => setBtnState("idle"), 3200);
  };

  const titles: Record<FormView, { heading: string; sub: string; cta: string }> = {
    signin: { heading: "Welcome back", sub: "Sign in to your account to continue.", cta: "Sign in" },
    signup: { heading: "Create account", sub: "Start your free trial today — no card required.", cta: "Create account" },
    reset: { heading: "Reset password", sub: "We'll send a reset link to your email.", cta: "Send reset link" },
  };

  return (
    <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
      {/* Logo (mobile only) */}
      <div className="mb-8 flex items-center gap-2 lg:hidden">
        <div className="h-7 w-7 rounded-lg bg-primary" />
        <span className="text-sm font-bold text-foreground">Nucleus</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="w-full max-w-sm"
        >
          <h1 className="mb-1 text-2xl font-bold tracking-tight text-foreground">{titles[view].heading}</h1>
          <p className="mb-8 text-sm text-muted-foreground">{titles[view].sub}</p>

          {/* Social buttons */}
          {view !== "reset" && (
            <div className="mb-6 grid grid-cols-2 gap-3">
              {[
                { label: "GitHub", icon: "⊛" },
                { label: "Google", icon: "◉" },
              ].map((s) => (
                <motion.button
                  key={s.label}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING_PRESS}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </motion.button>
              ))}
            </div>
          )}

          {/* Divider */}
          {view !== "reset" && (
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or continue with email</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}

          <div className="space-y-5">
            <Field label="Email" type="email" value={email} onChange={setEmail} error={errors.email} />
            {view !== "reset" && (
              <Field label="Password" type="password" value={password} onChange={setPassword} error={errors.password} />
            )}
            {view === "signin" && (
              <div className="flex justify-end">
                <button type="button" onClick={() => setView("reset")} className="text-xs text-muted-foreground underline-offset-4 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}
            <SubmitButton state={btnState} onClick={handleSubmit} />
          </div>

          {/* Footer links */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {view === "signin" ? (
              <>Don't have an account?{" "}
                <button type="button" onClick={() => setView("signup")} className="text-foreground underline-offset-4 hover:underline">
                  Sign up free
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button type="button" onClick={() => setView("signin")} className="text-foreground underline-offset-4 hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Main template ────────────────────────────────────────────────────────────

/**
 * Full-screen split auth page. Left brand panel with animated feature list
 * and testimonial. Right animated form with sign-in, sign-up, and password
 * reset views, floating labels, shake-on-error, and stateful submit button.
 * Self-contained — no required props. Copy and ship.
 */
export function AuthSplit() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-2">
        <BrandPanel />
        <AuthForm />
      </div>
    </div>
  );
}
