"use client";

import { useState, useCallback } from "react";
import {
  FileAttachmentList,
  FileChip,
  type FileAttachmentItem,
  type FileAttachmentStatus,
} from "@/components/ai/file-attachment";

const INITIAL_FILES: FileAttachmentItem[] = [
  {
    id: "1",
    name: "quarterly-report.pdf",
    size: 2_480_000,
    type: "application/pdf",
    status: "done",
  },
  {
    id: "2",
    name: "chart-data.csv",
    size: 84_320,
    type: "text/plain",
    status: "uploading",
  },
  {
    id: "3",
    name: "hero-banner.png",
    size: 1_230_000,
    type: "image/png",
    status: "uploading",
  },
  {
    id: "4",
    name: "config.json",
    size: 4_096,
    type: "application/json",
    status: "done",
  },
];

export function FileAttachmentPreview() {
  const [files, setFiles] = useState<FileAttachmentItem[]>(INITIAL_FILES);

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const reset = () => setFiles(INITIAL_FILES);

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      {/* List */}
      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          File attachment list (click × to remove)
        </p>
        <FileAttachmentList files={files} onRemove={handleRemove} />
        {files.length === 0 && (
          <p className="text-xs text-muted-foreground">All files removed.</p>
        )}
        <button
          type="button"
          onClick={reset}
          className="self-start rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
        >
          Reset
        </button>
      </div>

      {/* Individual status examples */}
      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          Individual status examples
        </p>
        <div className="flex flex-wrap gap-2">
          <FileChip
            file={{ name: "uploading-file.ts", size: 16_384, type: "application/typescript" }}
            status="uploading"
          />
          <FileChip
            file={{ name: "success-image.webp", size: 512_000, type: "image/webp" }}
            status="done"
          />
          <FileChip
            file={{ name: "failed-upload.docx", size: 98_304, type: "application/msword" }}
            status="error"
          />
        </div>
      </div>
    </div>
  );
}
