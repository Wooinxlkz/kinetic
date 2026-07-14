"use client";

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { AvatarCircle } from "@/components/app/auth/avatar-circle";
import { VerifiedBadge } from "@/components/app/auth/verified-badge";
import { COMMUNITY_CATEGORY_LABELS, type CommunityComponentDTO } from "@/lib/community/types";
import { CommunityPreviewFrame } from "./community-preview-frame";
import { cn } from "@/lib/utils";

export function CommunityCard({
  item,
  className,
  onDelete,
}: {
  item: CommunityComponentDTO;
  className?: string;
  onDelete?: () => void;
}) {
  return (
    <Link
      href={`/discover/@${item.author.username}/${item.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/20 transition-colors hover:border-(--color-border-strong)",
        className,
      )}
    >
      <div className="relative h-44 border-b border-border bg-background/40">
        {/* pointer-events-none: the card itself is the click target, not the sandboxed iframe */}
        <div className="pointer-events-none h-full w-full">
          <CommunityPreviewFrame code={item.code} demoCode={item.demoCode} title={item.name} />
        </div>
        <div className="absolute right-2 top-2 flex items-center gap-1">
          {onDelete && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
              aria-label="Delete"
              className="rounded-full bg-background/80 p-1 text-muted-foreground backdrop-blur transition-colors hover:text-red-400"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
          <span className="rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur">
            {COMMUNITY_CATEGORY_LABELS[item.category]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-medium text-foreground">{item.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
            <Eye className="h-3 w-3" />
            {item.views}
          </span>
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">{item.description}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5">
            <AvatarCircle user={item.author} size={18} />
            <span className="text-[11px] text-muted-foreground">{item.author.name}</span>
            {item.author.isDev && <VerifiedBadge size={12} />}
          </div>
          {item.tags.length > 0 && (
            <span className="rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[10px] text-muted-foreground">
              {item.tags[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
