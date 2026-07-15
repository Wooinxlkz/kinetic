"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Image,
  FileCode,
  FileText,
  File,
  X,
  CheckCircle2,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SPRING_PRESS, SPRING_PANEL, SPRING_LAYOUT } from "@/lib/ease";

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type: string): LucideIcon {
  if (type.startsWith("image/")) return Image;
  if (
    type.includes("javascript") ||
    type.includes("typescript") ||
    type.includes("json") ||
    type.includes("html") ||
    type.includes("css") ||
    type.includes("xml")
  )
    return FileCode;
  if (
    type.includes("pdf") ||
    type.includes("word") ||
    type.includes("text") ||
    type.includes("plain")
  )
    return FileText;
  return File;
}

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export type FileAttachmentStatus = "uploading" | "done" | "error";

export interface FileChipFile {
  name: string;
  size: number;
  type: string;
}

export interface FileChipProps {
  file: FileChipFile;
  onRemove?: () => void;
  status?: FileAttachmentStatus;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* FileChip                                                             */
/* ------------------------------------------------------------------ */

export function FileChip({
  file,
  onRemove,
  status = "done",
  className,
}: FileChipProps) {
  const [progress, setProgress] = useState(0);
  const [showCheck, setShowCheck] = useState(false);

  // Simulate upload progress
  useEffect(() => {
    if (status !== "uploading") {
      setProgress(status === "done" ? 100 : 0);
      return;
    }
    setProgress(0);
    const startTime = Date.now();
    const duration = 2000;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / duration) * 100, 97); // stop at 97, wait for done
      setProgress(p);
      if (p < 97) {
        requestAnimationFrame(tick);
      }
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [status]);

  // Flash checkmark when transitioning to done
  useEffect(() => {
    if (status === "done") {
      setProgress(100);
      setShowCheck(true);
      const t = setTimeout(() => setShowCheck(false), 1200);
      return () => clearTimeout(t);
    }
  }, [status]);

  const Icon = getFileIcon(file.type);
  const isError = status === "error";
  const isUploading = status === "uploading";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12, scale: 0.96 }}
      animate={
        isError
          ? {
              opacity: 1,
              x: [0, 4, -4, 4, 0],
              scale: 1,
            }
          : { opacity: 1, x: 0, scale: 1 }
      }
      exit={{ opacity: 0, x: -16, scale: 0.94 }}
      transition={isError ? { duration: 0.35, ease: "easeInOut" } : SPRING_LAYOUT}
      className={cn(
        "relative flex max-w-[200px] items-center gap-2 overflow-hidden rounded-xl border bg-card px-2.5 py-2 text-left",
        isError
          ? "border-destructive/60 bg-destructive/5"
          : "border-border",
        className,
      )}
    >
      {/* File type icon */}
      <span className={cn(
        "flex shrink-0 items-center justify-center rounded-md size-7 bg-muted",
        isError && "text-destructive",
      )}>
        {isError ? (
          <XCircle className="size-4 text-destructive" />
        ) : (
          <Icon className="size-4 text-muted-foreground" />
        )}
      </span>

      {/* Name + size */}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-xs font-medium leading-snug text-foreground">
          {file.name}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {formatBytes(file.size)}
        </span>
      </span>

      {/* Done checkmark flash */}
      <AnimatePresence>
        {showCheck && (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={SPRING_PRESS}
            className="shrink-0"
          >
            <CheckCircle2 className="size-3.5 text-emerald-500" />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Remove button */}
      {onRemove && (
        <motion.button
          type="button"
          onClick={onRemove}
          whileTap={{ scale: 0.85 }}
          transition={SPRING_PRESS}
          className="flex shrink-0 items-center justify-center rounded-md p-0.5 text-muted-foreground/60 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
        >
          <X className="size-3" />
        </motion.button>
      )}

      {/* Upload progress bar */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            key="progress-track"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 h-0.5 bg-muted"
          >
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* FileAttachmentList                                                   */
/* ------------------------------------------------------------------ */

export interface FileAttachmentItem extends FileChipFile {
  id: string;
  status?: FileAttachmentStatus;
}

export interface FileAttachmentListProps {
  files: FileAttachmentItem[];
  onRemove?: (id: string) => void;
  className?: string;
}

export function FileAttachmentList({
  files,
  onRemove,
  className,
}: FileAttachmentListProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <AnimatePresence mode="popLayout">
        {files.map((f) => (
          <FileChip
            key={f.id}
            file={f}
            status={f.status}
            onRemove={onRemove ? () => onRemove(f.id) : undefined}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
