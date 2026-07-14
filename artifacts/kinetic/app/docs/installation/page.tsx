import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/app/docs/code-block";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Add Kinetic UI components to any Next.js or Vite + React project using the shadcn registry or by copying source directly.",
  alternates: { canonical: "/docs/installation" },
  openGraph: {
    title: "Installation · Kinetic UI",
    description:
      "Add Kinetic UI components to any Next.js or Vite + React project in minutes.",
    url: "/docs/installation",
    type: "article",
    siteName: "Kinetic UI",
    images: ["/api/og"],
  },
};

const PREREQS = `# Node 18 or later
node -v   # → v18.x.x or higher

# A Next.js 14+ (App Router) or Vite 5+ project
# Tailwind CSS v4
# React 18+`;

const SHADCN_INIT = `npx shadcn@latest init`;

const ADD_COMPONENT = `# Add an individual component
npx shadcn@latest add https://kinetic.dev/r/tilt-card.json

# Or install from the @kineticui namespace (shadcn directory)
npx shadcn@latest add @kineticui/tilt-card`;

const MANUAL_DEPS = `pnpm add motion lucide-react`;

const USAGE_EXAMPLE = `// app/page.tsx
import { TiltCard } from "@/components/motion/tilt-card";

export default function Page() {
  return (
    <TiltCard>
      <p>Hover me</p>
    </TiltCard>
  );
}`;

const TAILWIND_CONFIG = `/* globals.css */
@import "tailwindcss";
@import "./theme.css"; /* Kinetic UI tokens — see Theme Setup */`;

export default function InstallationPage() {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Getting Started
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        Installation
      </h1>
      <p className="mt-3 text-muted-foreground">
        Kinetic UI components are distributed as source files — no npm package,
        no runtime dependency on this site. You own the code the moment it lands
        in your project.
      </p>

      <h2 id="prerequisites" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Prerequisites
      </h2>
      <p className="mt-2 text-muted-foreground">
        Components are tested against the following stack. Other setups may
        work, but these are the only ones we actively support.
      </p>
      <div className="mt-4">
        <CodeBlock code={PREREQS} lang="bash" filename="terminal" />
      </div>

      <h2 id="option-1-shadcn-registry" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Option 1 — shadcn registry (recommended)
      </h2>
      <p className="mt-2 text-muted-foreground">
        If your project doesn't already have shadcn wired up, run init first.
        It writes the CSS token layer and configures{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">components.json</code>.
      </p>
      <div className="mt-4">
        <CodeBlock code={SHADCN_INIT} lang="bash" filename="terminal" />
      </div>
      <p className="mt-4 text-muted-foreground">
        Then pull any component directly from the Kinetic UI registry. shadcn
        automatically writes source files, installs npm deps, and handles{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">@/lib/utils</code>{" "}
        and other shared utilities.
      </p>
      <div className="mt-4">
        <CodeBlock code={ADD_COMPONENT} lang="bash" filename="terminal" />
      </div>

      <h2 id="option-2-copy-paste" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Option 2 — copy-paste
      </h2>
      <p className="mt-2 text-muted-foreground">
        Every component page has a{" "}
        <span className="font-medium text-foreground">Copy</span> button that
        puts the full source on your clipboard. Paste it into your project, then
        install the handful of external deps it needs.
      </p>
      <div className="mt-4">
        <CodeBlock code={MANUAL_DEPS} lang="bash" filename="terminal" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Most components only need{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">motion</code>{" "}
        and{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">lucide-react</code>.
        Each component page lists its exact{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">dependencies</code>{" "}
        field.
      </p>

      <h2 id="configure-tailwind" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Configure Tailwind
      </h2>
      <p className="mt-2 text-muted-foreground">
        Components use Tailwind CSS v4 with shadcn semantic color tokens. Import
        the Kinetic UI theme CSS in your{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">globals.css</code>{" "}
        so the custom palette, motion utilities, and surface tokens are
        available. See{" "}
        <Link href="/docs/theme" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
          Theme Setup
        </Link>{" "}
        for the full theme file.
      </p>
      <div className="mt-4">
        <CodeBlock code={TAILWIND_CONFIG} lang="css" filename="app/globals.css" />
      </div>

      <h2 id="use-a-component" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Use a component
      </h2>
      <p className="mt-2 text-muted-foreground">
        Once the file is in your project, import it like any other React
        component. No global providers or wrappers needed.
      </p>
      <div className="mt-4">
        <CodeBlock code={USAGE_EXAMPLE} lang="tsx" filename="app/page.tsx" />
      </div>

      {/* Next step */}
      <div className="mt-10 flex items-center justify-between rounded-2xl border border-border bg-card p-5">
        <div>
          <p className="font-medium text-foreground">Next — Theme Setup</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Wire up the color and motion tokens components rely on.
          </p>
        </div>
        <Link
          href="/docs/theme"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/30"
        >
          Theme Setup
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
