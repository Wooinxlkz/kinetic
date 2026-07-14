"use client";

import { ArrowUpRight, Star, SwatchBook } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GithubIcon } from "@/components/app/icons";
import { SignInButton } from "@/components/app/auth/sign-in-button";
import { UserMenu } from "@/components/app/auth/user-menu";
import { useAuth } from "@/components/app/auth/auth-provider";
import { KineticMark } from "@/components/app/chrome/kinetic-mark";
import { MobileNav } from "@/components/app/chrome/mobile-nav";
import { usePreferences } from "@/components/app/preferences/preferences-provider";
import { PressLink } from "@/components/app/press-link";
import { SiteSearch } from "@/components/app/chrome/site-search";
import { Tooltip } from "@/components/motion/tooltip";
import { TextMorphCycle } from "@/components/motion/text-morph";
import { cn } from "@/lib/utils";

const MEMBERSHIP_LABEL_CYCLE = [
  { label: "Membership", duration: 30000 },
  { label: "Pro", duration: 10000 },
  { label: "Sponsor", duration: 10000 },
];

function formatStarCount(count: number) {
  if (count >= 1000) {
    const val = Math.round(count / 100) / 10;
    return `${val}k`;
  }
  return String(count);
}

export function SiteHeader({
  githubStarCount,
}: {
  githubStarCount: number | null;
}) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { setPanelOpen, logoColor, githubButtonVisibility } = usePreferences();
  const { user, status } = useAuth();
  const isPaidPlan =
    status === "authenticated" &&
    user != null &&
    (user.plan === "pro" || user.plan === "sponsor" || user.plan === "lifetime");
  const paidLabel = isPaidPlan
    ? user!.plan.charAt(0).toUpperCase() + user!.plan.slice(1)
    : null;
  const pathname = usePathname();
  const isComponents =
    pathname.startsWith("/components/motion") ||
    (pathname.startsWith("/components") &&
      !pathname.startsWith("/components/blocks"));
  const isBlocks = pathname.startsWith("/components/blocks");
  const isIcons = pathname.startsWith("/icons");
  const isPlayground = pathname.startsWith("/playground");
  const isDiscover = pathname.startsWith("/discover");
  const isSponsors = pathname.startsWith("/sponsors");
  const formattedStarCount =
    typeof githubStarCount === "number"
      ? formatStarCount(githubStarCount)
      : null;

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 8);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground"
          >
            <KineticMark color={logoColor} size={24} className="h-6 w-6 rounded-lg" />
            <span>Kinetic UI</span>
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex">
            <Link
              href="/components/motion"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                isComponents
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Components
            </Link>
            <Link
              href="/components/blocks"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                isBlocks
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Patterns
            </Link>
            <Link
              href="/icons/static"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                isIcons
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Icons
            </Link>
            <Link
              href="/playground"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                isPlayground
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Playground
            </Link>
            <Link
              href="/discover"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                isDiscover
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Community
            </Link>
            <Link
              href="/sponsors"
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isPaidPlan
                  ? "hover:opacity-90"
                  : isSponsors
                    ? "text-accent"
                    : "text-accent hover:text-accent/80",
              )}
            >
              {isPaidPlan ? (
                <span
                  className="bg-clip-text text-transparent font-semibold"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #a78bfa, #e879f9, #fb923c)",
                    backgroundSize: "200% 200%",
                    animation: "gradient-flow 6s ease-in-out infinite",
                    willChange: "background-position",
                  }}
                >
                  {paidLabel}
                </span>
              ) : (
                <TextMorphCycle
                  items={MEMBERSHIP_LABEL_CYCLE}
                  as="span"
                  className="inline-flex"
                />
              )}
              <ArrowUpRight className={cn("h-3.5 w-3.5", isPaidPlan ? "text-fuchsia-400" : "")} />
            </Link>
          </nav>
        </div>

        <nav className="flex items-center gap-2">
          <SiteSearch className="w-9 justify-center px-0 sm:w-44 sm:justify-start sm:px-3 lg:w-56" />
          <Tooltip content="Customize" side="bottom">
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              aria-label="Customize theme"
              className="hidden h-9 w-9 items-center justify-center rounded-2xl border border-border bg-card/20 text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <SwatchBook className="h-4 w-4" />
            </button>
          </Tooltip>
          {status === "loading" ? (
            <div
              aria-hidden="true"
              className="h-8 w-8 animate-pulse rounded-full border border-border bg-card/40"
            />
          ) : status === "authenticated" && user ? (
            <UserMenu />
          ) : (
            <SignInButton />
          )}
          {githubButtonVisibility === "visible" ? (
            <PressLink
              href="https://github.com/Wooinxlkz"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card/20 px-3 py-2 text-xs font-medium text-foreground hover:border-(--color-border-strong)"
              aria-label={
                formattedStarCount
                  ? `Star on GitHub, ${formattedStarCount} stars`
                  : "Star on GitHub"
              }
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Github</span>
              <span className="inline-flex items-center gap-0.5 text-muted-foreground">
                <Star className="h-3 w-3" />
                {formattedStarCount ? <span>{formattedStarCount}</span> : null}
              </span>
            </PressLink>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
