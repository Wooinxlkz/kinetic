"use client";

import { motion } from "motion/react";
import { MapPin, LinkIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface UserProfileCardProps {
  name: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  stats?: { label: string; value: string | number }[];
  className?: string;
}

/**
 * Rich profile card with avatar, bio, meta links, and animated stat counters.
 */
export function UserProfileCard({
  name,
  username,
  bio,
  avatarUrl,
  location,
  website,
  stats,
  className,
}: UserProfileCardProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      {/* Banner */}
      <div className="h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />

      {/* Avatar + info */}
      <div className="-mt-10 px-5 pb-5">
        <div className="mb-3 flex items-end justify-between">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-card bg-muted">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-muted-foreground">
                {initials}
              </div>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            Follow
          </motion.button>
        </div>

        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">@{username}</p>

        {bio && <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{bio}</p>}

        {(location || website) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {location && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {location}
              </span>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <LinkIcon className="h-3 w-3" />
                {website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        )}

        {stats && stats.length > 0 && (
          <div className="mt-4 flex gap-5 border-t border-border pt-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-sm font-bold tabular-nums text-foreground">{s.value}</span>
                <span className="text-[11px] text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
