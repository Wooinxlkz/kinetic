"use client";

import { useState } from "react";
import { LogOut, Mail, User, Trash2, AlertTriangle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/app/auth/auth-provider";

// ── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-white shadow-lg"
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/20 px-4 py-3">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="flex min-w-0 flex-col">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">{label}</span>
        <span className="truncate text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  );
}

// ── Delete confirmation modal ─────────────────────────────────────────────────

function DeleteModal({
  userEmail,
  onClose,
  onDeleted,
}: {
  userEmail: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [inputEmail, setInputEmail]   = useState("");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  const matches = inputEmail.trim().toLowerCase() === userEmail.toLowerCase();

  const handleDelete = async () => {
    if (!matches) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/auth/delete-account", {
        method: "DELETE",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inputEmail.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong"); setLoading(false); return; }
      onDeleted();
    } catch {
      setError("Network error — please try again");
      setLoading(false);
    }
  };

  return (
    // Full-screen overlay above the settings dialog
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className="relative z-10 w-full max-w-[400px] rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon + heading */}
        <div className="flex flex-col gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-foreground">Delete your account?</h3>
            <p className="text-[12px] leading-relaxed text-muted-foreground">
              This will permanently delete your account, published components, and all data.
              This action <strong className="text-foreground">cannot be undone</strong>.
            </p>
          </div>

          {/* Email confirmation */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-muted-foreground">
              Type <span className="font-mono text-foreground">{userEmail}</span> to confirm
            </label>
            <input
              type="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder={userEmail}
              className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          {error && <p className="text-[12px] text-red-400">{error}</p>}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleDelete}
              disabled={!matches || loading}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                matches && !loading
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "cursor-not-allowed bg-muted/30 text-muted-foreground/40",
              )}
            >
              <Trash2 className="h-3.5 w-3.5" />
              {loading ? "Deleting…" : "Delete my account"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────

export function AccountTab() {
  const { user, signOut } = useAuth();
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!user) return null;

  const handleDeleted = async () => {
    setDeleteOpen(false);
    await signOut();
  };

  return (
    <>
      <div className="flex flex-col gap-6 px-7 py-6">

        {/* Profile header */}
        <div className="flex items-center gap-4">
          <Avatar name={user.name} color={user.avatarColor} />
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-semibold text-foreground">{user.name}</span>
            <span className="text-xs text-muted-foreground">@{user.username}</span>
          </div>
        </div>

        {/* Info rows */}
        <div className="flex flex-col gap-2">
          <Row icon={User} label="Display name" value={user.name} />
          <Row icon={Mail} label="Email"         value={user.email} />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            type="button"
            onClick={() => signOut()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-red-500/30 hover:bg-red-500/8 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>

          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400/70 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
            Delete account
          </button>
        </div>

      </div>

      {/* Delete modal rendered at portal level */}
      <AnimatePresence>
        {deleteOpen && (
          <DeleteModal
            userEmail={user.email}
            onClose={() => setDeleteOpen(false)}
            onDeleted={handleDeleted}
          />
        )}
      </AnimatePresence>
    </>
  );
}
