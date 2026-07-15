"use client";

import { ToastProvider, useToast, type ToastVariant } from "@/components/motion/toast";

const EXAMPLES: Array<{ label: string; variant: ToastVariant; title: string; description?: string }> = [
  {
    label: "Default",
    variant: "default",
    title: "Update available",
    description: "A new version of the app is ready to install.",
  },
  {
    label: "Success",
    variant: "success",
    title: "Changes saved",
    description: "Your profile has been updated successfully.",
  },
  {
    label: "Error",
    variant: "error",
    title: "Upload failed",
    description: "The file exceeds the 10 MB size limit.",
  },
  {
    label: "Warning",
    variant: "warning",
    title: "Storage almost full",
    description: "You're using 92% of your storage quota.",
  },
];

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm font-medium text-foreground">Toast notifications</p>
        <p className="text-xs text-muted-foreground">
          Auto-dismiss after 4 s · swipe right to dismiss
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => toast({ title: ex.title, description: ex.description, variant: ex.variant })}
            className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ToastPreview() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}
