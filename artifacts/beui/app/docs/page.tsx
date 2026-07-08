import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Palette,
  Package,
  Zap,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Guides and references for Kinetic UI: installation, motion patterns, theme setup, and AI agent integration.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Docs · Kinetic UI",
    description:
      "Guides and references for Kinetic UI: installation, motion patterns, theme setup, and AI agent integration.",
    url: "/docs",
    type: "website",
    siteName: "Kinetic UI",
    images: ["/api/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Docs · Kinetic UI",
    images: ["/api/og"],
  },
};

const QUICK_START = [
  {
    href: "/docs/installation",
    icon: Package,
    label: "Installation",
    desc: "Add Kinetic UI components to any Next.js or Vite project in under two minutes.",
  },
  {
    href: "/docs/theme",
    icon: Palette,
    label: "Theme Setup",
    desc: "Wire up shadcn semantic tokens or paste the Kinetic UI theme CSS once.",
  },
  {
    href: "/docs/motion-patterns",
    icon: BookOpen,
    label: "Motion Patterns",
    desc: "Easing curves, springs, and timing tokens used across every component.",
  },
  {
    href: "/docs/ai-agents",
    icon: Bot,
    label: "AI Agents",
    desc: "MCP server, JSON registry, raw source endpoints — for coding agents.",
  },
];

const FEATURES = [
  "Copy-paste or install via shadcn registry",
  "Self-contained — no global providers needed",
  "Works with React 18 + Next.js App Router",
  "Tailwind CSS v4 with semantic color tokens",
  "Motion powered by Framer Motion v11",
  "Full TypeScript source, no compiled output",
];

export default function DocsIndexPage() {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Documentation
      </p>
      <h1 className="font-pixel mt-2 text-4xl uppercase tracking-tight text-foreground">
        Docs
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Everything you need to install, theme, and integrate Kinetic UI
        components into your project — from first install to AI-agent tooling.
      </p>

      {/* What you get */}
      <div className="mt-10 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm font-semibold text-foreground mb-4">
          What's included
        </p>
        <ul className="grid grid-cols-1 gap-y-2.5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick start callout */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <Zap className="h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          New here?{" "}
          <Link
            href="/docs/installation"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Start with the installation guide →
          </Link>
        </p>
      </div>

      {/* Section cards */}
      <p className="mt-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        All sections
      </p>
      <div className="mt-3 flex flex-col gap-3">
        {QUICK_START.map(({ href, icon: Icon, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20 hover:bg-card/80"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
