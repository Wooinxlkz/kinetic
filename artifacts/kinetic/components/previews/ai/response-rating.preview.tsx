"use client";

import { ResponseRating } from "@/components/ai/response-rating";

export function ResponseRatingPreview() {
  return (
    <div className="flex min-h-[280px] flex-col justify-center gap-8 p-8">
      {/* Mock message */}
      <div className="max-w-sm rounded-2xl border border-border bg-card p-4">
        <p className="text-sm text-foreground leading-relaxed">
          React Server Components let you render UI on the server and optionally stream it to the client, reducing bundle size and improving Time to First Byte.
        </p>
      </div>
      <ResponseRating
        onRate={(v, reason) => console.log("Rated:", v, reason)}
      />
    </div>
  );
}
