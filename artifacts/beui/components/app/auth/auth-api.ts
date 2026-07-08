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

export function fetchCurrentUser(): Promise<AuthUser> {
  return request("/api/auth/me", { method: "GET" });
}

export function signIn(email: string, password: string): Promise<AuthUser> {
  return request("/api/auth/login", { body: JSON.stringify({ email, password }) });
}

export function signUp(name: string, email: string, password: string): Promise<AuthUser> {
  return request("/api/auth/signup", { body: JSON.stringify({ name, email, password }) });
}

export async function signOutRequest(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
}
