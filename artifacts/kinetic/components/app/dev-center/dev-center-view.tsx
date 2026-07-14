"use client";

import { useState } from "react";
import { Bell, Inbox, ShieldCheck, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserManagement } from "./user-management";
import { FeedbackInbox } from "./feedback-inbox";
import { BroadcastPanelPlaceholder } from "./broadcast-panel-placeholder";

type DevSection = "feedback" | "broadcasts" | "users";

const sections: { id: DevSection; label: string; icon: React.ElementType }[] = [
  { id: "feedback", label: "Feedback Inbox", icon: Inbox },
  { id: "broadcasts", label: "Broadcasts", icon: Bell },
  { id: "users", label: "User Management", icon: Users },
];

export function DevCenterView() {
  const [active, setActive] = useState<DevSection>("users");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10">
          <ShieldCheck className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-foreground">Dev Center</h1>
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-400">
              Dev only
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Manage every account on Kinetic UI.</p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {sections.map((s) => {
          const Icon = s.icon;
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-card",
              )}
            >
              <Icon className="h-4 w-4" />
              {s.label}
            </button>
          );
        })}
      </div>

      {active === "feedback" && <FeedbackInbox />}
      {active === "broadcasts" && <BroadcastPanelPlaceholder />}
      {active === "users" && <UserManagement />}
    </div>
  );
}
