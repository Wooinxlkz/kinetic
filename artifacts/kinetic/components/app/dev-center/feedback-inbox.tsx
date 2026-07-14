"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bug, Ellipsis, Inbox, LifeBuoy, Loader2, Mail, MessageCircle, RefreshCw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Feedback = {
  id: number;
  type: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const TYPE_META: Record<string, { label: string; icon: React.ElementType }> = {
  feedback: { label: "Feedback", icon: MessageCircle },
  bug: { label: "Report a bug", icon: Bug },
  help: { label: "Need help", icon: LifeBuoy },
  other: { label: "Something else", icon: Ellipsis },
};

function typeMeta(type: string) {
  return TYPE_META[type] ?? { label: type, icon: Inbox };
}

type FilterTab = "all" | "unread" | "read";

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "read", label: "Read" },
];

async function fetchFeedback(): Promise<Feedback[]> {
  const res = await fetch("/auth/admin/feedback", { credentials: "same-origin" });
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.error ? ` — ${body.error}` : "";
    } catch {
      // ignore parse error
    }
    throw new Error(`Failed to load feedback (HTTP ${res.status}${detail})`);
  }
  return res.json();
}

async function patchFeedback(id: number, read: boolean): Promise<Feedback> {
  const res = await fetch(`/auth/admin/feedback/${id}`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ read }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update feedback");
  return data;
}

async function removeFeedback(id: number): Promise<void> {
  const res = await fetch(`/auth/admin/feedback/${id}`, { method: "DELETE", credentials: "same-origin" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to delete feedback");
  }
}

const POLL_INTERVAL_MS = 30_000;

export function FeedbackInbox() {
  const [items, setItems] = useState<Feedback[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [tab, setTab] = useState<FilterTab>("all");
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(() => {
    setError(null);
    fetchFeedback()
      .then(setItems)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Unknown error"));
  }, []);

  // Initial load + 30-second auto-poll
  useEffect(() => {
    load();
    pollRef.current = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [load]);

  const counts = useMemo(
    () => ({
      all: items?.length ?? 0,
      unread: items?.filter((f) => !f.read).length ?? 0,
      read: items?.filter((f) => f.read).length ?? 0,
    }),
    [items],
  );

  const filtered = useMemo(() => {
    if (!items) return [];
    if (tab === "unread") return items.filter((f) => !f.read);
    if (tab === "read") return items.filter((f) => f.read);
    return items;
  }, [items, tab]);

  const handleToggleRead = async (row: Feedback) => {
    setBusyId(row.id);
    setError(null);
    try {
      const updated = await patchFeedback(row.id, !row.read);
      setItems((prev) => prev?.map((f) => (f.id === row.id ? updated : f)) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (row: Feedback) => {
    setBusyId(row.id);
    setError(null);
    try {
      await removeFeedback(row.id);
      setItems((prev) => prev?.filter((f) => f.id !== row.id) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
        <p className="text-sm text-red-400">{error}</p>
        <button
          type="button"
          onClick={load}
          className="flex w-fit items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      </div>
    );
  }

  if (!items) {
    return (
      <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading feedback…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              tab === t.id
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-transparent text-muted-foreground hover:border-border hover:bg-card",
            )}
          >
            {t.label}
            {counts[t.id] > 0 && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  tab === t.id ? "bg-accent/20 text-accent" : "bg-card text-muted-foreground",
                )}
              >
                {counts[t.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
          No {tab === "all" ? "" : tab} feedback yet.
        </div>
      )}

      <div className="space-y-2">
        {filtered.map((row) => {
          const meta = typeMeta(row.type);
          const Icon = meta.icon;
          const isBusy = busyId === row.id;

          return (
            <div
              key={row.id}
              className={cn(
                "space-y-2 rounded-xl border border-border bg-card/40 p-4 transition-opacity",
                !row.read && "border-accent/20 bg-accent/[0.04]",
                isBusy && "pointer-events-none opacity-60",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground/80">
                    <Icon className="h-3 w-3" />
                    {meta.label}
                  </span>
                  {!row.read && (
                    <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                      Unread
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {row.email}
                  </span>
                </div>
                <span className="flex-shrink-0 text-[10px] text-muted-foreground">
                  {new Date(row.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-foreground/90">{row.message}</p>

              <div className="flex items-center justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleToggleRead(row)}
                  className="rounded-lg border border-border px-2 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-card disabled:opacity-50"
                >
                  {row.read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleDelete(row)}
                  className="flex items-center gap-1 rounded-lg border border-transparent px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
