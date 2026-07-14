import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CodeBlock } from "@/components/app/docs/code-block";

export const metadata: Metadata = {
  title: "Registry API",
  description:
    "HTTP endpoints for the Kinetic UI component registry — JSON catalogue, per-component detail, shadcn format, and raw source.",
  alternates: { canonical: "/docs/ai-agents/registry" },
  openGraph: {
    title: "Registry API · Kinetic UI",
    description: "HTTP endpoints for the Kinetic UI component registry.",
    url: "/docs/ai-agents/registry",
    type: "article",
    siteName: "Kinetic UI",
    images: ["/api/og"],
  },
};

const INDEX_RESPONSE = `// GET /r
[
  {
    "slug":        "tilt-card",
    "name":        "Tilt Card",
    "category":    "motion",
    "description": "Smooth 3-axis perspective tilt that tracks the cursor.",
    "page_url":    "https://kinetic.dev/components/motion/tilt-card",
    "detail_url":  "https://kinetic.dev/r/tilt-card",
    "raw_url":     "https://kinetic.dev/r/tilt-card/raw"
  },
  // … one entry per component
]`;

const DETAIL_RESPONSE = `// GET /r/tilt-card
{
  "slug":         "tilt-card",
  "name":         "Tilt Card",
  "category":     "motion",
  "description":  "Smooth 3-axis perspective tilt that tracks the cursor.",
  "page_url":     "https://kinetic.dev/components/motion/tilt-card",
  "detail_url":   "https://kinetic.dev/r/tilt-card",
  "raw_url":      "https://kinetic.dev/r/tilt-card/raw",
  "dependencies": ["motion", "lucide-react"],
  "internal":     ["@/lib/utils"],
  "files": [
    {
      "path":    "components/motion/tilt-card.tsx",
      "type":    "component",
      "content": "/* full TypeScript source */"
    },
    {
      "path":    "lib/utils.ts",
      "type":    "util",
      "content": "/* full source */"
    }
  ]
}`;

const SHADCN_RESPONSE = `// GET /r/tilt-card.json  (shadcn registry format)
{
  "name":    "tilt-card",
  "type":    "registry:component",
  "files": [
    {
      "path":    "registry/tilt-card.tsx",
      "type":    "registry:component",
      "content": "/* source using shadcn semantic color classes */"
    }
  ],
  "dependencies":         ["motion", "lucide-react"],
  "devDependencies":      [],
  "registryDependencies": ["utils"]
}`;

const RAW_RESPONSE = `// GET /r/tilt-card/raw
// Returns: text/plain — the raw .tsx source, ready to drop in

"use client";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
// …full component source`;

const REGISTRY_CATALOG = `// GET /registry.json  (shadcn directory catalog)
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "@kineticui",
  "homepage": "https://kinetic.dev",
  "items": [
    {
      "name":  "tilt-card",
      "type":  "registry:component",
      "title": "Tilt Card",
      "description": "Smooth 3-axis perspective tilt that tracks the cursor.",
      "files": [{ "path": "registry/tilt-card.tsx", "type": "registry:component" }],
      "dependencies": ["motion", "lucide-react"]
    }
    // … all components
  ]
}`;

const FETCH_EXAMPLE = `const BASE = "https://kinetic.dev";

// 1. List all components
const index = await fetch(\`\${BASE}/r\`).then((r) => r.json());

// 2. Fetch a specific component (full files + deps)
const entry = await fetch(\`\${BASE}/r/tilt-card\`).then((r) => r.json());

// 3. Write files into the user's project
for (const file of entry.files) {
  if (file.type === "component" || file.type === "util") {
    await fs.writeFile(\`src/\${file.path}\`, file.content);
  }
}

// 4. Install external npm packages
await exec(\`pnpm add \${entry.dependencies.join(" ")}\`);`;

type Endpoint = {
  method: string;
  path: string;
  desc: string;
  link?: string;
};

