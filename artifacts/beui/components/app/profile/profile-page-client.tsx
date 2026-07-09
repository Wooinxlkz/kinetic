"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Sparkles } from "lucide-react";
import { useAuth } from "../auth/auth-provider";
import { ProfileBanner } from "./profile-banner";
import { ProfileAvatarUpload } from "./profile-avatar-upload";
import { ProfileAbout } from "./profile-about";
import { EditProfileDialog } from "./edit-profile-dialog";
import { useUploadImage } from "./use-upload-image";
import type { PublicProfile } from "@/lib/auth/types";

async function patchProfile(body: Record<string, unknown>) {
  const res = await fetch("/auth/profile", {
    method: "PATCH",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

export function ProfilePageClient({
  profile: initialProfile,
  isOwner,
}: {
  profile: PublicProfile;
  isOwner: boolean;
}) {
  const { updateUser } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [editOpen, setEditOpen] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<"avatar" | "banner" | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const { upload } = useUploadImage();

  const handleImageSelect = async (file: File, target: "avatar" | "banner") => {
    setImageError(null);
    setUploadTarget(target);
    const result = await upload(file);
    setUploadTarget(null);
    if (!result) return;

    const field = target === "avatar" ? "avatarUrl" : "bannerUrl";
    try {
      await patchProfile({ [field]: result.objectPath });
      setProfile((p) => ({ ...p, [field]: result.objectPath }));
      if (isOwner) updateUser({ [field]: result.objectPath });
      setImageError(null);
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Failed to save image. Please try again.");
    }
  };

  const handleSave = async (values: { name: string; username: string; bio: string }) => {
    const usernameChanged = values.username !== profile.username;
    const updated = await patchProfile({
      name: values.name,
      username: values.username,
      bio: values.bio || null,
    });
    setProfile((p) => ({ ...p, name: updated.name, username: updated.username, bio: updated.bio }));
    if (isOwner) updateUser({ name: updated.name, username: updated.username, bio: updated.bio });
    if (usernameChanged) router.replace(`/profile/${updated.username}`);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <ProfileBanner
        bannerUrl={profile.bannerUrl}
        editable={isOwner}
        isUploading={uploadTarget === "banner"}
        onSelectFile={(file) => handleImageSelect(file, "banner")}
      />

      {imageError && (
        <div className="mb-3 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {imageError}
          <button type="button" onClick={() => setImageError(null)} className="ml-2 underline text-red-400/70 hover:text-red-400">Dismiss</button>
        </div>
      )}

      <div className="flex flex-col gap-4 px-1 sm:flex-row sm:items-end sm:justify-between">
        <div className="-mt-12 flex items-end gap-4 sm:-mt-14">
          <ProfileAvatarUpload
            user={profile}
            editable={isOwner}
            isUploading={uploadTarget === "avatar"}
            onSelectFile={(file) => handleImageSelect(file, "avatar")}
          />
          <div className="pb-1">
            <h1 className="text-xl font-semibold text-foreground">{profile.name}</h1>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>
        </div>

        {isOwner && (
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-1.5 self-start rounded-xl border border-border px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-card hover:text-foreground sm:self-auto"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit profile
          </button>
        )}
      </div>

      <div className="mt-6 space-y-6">
        <ProfileAbout bio={profile.bio} joinedAt={profile.createdAt} />

        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <Sparkles className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Nothing published yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {isOwner ? "Your published work will show up here." : `${profile.name} hasn't published anything yet.`}
          </p>
        </div>
      </div>

      <EditProfileDialog
        open={editOpen}
        initialName={profile.name}
        initialUsername={profile.username}
        initialBio={profile.bio ?? ""}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
