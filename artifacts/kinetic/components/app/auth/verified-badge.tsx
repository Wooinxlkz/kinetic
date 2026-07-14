import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/** Small inline badge shown next to a name for the hidden dev account. */
export function VerifiedBadge({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <BadgeCheck
      aria-label="Verified developer account"
      className={cn("shrink-0 fill-accent text-background", className)}
      style={{ width: size, height: size }}
    />
  );
}
