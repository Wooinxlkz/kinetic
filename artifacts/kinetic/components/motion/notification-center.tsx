"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bell, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface Notification {
  id: string;
  title: string;
  description?: string;
  time?: string;
  read?: boolean;
  icon?: React.ReactNode;
}

export interface NotificationCenterProps {
  notifications: Notification[];
  onRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onMarkAllRead?: () => void;
  className?: string;
}

/**
 * Notification list with read/unread states, dismiss, and mark-all-read.
 * Items animate in and slide out on dismiss.
 */
export function NotificationCenter({
  notifications,
  onRead,
  onDismiss,
  onMarkAllRead,
  className,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border bg-card shadow-sm overflow-hidden",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Notifications</span>
          {unreadCount > 0 && (
            <motion.span
              key={unreadCount}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
            >
              {unreadCount}
            </motion.span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Check className="h-3 w-3" />
            Mark all read
          </button>
        )}
      </div>

      {/* Items */}
      <div className="divide-y divide-border/60 max-h-80 overflow-y-auto">
        <AnimatePresence initial={false}>
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 py-10 text-center"
            >
              <Bell className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </motion.div>
          ) : (
            notifications.map((n) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40, height: 0, marginTop: 0, padding: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
                className={cn(
                  "group flex items-start gap-3 px-4 py-3 transition-colors",
                  !n.read && "bg-primary/[0.04]",
                )}
                onClick={() => onRead?.(n.id)}
              >
                {/* Icon / unread dot */}
                <div className="relative mt-0.5 shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    {n.icon ?? <Bell className="h-3.5 w-3.5" />}
                  </div>
                  {!n.read && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
                  )}
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm", !n.read ? "font-medium text-foreground" : "text-foreground/70")}>
                    {n.title}
                  </p>
                  {n.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{n.description}</p>
                  )}
                  {n.time && (
                    <p className="mt-1 text-[11px] text-muted-foreground/60">{n.time}</p>
                  )}
                </div>

                {/* Dismiss */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onDismiss?.(n.id); }}
                  className="ml-auto shrink-0 rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
