"use client";

import { DragToConfirm } from "@/components/motion/drag-to-confirm";

export function DragToConfirmPreview() {
  return (
    <div className="flex flex-col gap-4 p-6 w-full max-w-xs">
      <DragToConfirm label="Slide to confirm" confirmedLabel="Order confirmed!" />
      <DragToConfirm label="Slide to delete" confirmedLabel="Deleted" />
    </div>
  );
}
