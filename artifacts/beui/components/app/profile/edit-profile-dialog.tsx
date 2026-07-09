"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const USERNAME_RE = /^[a-z0-9][a-z0-9-]{6,10}[a-z0-9]$/;

export function EditProfileDialog({
  open,
  initialName,
  initialUsername,
  initialBio,
  onClose,
  onSave,
}: {
  open: boolean;
  initialName: string;
  initialUsername: string;
  initialBio: string;
  onClose: () => void;
  onSave: (values: { name: string; username: string; bio: string }) => Promise<void>;
}) {
  const [name, setName] = useState(initialName);
  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }
    const normalizedUsername = username.trim().toLowerCase();
    if (!USERNAME_RE.test(normalizedUsername)) {
      setError("Username must be 8-12 characters: lowercase letters, numbers, and dashes");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave({ name: name.trim(), username: normalizedUsername, bio: bio.trim() });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Edit profile"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-popover p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Edit profile</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-(--color-border-strong)"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Username</span>
                <div className="flex items-center rounded-xl border border-border bg-card pl-3 focus-within:border-(--color-border-strong)">
                  <span className="text-sm text-muted-foreground">@</span>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    maxLength={12}
                    className="w-full bg-transparent px-2 py-2 text-sm text-foreground outline-none"
                  />
                </div>
                <span className="mt-1 block text-[11px] text-muted-foreground">
                  8-12 characters — lowercase letters, numbers, and dashes
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Bio</span>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={280}
                  rows={3}
                  placeholder="Tell people a bit about yourself"
                  className="w-full resize-none rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-(--color-border-strong)"
                />
                <span className="mt-1 block text-right text-[11px] text-muted-foreground">{bio.length}/280</span>
              </label>

              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className={cn(
                  "rounded-xl bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60",
                )}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
