"use client";

import { LoginForm } from "@/components/motion/login-form";

export function LoginFormPreview() {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <LoginForm
        onSubmit={async ({ email, password }) => {
          await new Promise((r) => setTimeout(r, 1200));
          if (password === "wrong") throw new Error("Invalid credentials.");
        }}
      />
    </div>
  );
}