const ENDPOINTS: Endpoint[] = [
  { method: "GET", path: "/r",              desc: "Registry index — array of all components (slug, name, category, URLs). No files or source.", link: "/r" },
  { method: "GET", path: "/r/{slug}",       desc: "Component detail — full entry including source files, deps, and internal utilities." },
  { method: "GET", path: "/r/{slug}.json",  desc: "shadcn registry format — installable via npx shadcn@latest add." },
  { method: "GET", path: "/r/{slug}/raw",   desc: "Raw .tsx source — plain text, ready to paste or write directly." },
  { method: "GET", path: "/registry.json",  desc: "Full shadcn directory catalog — lists every component with metadata.", link: "/registry.json" },
  { method: "GET", path: "/llms.txt",       desc: "llmstxt.org format — markdown index for LLM context windows.", link: "/llms.txt" },
];

export default function RegistryPage() {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        AI Agents · Reference
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        Registry API
      </h1>
      <p className="mt-3 text-muted-foreground">
        All endpoints are static JSON served from{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs text-foreground">
          kinetic.dev
        </code>
        . No auth, no rate limits, fully CDN-cached. Designed to be consumed
        directly by agents and build tools.
      </p>

      <h2 id="endpoint-index" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Endpoint index
      </h2>
      <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {ENDPOINTS.map((e) => (
          <li key={e.path} className="flex items-start justify-between gap-4 p-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded border border-border bg-card px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-muted-foreground">
                  {e.method}
                </span>
                <code className="rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-xs text-foreground">
                  {e.path}
                </code>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{e.desc}</p>
            </div>
            {e.link && (
              <Link
                href={e.link}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Open
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            )}
          </li>
        ))}
      </ul>

      <h2 id="registry-index" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        GET /r — Registry index
      </h2>
      <p className="mt-2 text-muted-foreground">
        Returns a lightweight catalogue of every component. Use this to build a
        search index or let an agent pick a slug before fetching full details.
      </p>
      <div className="mt-4">
        <CodeBlock code={INDEX_RESPONSE} lang="json" filename="GET /r" />
      </div>

      <h2 id="component-detail" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        GET /r/{"{slug}"} — Component detail
      </h2>
      <p className="mt-2 text-muted-foreground">
        Full entry for one component. The{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">files</code>{" "}
        array contains complete source — agents write these directly without any
        secondary fetches. Internal utilities are bundled as{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">type: util</code>.
      </p>
      <div className="mt-4">
        <CodeBlock code={DETAIL_RESPONSE} lang="json" filename="GET /r/tilt-card" />
      </div>

      <h2 id="shadcn-format" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        GET /r/{"{slug}"}.json — shadcn format
      </h2>
      <p className="mt-2 text-muted-foreground">
        The same component in the shadcn registry wire format. Use this URL with{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">npx shadcn@latest add</code>{" "}
        to install via the official CLI. Components use shadcn semantic color
        tokens, not Kinetic-specific variables.
      </p>
      <div className="mt-4">
        <CodeBlock code={SHADCN_RESPONSE} lang="json" filename="GET /r/tilt-card.json" />
      </div>

      <h2 id="raw-source" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        GET /r/{"{slug}"}/raw — Raw source
      </h2>
      <p className="mt-2 text-muted-foreground">
        Plain{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">text/plain</code>{" "}
        .tsx source. Useful when an agent wants to read the full implementation
        before deciding whether to use it, without the overhead of parsing JSON.
      </p>
      <div className="mt-4">
        <CodeBlock code={RAW_RESPONSE} lang="ts" filename="GET /r/tilt-card/raw" />
      </div>

      <h2 id="shadcn-catalog" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        GET /registry.json — shadcn catalog
      </h2>
      <p className="mt-2 text-muted-foreground">
        The complete shadcn directory-compatible catalog. Registered under the{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">@kineticui</code>{" "}
        namespace, so you can install any component with{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">@kineticui/slug</code>{" "}
        without providing the full URL.
      </p>
      <div className="mt-4">
        <CodeBlock code={REGISTRY_CATALOG} lang="json" filename="GET /registry.json" />
      </div>

      <h2 id="fetch-example" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Fetch example
      </h2>
      <p className="mt-2 text-muted-foreground">
        A complete agent workflow using fetch directly — no MCP required. Works
        in any JavaScript runtime.
      </p>
      <div className="mt-4">
        <CodeBlock code={FETCH_EXAMPLE} lang="ts" filename="agent.ts" />
      </div>
    </div>
  );
}
