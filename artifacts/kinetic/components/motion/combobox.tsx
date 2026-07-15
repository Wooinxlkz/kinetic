"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface ComboboxItem {
  value: string;
  label: string;
}

export interface ComboboxProps {
  items: ComboboxItem[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const DROPDOWN_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.97, y: -6, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...SPRING_PANEL,
      opacity: { duration: 0.14, ease: EASE_OUT },
      filter: { duration: 0.18, ease: EASE_OUT },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -4,
    filter: "blur(4px)",
    transition: { duration: 0.12, ease: EASE_OUT },
  },
};

const REDUCED_DROPDOWN: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
};

export function Combobox({
  items,
  value,
  onChange,
  placeholder = "Select…",
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const reduce = useReducedMotion();
  const listId = useId();
  const highlightId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = items.find((o) => o.value === value);

  const filtered = query.trim()
    ? items.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const handleSelect = useCallback(
    (item: ComboboxItem) => {
      onChange?.(item.value);
      setOpen(false);
      setQuery("");
    },
    [onChange],
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          handleOpen();
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => {
          const next = i < filtered.length - 1 ? i + 1 : 0;
          scrollIntoView(listRef.current, next);
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => {
          const next = i > 0 ? i - 1 : filtered.length - 1;
          scrollIntoView(listRef.current, next);
          return next;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) {
          handleSelect(filtered[activeIndex]);
        }
      } else if (e.key === "Tab") {
        setOpen(false);
      }
    },
    [open, filtered, activeIndex, handleOpen, handleSelect],
  );

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        tabIndex={open ? -1 : 0}
        className={cn(
          "flex w-full cursor-pointer items-center gap-1.5 rounded-xl border border-input bg-background px-3 py-2.5 text-sm shadow-sm transition-colors hover:bg-accent/40",
        )}
        onClick={!open ? handleOpen : undefined}
        onKeyDown={handleKeyDown}
      >
        <span className={cn("flex-1 truncate text-left select-none", !selected && "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </span>
        {selected && (
          <button
            type="button"
            aria-label="Clear selection"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onChange?.(""); }}
            className="flex-shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="flex-shrink-0 text-muted-foreground"
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={listId}
            className="absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-xl shadow-black/10"
            variants={reduce ? REDUCED_DROPDOWN : DROPDOWN_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Search */}
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Options list */}
            <div
              ref={listRef}
              role="listbox"
              className="relative max-h-64 overflow-y-auto p-1"
            >
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">No results found.</p>
              ) : (
                filtered.map((item, i) => {
                  const isSelected = item.value === value;
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={item.value}
                      role="option"
                      aria-selected={isSelected}
                      data-option-index={i}
                      onClick={() => handleSelect(item)}
                      className="relative"
                    >
                      {/* Animated highlight indicator */}
                      {isActive && (
                        <motion.div
                          layoutId={highlightId}
                          className="absolute inset-0 rounded-lg bg-accent"
                          transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.6 }}
                        />
                      )}
                      <div
                        className={cn(
                          "relative flex cursor-default select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                          !isActive && "hover:bg-accent/60",
                          isSelected && !isActive && "bg-accent/40",
                        )}
                      >
                        <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
                          {isSelected && <Check className="h-4 w-4" />}
                        </span>
                        <span className="flex-1 truncate font-medium">{item.label}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function scrollIntoView(list: HTMLElement | null, index: number) {
  if (!list) return;
  const item = list.querySelector<HTMLElement>(`[data-option-index="${index}"]`);
  item?.scrollIntoView({ block: "nearest" });
}
