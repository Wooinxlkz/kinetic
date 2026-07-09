"use client";

import { useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarCircle } from "../auth/avatar-circle";
import type { AuthUser } from "../auth/types";

export function ProfileAvatarUpload({
  user,
  editable,
  isUploading,
  onSelectFile,
}: {
  user: Pick<AuthUser, "name" | "avatarColor" | "avatarUrl">;
  editable: boolean;
  isUploading: boolean;
  onSelectFile: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative h-24 w-24 shrink-0 rounded-full ring-4 ring-background sm:h-28 sm:w-28">
      <AvatarCircle user={user} size={112} className="h-full w-full text-3xl" />
      {editable && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onSelectFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            aria-label="Change avatar"
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-transparent transition-colors hover:bg-black/50 hover:text-white",
              isUploading && "bg-black/50 text-white",
            )}
          >
            {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
          </button>
        </>
      )}
    </div>
  );
}
