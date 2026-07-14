"use client";

import { PageNav } from "@/components/motion/page-nav";

const ITEMS = [
  { id: "installation", label: "Installation", depth: 1 as const },
  { id: "usage", label: "Usage", depth: 1 as const },
  { id: "props", label: "Props", depth: 2 as const },
  { id: "examples", label: "Examples", depth: 1 as const },
  { id: "basic", label: "Basic", depth: 2 as const },
  { id: "controlled", label: "Controlled", depth: 2 as const },
  { id: "custom-render", label: "Custom render", depth: 2 as const },
  { id: "accessibility", label: "Accessibility", depth: 1 as const },
];

export function PageNavPreview() {
  return (
    <div className="flex w-full items-start justify-center gap-12 px-8 py-8">
      {/* Simulated page content */}
      <div className="flex max-w-xs flex-col gap-4 text-sm text-muted-foreground">
        {[
          "Installation",
          "Usage",
          "Examples",
          "Accessibility",
        ].map((heading) => (
          <div key={heading}>
            <h3
              id={heading.toLowerCase()}
              className="mb-1 font-semibold text-foreground"
            >
              {heading}
            </h3>
            <div className="flex flex-col gap-1">
              <div className="h-2 w-full rounded-full bg-muted-foreground/10" />
              <div className="h-2 w-5/6 rounded-full bg-muted-foreground/10" />
              <div className="h-2 w-4/5 rounded-full bg-muted-foreground/10" />
            </div>
          </div>
        ))}
      </div>

      {/* PageNav */}
      <div className="w-44 shrink-0">
        <PageNav items={ITEMS} />
      </div>
    </div>
  );
}
