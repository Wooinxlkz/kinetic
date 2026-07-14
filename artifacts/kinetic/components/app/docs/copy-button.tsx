"use client";

import { Check, Copy, Lock } from "lucide-react";
import { useState } from "react";
import { ActionSwapCascadeIcon } from "@/components/motion/action-swap-cascade";
import { Button } from "@/components/motion/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useUsageQuota } from "@/components/app/membership/usage-quota-provider";

export function CopyButton({
  text,
  className,
  eventName = "copy_code",
  eventLabel,
  slug,
}: {
  text: string;
  className?: string;
  /** GA4 event name. Defaults to "copy_code". */
  eventName?: string;
  /** What was copied (component slug, filename, install command). */
  eventLabel?: string;
  /** Component slug for daily quota tracking. Falls back to eventLabel. */
  slug?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { isAtLimit, trackUsage } = useUsageQuota();

  const trackSlug = slug ?? eventLabel ?? "misc";

  if (isAtLimit) {
    return (
      <Button
        variant="secondary"
        size="icon"
        pressScale={0.85}
        aria-label="Daily limit reached — upgrade to copy"
        title="Daily limit reached — upgrade your plan"
        onClick={() => { window.location.href = "/sponsors"; }}
        className={cn("text-muted-foreground hover:text-foreground", className)}
      >
        <Lock className="h-3.5 w-3.5" />
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      pressScale={0.85}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        trackEvent(eventName, { label: eventLabel, chars: text.length });
        trackUsage(trackSlug);
      }}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <ActionSwapCascadeIcon value={copied ? "check" : "copy"} className="h-3.5 w-3.5">
        {copied
          ? <Check className="h-3.5 w-3.5 text-(--color-success)" />
          : <Copy className="h-3.5 w-3.5" />
        }
      </ActionSwapCascadeIcon>
    </Button>
  );
}
