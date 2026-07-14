"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { objectStorageUrl } from "./object-storage-url";

const FALLBACK_GRADIENT = "bg-gradient-to-br from-violet-600/40 via-fuchsia-500/20 to-transparent";

export function ProfileBanner({
  bannerUrl,
  previewUrl,
  editable,
  isUploading,
  canUploadGif = false,
  onSelectFile,
}: {
  bannerUrl: string | null;
  /** Local blob: URL shown immediately after picking a file, before the
   *  upload + save round-trip finishes. Takes precedence over bannerUrl. */
  previewUrl?: string;
  editable: boolean;
  isUploading: boolean;
  canUploadGif?: boolean;
  onSelectFile: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [gifNotice, setGifNotice] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const resolvedSrc = previewUrl || (bannerUrl ? objectStorageUrl(bannerUrl) : null);
  const showImage = resolvedSrc && !imgFailed;

  return (
    <div
      className={cn(
        "relative h-40 w-full overflow-hidden rounded-2xl border border-border sm:h-56",
        !showImage && FALLBACK_GRADIENT,
      )}
    >
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element -- storage-served, not a static asset
        <img
          key={resolvedSrc}
          src={resolvedSrc}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      )}

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
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-border bg-popover/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-xl transition-colors hover:bg-card disabled:opacity-60"
          >
            {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Camera className="h-3.5 w-3.5" />}
            {isUploading ? "Uploading…" : "Change banner"}
          </button>
          {gifNotice && (
            <p className="absolute bottom-3 left-3 rounded-full bg-popover/80 px-2.5 py-1 text-[11px] text-muted-foreground backdrop-blur-xl">
              GIF uploads unlock with Pro
            </p>
          )}
        </>
      )}
    </div>
  );
}
