"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  ChevronRight,
  Download,
  ExternalLink,
  Gift,
  HelpCircle,
  LogOut,
  Palette,
  Repeat,
  Settings,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-provider";
import { AvatarCircle } from "./avatar-circle";

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
      className="flex cursor-default items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-card"
    >
      {icon}
      <span className="flex-1 truncate">{label}</span>
      {trailing}
    </div>
  );
}

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
      setOpen(false);
    }
  };

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
            className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-popover/95 p-1.5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 rounded-xl px-2.5 py-2.5">
              <AvatarCircle user={user} size={38} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <InertMenuItem
              icon={<Repeat className="h-4 w-4 rotate-90" />}
              label="Update status"
              trailing={<ChevronRight className="h-3.5 w-3.5" />}
            />

            <div className="my-1 h-px bg-border" />

            <InertMenuItem icon={<UserIcon className="h-4 w-4" />} label="Your profile" />
            <InertMenuItem icon={<Palette className="h-4 w-4" />} label="Appearance" />
            <InertMenuItem icon={<Settings className="h-4 w-4" />} label="Settings" />
            <InertMenuItem icon={<Bell className="h-4 w-4" />} label="Notifications" />

            <div className="my-1 h-px bg-border" />

            <InertMenuItem
              icon={<Sparkles className="h-4 w-4 text-amber-400" />}
              label="Upgrade to Pro"
              trailing={
                <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
                  20% off
                </span>
              }
            />
            <InertMenuItem icon={<Gift className="h-4 w-4" />} label="Referrals" />

            <div className="my-1 h-px bg-border" />

            <InertMenuItem icon={<Download className="h-4 w-4" />} label="Download app" />
            <InertMenuItem
              icon={<Sparkles className="h-4 w-4" />}
              label="What's new?"
              trailing={<ExternalLink className="h-3.5 w-3.5" />}
            />
            <InertMenuItem
              icon={<HelpCircle className="h-4 w-4" />}
              label="Get help?"
              trailing={<ExternalLink className="h-3.5 w-3.5" />}
            />

            <div className="my-1 h-px bg-border" />

            <InertMenuItem icon={<Repeat className="h-4 w-4" />} label="Switch account" />

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-card disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {signingOut ? "Logging out..." : "Log out"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
