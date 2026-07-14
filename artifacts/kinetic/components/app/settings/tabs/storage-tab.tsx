"use client";

import { Package, ChevronRight } from "lucide-react";
import { useAuth } from "@/components/app/auth/auth-provider";
import { cn } from "@/lib/utils";

// ── Helpers ───────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px bg-border" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-pixel text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
      {children}
    </p>
  );
}

// ── Usage bar ─────────────────────────────────────────────────────────────────

function UsageBar({ used, total }: { used: number; total: number }) {
  const pct = Math.min((used / total) * 100, 100);
  const color =
    pct > 85 ? "bg-red-500" : pct > 60 ? "bg-amber-500" : "bg-foreground/70";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-foreground">
          {used} of {total} components published
        </span>
        <span className="text-xs text-muted-foreground">{Math.round(pct)}% used</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${Math.max(pct, pct > 0 ? 3 : 0)}%` }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground/70">
        Publish components to share them publicly. Free accounts can publish up to {total} components.
      </p>
    </div>
  );
}

// ── Storage row ───────────────────────────────────────────────────────────────

function StorageRow({
  icon: Icon,
  label,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/10 px-4 py-3 transition-colors hover:bg-muted/20"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/30">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-xs text-muted-foreground">{sub}</span>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
    </button>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────

export function StorageTab() {
  const { user } = useAuth();
  if (!user) return null;

  // In the future these come from the API; for now they're stubs
  const publishedCount = 0;
  const publishLimit = 25;

  return (
    <div className="flex flex-col gap-6 px-7 py-5">

      {/* ── Usage ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <Divider />
        <UsageBar used={publishedCount} total={publishLimit} />
      </div>

      {/* ── Manage ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <SectionLabel>Manage storage</SectionLabel>
        <p className="text-[12px] text-muted-foreground/70 -mt-1">
          View and manage your published library to free up slots.
        </p>
        <Divider />

        <div className="flex flex-col gap-2 pt-1">
          <StorageRow
            icon={Package}
            label="Published components"
            sub={
              publishedCount === 0
                ? "No components published yet"
                : `${publishedCount} component${publishedCount === 1 ? "" : "s"} published`
            }
          />
        </div>
      </div>

    </div>
  );
}
