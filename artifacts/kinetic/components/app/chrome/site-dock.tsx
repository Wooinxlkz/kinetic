"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen, Check, ChevronRight, Copy, Home, Mail,
  ScrollText, VenetianMask, Blocks, Shapes, Wand2, Settings, Globe,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Dock, DockItem, DockSeparator } from "@/components/motion/dock";
import { ActionSwapIcon } from "@/components/motion/action-swap";
import { ThemeToggle, useThemeToggle } from "@/components/motion/theme-toggle";
import { Tooltip } from "@/components/motion/tooltip";
import { useSettings } from "@/components/app/settings/settings-provider";

export function SiteDock() {
  const pathname = usePathname();
  const { isDark, mounted } = useThemeToggle();
  const { openSettings } = useSettings();

  const [emailHovered, setEmailHovered] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandClipping, setExpandClipping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const [vtVariant, setVtVariant] = useState<"rectangle" | "circle">("rectangle");
  const isFirstChange = useRef(true);
  useEffect(() => {
    if (isFirstChange.current) { isFirstChange.current = false; return; }
    setVtVariant(Math.random() < 0.5 ? "rectangle" : "circle");
  }, [isDark]);

  // Slightly smaller dock items on narrow screens so the expanded state
  // (which adds 4 more icons) never overflows the viewport width.
  const [itemSize, setItemSize] = useState(36);
  useEffect(() => {
    function update() {
      setItemSize(window.innerWidth < 400 ? 30 : 36);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Close on click-outside
  useEffect(() => {
    if (!expanded) return;
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [expanded]);

  const isHome       = pathname === "/";
  const isComponents = pathname.startsWith("/components");
  const isCommunity  = pathname.startsWith("/discover");
  const isIcons      = pathname.startsWith("/icons");
  const isPlayground = pathname.startsWith("/playground");
  const isResume     = pathname === "/resume";
  const isDocs       = pathname.startsWith("/docs");

  // 4 expanded items, sized to match the main dock's items + their gaps,
  // so the dock never overflows the viewport width when expanded.
  const EXPANDED_WIDTH = itemSize * 4 + 18;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:bottom-6 sm:px-4">
      {/*
        Split-pill: Dock (right edge open) + expand tab (left edge open).
        They share the same border/bg/height — look like one connected bar.
      */}
      <div
        className="pointer-events-auto flex max-w-full items-stretch overflow-x-auto rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={containerRef}
      >

        {/* ── Main dock — tight padding ── */}
        <Dock
          size={itemSize}
          className="shrink-0 gap-0 rounded-r-none border-r-0 border-foreground/5 pl-1.5 pr-0.5"
        >
          <DockItem aria-label="Home" active={isHome}>
            <Tooltip content="Home" side="top" wrapperClassName="h-full w-full items-center justify-center">
              <Link href="/" aria-label="Home" className="flex h-full w-full items-center justify-center">
                <Home className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>

          <DockItem aria-label="Components" active={isComponents}>
            <Tooltip content="Components" side="top" wrapperClassName="h-full w-full items-center justify-center">
              <Link href="/components/motion" aria-label="Components" className="flex h-full w-full items-center justify-center">
                <Blocks className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>

          <DockItem aria-label="Community" active={isCommunity}>
            <Tooltip content="Community" side="top" wrapperClassName="h-full w-full items-center justify-center">
              <Link href="/discover" aria-label="Community" className="flex h-full w-full items-center justify-center">
                <Globe className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>

          <DockSeparator className="mx-0.5 h-4" />

          <DockItem aria-label="Portfolio">
            <Tooltip content="Portfolio" side="top" wrapperClassName="h-full w-full items-center justify-center">
              <Link
                href="https://nulltrace--nqck540xvc.replit.app/"
                target="_blank" rel="noreferrer noopener"
                aria-label="Portfolio"
                className="flex h-full w-full items-center justify-center"
              >
                <VenetianMask className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>

          <DockItem aria-label="Resume" active={isResume}>
            <Tooltip content="Resume" side="top" wrapperClassName="h-full w-full items-center justify-center">
              <Link href="/resume" aria-label="Resume" className="flex h-full w-full items-center justify-center">
                <ScrollText className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>

          <DockItem aria-label="Docs" active={isDocs}>
            <Tooltip content="Docs" side="top" wrapperClassName="h-full w-full items-center justify-center">
              <Link href="/docs" aria-label="Docs" className="flex h-full w-full items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>

          <DockItem aria-label="Toggle theme">
            <Tooltip
              content={mounted && isDark ? "Light mode" : "Dark mode"}
              side="top"
              wrapperClassName="h-full w-full items-center justify-center"
            >
              <ThemeToggle
                variant={vtVariant}
                start="bottom-up"
                className="flex h-full w-full items-center justify-center"
                iconClassName="h-4 w-4"
              />
            </Tooltip>
          </DockItem>

          {/* ── Inline expanded items: Icons, Playground, Email, Settings ── */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="extra-slots"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: EXPANDED_WIDTH, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="flex"
                style={{ overflow: expandClipping ? "hidden" : "visible" }}
                onAnimationComplete={() => { if (expanded) setExpandClipping(false); }}
              >
                {/* Icons */}
                <DockItem aria-label="Icons" active={isIcons}>
                  <Tooltip content="Icons" side="top" wrapperClassName="h-full w-full items-center justify-center">
                    <Link href="/icons" aria-label="Icons" className="flex h-full w-full items-center justify-center">
                      <Shapes className="h-4 w-4" />
                    </Link>
                  </Tooltip>
                </DockItem>

                {/* Playground */}
                <DockItem aria-label="Playground" active={isPlayground}>
                  <Tooltip content="Playground" side="top" wrapperClassName="h-full w-full items-center justify-center">
                    <Link href="/playground" aria-label="Playground" className="flex h-full w-full items-center justify-center">
                      <Wand2 className="h-4 w-4" />
                    </Link>
                  </Tooltip>
                </DockItem>

                {/* Email */}
                <DockItem aria-label="Copy email">
                  <Tooltip
                    content={emailCopied ? "Copied!" : "karimsc01t@gmail.com"}
                    side="top"
                    wrapperClassName="h-full w-full items-center justify-center"
                  >
                    <button
                      type="button"
                      aria-label="Copy email"
                      className="flex h-full w-full items-center justify-center"
                      onPointerEnter={() => setEmailHovered(true)}
                      onPointerLeave={() => setEmailHovered(false)}
                      onClick={() => {
                        navigator.clipboard.writeText("karimsc01t@gmail.com");
                        setEmailCopied(true);
                        setTimeout(() => setEmailCopied(false), 2000);
                      }}
                    >
                      <ActionSwapIcon
                        value={emailCopied ? "check" : emailHovered ? "copy" : "mail"}
                        animation="roll"
                        className="h-4 w-4"
                      >
                        {emailCopied ? (
                          <Check className="h-4 w-4" />
                        ) : emailHovered ? (
                          <Copy className="h-4 w-4" />
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                      </ActionSwapIcon>
                    </button>
                  </Tooltip>
                </DockItem>

                {/* Settings */}
                <DockItem aria-label="Settings">
                  <Tooltip content="Settings" side="top" wrapperClassName="h-full w-full items-center justify-center">
                    <button
                      type="button"
                      aria-label="Settings"
                      className="flex h-full w-full items-center justify-center"
                      onClick={() => { openSettings(); setExpanded(false); }}
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                  </Tooltip>
                </DockItem>
              </motion.div>
            )}
          </AnimatePresence>
        </Dock>

        {/*
          ── Expand tab ──
          No left rounding — grafts onto dock's open right edge.
          Same bg / border / shadow → reads as one continuous bar.
        */}
        <Tooltip content={expanded ? "Close" : "More"} side="top" wrapperClassName="flex">
          <button
            type="button"
            aria-label={expanded ? "Close" : "More"}
            onClick={() => {
              if (expanded) setExpandClipping(true); // re-clip before collapse
              setExpanded((o) => !o);
            }}
            className={[
              "flex w-6 items-center justify-center self-stretch",
              "rounded-r-2xl border border-l-0 border-foreground/5",
              "bg-card/80 shadow-2xl backdrop-blur-xl",
              "transition-colors hover:bg-muted/50 active:scale-95",
              expanded ? "text-foreground" : "text-foreground/40",
            ].join(" ")}
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="flex"
            >
              <ChevronRight className="h-2.5 w-2.5" />
            </motion.span>
          </button>
        </Tooltip>

      </div>
    </div>
  );
}
