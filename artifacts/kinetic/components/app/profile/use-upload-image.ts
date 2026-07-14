"use client";

import { useCallback, useState } from "react";

interface UploadResult {
  objectPath: string;
}

/**
 * Uploads an image via the API server's presigned-URL flow:
 * 1. POST /api/storage/uploads/request-url with file metadata (JSON only).
 * 2. PUT the file bytes directly to the returned presigned GCS URL.
 * The caller then PATCHes /auth/profile with the resulting objectPath.
 */
export function useUploadImage() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<UploadResult | null> => {
    setIsUploading(true);
    setError(null);
    try {
      const res = await fetch("/api/storage/uploads/request-url", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to prepare upload");
      }

      const putRes = await fetch(data.uploadURL, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type || "application/octet-stream" },
      });
      if (!putRes.ok) {
        throw new Error("Upload failed");
      }

      return { objectPath: data.objectPath as string };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { upload, isUploading, error };
}
