"use client";

import { KanbanBoard } from "@/components/motion/kanban-board";

export function KanbanBoardPreview() {
  return (
    <div className="w-full max-w-4xl px-4 py-10">
      <KanbanBoard />
    </div>
  );
}
