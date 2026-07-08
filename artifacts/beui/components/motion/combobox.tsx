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
  type ReactNode,
} from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  dropdownWidth?: string;
}

// ─── Variants ────────────────────────────────────────────────────────────────

const DROPDOWN_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.97, y: -6, filter: "blur(6px)" },
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

// ─── Component ───────────────────────────────────────────────────────────────

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results found.",
  className,
  disabled,
  dropdownWidth = "w-full",
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const reduce = useReducedMotion();
  const triggerId = useId();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = query.trim()
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          o.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  // Reset active index when filtered list changes
  useEffect(() => { setActiveIndex(-1); }, [query]);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    setQuery("");
    setActiveIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [disabled]);

  const handleSelect = useCallback(
    (opt: ComboboxOption) => {
      if (opt.disabled) return;
      onValueChange?.(opt.value);
      setOpen(false);
      setQuery("");
    },
    [onValueChange],
  );

  const handleClear = useCallback(() => {
    onValueChange?.("");
  }, [onValueChange]);

  // Close on outside click / Esc
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

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          handleOpen();
        }
        return;
      }
      const enabledFiltered = filtered.filter((o) => !o.disabled);
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => {
          const next = i < enabledFiltered.length - 1 ? i + 1 : 0;
          scrollOptionIntoView(listRef.current, next);
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => {
          const next = i > 0 ? i - 1 : enabledFiltered.length - 1;
          scrollOptionIntoView(listRef.current, next);
          return next;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && enabledFiltered[activeIndex]) {
          handleSelect(enabledFiltered[activeIndex]);
        }
      } else if (e.key === "Tab") {
        setOpen(false);
      }
    },
    [open, filtered, activeIndex, handleOpen, handleSelect],
  );

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger — outer div avoids nested interactive element constraint */}
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-owns={listId}
        id={triggerId}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-xl border border-input bg-background px-3 py-2.5 text-sm shadow-sm transition-colors",
          !disabled && "cursor-pointer hover:bg-accent/40",
          disabled && "cursor-not-allowed opacity-50",
        )}
        onClick={!open ? handleOpen : undefined}
        onKeyDown={handleKeyDown}
        // Make focusable for keyboard users when closed
        tabIndex={open ? -1 : 0}
      >
        {selected?.icon && (
          <span className="h-4 w-4 flex-shrink-0 text-muted-foreground">{selected.icon}</span>
        )}
        <span className={cn("flex-1 truncate text-left select-none", !selected && "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </span>
        {selected && !disabled && (
          <button
            type="button"
            aria-label="Clear selection"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
            className="flex-shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
            className={cn(
              "absolute top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-border bg-popover shadow-xl shadow-black/10",
              dropdownWidth,
            )}
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
                role="searchbox"
                aria-label="Search options"
                aria-autocomplete="list"
                aria-controls={listId}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
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

            {/* Options */}
            <div
              ref={listRef}
              role="listbox"
              aria-label="Options"
              className="max-h-64 overflow-y-auto p-1"
            >
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>
              ) : (
                filtered.map((opt, i) => {
                  const isSelected = opt.value === value;
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled}
                      data-option-index={i}
                      onClick={() => !opt.disabled && handleSelect(opt)}
                      className={cn(
                        "flex cursor-default select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        isSelected && "bg-accent/50",
                        isActive && "bg-accent text-accent-foreground",
                        opt.disabled && "cursor-not-allowed opacity-40",
                      )}
                    >
                      <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
                        {isSelected && <Check className="h-4 w-4" />}
                      </span>
                      {opt.icon && (
                        <span className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true">
                          {opt.icon}
                        </span>
                      )}
                      <span className="flex-1 min-w-0">
                        <span className="block truncate font-medium">{opt.label}</span>
                        {opt.description && (
                          <span className="block truncate text-xs text-muted-foreground">
                            {opt.description}
                          </span>
                        )}
                      </span>
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollOptionIntoView(list: HTMLElement | null, index: number) {
  if (!list) return;
  const item = list.querySelector<HTMLElement>(`[data-option-index="${index}"]`);
  item?.scrollIntoView({ block: "nearest" });
}
