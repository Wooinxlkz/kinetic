"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-provider";
import { AuthApiError } from "./auth-api";

const LOCKOUT_S = 30;

/**
 * Hidden two-step dev sign-in: a 4-digit PIN, then the dev name — both
 * checked server-side against DEV_PIN / DEV_NAME secrets. Locks out for a
 * short cooldown after repeated failures, mirroring a normal login's
 * brute-force resistance without needing a captcha for a low-traffic route.
 */
export function DevLoginForm({ onClose }: { onClose: () => void }) {
  const { devSignIn, close } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);
  const pinRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 1) pinRef.current?.focus();
    else nameRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockedUntil(null);
        setCountdown(0);
        setStep(1);
        setPin("");
        setName("");
        setError(null);
      } else {
        setCountdown(remaining);
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [lockedUntil]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setError("Enter all 4 digits");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await devSignIn(pin, name);
      close();
      onClose();
    } catch (err) {
      if (err instanceof AuthApiError && err.message.toLowerCase().includes("too many")) {
        setLockedUntil(Date.now() + LOCKOUT_S * 1000);
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStep(1);
        setPin("");
        setName("");
      }
    } finally {
      setLoading(false);
    }
  };

  if (lockedUntil) {
    return (
      <div className="space-y-3 py-1 text-center">
        <ShieldAlert className="mx-auto h-6 w-6 text-red-400" />
        <p className="text-sm font-medium text-white">Locked out</p>
        <p className="text-xs text-white/40">
          Too many failed attempts. Try again in{" "}
          <span className="font-mono text-white/70">{countdown}s</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-white/50" />
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          {step === 1 ? "Enter dev PIN" : "Confirm your name"}
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          {error}
        </p>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {step === 1 ? (
          <motion.form
            key="pin"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.15 }}
            onSubmit={handlePinSubmit}
            className="space-y-3"
          >
            <input
              ref={pinRef}
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="••••"
              maxLength={4}
              className={cn(
                "flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3",
                "text-center font-mono text-lg tracking-[0.5em] text-white placeholder:text-white/20 outline-none",
                "transition-colors duration-200 focus:border-white/25 focus:bg-white/10",
              )}
            />
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center rounded-lg bg-white text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Continue
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="name"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.15 }}
            onSubmit={handleNameSubmit}
            className="space-y-3"
          >
            <input
              ref={nameRef}
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={cn(
                "flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3",
                "text-sm text-white placeholder:text-white/30 outline-none",
                "transition-colors duration-200 focus:border-white/25 focus:bg-white/10",
              )}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-full items-center justify-center rounded-lg bg-white text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Unlock dev account"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
