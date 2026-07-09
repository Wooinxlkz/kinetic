"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  fetchCurrentUser,
  signIn,
  signOutRequest,
  signUp,
  generateSwitchTokenRequest,
  switchWithTokenRequest,
} from "./auth-api";
import { isAccountSaved, refreshSavedAccount } from "./saved-accounts";
import type { AuthUser } from "./types";

type AuthTab = "sign-in" | "sign-up";

interface AuthContextValue {
  /** Modal state */
  isOpen: boolean;
  defaultTab: AuthTab;
  prefillEmail: string | null;
  open: (tab?: AuthTab, prefillEmail?: string) => void;
  close: () => void;

  /** Session state */
  user: AuthUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  /** Instant account switch via a stored switch token. Throws if token is
   *  expired/invalid so the caller can fall back to the password flow. */
  switchWithToken: (token: string) => Promise<void>;
  /** Patches the in-memory signed-in user, e.g. after a profile edit elsewhere in the app. */
  updateUser: (patch: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<AuthTab>("sign-in");
  const [prefillEmail, setPrefillEmail] = useState<string | null>(null);

  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");

  useEffect(() => {
    let cancelled = false;
    fetchCurrentUser()
      .then((u) => {
        if (!cancelled) {
          setUser(u);
          setStatus("authenticated");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
          setStatus("unauthenticated");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const open = useCallback((tab: AuthTab = "sign-in", email?: string) => {
    setDefaultTab(tab);
    setPrefillEmail(email ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    const u = await signIn(email, password);
    setUser(u);
    setStatus("authenticated");
    // If this account is already saved, refresh its switch token + lastActiveAt
    // so the 5-day instant-switch window resets on every successful login.
    if (isAccountSaved(u.id)) {
      generateSwitchTokenRequest()
        .then((token) => refreshSavedAccount(u.id, token))
        .catch(() => {
          // Non-critical — ignore failures silently
        });
    }
  }, []);

  const handleSignUp = useCallback(async (name: string, email: string, password: string) => {
    const u = await signUp(name, email, password);
    setUser(u);
    setStatus("authenticated");

    // Auto-register referral if the user arrived via a ?ref= invite link.
    // Fire-and-forget — a registration failure must never block the signup flow.
    try {
      const code = typeof window !== "undefined"
        ? window.localStorage.getItem("kinetic_ref_code")
        : null;
      if (code) {
        await fetch("/api/referrals/register", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        // Clear regardless of response — one attempt per signup is enough.
        window.localStorage.removeItem("kinetic_ref_code");
      }
    } catch {
      // Non-critical — silently swallow
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOutRequest();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const handleSwitchWithToken = useCallback(async (token: string) => {
    const { user: u, switchToken: newToken } = await switchWithTokenRequest(token);
    setUser(u);
    setStatus("authenticated");
    // Persist the rotated token so the next switch within 5 days is still instant
    refreshSavedAccount(u.id, newToken);
  }, []);

  const updateUser = useCallback((patch: Partial<AuthUser>) => {
    setUser((current) => (current ? { ...current, ...patch } : current));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        defaultTab,
        prefillEmail,
        open,
        close,
        user,
        status,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        switchWithToken: handleSwitchWithToken,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
