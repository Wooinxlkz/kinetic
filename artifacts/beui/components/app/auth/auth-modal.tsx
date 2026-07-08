"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail, Lock, Eye, EyeClosed, ArrowRight, User, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-provider";
import { KineticMark } from "@/components/app/chrome/kinetic-mark";

/* ─────────────────────────────────── helpers ────────────────────────────── */

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-lg border border-white/10 bg-white/5",
        "px-3 text-sm text-white placeholder:text-white/30 outline-none",
        "transition-[border-color,background-color] duration-200",
        "focus:border-white/25 focus:bg-white/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

/* traveling light beams — no perspective, pure 2-D */
function Beams() {
  const beam = "absolute bg-gradient-to-r from-transparent via-white/75 to-transparent";
  return (
    <div className="pointer-events-none absolute -inset-px overflow-hidden rounded-2xl">
      {/* top */}
      <motion.div
        className={cn(beam, "top-0 left-0 h-[2px] w-[45%]")}
        style={{ filter: "blur(1px)" }}
        animate={{ left: ["-45%", "100%"] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
      />
      {/* right — rotated gradient */}
      <motion.div
        className="absolute right-0 top-0 h-[45%] w-[2px] bg-gradient-to-b from-transparent via-white/75 to-transparent"
        style={{ filter: "blur(1px)" }}
        animate={{ top: ["-45%", "100%"] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 0.65 }}
      />
      {/* bottom */}
      <motion.div
        className={cn(beam, "bottom-0 right-0 h-[2px] w-[45%]")}
        style={{ filter: "blur(1px)", backgroundImage: "linear-gradient(to left, transparent, rgba(255,255,255,.75), transparent)" }}
        animate={{ right: ["-45%", "100%"] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.3 }}
      />
      {/* left */}
      <motion.div
        className="absolute left-0 bottom-0 h-[45%] w-[2px] bg-gradient-to-t from-transparent via-white/75 to-transparent"
        style={{ filter: "blur(1px)" }}
        animate={{ bottom: ["-45%", "100%"] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.95 }}
      />
      {/* corner glow dots */}
      {(["top-0 left-0", "top-0 right-0", "bottom-0 right-0", "bottom-0 left-0"] as const).map((pos, i) => (
        <motion.div
          key={pos}
          className={cn("absolute h-[6px] w-[6px] rounded-full bg-white/50 blur-[1px]", pos)}
          animate={{ opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, repeatType: "mirror", delay: i * 0.45 }}
        />
      ))}
    </div>
  );
}

function SubmitBtn({ label, loading }: { label: string; loading: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      type="submit"
      disabled={loading}
      className="relative w-full group/btn"
    >
      <div className="absolute inset-0 rounded-lg bg-white/10 blur-md opacity-0 group-hover/btn:opacity-60 transition-opacity duration-200" />
      <div className="relative flex h-10 items-center justify-center overflow-hidden rounded-lg bg-white text-sm font-medium text-black">
        {loading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
              <div className="h-4 w-4 rounded-full border-2 border-black/25 border-t-black animate-spin" />
            </motion.div>
          ) : (
            <motion.span key="txt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
              className="flex items-center gap-1.5">
              {label}
              <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

/* ──────────────────────────────── Sign-In form ──────────────────────────── */
function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const { signIn, close } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
          await signIn(email, password);
          close();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
          setLoading(false);
        }
      }}
      className="space-y-3"
    >
      {error && (
        <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          {error}
        </p>
      )}
      {/* email */}
      <div className="relative">
        <Mail className={cn("pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
          focused === "email" ? "text-white/80" : "text-white/35")} />
        <Input type="email" placeholder="Email address" value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
          className="pl-10" required />
      </div>

      {/* password */}
      <div className="relative">
        <Lock className={cn("pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
          focused === "password" ? "text-white/80" : "text-white/35")} />
        <Input type={showPw ? "text" : "password"} placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
          className="pl-10 pr-10" required />
        <button type="button" tabIndex={-1} onClick={() => setShowPw(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white transition-colors duration-200">
          {showPw
            ? <Eye className="h-4 w-4" />
            : <EyeClosed className="h-4 w-4" />}
        </button>
      </div>

      {/* remember / forgot */}
      <div className="flex items-center justify-between pt-0.5">
        <label className="flex cursor-pointer items-center gap-2 select-none">
          <div className="relative">
            <input type="checkbox" checked={remember} onChange={() => setRemember(v => !v)}
              className="appearance-none h-4 w-4 rounded border border-white/20 bg-white/5 checked:bg-white checked:border-white focus:outline-none transition-all duration-200" />
            {remember && (
              <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-black">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
            )}
          </div>
          <span className="text-xs text-white/50">Remember me</span>
        </label>
        <button type="button" className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200">
          Forgot password?
        </button>
      </div>

      <SubmitBtn label="Sign In" loading={loading} />

      <p className="pt-1 text-center text-xs text-white/40">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={onSwitch}
          className="font-semibold text-white/80 hover:text-white underline-offset-2 hover:underline transition-colors duration-200">
          Sign up
        </button>
      </p>
    </form>
  );
}

/* ──────────────────────────────── Sign-Up form ──────────────────────────── */
function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const { signUp, close } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
          await signUp(name, email, password);
          close();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
          setLoading(false);
        }
      }}
      className="space-y-3"
    >
      {error && (
        <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          {error}
        </p>
      )}
      {/* name */}
      <div className="relative">
        <User className={cn("pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
          focused === "name" ? "text-white/80" : "text-white/35")} />
        <Input type="text" placeholder="Full name" value={name}
          onChange={e => setName(e.target.value)}
          onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
          className="pl-10" required />
      </div>

      {/* email */}
      <div className="relative">
        <Mail className={cn("pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
          focused === "email" ? "text-white/80" : "text-white/35")} />
        <Input type="email" placeholder="Email address" value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
          className="pl-10" required />
      </div>

      {/* password */}
      <div className="relative">
        <Lock className={cn("pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
          focused === "password" ? "text-white/80" : "text-white/35")} />
        <Input type={showPw ? "text" : "password"} placeholder="Create a password (min. 8 characters)" value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
          className="pl-10 pr-10" minLength={8} required />
        <button type="button" tabIndex={-1} onClick={() => setShowPw(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white transition-colors duration-200">
          {showPw
            ? <Eye className="h-4 w-4" />
            : <EyeClosed className="h-4 w-4" />}
        </button>
      </div>

      <SubmitBtn label="Create Account" loading={loading} />

      <p className="pt-1 text-center text-xs text-white/40">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch}
          className="font-semibold text-white/80 hover:text-white underline-offset-2 hover:underline transition-colors duration-200">
          Sign in
        </button>
      </p>
    </form>
  );
}

