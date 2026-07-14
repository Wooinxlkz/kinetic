"use client";

import { useEffect, useState } from "react";
import { Monitor, Smartphone, Globe, Key, LogOut, Eye, EyeOff, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/app/auth/auth-provider";

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-pixel text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
      {children}
    </p>
  );
}

function Divider() { return <div className="h-px bg-border" />; }

// ── Device detection ──────────────────────────────────────────────────────────

function detectCurrentDevice(): { label: string; isMobile: boolean } {
  if (typeof navigator === "undefined") return { label: "Browser · Unknown OS", isMobile: false };
  const ua = navigator.userAgent;

  const browser =
    ua.includes("Edg/")     ? "Edge"    :
    ua.includes("OPR/")     ? "Opera"   :
    ua.includes("Firefox/") ? "Firefox" :
    ua.includes("Chrome/")  ? "Chrome"  :
    ua.includes("Safari/")  ? "Safari"  : "Browser";

  const os =
    ua.includes("iPhone")   ? "iPhone"  :
    ua.includes("iPad")     ? "iPad"    :
    ua.includes("Android")  ? "Android" :
    ua.includes("Windows")  ? "Windows" :
    ua.includes("Mac OS X") ? "macOS"   :
    ua.includes("Linux")    ? "Linux"   : "Unknown OS";

  const isMobile = /iPhone|iPad|Android/.test(ua);
  return { label: `${browser} · ${os}`, isMobile };
}

// ── Session card ──────────────────────────────────────────────────────────────

function SessionCard({
  label, sub, current, placeholder,
}: {
  label: string; sub: string; current?: boolean; placeholder?: boolean;
}) {
  const { isMobile } = current ? detectCurrentDevice() : { isMobile: false };
  const Icon = current ? (isMobile ? Smartphone : Monitor) : Globe;

  return (
    <div className={cn(
      "flex items-center gap-3 rounded-xl border px-4 py-3",
      placeholder ? "border-dashed border-border/50 bg-transparent" : "border-border bg-muted/10",
    )}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/30">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className={cn("truncate text-sm font-medium", placeholder ? "text-muted-foreground/50" : "text-foreground")}>
            {label}
          </span>
          {current && (
            <span className="shrink-0 rounded-full bg-foreground/8 px-2 py-0.5 text-[10px] font-medium text-foreground/60">
              This device
            </span>
          )}
        </div>
        <span className="truncate text-xs text-muted-foreground">{sub}</span>
      </div>
    </div>
  );
}

// ── Password field ────────────────────────────────────────────────────────────

