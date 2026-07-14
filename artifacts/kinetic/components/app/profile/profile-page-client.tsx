"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { useAuth } from "../auth/auth-provider";
import { VerifiedBadge } from "../auth/verified-badge";
import { ProfileBanner } from "./profile-banner";
import { ProfileAvatarUpload } from "./profile-avatar-upload";
import { ProfileAbout } from "./profile-about";
import { EditProfileDialog } from "./edit-profile-dialog";
import { useUploadImage } from "./use-upload-image";
import type { PublicProfile } from "@/lib/auth/types";
import { ProfilePublishedSection } from "@/components/app/community/profile-published-section";
import type { CommunityComponentDTO, CommunityQuota } from "@/lib/community/types";

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
  publishedComponents,
  quota,
}: {
  profile: PublicProfile;
  isOwner: boolean;
  publishedComponents: CommunityComponentDTO[];
  quota: CommunityQuota | null;
}) {
  const { updateUser, user: authUser } = useAuth();
  const canUploadGif =
    isOwner &&
    authUser != null &&
    (authUser.plan === "pro" || authUser.plan === "sponsor" || authUser.plan === "lifetime");
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [editOpen, setEditOpen] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<"avatar" | "banner" | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  // Instant local previews (blob: URLs) shown the moment a file is picked,
  // swapped out for the real object-storage URL once the upload + save
  // round-trip finishes. This is what makes the picker feel instant instead
  // of waiting for two network round-trips (presigned PUT, then PATCH).
  const [previewUrls, setPreviewUrls] = useState<{ avatar?: string; banner?: string }>({});
  const { upload } = useUploadImage();

  const handleImageSelect = async (file: File, target: "avatar" | "banner") => {
    setImageError(null);
    setUploadTarget(target);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrls((p) => ({ ...p, [target]: localPreview }));

    const result = await upload(file);
    setUploadTarget(null);
    if (!result) {
      URL.revokeObjectURL(localPreview);
      setPreviewUrls((p) => ({ ...p, [target]: undefined }));
      return;
    }

    const field = target === "avatar" ? "avatarUrl" : "bannerUrl";
    try {
      await patchProfile({ [field]: result.objectPath });
      setProfile((p) => ({ ...p, [field]: result.objectPath }));
      if (isOwner) updateUser({ [field]: result.objectPath });
      setImageError(null);
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Failed to save image. Please try again.");
    } finally {
      URL.revokeObjectURL(localPreview);
      setPreviewUrls((p) => ({ ...p, [target]: undefined }));
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
        previewUrl={previewUrls.banner}
        editable={isOwner}
        isUploading={uploadTarget === "banner"}
        canUploadGif={canUploadGif}
        onSelectFile={(file) => handleImageSelect(file, "banner")}
      />

      {imageError && (
        <div className="mb-3 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {imageError}
          <button type="button" onClick={() => setImageError(null)} className="ml-2 underline text-red-400/70 hover:text-red-400">Dismiss</button>
        </div>
      )}

      <div className="flex flex-col gap-4 px-1 sm:flex-row sm:items-end sm:justify-between">
        {/* Overlap the avatar onto the banner, but keep the offset small
            enough that the name/handle text (taller than the avatar's
            exposed sliver would otherwise allow) never intrudes onto the
            banner image itself — it was overlapping and getting swallowed
            by bright banner pixels. */}
        <div className="-mt-8 flex items-end gap-4 sm:-mt-9">
          <ProfileAvatarUpload
            user={profile}
            previewUrl={previewUrls.avatar}
            editable={isOwner}
            isUploading={uploadTarget === "avatar"}
            canUploadGif={canUploadGif}
            onSelectFile={(file) => handleImageSelect(file, "avatar")}
          />
          <div className="pb-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-semibold text-foreground">{profile.name}</h1>
              {profile.isDev && <VerifiedBadge size={16} />}
            </div>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {profile.isDev && (
              <a
                href="/dev-center"
                className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/15"
              >
                Dev Center
              </a>
            )}
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit profile
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-6">
        <ProfileAbout bio={profile.bio} joinedAt={profile.createdAt} />

        <ProfilePublishedSection
          authorName={profile.name}
          isOwner={isOwner}
          initialItems={publishedComponents}
          quota={quota}
        />
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
