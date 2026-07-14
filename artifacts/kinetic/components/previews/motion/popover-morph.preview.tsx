"use client";

import { Bell, Settings, User } from "lucide-react";
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverTrigger,
} from "@/components/motion/popover-morph";

export function PopoverMorphPreview() {
  return (
    <div className="flex min-h-72 w-full flex-wrap items-center justify-center gap-12 px-8 py-10">
      {/* Default */}
      <div className="flex flex-col items-start gap-2">
        <p className="text-xs font-medium text-muted-foreground">Default</p>
        <MorphPopover>
          <MorphPopoverTrigger>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </button>
          </MorphPopoverTrigger>
          <MorphPopoverContent className="w-52 p-3">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
              Preferences
            </p>
            {["Notifications", "Appearance", "Privacy", "Keyboard"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className="w-full rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                >
                  {item}
                </button>
              ),
            )}
          </MorphPopoverContent>
        </MorphPopover>
      </div>

      {/* Glass + arrow */}
      <div className="flex flex-col items-start gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          Glass + arrow
        </p>
        <MorphPopover>
          <MorphPopoverTrigger>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
              Notifications
            </button>
          </MorphPopoverTrigger>
          <MorphPopoverContent variant="glass" showArrow className="w-60 p-3">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
              Recent
            </p>
            {[
              { label: "New component released", time: "2m ago" },
              { label: "Your feedback was reviewed", time: "1h ago" },
              { label: "Changelog updated", time: "3h ago" },
            ].map((n) => (
              <div
                key={n.label}
                className="flex items-start justify-between gap-2 rounded-lg px-2.5 py-2 transition-colors hover:bg-muted/60"
              >
                <p className="text-xs leading-snug text-foreground">
                  {n.label}
                </p>
                <p className="shrink-0 text-[10px] text-muted-foreground">
                  {n.time}
                </p>
              </div>
            ))}
          </MorphPopoverContent>
        </MorphPopover>
      </div>

      {/* Align end */}
      <div className="flex flex-col items-end gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          End-aligned
        </p>
        <MorphPopover>
          <MorphPopoverTrigger>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              Profile
            </button>
          </MorphPopoverTrigger>
          <MorphPopoverContent align="end" showArrow className="w-44 p-2">
            {["View profile", "Edit details", "Sign out"].map((item) => (
              <button
                key={item}
                type="button"
                className="w-full rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
              >
                {item}
              </button>
            ))}
          </MorphPopoverContent>
        </MorphPopover>
      </div>
    </div>
  );
}
