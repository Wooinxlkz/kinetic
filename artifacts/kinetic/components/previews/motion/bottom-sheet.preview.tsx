"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/motion/bottom-sheet";

export function BottomSheetPreview() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-8">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        Open sheet
      </button>
      <button
        type="button"
        onClick={() => setOpen2(true)}
        className="inline-flex h-10 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        Settings sheet
      </button>

      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title="Quick actions"
      >
        <ul className="divide-y divide-border">
          {["Share link", "Duplicate", "Move to folder", "Rename", "Archive", "Delete"].map(
            (item) => (
              <li key={item} className="py-3 text-sm text-foreground">
                {item}
              </li>
            ),
          )}
        </ul>
        <p className="py-8 text-center text-xs text-muted-foreground">
          Drag handle up/down or flick to dismiss.
        </p>
      </BottomSheet>

      <BottomSheet
        open={open2}
        onOpenChange={setOpen2}
        title="Settings"
      >
        <div className="space-y-4 py-2">
          {["Notifications", "Privacy", "Appearance", "Language", "About"].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm"
            >
              <span className="font-medium text-foreground">{item}</span>
              <span className="text-muted-foreground">›</span>
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
