"use client";

import { useState } from "react";
import { AlertBanner } from "@/components/static/alert-banner";

export function AlertBannerPreview() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = (id: string) => !dismissed.includes(id);
  const dismiss = (id: string) => setDismissed((d) => [...d, id]);

  return (
    <div className="flex flex-col gap-3 p-6 w-full max-w-md">
      {visible("info") && (
        <AlertBanner variant="info" title="Update available" onDismiss={() => dismiss("info")}>
          A new version is ready. Refresh to apply.
        </AlertBanner>
      )}
      {visible("success") && (
        <AlertBanner variant="success" title="Saved!" onDismiss={() => dismiss("success")}>
          Your profile has been updated.
        </AlertBanner>
      )}
      {visible("warning") && (
        <AlertBanner variant="warning" onDismiss={() => dismiss("warning")}>
          Your trial expires in 3 days.
        </AlertBanner>
      )}
      {visible("error") && (
        <AlertBanner variant="error" title="Error" onDismiss={() => dismiss("error")}>
          Failed to connect. Please try again.
        </AlertBanner>
      )}
    </div>
  );
}
