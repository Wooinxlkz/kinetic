"use client";

import type { AuthUser } from "./types";

async function parseJson(res: Response) {
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export class AuthApiError extends Error {}

async function request(path: string, init?: RequestInit): Promise<AuthUser> {
  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    ...init,
  });

  const data = await parseJson(res);

  if (!res.ok) {
    throw new AuthApiError(
      (data && typeof data.error === "string" && data.error) || "Something went wrong",
    );
  }

  return data as AuthUser;
}

// NOTE: these live under /auth/*, not /api/auth/*. The /api path prefix is
// reserved for the separate Express API-server artifact in this workspace,
// so beui's own Next.js route handlers must avoid that prefix.
export function fetchCurrentUser(): Promise<AuthUser> {
  return request("/auth/me", { method: "GET" });
}

export function signIn(email: string, password: string): Promise<AuthUser> {
  return request("/auth/login", { body: JSON.stringify({ email, password }) });
}

export function signUp(name: string, email: string, password: string): Promise<AuthUser> {
  return request("/auth/signup", { body: JSON.stringify({ name, email, password }) });
}

export async function signOutRequest(): Promise<void> {
  await fetch("/auth/logout", { method: "POST", credentials: "same-origin" });
}

/** Generates (or refreshes) a switch token for the currently signed-in user.
 *  Must be called while the session is still active (before sign-out). */
export async function generateSwitchTokenRequest(): Promise<string> {
  const res = await fetch("/auth/generate-switch-token", {
    method: "POST",
    credentials: "same-origin",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new AuthApiError(
      (data && typeof data.error === "string" && data.error) || "Failed to generate switch token",
    );
  }
  return (data as { token: string }).token;
}

/** Attempts an instant account switch using a stored switch token.
 *  Returns the signed-in user and a fresh rotated switch token on success.
 *  Throws AuthApiError if the token is expired or invalid — caller falls back
 *  to the password flow. */
export async function switchWithTokenRequest(
  token: string,
): Promise<{ user: AuthUser; switchToken: string }> {
  const res = await fetch("/auth/switch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ token }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new AuthApiError(
      (data && typeof data.error === "string" && data.error) || "Switch failed",
    );
  }
  return data as { user: AuthUser; switchToken: string };
}
