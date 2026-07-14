import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  /** Optional avatar image. Falls back to initials when omitted. */
  avatarSrc?: string;
  /** Star rating out of 5. */
  rating?: number;
  className?: string;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/**
 * Plain testimonial card: quote, star rating, avatar and byline.
 * No motion — a static building block for marketing and social-proof sections.
 */
export function TestimonialCard({
  quote,
  name,
  role,
  avatarSrc,
  rating = 5,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border bg-card p-6",
        className,
      )}
    >
      {rating ? (
        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed 5-star row
              key={i}
              className="h-4 w-4"
              fill={i < rating ? "currentColor" : "none"}
              strokeWidth={i < rating ? 0 : 1.5}
            />
          ))}
        </div>
      ) : null}

      <p className="text-sm leading-relaxed text-foreground">“{quote}”</p>

      <div className="mt-auto flex items-center gap-3 pt-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          {avatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarSrc} alt={name} className="h-full w-full object-cover" />
          ) : (
            initials(name)
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-foreground">{name}</div>
          <div className="truncate text-xs text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
}
