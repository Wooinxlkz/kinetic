import type { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in Kinetic UI — component additions, breaking changes, and release notes.",
  alternates: { canonical: "/docs/changelog" },
  openGraph: {
    title: "Changelog · Kinetic UI",
    description: "What's new in Kinetic UI — component additions, breaking changes, and release notes.",
    url: "/docs/changelog",
    type: "article",
    siteName: "Kinetic UI",
    images: ["/api/og"],
  },
};

type Change = {
  type: "new" | "fix" | "breaking" | "improved";
  text: string;
};

type Release = {
  version: string;
  date: string;
  summary: string;
  changes: Change[];
};

const RELEASES: Release[] = [
  {
    version: "0.2.0",
    date: "June 2025",
    summary: "Blocks category, improved registry, and the AI agents surface.",
    changes: [
      { type: "new",      text: "Blocks category — full-page hero, feature grid, pricing table, and CTA sections." },
      { type: "new",      text: "AI Agents docs — MCP server at mcp.beui.dev, llms.txt, JSON registry, and raw source endpoints." },
      { type: "new",      text: "shadcn directory namespace — install via @kineticui/* without specifying the full URL." },
      { type: "new",      text: "OG image API — dynamic per-page open graph images from /api/og." },
      { type: "improved", text: "Registry JSON now includes page_url, detail_url, and raw_url alongside each entry." },
      { type: "improved", text: "Theme CSS split into a separate /theme.css endpoint — linkable from anywhere." },
      { type: "fix",      text: "Tilt Card perspective origin was clamped; now correctly tracks the full card surface." },
      { type: "fix",      text: "Marquee speed was 2× too fast at certain viewport widths due to an incorrect animation-duration calculation." },
    ],
  },
  {
    version: "0.1.0",
    date: "March 2025",
    summary: "Initial public release with the Motion component category.",
    changes: [
      { type: "new", text: "Motion category — 42 animated components including Tilt Card, Marquee, Morphing Dialog, and Floating Dock." },
      { type: "new", text: "Playground — live prop editor for every component with real-time preview." },
      { type: "new", text: "shadcn registry — every component installable via npx shadcn@latest add." },
      { type: "new", text: "Copy-paste support — full TypeScript source with a single click on every component page." },
      { type: "new", text: "Motion Patterns docs — easing tokens, spring presets, and timing philosophy." },
      { type: "new", text: "Theme Setup docs — shadcn init path and full CSS paste option." },
      { type: "new", text: "Dark mode — system preference + manual toggle via the floating dock." },
    ],
  },
];

const TYPE_LABEL: Record<Change["type"], string> = {
  new:      "New",
  improved: "Improved",
  fix:      "Fix",
  breaking: "Breaking",
};

const TYPE_CLASS: Record<Change["type"], string> = {
  new:      "bg-green-500/10 text-green-500",
  improved: "bg-blue-500/10 text-blue-500",
  fix:      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  breaking: "bg-red-500/10 text-red-500",
};

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Getting Started
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        Changelog
      </h1>
      <p className="mt-3 text-muted-foreground">
        All notable changes — new components, improvements, fixes, and breaking
        changes.
      </p>

      <div className="mt-10 flex flex-col gap-12">
        {RELEASES.map((r) => (
          <section key={r.version}>
            <div className="flex items-baseline gap-3">
              <h2
                id={`v${r.version}`}
                className="text-xl font-semibold tracking-tight text-foreground"
              >
                v{r.version}
              </h2>
              <span className="text-sm text-muted-foreground">{r.date}</span>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{r.summary}</p>

            <ul className="mt-5 flex flex-col gap-2.5">
              {r.changes.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      TYPE_CLASS[c.type],
                    )}
                  >
                    {TYPE_LABEL[c.type]}
                  </span>
                  <span className="text-sm text-muted-foreground">{c.text}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
