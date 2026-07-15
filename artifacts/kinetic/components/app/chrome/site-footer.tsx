import Link from "next/link";
import { GithubIcon } from "@/components/app/icons";
import { registry } from "@/lib/registry";

// The catalog keeps growing — the footer shows only the newest few per column.
const FOOTER_LIMIT = 8;

const allMotion = registry.find((c) => c.slug === "motion")?.components ?? [];
const allBlocks = registry.find((c) => c.slug === "blocks")?.components ?? [];
const motionComponents = allMotion.slice(-FOOTER_LIMIT).reverse();
const blockComponents = allBlocks.slice(-FOOTER_LIMIT).reverse();

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 pt-14 pb-6">
      <div className="mx-auto max-w-7xl">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-pixel text-lg font-medium text-foreground">Kinetic UI</p>
            <p className="mt-2 max-w-[260px] text-sm leading-6 text-muted-foreground">
              82+ animated components and patterns for React & Next.js — buttons, modals, tables,
              icons, and full blocks, built on Framer Motion and Tailwind. Copy-paste, install via
              the shadcn registry, or theme it to match your product.
            </p>
            <p className="mt-5 text-xs text-muted-foreground">
              Created by{" "}
              <Link
                href="https://nulltrace--nqck540xvc.replit.app/"
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-foreground underline-offset-2 hover:underline"
              >
                Nulltrace
              </Link>
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://github.com/Wooinxlkz"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://x.com/syncinitstation"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X social"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com/ka._.r1m/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </Link>
              <Link
                href="https://discord.gg/bcPYdt9K"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Discord"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.419 0 1.333-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.419 0 1.333-.946 2.419-2.157 2.419Z" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/ch-abdlkrim/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM3.559 20.452h3.554V9H3.559v11.452z" />
                </svg>
              </Link>
              <Link
                href="mailto:karimsc01t@gmail.com"
                aria-label="Email"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                  <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Components */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Components
            </p>
            <ul className="space-y-2.5">
              {motionComponents.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/components/motion/${c.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/components/motion"
                  className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                >
                  View all ({allMotion.length})
                </Link>
              </li>
            </ul>
          </div>

          {/* Blocks (labeled "Patterns" in the UI) */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Patterns
            </p>
            <ul className="space-y-2.5">
              {blockComponents.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/components/blocks/${c.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/components/blocks"
                  className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                >
                  View all ({allBlocks.length})
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Links
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
                >
                  Kinetic UI
                </Link>
              </li>
              <li>
                <Link
                  href="/components/motion"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Browse all
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/icons"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Icons
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsors"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/discover"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">© 2026 Kinetic UI — Nulltrace Team.</p>
        </div>
      </div>
    </footer>
  );
}
