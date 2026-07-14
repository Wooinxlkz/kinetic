"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Gift,
  HelpCircle,
  LogOut,
  MoonStar,
  Palette,
  Repeat,
  Settings,
  ShieldCheck,
  Sparkles,
  User as UserIcon,
  UserRoundX,
  UserPlus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/components/app/preferences/preferences-provider";
import { useReferral } from "@/components/app/referrals/referral-context";
import { useSettings } from "@/components/app/settings/settings-provider";
import { useAuth } from "./auth-provider";
import { AvatarCircle } from "./avatar-circle";
import { VerifiedBadge } from "./verified-badge";
import { generateSwitchTokenRequest } from "./auth-api";
import {
  getSavedAccounts,
  saveAccount,
  isAccountSaved,
  isWithinSwitchWindow,
  removeSavedAccount,
  type SavedAccount,
  MAX_SAVED_ACCOUNTS,
} from "./saved-accounts";

// NOTE: The items below (status/appearance/settings/notifications/upgrade/
// referrals/download/what's new/get help/switch account) are placeholders
// added for visual parity with the design reference only. They are
// intentionally inert (no onClick/navigation) and not yet implemented.
function InertMenuItem({
  icon,
  label,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div
      role="menuitem"
      aria-disabled="true"
      className="flex cursor-default items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
    >
      {icon}
      <span className="flex-1 truncate">{label}</span>
      {trailing}
    </div>
  );
}

type UserStatus = "focus" | "offline" | null;
type MenuView = "menu" | "logout" | "switch";

const STATUS_META: Record<
  NonNullable<UserStatus> | "online",
  { label: string; dot: string; badgeBg: string; badgeText: string }
> = {
  online: {
    label: "Online",
    dot: "bg-emerald-400",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-400",
  },
  focus: {
    label: "Focus",
    dot: "bg-amber-400",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-400",
  },
  offline: {
    label: "Offline",
    dot: "bg-zinc-500",
    badgeBg: "bg-zinc-500/15",
    badgeText: "text-zinc-400",
  },
};

const PLAN_META: Record<
  "free" | "pro" | "sponsor",
  { label: string; badgeBg: string; badgeText: string }
> = {
  free: {
    label: "Free",
    badgeBg: "bg-zinc-500/15",
    badgeText: "text-zinc-400",
  },
  pro: {
    label: "Pro",
    badgeBg: "bg-accent/15",
    badgeText: "text-accent",
  },
  sponsor: {
    label: "Sponsor",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-400",
  },
};

/* ─── Sub-view header (back button + title) ──────────────────────────────── */
function SubViewHeader({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center gap-2 pb-2 pt-0.5">
      <button
        type="button"
        onClick={onBack}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        aria-label="Back"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <p className="text-sm font-medium text-foreground">{title}</p>
    </div>
  );
}

