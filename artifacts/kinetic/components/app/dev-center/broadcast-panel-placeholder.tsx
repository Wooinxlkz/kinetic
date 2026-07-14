"use client";

import { Bell } from "lucide-react";

/** Static placeholder — not wired to any data yet. */
export function BroadcastPanelPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
        <Bell className="h-5 w-5 text-blue-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">Broadcasts</p>
        <p className="mt-1 text-xs text-muted-foreground">Not wired up yet — coming soon.</p>
      </div>
    </div>
  );
}