/* ─────────────────────────────────── Modal ──────────────────────────────── */
export function AuthModal() {
  const { isOpen, defaultTab, close } = useAuth();
  const [view, setView] = useState<"sign-in" | "sign-up">(defaultTab ?? "sign-in");

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  /* sync view when reopened with a specific tab */
  useEffect(() => {
    if (isOpen) setView(defaultTab ?? "sign-in");
  }, [isOpen, defaultTab]);

  /* scroll lock */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtnRef.current?.focus(), 60);
    return () => { document.body.style.overflow = prev; clearTimeout(t); };
  }, [isOpen]);

  /* ESC */
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, close]);

  /* focus trap */
  useEffect(() => {
    if (!isOpen) return;
    const el = dialogRef.current;
    if (!el) return;
    const h = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = Array.from(el.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])',
      ));
      if (!nodes.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen]);

  const heading = view === "sign-in" ? "Welcome back" : "Create account";
  const subline = view === "sign-in"
    ? "Sign in to your Kinetic UI account"
    : "Start building with Kinetic UI";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── backdrop: plain colour, no blur — smooth on all devices ── */}
          <motion.div
            key="bd"
            className="fixed inset-0 z-50 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={close}
            aria-hidden="true"
          />

          {/* ── scroll container ── */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 py-10">
            <motion.div
              key="card"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={heading}
              className="pointer-events-auto relative my-auto w-full max-w-sm"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
            >
              {/* beams */}
              <Beams />

              {/* glass card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-6 shadow-2xl">
                {/* subtle dot-grid texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* close btn */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-3.5 top-3.5 rounded-md p-1 text-white/30 hover:text-white/80 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* logo + heading */}
                <div className="mb-5 flex flex-col items-center gap-2.5 text-center">
                  <motion.div
                    initial={{ scale: 0.65, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                  >
                    <KineticMark size={22} color="hsl(var(--accent))" />
                  </motion.div>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={view}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-lg font-bold text-transparent leading-snug">
                        {heading}
                      </h2>
                      <p className="mt-0.5 text-xs text-white/40">{subline}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* form — slides left / right on switch */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, x: view === "sign-in" ? -18 : 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: view === "sign-in" ? 18 : -18 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    {view === "sign-in"
                      ? <SignInForm onSwitch={() => setView("sign-up")} />
                      : <SignUpForm onSwitch={() => setView("sign-in")} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
