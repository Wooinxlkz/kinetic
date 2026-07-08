"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Package,
  Palette,
  History,
  Zap,
  Activity,
  TrendingUp,
  Bot,
  Server,
  Database,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string; icon: LucideIcon };
type NavGroup = { section: string; items: NavItem[] };

const SECTION_NAV: Record<string, NavGroup[]> = {
  "getting-started": [
    {
      section: "Getting Started",
      items: [
        { label: "Overview",      href: "/docs",               icon: Home    },
        { label: "Installation",  href: "/docs/installation",  icon: Package },
        { label: "Theme Setup",   href: "/docs/theme",         icon: Palette },
        { label: "Changelog",     href: "/docs/changelog",     icon: History },
      ],
    },
  ],
  motion: [
    {
      section: "Concepts",
      items: [
        { label: "Motion Patterns",  href: "/docs/motion-patterns",  icon: Zap         },
        { label: "Easing Reference", href: "/docs/motion/easing",    icon: TrendingUp  },
        { label: "Spring Config",    href: "/docs/motion/springs",   icon: Activity    },
      ],
    },
  ],
  ai: [
    {
      section: "Overview",
      items: [
        { label: "For AI Agents", href: "/docs/ai-agents",           icon: Bot      },
      ],
    },
    {
      section: "Reference",
      items: [
        { label: "MCP Server",   href: "/docs/ai-agents/mcp",      icon: Server   },
        { label: "Registry API", href: "/docs/ai-agents/registry", icon: Database },
      ],
    },
  ],
};

/** Derive the active section from the current pathname. */
function getSection(p: string): "motion" | "ai" | "getting-started" {
  if (p.startsWith("/docs/motion")) return "motion";
  if (p.startsWith("/docs/ai-agents")) return "ai";
  return "getting-started";
}

export function DocsSidebar() {
  const pathname = usePathname();
  const section  = getSection(pathname);
  const groups   = SECTION_NAV[section];

  return (
    <aside className="hidden w-56 shrink-0 md:block">
      {/* sticky top = h-14 header (3.5rem) + h-10 docs nav (2.5rem) = 6rem */}
      <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto py-8 pr-4 scrollbar-hide">
        <AnimatePresence mode="wait" initial={false}>
          <motion.nav
            key={section}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.14, ease: [0.25, 0, 0.1, 1] }}
            className="flex flex-col gap-6"
          >
            {groups.map((group) => (
              <div key={group.section}>
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.section}
                </p>
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    const Icon   = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors duration-100",
                          active
                            ? "font-medium text-primary"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {/* Shared layoutId → slides smoothly between items within a section */}
                        {active && (
                          <motion.span
                            layoutId="docs-sidebar-active"
                            className="absolute inset-0 rounded-md bg-primary/10"
                            transition={{ type: "spring", bounce: 0.12, duration: 0.32 }}
                          />
                        )}
                        <Icon
                          className={cn(
                            "relative h-3.5 w-3.5 shrink-0 transition-colors duration-100",
                            active
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        <span className="relative">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.nav>
        </AnimatePresence>
      </div>
    </aside>
  );
}
