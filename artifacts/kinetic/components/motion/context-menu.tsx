"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronRight } from "lucide-react";
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface ContextMenuItem {
  type?: "item" | "separator" | "label";
  label?: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  checked?: boolean;
  danger?: boolean;
  children?: ContextMenuItem[];
  onClick?: () => void;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: ReactNode;
  className?: string;
}

function MenuRow({ item, index, reduce }: {
  item: ContextMenuItem; index: number; reduce: boolean | null;
}) {
  const [subOpen, setSubOpen] = useState(false);
  const hasChildren = (item.children ?? []).length > 0;

  if (item.type === "separator") {
    return <div className="my-1 h-px bg-border" />;
  }
  if (item.type === "label") {
    return (
      <div className="px-2 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {item.label}
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setSubOpen(true)}
      onMouseLeave={() => setSubOpen(false)}
    >
      <motion.button
        type="button"
        disabled={item.disabled}
        onClick={() => { if (!item.disabled && !hasChildren) item.onClick?.(); }}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...SPRING_LAYOUT, delay: index * 0.025 }}
        whileHover={!item.disabled ? { backgroundColor: "rgba(128,128,128,0.08)" } : undefined}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm focus:outline-none",
          item.disabled && "cursor-not-allowed opacity-40",
          item.danger && "text-destructive",
          !item.disabled && !item.danger && "text-foreground",
        )}
      >
        {item.icon && (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
            {item.icon}
          </span>
        )}
        {item.checked !== undefined && (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
            <AnimatePresence>
              {item.checked && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={SPRING_LAYOUT}
                >
                  <Check className="h-3.5 w-3.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        )}
        <span className="flex-1 font-medium">{item.label}</span>
        {item.shortcut && (
          <span className="ml-4 text-[11px] text-muted-foreground">{item.shortcut}</span>
        )}
        {hasChildren && (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </motion.button>

      <AnimatePresence>
        {subOpen && hasChildren && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8, filter: "blur(4px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -8, filter: "blur(4px)" }}
            transition={reduce ? { duration: 0.1 } : { ...SPRING_PANEL, delay: 0.05 }}
            className="absolute left-full top-0 ml-1 min-w-40 rounded-xl border border-border bg-popover p-1 shadow-xl"
            style={{ zIndex: 1 }}
          >
            {item.children!.map((child, i) => (
              <MenuRow key={i} item={child} index={i} reduce={reduce} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const reduce = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setPos(null), []);

  useEffect(() => {
    if (!pos) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [pos, close]);

  return (
    <>
      <div
        className={cn("select-none", className)}
        onContextMenu={(e) => {
          e.preventDefault();
          setPos({ x: e.clientX, y: e.clientY });
        }}
      >
        {children}
      </div>

      <AnimatePresence>
        {pos && (
          <motion.div
            ref={menuRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.90, filter: "blur(8px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.90, filter: "blur(8px)" }}
            transition={reduce ? { duration: 0.12 } : SPRING_PANEL}
            style={{
              position: "fixed",
              left: pos.x,
              top: pos.y,
              zIndex: 9999,
              transformOrigin: "top left",
            }}
            className="min-w-44 rounded-xl border border-border bg-popover p-1 shadow-2xl"
          >
            {items.map((item, i) => (
              <MenuRow key={i} item={item} index={i} reduce={reduce} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
