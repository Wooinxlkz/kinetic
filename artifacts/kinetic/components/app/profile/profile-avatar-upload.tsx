"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { objectStorageUrl } from "./object-storage-url";
import type { PublicProfile } from "@/lib/auth/types";

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export function ProfileAvatarUpload({
  user,
  previewUrl,
  editable,
  isUploading,
  canUploadGif = false,
  onSelectFile,
  size = 88,
}: {
  user: Pick<PublicProfile, "name" | "avatarColor" | "avatarUrl">;
  /** Local blob: URL shown immediately after picking a file, before the
   *  upload + save round-trip finishes. Takes precedence over user.avatarUrl. */
  previewUrl?: string;
  editable: boolean;
  isUploading: boolean;
  canUploadGif?: boolean;
  onSelectFile: (file: File) => void;
  size?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [gifNotice, setGifNotice] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const resolvedSrc = previewUrl || (user.avatarUrl ? objectStorageUrl(user.avatarUrl) : null);
  const showImage = resolvedSrc && !imgFailed;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className={cn(
          "flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-background font-semibold text-white select-none",
        )}
        style={{ backgroundColor: user.avatarColor, fontSize: size * 0.36 }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- storage-served, not a static asset
          <img
            key={resolvedSrc}
            src={resolvedSrc}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span aria-hidden="true">{getInitial(user.name)}</span>
        )}
      </div>

      {editable && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept={canUploadGif ? "image/png,image/jpeg,image/gif" : "image/png,image/jpeg"}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.type === "image/gif" && !canUploadGif) {
                setGifNotice(true);
                e.target.value = "";
                return;
              }
              setGifNotice(false);
              setImgFailed(false);
              onSelectFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            title={canUploadGif ? "PNG, JPG or GIF" : "PNG or JPG — GIF unlocks with Pro"}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-popover/90 text-foreground shadow-lg backdrop-blur-xl transition-colors hover:bg-card disabled:opacity-60"
          >
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Camera className="h-3.5 w-3.5" />
            )}
          </button>
          {gifNotice && (
            <p className="absolute top-full left-1/2 mt-2 w-max -translate-x-1/2 rounded-full bg-popover/80 px-2.5 py-1 text-[11px] text-muted-foreground backdrop-blur-xl">
              GIF uploads unlock with Pro
            </p>
          )}
        </>
      )}
    </div>
  );
}
