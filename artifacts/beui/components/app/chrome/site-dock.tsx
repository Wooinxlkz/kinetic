"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Copy, FileText, Home, LayoutGrid, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dock, DockItem, DockSeparator } from "@/components/motion/dock";
import { ActionSwapIcon } from "@/components/motion/action-swap";
import { ThemeToggle, useThemeToggle } from "@/components/motion/theme-toggle";
import { Tooltip } from "@/components/motion/tooltip";
import { GithubIcon } from "@/components/app/icons";

export function SiteDock() {
  const pathname = usePathname();
  const { isDark, mounted } = useThemeToggle();
  const [emailHovered, setEmailHovered] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Randomly alternate the VT variant between "rectangle" and "circle" after
  // each toggle. isFirstChange skips the initial mount flush of isDark.
  const [vtVariant, setVtVariant] = useState<"rectangle" | "circle">("rectangle");
  const isFirstChange = useRef(true);
  useEffect(() => {
    if (isFirstChange.current) { isFirstChange.current = false; return; }
    setVtVariant(Math.random() < 0.5 ? "rectangle" : "circle");
  }, [isDark]);

  const isHome = pathname === "/";
  const isComponents = pathname.startsWith("/components");
  const isResume = pathname === "/resume";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <div className="pointer-events-auto">
        <Dock size={36} className="gap-0 border border-foreground/5 px-1.5">
          <DockItem aria-label="Home" active={isHome}>
            <Tooltip
              content="Home"
              side="top"
              wrapperClassName="h-full w-full items-center justify-center"
            >
              <Link
                href="/"
                aria-label="Home"
                className="flex h-full w-full items-center justify-center"
              >
                <Home className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>
          <DockItem aria-label="Components" active={isComponents}>
            <Tooltip
              content="Components"
              side="top"
              wrapperClassName="h-full w-full items-center justify-center"
            >
              <Link
                href="/components/motion"
                aria-label="Components"
                className="flex h-full w-full items-center justify-center"
              >
                <LayoutGrid className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>
          <DockSeparator className="mx-0.5 h-4" />
          <DockItem aria-label="GitHub">
            <Tooltip
              content="GitHub"
              side="top"
              wrapperClassName="h-full w-full items-center justify-center"
            >
              <Link
                href="https://github.com/Wooinxlkz"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="flex h-full w-full items-center justify-center"
              >
                <GithubIcon className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>
          <DockItem aria-label="Resume" active={isResume}>
            <Tooltip
              content="Resume"
              side="top"
              wrapperClassName="h-full w-full items-center justify-center"
            >
              <Link
                href="/resume"
                aria-label="Resume"
                className="flex h-full w-full items-center justify-center"
              >
                <FileText className="h-4 w-4" />
              </Link>
            </Tooltip>
          </DockItem>
          <DockItem aria-label="Copy email">
            <Tooltip
              content={emailCopied ? "Copied!" : "Copy email"}
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
                  navigator.clipboard.writeText("nulltrace@example.com");
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
        </Dock>
      </div>
    </div>
  );
}
