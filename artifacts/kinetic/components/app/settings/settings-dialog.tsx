"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Paintbrush, User, Crown, ShieldCheck, KeyRound, HardDrive, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "./settings-provider";
import { useAuth } from "@/components/app/auth/auth-provider";
import { AppearanceTab }      from "./tabs/appearance-tab";
import { AccountTab }         from "./tabs/account-tab";
import { MembershipTab }      from "./tabs/membership-tab";
import { SafetyTab }          from "./tabs/safety-tab";
import { SecurityLoginTab }   from "./tabs/security-login-tab";
import { StorageTab }         from "./tabs/storage-tab";
import { NotificationsTab }   from "./tabs/notifications-tab";

// ── Tab definitions ────────────────────────────────────────────────────────────

type TabId =
  | "appearance"
  | "safety"
  | "notifications"
  | "account"
  | "membership"
  | "security"
  | "storage";

interface TabDef {
  id: TabId;
  label: string;
  icon: React.ElementType;
  requiresAuth: boolean;
}

const TABS: TabDef[] = [
  { id: "appearance",    label: "Appearance",      icon: Paintbrush,  requiresAuth: false },
  { id: "safety",        label: "Safety",          icon: ShieldCheck, requiresAuth: false },
  { id: "notifications", label: "Notifications",   icon: Bell,        requiresAuth: true  },
  { id: "account",       label: "Account",         icon: User,        requiresAuth: true  },
  { id: "membership",    label: "Membership",      icon: Crown,       requiresAuth: true  },
  { id: "security",      label: "Security & Login",icon: KeyRound,    requiresAuth: true  },
  { id: "storage",       label: "Storage",         icon: HardDrive,   requiresAuth: true  },
];

// ── Tab content renderer ───────────────────────────────────────────────────────

function TabContent({ id }: { id: TabId }) {
  if (id === "appearance")    return <AppearanceTab />;
  if (id === "safety")        return <SafetyTab />;
  if (id === "notifications") return <NotificationsTab />;
  if (id === "account")       return <AccountTab />;
  if (id === "membership")    return <MembershipTab />;
  if (id === "security")      return <SecurityLoginTab />;
  if (id === "storage")       return <StorageTab />;
  return null;
}

// ── Main dialog ────────────────────────────────────────────────────────────────

export function SettingsDialog() {
  const { open, closeSettings } = useSettings();
  const { status } = useAuth();
  const isAuthed = status === "authenticated";

  const [activeTab, setActiveTab] = useState<TabId>("appearance");
  const [prevTab, setPrevTab] = useState<TabId | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Reset to appearance + closing flag whenever it opens
  useEffect(() => {
    if (open) {
      setActiveTab("appearance");
      setIsClosing(false);
    }
  }, [open]);

  // Wrapper: kill pointer events on backdrop immediately, then animate out
  const handleClose = () => {
    setIsClosing(true);
    closeSettings();
  };

  // Keyboard close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const visibleTabs = TABS.filter((t) => !t.requiresAuth || isAuthed);

  function switchTab(id: TabId) {
    setPrevTab(activeTab);
    setActiveTab(id);
  }

  // direction: which way does the content slide?
  const activeIdx  = visibleTabs.findIndex((t) => t.id === activeTab);
  const prevIdx    = visibleTabs.findIndex((t) => t.id === prevTab);
  const direction  = prevTab === null ? 0 : activeIdx > prevIdx ? 1 : -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — pointer-events killed immediately on close so the page
               behind is interactive again before the fade-out finishes */}
          <motion.div
            key="settings-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
              isClosing && "pointer-events-none",
            )}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          />

          {/* Panel */}
          <motion.div
            key="settings-panel"
            ref={dialogRef}
            role="dialog"
            aria-modal
            aria-label="Settings"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className={cn(
              "fixed inset-0 z-50 m-auto flex overflow-hidden",
              "h-[560px] w-[680px] max-w-[calc(100vw-2rem)]",
              "rounded-2xl border border-border bg-card shadow-2xl",
              isClosing && "pointer-events-none",
            )}
          >
            {/* ── Left sidebar ── */}
            <div className="flex w-[176px] shrink-0 flex-col border-r border-border bg-muted/10">

              {/* Title */}
              <div className="px-4 pb-2 pt-5">
                <p className="font-pixel text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
                  Settings
                </p>
              </div>

              {/* Tab list */}
              <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 pb-3">
                {visibleTabs.map((tab) => {
                  const active = tab.id === activeTab;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => switchTab(tab.id)}
                      className={cn(
                        "relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:bg-muted/30 hover:text-foreground",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="settings-tab-pill"
                          transition={{ type: "spring", stiffness: 440, damping: 34 }}
                          className="absolute inset-0 rounded-xl bg-foreground/7"
                        />
                      )}
                      <Icon className="relative h-3.5 w-3.5 shrink-0" />
                      <span className="relative">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Signed-out hint for locked tabs */}
              {!isAuthed && (
                <div className="shrink-0 border-t border-border px-4 py-3">
                  <p className="text-[10px] leading-snug text-muted-foreground/50">
                    Sign in to unlock Notifications, Account, Membership, Security, and Storage.
                  </p>
                </div>
              )}
            </div>

            {/* ── Right content ── */}
            <div className="relative flex min-w-0 flex-1 flex-col">

              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-border px-7 py-4">
                <h2 className="text-sm font-semibold text-foreground">
                  {TABS.find((t) => t.id === activeTab)?.label ?? activeTab}
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close settings"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Animated tab content */}
              <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: d * 18 }),
                      center: { opacity: 1, x: 0 },
                      exit: (d: number) => ({ opacity: 0, x: d * -18 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  >
                    <TabContent id={activeTab} />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
