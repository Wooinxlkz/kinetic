"use client";

import { useAuth } from "./auth-provider";

export function SignInButton() {
  const { open } = useAuth();
  return (
    <button
      type="button"
      onClick={() => open("sign-in")}
      className="inline-flex h-9 items-center justify-center rounded-2xl border border-border bg-card/20 px-3 text-xs font-medium text-foreground transition-colors hover:border-(--color-border-strong) hover:text-foreground"
    >
      Sign In
    </button>
  );
}
