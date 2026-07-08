"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchCurrentUser, signIn, signOutRequest, signUp } from "./auth-api";
import type { AuthUser } from "./types";

type AuthTab = "sign-in" | "sign-up";

interface AuthContextValue {
  /** Modal state */
  isOpen: boolean;
  defaultTab: AuthTab;
  open: (tab?: AuthTab) => void;
  close: () => void;

  /** Session state */
  user: AuthUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<AuthTab>("sign-in");

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

  const open = useCallback((tab: AuthTab = "sign-in") => {
    setDefaultTab(tab);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    const u = await signIn(email, password);
    setUser(u);
    setStatus("authenticated");
  }, []);

  const handleSignUp = useCallback(async (name: string, email: string, password: string) => {
    const u = await signUp(name, email, password);
    setUser(u);
    setStatus("authenticated");
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOutRequest();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        defaultTab,
        open,
        close,
        user,
        status,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
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
