"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { AlertCircle, ArrowUp, Minus } from "lucide-react";

type Priority = "high" | "medium" | "low";
type ColumnId = "todo" | "inprogress" | "done";

interface Card {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  priority: Priority;
}

interface Column {
  id: ColumnId;
  label: string;
  cards: Card[];
}

const TAG_COLORS: Record<string, string> = {
  "Design": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  "Frontend": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Backend": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "DevOps": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "Research": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

const INITIAL_COLUMNS: Column[] = [
  {
    id: "todo",
    label: "To Do",
    cards: [
      { id: "c1", title: "Design new onboarding flow", tag: "Design", tagColor: TAG_COLORS["Design"], priority: "high" },
      { id: "c2", title: "Audit accessibility across all pages", tag: "Frontend", tagColor: TAG_COLORS["Frontend"], priority: "medium" },
      { id: "c3", title: "Set up CI/CD pipeline", tag: "DevOps", tagColor: TAG_COLORS["DevOps"], priority: "low" },
    ],
  },
  {
    id: "inprogress",
    label: "In Progress",
    cards: [
      { id: "c4", title: "Implement drag-and-drop kanban", tag: "Frontend", tagColor: TAG_COLORS["Frontend"], priority: "high" },
      { id: "c5", title: "Migrate to Postgres 16", tag: "Backend", tagColor: TAG_COLORS["Backend"], priority: "medium" },
    ],
  },
  {
    id: "done",
    label: "Done",
    cards: [
      { id: "c6", title: "User research interviews", tag: "Research", tagColor: TAG_COLORS["Research"], priority: "low" },
      { id: "c7", title: "Responsive layout fixes", tag: "Frontend", tagColor: TAG_COLORS["Frontend"], priority: "medium" },
    ],
  },
];

function PriorityIcon({ priority }: { priority: Priority }) {
  if (priority === "high")
    return <AlertCircle className="size-3.5 text-rose-500 shrink-0" />;
  if (priority === "medium")
    return <ArrowUp className="size-3.5 text-amber-500 shrink-0" />;
  return <Minus className="size-3.5 text-muted-foreground shrink-0" />;
}

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const columnRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const findCard = useCallback(
    (id: string): { colIndex: number; cardIndex: number; card: Card } | null => {
      for (let ci = 0; ci < columns.length; ci++) {
        const cardIndex = columns[ci].cards.findIndex((c) => c.id === id);
        if (cardIndex !== -1)
          return { colIndex: ci, cardIndex, card: columns[ci].cards[cardIndex] };
      }
      return null;
    },
    [columns],
  );

  const handleDragEnd = useCallback(
    (cardId: string, event: PointerEvent | MouseEvent | TouchEvent) => {
      setDraggingId(null);
      const found = findCard(cardId);
      if (!found) return;

      let clientX: number;
      let clientY: number;
      if ("changedTouches" in event && event.changedTouches.length > 0) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
      } else {
        clientX = (event as MouseEvent).clientX;
        clientY = (event as MouseEvent).clientY;
      }

      let targetColIndex: number | null = null;
      for (let ci = 0; ci < columns.length; ci++) {
        const el = columnRefs.current[columns[ci].id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          targetColIndex = ci;
          break;
        }
      }

      if (targetColIndex === null || targetColIndex === found.colIndex) return;

      setColumns((prev) => {
        const next = prev.map((col) => ({ ...col, cards: [...col.cards] }));
        const [removed] = next[found.colIndex].cards.splice(found.cardIndex, 1);
        next[targetColIndex!].cards.push(removed);
        return next;
      });
    },
    [columns, findCard],
  );

  return (
    <div className="flex gap-4 w-full overflow-x-auto pb-2">
      {columns.map((col) => (
        <div
          key={col.id}
          ref={(el) => { columnRefs.current[col.id] = el; }}
          className="flex flex-col gap-3 min-w-[240px] w-[240px] shrink-0"
        >
          {/* Column header */}
          <div className="flex items-center gap-2 px-1">
            <span className="text-sm font-semibold text-foreground">{col.label}</span>
            <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
              {col.cards.length}
            </span>
          </div>

          {/* Drop zone */}
          <div className="flex flex-col gap-2 min-h-[120px] rounded-xl bg-muted/50 p-2">
            <AnimatePresence initial={false}>
              {col.cards.map((card) => (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  layout
                  drag
                  dragMomentum={false}
                  dragElastic={0.12}
                  onDragStart={() => setDraggingId(card.id)}
                  onDragEnd={(_e, info) => {
                    // Use the point from info to find column
                    const syntheticEvent = {
                      clientX: info.point.x,
                      clientY: info.point.y,
                    } as MouseEvent;
                    handleDragEnd(card.id, syntheticEvent);
                  }}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{
                    opacity: 1,
                    scale: draggingId === card.id ? 1.04 : 1,
                    zIndex: draggingId === card.id ? 50 : 1,
                    boxShadow:
                      draggingId === card.id
                        ? "0 16px 40px rgba(0,0,0,0.18)"
                        : "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={SPRING_LAYOUT}
                  whileHover={{ scale: draggingId === card.id ? 1.04 : 1.01 }}
                  className={cn(
                    "rounded-lg border border-border bg-card p-3 cursor-grab select-none",
                    draggingId === card.id && "cursor-grabbing",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {card.title}
                    </p>
                    <PriorityIcon priority={card.priority} />
                  </div>
                  <div className="mt-2">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", card.tagColor)}>
                      {card.tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {col.cards.length === 0 && (
              <div className="flex flex-1 items-center justify-center py-6">
                <p className="text-xs text-muted-foreground">Drop cards here</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
