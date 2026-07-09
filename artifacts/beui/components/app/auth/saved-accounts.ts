"use client";

import type { AuthUser } from "./types";

const STORAGE_KEY = "kinetic_saved_accounts";
export const MAX_SAVED_ACCOUNTS = 4;

/** 5-day window in milliseconds — must match SWITCH_TOKEN_TTL_MS on the server. */
export const SWITCH_WINDOW_MS = 5 * 24 * 60 * 60 * 1000;

export interface SavedAccount {
  id: number;
  name: string;
  email: string;
  username: string;
  avatarColor: string;
  avatarUrl: string | null;
  /** Server-generated token for instant re-authentication within 5 days. */
  switchToken: string | null;
  /** Date.now() timestamp of when this account was last saved/refreshed. */
  lastActiveAt: number;
}

export function getSavedAccounts(): SavedAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedAccount[]) : [];
  } catch {
    return [];
  }
}

/** Returns true if this account's switch window is still open (within 5 days). */
export function isWithinSwitchWindow(account: SavedAccount): boolean {
  return (
    account.switchToken !== null &&
    typeof account.lastActiveAt === "number" &&
    Date.now() - account.lastActiveAt < SWITCH_WINDOW_MS
  );
}

/** Save or refresh an account entry. Most-recently-saved is first. Max 4. */
export function saveAccount(
  user: AuthUser,
  switchToken: string | null = null,
): void {
  const existing = getSavedAccounts().filter((a) => a.id !== user.id);
  const entry: SavedAccount = {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    avatarColor: user.avatarColor,
    avatarUrl: user.avatarUrl,
    switchToken,
    lastActiveAt: Date.now(),
  };
  const next = [entry, ...existing].slice(0, MAX_SAVED_ACCOUNTS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

/** Refreshes the switch token + lastActiveAt for an already-saved account
 *  (called after a successful normal login to reset the 5-day window). */
export function refreshSavedAccount(
  userId: number,
  switchToken: string,
): void {
  const accounts = getSavedAccounts();
  const idx = accounts.findIndex((a) => a.id === userId);
  if (idx === -1) return; // not saved, nothing to refresh
  accounts[idx] = { ...accounts[idx], switchToken, lastActiveAt: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function removeSavedAccount(id: number): void {
  const next = getSavedAccounts().filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function isAccountSaved(id: number): boolean {
  return getSavedAccounts().some((a) => a.id === id);
}
