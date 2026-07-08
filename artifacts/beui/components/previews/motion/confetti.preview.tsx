"use client";

import { ConfettiButton, fireConfetti } from "@/components/motion/confetti";

export function ConfettiPreview() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* ConfettiButton wrapper */}
      <ConfettiButton className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90">
        🎉 Click me!
      </ConfettiButton>

      {/* Imperative API */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => fireConfetti({ count: 60, origin: { x: window.innerWidth / 3, y: window.innerHeight / 2.5 } })}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Left burst
        </button>
        <button
          type="button"
          onClick={() => fireConfetti({ count: 120 })}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Big burst
        </button>
        <button
          type="button"
          onClick={() => fireConfetti({ count: 60, origin: { x: (window.innerWidth * 2) / 3, y: window.innerHeight / 2.5 } })}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Right burst
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Respects prefers-reduced-motion — no burst fires when motion is reduced.
      </p>
    </div>
  );
}
