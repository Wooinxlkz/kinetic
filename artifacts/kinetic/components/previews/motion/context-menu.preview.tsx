"use client";

import { ContextMenu } from "@/components/motion/context-menu";

const ITEMS = [
  { id: "copy",      label: "Copy",       shortcut: "⌘C", kind: "item" as const },
  { id: "paste",     label: "Paste",      shortcut: "⌘V", kind: "item" as const },
  { id: "sep1",      kind: "separator" as const },
  { id: "rename",    label: "Rename",     kind: "item" as const },
  { id: "color",     label: "Colour",     kind: "item" as const,
    children: [
      { id: "red",    label: "Red",    kind: "item" as const },
      { id: "green",  label: "Green",  kind: "item" as const },
      { id: "blue",   label: "Blue",   kind: "item" as const },
    ],
  },
  { id: "sep2",      kind: "separator" as const },
  { id: "delete",    label: "Delete",     kind: "item" as const, variant: "danger" as const },
];

export function ContextMenuPreview() {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center gap-4 p-8">
      <p className="text-sm text-muted-foreground">Right-click anywhere in the box below</p>
      <ContextMenu items={ITEMS}>
        <div className="flex h-44 w-72 select-none items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
          Right-click here
        </div>
      </ContextMenu>
    </div>
  );
}
