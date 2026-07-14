"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Toggle switch ─────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
        checked ? "bg-foreground" : "bg-muted-foreground/30",
      )}
    >
      {/* Knob — uses bg-card so it always contrasts against bg-foreground on every theme */}
      <span
        className={cn(
          "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}

// ── Setting row ───────────────────────────────────────────────────────────────

function SafetyRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="max-w-[320px] text-[12px] leading-relaxed text-muted-foreground">
          {description}
        </span>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────

export function SafetyTab() {
  const [recommendations, setRecommendations] = useState(true);
  const [analytics, setAnalytics]             = useState(false);

  return (
    <div className="flex flex-col px-7 py-2">
      <div className="h-px bg-border" />
      <SafetyRow
        title="Personalised recommendations"
        description="Use your browsing activity within Kinetic to surface relevant components and docs."
        checked={recommendations}
        onChange={setRecommendations}
      />
      <div className="h-px bg-border" />
      <SafetyRow
        title="Anonymous usage analytics"
        description="Share anonymous interaction data to help improve Kinetic. No personal info is ever sent."
        checked={analytics}
        onChange={setAnalytics}
      />
      <div className="h-px bg-border" />
    </div>
  );
}
