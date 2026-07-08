"use client";

import { useState } from "react";
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
} from "@/components/motion/skeleton";
import { Button } from "@/components/motion/button";
import { Avatar } from "@/components/motion/avatar";

export function SkeletonPreview() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {/* Toggle loaded state */}
      <div className="flex items-center gap-3">
        <Button
          variant={loaded ? "outline" : "primary"}
          size="sm"
          onClick={() => setLoaded((v) => !v)}
        >
          {loaded ? "Show skeleton" : "Show content"}
        </Button>
      </div>

      {/* Card comparison */}
      {loaded ? (
        <div className="rounded-xl border border-border p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar fallback="Alex Kim" size="md" />
            <div>
              <p className="text-sm font-medium">Alex Kim</p>
              <p className="text-xs text-muted-foreground">Designer · San Francisco</p>
            </div>
          </div>
          <div className="h-32 rounded-lg bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">
            Image placeholder
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Passionate about motion design and building expressive UI components that feel alive.
          </p>
        </div>
      ) : (
        <SkeletonCard />
      )}

      {/* Primitive variants */}
      <div className="space-y-3">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">Primitives</span>
        <div className="flex items-center gap-3">
          <SkeletonAvatar size={40} />
          <SkeletonAvatar size={32} />
          <SkeletonAvatar size={24} />
        </div>
        <Skeleton height="1rem" className="w-3/4" />
        <Skeleton height="0.875rem" className="w-full" />
        <Skeleton height="0.875rem" className="w-1/2" />
        <Skeleton variant="text" lines={3} />
        <Skeleton height="6rem" className="w-full rounded-xl" />
      </div>

      {/* Table skeleton */}
      <div className="space-y-2">
        <span className="text-xs font-medium uppercase text-muted-foreground tracking-wide">Table</span>
        <SkeletonTable rows={4} cols={3} />
      </div>
    </div>
  );
}
