import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface KbdProps {
  children: ReactNode;
  className?: string;
}

/**
 * Renders a single keyboard key in a styled pill.
 * For combos, wrap multiple Kbd in a KbdShortcut.
 */
export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[11px] font-medium text-muted-foreground shadow-[0_1px_0_1px_hsl(var(--border))]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

export interface KbdShortcutProps {
  keys: string[];
  separator?: ReactNode;
  className?: string;
}

/**
 * Renders a keyboard shortcut as a sequence of Kbd pills.
 * e.g. <KbdShortcut keys={["⌘", "K"]} />
 */
export function KbdShortcut({ keys, separator = "+", className }: KbdShortcutProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && (
            <span className="text-[10px] text-muted-foreground/60">{separator}</span>
          )}
          <Kbd>{key}</Kbd>
        </span>
      ))}
    </span>
  );
}