function PasswordField({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/10 px-3 py-2.5">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "••••••••"}
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="shrink-0 text-muted-foreground/60 hover:text-muted-foreground"
        >
          {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────

export function SecurityLoginTab() {
  const { user } = useAuth();

  // Sessions state
  const [revoking, setRevoking]   = useState(false);
  const [revoked, setRevoked]     = useState(false);
  const [currentDevice, setCurrentDevice] = useState({ label: "Browser", isMobile: false });

  // Change password state
  const [pwOpen, setPwOpen]           = useState(false);
  const [currentPw, setCurrentPw]     = useState("");
  const [newPw, setNewPw]             = useState("");
  const [confirmPw, setConfirmPw]     = useState("");
  const [pwLoading, setPwLoading]     = useState(false);
  const [pwError, setPwError]         = useState<string | null>(null);
  const [pwSuccess, setPwSuccess]     = useState(false);

  useEffect(() => { setCurrentDevice(detectCurrentDevice()); }, []);

  if (!user) return null;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleRevoke = async () => {
    setRevoking(true);
    try {
      await fetch("/auth/logout-others", { method: "POST", credentials: "same-origin" });
      setRevoked(true);
    } catch {
      // ignore
    } finally {
      setRevoking(false);
    }
  };

  const resetPwForm = () => {
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setPwError(null); setPwSuccess(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) { setPwError("New passwords do not match"); return; }
    if (newPw.length < 8)    { setPwError("New password must be at least 8 characters"); return; }
    setPwLoading(true);
    setPwError(null);
    try {
      const res = await fetch("/auth/change-password", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw, confirmPassword: confirmPw }),
      });
      const data = await res.json();
      if (!res.ok) { setPwError(data.error ?? "Something went wrong"); return; }
      setPwSuccess(true);
      setTimeout(() => { setPwOpen(false); resetPwForm(); }, 2000);
    } catch {
      setPwError("Network error — please try again");
    } finally {
      setPwLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5 px-7 py-5">

      {/* ── Sessions ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <SectionLabel>Sessions</SectionLabel>
        <Divider />

        <div className="flex flex-col gap-2 pt-1">
          {/* Current real device */}
          <SessionCard
            label={currentDevice.label}
            sub="Active now"
            current
          />

          {/* Other sessions (stubs — device info not stored yet) */}
          {!revoked && (
            <>
              <SessionCard
                label="Unknown session"
                sub="Last seen 3 days ago"
                placeholder
              />
              <SessionCard
                label="Unknown session"
                sub="Last seen 1 week ago"
                placeholder
              />
            </>
          )}
        </div>

        {!revoked ? (
          <button
            type="button"
            onClick={handleRevoke}
            disabled={revoking}
            className={cn(
              "mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 px-4 py-2.5 text-sm font-medium transition-colors",
              revoking
                ? "cursor-not-allowed text-muted-foreground/40"
                : "text-muted-foreground hover:border-red-500/30 hover:bg-red-500/8 hover:text-red-400",
            )}
          >
            <LogOut className="h-3.5 w-3.5" />
            {revoking ? "Signing out…" : "Sign out all other sessions"}
          </button>
        ) : (
          <p className="text-center text-xs text-muted-foreground/60">All other sessions have been signed out.</p>
        )}
      </div>

      {/* ── Password ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <SectionLabel>Password</SectionLabel>
        <Divider />

        {/* Trigger row */}
        <button
          type="button"
          onClick={() => { setPwOpen((v) => !v); resetPwForm(); }}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/10 px-4 py-3 transition-colors hover:bg-muted/20"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/30">
              <Key className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-0.5 text-left">
              <span className="text-sm font-medium text-foreground">Change password</span>
              <span className="text-xs text-muted-foreground">Update your account password</span>
            </div>
          </div>
          <motion.div animate={{ rotate: pwOpen ? 45 : 0 }} transition={{ duration: 0.15 }}>
            <X className="h-4 w-4 text-muted-foreground/50" />
          </motion.div>
        </button>

        {/* Inline form */}
        <AnimatePresence>
          {pwOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <form
                onSubmit={handleChangePassword}
                className="flex flex-col gap-3 rounded-xl border border-border bg-muted/5 p-4"
              >
                <PasswordField
                  label="Current password"
                  value={currentPw}
                  onChange={setCurrentPw}
                />
                <PasswordField
                  label="New password"
                  value={newPw}
                  onChange={setNewPw}
                  placeholder="Min. 8 characters"
                />
                <PasswordField
                  label="Confirm new password"
                  value={confirmPw}
                  onChange={setConfirmPw}
                />

                {pwError && (
                  <p className="text-[12px] text-red-400">{pwError}</p>
                )}

                {pwSuccess && (
                  <p className="flex items-center gap-1.5 text-[12px] text-green-400">
                    <Check className="h-3.5 w-3.5" /> Password updated successfully.
                  </p>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={pwLoading || pwSuccess || !currentPw || !newPw || !confirmPw}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      pwSuccess
                        ? "bg-green-500/20 text-green-400"
                        : "bg-foreground text-background hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-40",
                    )}
                  >
                    {pwLoading ? "Saving…" : pwSuccess ? "Saved!" : "Update password"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPwOpen(false); resetPwForm(); }}
                    className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