/* ─── Saved-account row ───────────────────────────────────────────────────── */
function SavedAccountRow({
  account,
  onSwitch,
  onRemove,
}: {
  account: SavedAccount;
  onSwitch: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-card">
      <AvatarCircle user={account} size={32} className="shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{account.name}</p>
        <p className="truncate text-xs text-muted-foreground">{account.email}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={onRemove}
          className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
          aria-label={`Remove ${account.name}`}
        >
          Remove
        </button>
        <button
          type="button"
          onClick={onSwitch}
          className="flex items-center gap-1 rounded-md bg-foreground/8 px-1.5 py-0.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/15"
        >
          Switch
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export function UserMenu() {
  const { user, signOut, switchWithToken, open: openAuth } = useAuth();
  const { setPanelOpen } = usePreferences();
  const { openReferrals } = useReferral();
  const { openSettings } = useSettings();

  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [status, setStatus] = useState<UserStatus>(null);

  const [menuView, setMenuView] = useState<MenuView>("menu");
  const [viewDir, setViewDir] = useState<1 | -1>(1); // 1 = forward, -1 = back
  const [savedAccounts, setSavedAccounts] = useState<SavedAccount[]>([]);

  // Save-on-action checkboxes (default to true = save)
  const [saveOnLogout, setSaveOnLogout] = useState(true);
  const [saveOnSwitch, setSaveOnSwitch] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const statusCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refresh saved accounts whenever the dropdown opens so capacity checks
  // are always current — both the logout and switch views depend on this.
  useEffect(() => {
    if (open) {
      setSavedAccounts(getSavedAccounts());
    }
  }, [open]);

  // Reset to main menu + status submenu when dropdown closes
  useEffect(() => {
    if (!open) {
      setStatusMenuOpen(false);
      // Delay reset so exit animation plays cleanly
      const t = setTimeout(() => setMenuView("menu"), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!user) return null;

  const planKey: "free" | "pro" | "sponsor" =
    user.plan === "pro" || user.plan === "sponsor" ? user.plan : "free";

  const alreadySaved = isAccountSaved(user.id);
  const canSaveMore = savedAccounts.length < MAX_SAVED_ACCOUNTS || alreadySaved;

  const goTo = (view: MenuView) => {
    setViewDir(view === "menu" ? -1 : 1);
    setMenuView(view);
  };

  /* ── Logout confirm ─────────────────────────────────────────────────────── */
  const handleLogoutConfirm = async () => {
    setSigningOut(true);
    try {
      if (saveOnLogout && !alreadySaved && canSaveMore) {
        // Generate a fresh switch token BEFORE signing out (session must be active)
        const token = await generateSwitchTokenRequest().catch(() => null);
        saveAccount(user, token);
      }
      await signOut();
    } finally {
      setSigningOut(false);
      setOpen(false);
    }
  };

  /* ── Switch to saved account ────────────────────────────────────────────── */
  const handleSwitchTo = async (account: SavedAccount) => {
    setSigningOut(true);
    try {
      // Save current account first if requested (and only when capacity allows)
      if (saveOnSwitch && !alreadySaved && canSaveMore) {
        const token = await generateSwitchTokenRequest().catch(() => null);
        saveAccount(user, token);
      }

      setOpen(false);

      // Within the 5-day window → try instant switch without a password
      if (isWithinSwitchWindow(account) && account.switchToken) {
        try {
          await switchWithToken(account.switchToken);
          // Full reload so server components pick up the new session cookie
          window.location.reload();
          return;
        } catch {
          // Token rejected by server (expired or invalid) → fall through to password
        }
      }

      // Outside the window or token failed → sign out then open modal with email pre-filled
      await signOut();
      openAuth("sign-in", account.email);
    } finally {
      setSigningOut(false);
    }
  };

  /* ── Add another account ─────────────────────────────────────────────────── */
  const handleAddAccount = async () => {
    setSigningOut(true);
    try {
      if (saveOnSwitch && !alreadySaved && canSaveMore) {
        const token = await generateSwitchTokenRequest().catch(() => null);
        saveAccount(user, token);
      }
      setOpen(false);
      await signOut();
      openAuth("sign-in");
    } finally {
      setSigningOut(false);
    }
  };

  /* ── Remove from saved list ──────────────────────────────────────────────── */
  const handleRemoveSaved = (id: number) => {
    removeSavedAccount(id);
    setSavedAccounts(getSavedAccounts());
  };

  /* ─────────────────────────────── VIEW: main menu ───────────────────────── */
  const MainMenuContent = (
    <>
      <div className="flex items-center gap-3 rounded-xl px-2.5 py-2.5">
        <AvatarCircle user={user} size={38} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
            {user.isDev && <VerifiedBadge />}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap",
                STATUS_META[status ?? "online"].badgeBg,
                STATUS_META[status ?? "online"].badgeText,
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_META[status ?? "online"].dot)} />
              {STATUS_META[status ?? "online"].label}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap",
                PLAN_META[planKey].badgeBg,
                PLAN_META[planKey].badgeText,
              )}
            >
              {PLAN_META[planKey].label}
            </span>
          </div>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setStatusMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={statusMenuOpen}
          className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
        >
          {status === "focus" && <MoonStar className="h-4 w-4" />}
          {status === "offline" && <UserRoundX className="h-4 w-4" />}
          {!status && <Repeat className="h-4 w-4 rotate-90" />}
          <span className="flex-1 truncate">
            {status === "focus"
              ? "Focus"
              : status === "offline"
                ? "Offline"
                : "Update status"}
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* Flyout submenu — appears to the left of the dropdown panel */}
        <AnimatePresence>
          {statusMenuOpen && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, x: 6, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 6, scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-full top-0 ml-1.5 w-44 rounded-2xl border border-border bg-popover/95 p-1.5 shadow-2xl backdrop-blur-xl"
            >
              <button
                type="button"
                onClick={() => { setStatus((c) => (c === "focus" ? null : "focus")); setStatusMenuOpen(false); }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
              >
                <MoonStar className="h-4 w-4" />
                <span className="flex-1 truncate">Focus</span>
                {status === "focus" && (
                  <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", STATUS_META.focus.dot)} />
                )}
              </button>
              <button
                type="button"
                onClick={() => { setStatus((c) => (c === "offline" ? null : "offline")); setStatusMenuOpen(false); }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
              >
                <UserRoundX className="h-4 w-4" />
                <span className="flex-1 truncate">Offline</span>
                {status === "offline" && (
                  <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", STATUS_META.offline.dot)} />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="my-1 h-px bg-border" />

      <Link
        href={`/profile/${user.username}`}
        role="menuitem"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
      >
        <UserIcon className="h-4 w-4" />
        <span className="flex-1 truncate">Your profile</span>
      </Link>
      <button
        type="button"
        role="menuitem"
        onClick={() => { setOpen(false); setPanelOpen(true); }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
      >
        <Palette className="h-4 w-4" />
        <span className="flex-1 truncate">Appearance</span>
      </button>
      <button
        type="button"
        onClick={() => { setOpen(false); openSettings(); }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
      >
        <Settings className="h-4 w-4" />
        <span className="flex-1 truncate">Settings</span>
      </button>
      <InertMenuItem icon={<Bell className="h-4 w-4" />} label="Notifications" />
      {user.isDev && (
        <Link
          href="/dev-center"
          role="menuitem"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-amber-400 transition-colors hover:bg-amber-500/10"
        >
          <ShieldCheck className="h-4 w-4" />
          <span className="flex-1 truncate">Dev Center</span>
        </Link>
      )}

      <div className="my-1 h-px bg-border" />

      <Link
        href="/sponsors"
        role="menuitem"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
      >
        <Sparkles className="h-4 w-4 text-amber-400" />
        <span className="flex-1 truncate">Upgrade to Pro</span>
        <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
          22% off
        </span>
      </Link>
      <button
        type="button"
        role="menuitem"
        onClick={() => { setOpen(false); openReferrals(); }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
      >
        <Gift className="h-4 w-4" />
        <span className="flex-1 truncate">Referrals</span>
      </button>

      <div className="my-1 h-px bg-border" />

      <InertMenuItem icon={<Download className="h-4 w-4" />} label="Download app" />
      <Link
        href="/docs/changelog"
        role="menuitem"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
      >
        <Sparkles className="h-4 w-4" />
        <span className="flex-1 truncate">What&apos;s new?</span>
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
      <Link
        href="/docs/help"
        role="menuitem"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
      >
        <HelpCircle className="h-4 w-4" />
        <span className="flex-1 truncate">Get help?</span>
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>

      <div className="my-1 h-px bg-border" />

      {/* Switch account — now live */}
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          setSaveOnSwitch(true);
          setSavedAccounts(getSavedAccounts());
          goTo("switch");
        }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
      >
        <Repeat className="h-4 w-4" />
        <span className="flex-1 truncate">Switch account</span>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {/* Log out — now opens confirm view */}
      <button
        type="button"
        onClick={() => { setSaveOnLogout(true); goTo("logout"); }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </>
  );

  /* ─────────────────────────────── VIEW: logout confirm ──────────────────── */
  const LogoutContent = (
    <>
      <SubViewHeader title="Log out" onBack={() => goTo("menu")} />

      {/* Account preview */}
      <div className="flex items-center gap-3 rounded-xl bg-card px-3 py-2.5">
        <AvatarCircle user={user} size={36} className="shrink-0" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Save option — only if not already saved and there's room */}
      {!alreadySaved && canSaveMore && (
        <button
          type="button"
          onClick={() => setSaveOnLogout((v) => !v)}
          className="mt-2 flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm transition-colors hover:bg-card"
        >
          <div
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
              saveOnLogout
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-transparent",
            )}
          >
            {saveOnLogout && <Check className="h-3 w-3" />}
          </div>
          <span className="flex-1 text-muted-foreground">
            Save account for quick sign-in
          </span>
        </button>
      )}

      {alreadySaved && (
        <p className="mt-2 px-2.5 text-xs text-muted-foreground">
          Account already saved — you can switch back anytime.
        </p>
      )}

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => goTo("menu")}
          className="flex-1 rounded-full border border-border py-1.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/20"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={signingOut}
          onClick={handleLogoutConfirm}
          className="flex-1 rounded-full bg-foreground py-1.5 text-sm font-medium text-background transition-opacity disabled:opacity-60"
        >
          {signingOut ? "Logging out…" : "Log out"}
        </button>
      </div>
    </>
  );

  /* ─────────────────────────────── VIEW: switch account ──────────────────── */
  const SwitchContent = (
    <>
      <SubViewHeader title="Switch account" onBack={() => goTo("menu")} />

      {/* Save current before switching — if not saved and there's room */}
      {!alreadySaved && savedAccounts.length < MAX_SAVED_ACCOUNTS && (
        <button
          type="button"
          onClick={() => setSaveOnSwitch((v) => !v)}
          className="mb-1 flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm transition-colors hover:bg-card"
        >
          <div
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
              saveOnSwitch
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-transparent",
            )}
          >
            {saveOnSwitch && <Check className="h-3 w-3" />}
          </div>
          <span className="flex-1 text-muted-foreground">
            Save current account first
          </span>
        </button>
      )}

      {/* Saved accounts list */}
      {savedAccounts.length > 0 ? (
        <div className="space-y-0.5">
          {savedAccounts.map((account) => (
            <SavedAccountRow
              key={account.id}
              account={account}
              onSwitch={() => handleSwitchTo(account)}
              onRemove={() => handleRemoveSaved(account.id)}
            />
          ))}
        </div>
      ) : (
        <p className="px-2.5 py-2 text-xs text-muted-foreground">
          No saved accounts yet. Save an account when you log out to switch quickly.
        </p>
      )}

      {/* Add / sign in to another */}
      {savedAccounts.length < MAX_SAVED_ACCOUNTS && (
        <>
          <div className="my-2 h-px bg-border" />
          <button
            type="button"
            disabled={signingOut}
            onClick={handleAddAccount}
            className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-card hover:text-foreground disabled:opacity-60"
          >
            <UserPlus className="h-4 w-4" />
            <span className="flex-1 truncate">Sign in to another account</span>
          </button>
        </>
      )}
    </>
  );

  /* ─────────────────────────────── Render ─────────────────────────────────── */
  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="block rounded-full outline-none ring-offset-2 ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-(--color-border-strong)"
      >
        <AvatarCircle
          user={user}
          size={32}
          className={cn(
            "border border-border transition-transform",
            open ? "scale-95" : "hover:scale-105",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-border bg-popover/95 p-1.5 shadow-2xl backdrop-blur-xl"
          >
            {/* overflow-hidden clips the x-slide animation; removed when status flyout is open so it can escape the panel */}
            <div className={statusMenuOpen ? "" : "overflow-hidden"}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={menuView}
                  initial={{ opacity: 0, x: viewDir * 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: viewDir * -14 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {menuView === "menu" && MainMenuContent}
                  {menuView === "logout" && LogoutContent}
                  {menuView === "switch" && SwitchContent}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
