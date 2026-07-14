import { cn } from "@/lib/utils";

export function MotionBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-foreground/[0.06] px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none text-foreground/70",
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-foreground/50" />
      Motion
    </span>
  );
}

/** Returns true when a registry file lives in the motion component folder. */
export function isMotionFile(file: string): boolean {
  return file.startsWith("components/motion/");
}
