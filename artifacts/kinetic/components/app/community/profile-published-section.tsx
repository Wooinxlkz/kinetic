"use client";

import { useState } from "react";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CommunityCard } from "./community-card";
import { PublishDialog } from "./publish-dialog";
import { deleteCommunityComponent } from "./community-client-api";
import type { CommunityComponentDTO, CommunityQuota } from "@/lib/community/types";

// ── Delete confirmation modal ─────────────────────────────────────────────────

function DeleteConfirmDialog({
  item,
  onCancel,
  onConfirm,
  deleting,
}: {
  item: CommunityComponentDTO;
  onCancel: () => void;
  onConfirm: () => void;
  deleting: boolean;
}) {
  const [typed, setTyped] = useState("");
  const confirmed = typed.trim() === item.name.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 6 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-border bg-popover p-6 shadow-2xl"
      >
        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
          <Trash2 className="h-4.5 w-4.5 text-red-400" />
        </div>

        <h2 className="text-sm font-semibold text-foreground">
          Delete &ldquo;{item.name}&rdquo;?
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          This will permanently remove it from the community. This can&apos;t be undone.
        </p>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs text-muted-foreground">
            Type <span className="font-medium text-foreground">{item.name}</span> to confirm
          </span>
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={item.name}
            autoFocus
            className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-foreground/20"
          />
        </label>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-card"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!confirmed || deleting}
            className={cn(
              "flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-all",
              confirmed
                ? "bg-red-500 text-white hover:bg-red-600"
                : "cursor-not-allowed bg-red-500/20 text-red-400/40",
            )}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function ProfilePublishedSection({
  authorName,
  isOwner,
  initialItems,
  quota,
}: {
  authorName: string;
  isOwner: boolean;
  initialItems: CommunityComponentDTO[];
  quota: CommunityQuota | null;
}) {
  const [items, setItems] = useState(initialItems);
  const [publishOpen, setPublishOpen] = useState(false);
  const [liveQuota, setLiveQuota] = useState(quota);
  const [deleteTarget, setDeleteTarget] = useState<CommunityComponentDTO | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCommunityComponent(deleteTarget.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      setLiveQuota((prev) =>
        prev
          ? { ...prev, used: Math.max(0, prev.used - 1), remaining: prev.remaining !== null ? prev.remaining + 1 : null }
          : prev,
      );
      setDeleteTarget(null);
    } catch {
      // silently ignore — item stays, user can retry
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Published work</h2>
        {isOwner && (
          <button
            type="button"
            onClick={() => setPublishOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            Publish
          </button>
        )}
      </div>
      {isOwner && liveQuota && (
        <p className="mt-1 text-xs text-muted-foreground">
          {liveQuota.limit === null
            ? `${liveQuota.used} published · unlimited on your plan`
            : `${liveQuota.used} of ${liveQuota.limit} published this plan`}
        </p>
      )}

      {items.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-dashed border-border p-8 text-center">
          <Sparkles className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Nothing published yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {isOwner ? "Your published work will show up here." : `${authorName} hasn't published anything yet.`}
          </p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <CommunityCard
              key={item.id}
              item={item}
              onDelete={isOwner ? () => setDeleteTarget(item) : undefined}
            />
          ))}
        </div>
      )}

      <PublishDialog
        open={publishOpen}
        quota={liveQuota}
        onClose={() => setPublishOpen(false)}
        onPublished={(item) => {
          setItems((prev) => [item, ...prev]);
          setLiveQuota((prev) =>
            prev ? { ...prev, used: prev.used + 1, remaining: prev.remaining !== null ? Math.max(0, prev.remaining - 1) : null } : prev,
          );
        }}
      />

      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmDialog
            item={deleteTarget}
            onCancel={() => { if (!deleting) setDeleteTarget(null); }}
            onConfirm={handleDelete}
            deleting={deleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
