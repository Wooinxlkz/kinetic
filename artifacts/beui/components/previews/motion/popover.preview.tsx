"use client";

import { useState } from "react";
import { Bell, Filter, HelpCircle, Palette } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@/components/motion/popover";
import { Button } from "@/components/motion/button";

export function PopoverPreview() {
  const [notifs, setNotifs] = useState({
    email: true,
    push: false,
    slack: true,
  });

  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {/* Notification settings */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Notification settings</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="md">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start">
            <p className="mb-3 text-sm font-semibold text-foreground">Notification channels</p>
            <div className="space-y-2.5">
              {(Object.keys(notifs) as (keyof typeof notifs)[]).map((key) => (
                <label key={key} className="flex cursor-pointer items-center justify-between gap-3">
                  <span className="text-sm capitalize text-foreground">{key}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifs[key]}
                    onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                    className={`relative h-5 w-9 rounded-full transition-colors ${notifs[key] ? "bg-foreground" : "bg-muted"}`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-background shadow transition-transform ${notifs[key] ? "translate-x-4" : "translate-x-0.5"}`}
                    />
                  </button>
                </label>
              ))}
            </div>
            <div className="mt-3 flex justify-end">
              <PopoverClose className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                Done
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Filter */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Filter</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="md">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" width="w-56">
            <p className="mb-2 text-xs font-medium uppercase text-muted-foreground tracking-wide">Status</p>
            <div className="space-y-1">
              {["All", "Active", "Paused", "Archived"].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-sm transition-colors hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Help */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Help tooltip</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Help">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="center" width="w-64">
            <p className="text-sm font-medium text-foreground">What is this?</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              This panel lets you configure settings. Changes are saved automatically when you close it.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
