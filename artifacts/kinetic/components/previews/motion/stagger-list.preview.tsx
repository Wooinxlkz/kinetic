"use client";

import { useState } from "react";
import { StaggerList } from "@/components/motion/stagger-list";
import { RotateCcw } from "lucide-react";

const NOTIFICATIONS = [
  { title: "Deployment succeeded", sub: "main → production · just now", dot: "bg-emerald-500" },
  { title: "New comment on PR #42", sub: "Jordan left a review · 2m ago", dot: "bg-sky-500" },
  { title: "Build failed", sub: "feature/auth · 5m ago", dot: "bg-red-500" },
  { title: "Usage limit at 80%", sub: "Upgrade to avoid throttling · 12m ago", dot: "bg-amber-500" },
  { title: "Team invite accepted", sub: "Alex joined the workspace · 1h ago", dot: "bg-violet-500" },
];

export function StaggerListPreview() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-6 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">Notifications</p>
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            Replay
          </button>
        </div>

        <StaggerList
          key={key}
          stagger={0.08}
          direction="up"
          itemClassName="mb-1"
        >
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.title}
              className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
            >
              <span className={`mt-1.5 size-2 shrink-0 rounded-full ${n.dot}`} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                <p className="truncate text-xs text-muted-foreground">{n.sub}</p>
              </div>
            </div>
          ))}
        </StaggerList>
      </div>
    </div>
  );
}
