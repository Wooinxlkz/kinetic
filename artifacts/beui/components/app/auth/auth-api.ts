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
