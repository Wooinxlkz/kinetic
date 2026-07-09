"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/motion/dialog";
import { CopyButton } from "@/components/app/docs/copy-button";
import type { IconEntry } from "@/lib/icons-registry";

type SourceResponse = {
  code: string;
  componentName: string;
  importStatement: string;
  isAnimated: boolean;
  installCommand: string | null;
};

interface IconSourceDialogProps {
  entry: IconEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  IconComponent: React.ComponentType<{ size?: number; className?: string; isPlaying?: boolean; isOpen?: boolean }>;
}

function CodeChip({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/60 px-3 py-2 font-mono text-[12px] text-foreground">
      <code className="overflow-x-auto whitespace-pre">{text}</code>
      <CopyButton text={text} eventLabel={text} className="h-6 w-6 shrink-0" />
    </div>
  );
}

export function IconSourceDialog({ entry, open, onOpenChange, IconComponent }: IconSourceDialogProps) {
  const [data, setData] = useState<SourceResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setData(null);
    setError(false);
    // Note: this can't live under /api — the shared proxy routes all /api/*
    // paths on this domain to the separate api-server artifact, so a Next.js
    // route at /api/... here is unreachable from the browser (only reachable
    // when curling the Next dev port directly).
    fetch(`/icon-source?slug=${encodeURIComponent(entry.slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((json: SourceResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [open, entry.slug]);

  const usageExample = data?.isAnimated
    ? `<${data.componentName} isPlaying />`
    : `<${data?.componentName ?? entry.componentName} />`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-xl" speed="fast">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-foreground">
              <IconComponent size={22} />
            </div>
            <div>
              <DialogTitle>{entry.name}</DialogTitle>
              <DialogDescription className="mt-0">{entry.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {error && (
          <p className="text-sm text-muted-foreground">Couldn&apos;t load the source for this icon.</p>
        )}

        {!error && !data && (
          <p className="text-sm text-muted-foreground">Loading source…</p>
        )}

        {data && (
          <div className="max-h-[70vh] space-y-5 overflow-y-auto pr-1">
            <section>
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                How to use
              </h3>
              <ol className="space-y-3 text-sm text-foreground/90">
                {data.installCommand && (
                  <li>
                    <p className="mb-1.5">
                      1. Install{" "}
                      <a
                        href="https://motion.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        Framer Motion
                      </a>{" "}
                      — this icon animates with it.
                    </p>
                    <CodeChip text={data.installCommand} />
                  </li>
                )}
                <li>
                  <p className="mb-1.5">
                    {data.installCommand ? "2." : "1."} Copy the component below into your project (e.g.{" "}
                    <code className="rounded bg-foreground/[0.06] px-1 py-0.5 text-[11px]">
                      components/icons/{data.componentName}.tsx
                    </code>
                    ).
                  </p>
                </li>
                <li>
                  <p className="mb-1.5">{data.installCommand ? "3." : "2."} Import and render it:</p>
                  <div className="space-y-1.5">
                    <CodeChip text={data.importStatement} />
                    <CodeChip text={usageExample} />
                  </div>
                  {data.isAnimated && (
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Pass <code className="rounded bg-foreground/[0.06] px-1 py-0.5">isPlaying</code> (or{" "}
                      <code className="rounded bg-foreground/[0.06] px-1 py-0.5">isOpen</code> for toggle-style
                      icons) to control when it animates — e.g. tie it to hover or state in your own component.
                    </p>
                  )}
                </li>
              </ol>
            </section>

            <section>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Source code
                </h3>
                <CopyButton text={data.code} eventLabel={entry.slug} />
              </div>
              <pre className="overflow-x-auto rounded-xl border border-border bg-background/60 p-4 font-mono text-[12px] leading-relaxed text-foreground/90">
                <code>{data.code}</code>
              </pre>
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
