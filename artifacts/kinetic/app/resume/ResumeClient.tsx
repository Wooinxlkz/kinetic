"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowUp, Star, Hammer, Printer, X, FileText } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { GithubIcon } from "@/components/app/icons";
import { SiteFooter } from "@/components/app/chrome/site-footer";
import { MorphingModal } from "@/components/motion/morphing-modal";

// ─── icons ────────────────────────────────────────────────────────────────────

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ─── data ─────────────────────────────────────────────────────────────────────

const ROLES: { company: string; url: string; role: string; period: string; current: boolean }[] = [];

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  date: string;
  tag: string[];
  users?: number;
  note?: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    title: "GLYF",
    description:
      "Biometric signature authentication library. Curvature-weighted DTW, inter-stroke rhythm fingerprinting, angular momentum analysis, stroke topology fingerprinting, and adversarial forgery simulation for benchmark testing.",
    tech: ["TypeScript", "DTW", "Biometrics", "Security"],
    github: "https://github.com/Wooinxlkz/glyf",
    date: "June, 2026",
    tag: ["Open Source"],
  },
  {
    title: "NutriLLM",
    description:
      "AI-powered nutrition assistant. Combines LLM capabilities with nutritional data to deliver personalized dietary insights and meal recommendations.",
    tech: ["TypeScript", "LLMs", "AI", "Next.js"],
    github: "https://github.com/Wooinxlkz/NutriLLM",
    date: "June, 2026",
    tag: ["Personal"],
  },
  {
    title: "Flowa DSL",
    description:
      "A domain-specific language built on Python. Write clean .fw scripts — Flowa's lexer, parser, and interpreter handle the rest. Built around one idea: automation and bots should take a few lines, not hundreds.",
    tech: ["Python", "Lexer", "Parser", "Interpreter"],
    github: "https://github.com/Wooinxlkz/Flowa-DSL",
    date: "Apr, 2026",
    tag: ["Open Source"],
  },
  {
    title: "UnderCtrl",
    description:
      "A lightweight, privacy-first browser extension that blocks ads, trackers, and adult content at the network level using Chrome's native declarativeNetRequest API — fast, efficient, zero slowdown.",
    tech: ["JavaScript", "Chrome Extension", "declarativeNetRequest"],
    github: "https://github.com/Wooinxlkz/Underctrl-browser-extension",
    date: "Apr, 2026",
    tag: ["Personal", "Open Source"],
  },
  {
    title: "n8n AI Workflow Templates",
    description:
      "20 free plug-and-play n8n workflows that blend classic automation with today's AI stack — vector DBs, embeddings, and LLMs. Import the JSON, add credentials, hit Activate.",
    tech: ["n8n", "LLMs", "Vector DBs", "Automation"],
    github: "https://github.com/Wooinxlkz/N8N-Workflows-free-templates",
    date: "Sep, 2025",
    tag: ["Open Source"],
  },
  {
    title: "DJS-Commands",
    description:
      "Modular Discord.js commands toolkit. Structured command handling for building Discord bots quickly and cleanly, with a sane folder layout and zero boilerplate.",
    tech: ["JavaScript", "Discord.js", "Node.js"],
    github: "https://github.com/Wooinxlkz/DJS-Commands",
    date: "June, 2024",
    tag: ["Open Source"],
  },
];

const TECH_STACK = [
  "TypeScript",
  "Python",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "LLMs / AI",
  "n8n",
  "Chrome Extensions",
  "DSL Design",
  "Security / Auth",
  "Automation",
];

const WRITINGS = [
  {
    title: "Why biometric auth is harder than you think",
    date: "Jun 2026",
    description:
      "Signature verification isn't just pattern matching — it's time-series similarity, adversarial forgery resistance, and inter-stroke rhythm. Notes from building GLYF.",
  },
  {
    title: "Building a DSL from scratch in Python",
    date: "Apr 2026",
    description:
      "Lexer → parser → interpreter. The three stages of Flowa DSL, what I got wrong the first time, and why keeping it minimal was the hardest design decision.",
  },
  {
    title: "LLMs as a nutrition layer",
    date: "Jun 2026",
    description:
      "How NutriLLM combines structured nutritional data with free-form LLM reasoning — and where hallucinations actually matter in health contexts.",
  },
];

const CURRENTLY_BUILDING = {
  title: "Kinetic UI",
  description: "Bespoke motion components for React — production-ready primitives built on Framer Motion.",
  href: "/",
  status: "Active",
};

const FOOTER_LINKS = [
  { icon: GithubIcon, href: "https://github.com/Wooinxlkz", label: "GitHub" },
  { icon: XIcon, href: "https://x.com/syncinitstation", label: "X social" },
];

// Language brand colors
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Rust: "#dea584",
  Go: "#00ADD8",
  Vue: "#41b883",
  Ruby: "#701516",
};

// ─── spring / easing ─────────────────────────────────────────────────────────
const ISLAND_SPRING = { type: "spring", duration: 0.5, bounce: 0.2 } as const;
const EASE_IN = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── hooks ────────────────────────────────────────────────────────────────────

function useRepoStars(githubUrl?: string): number | null {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    if (!githubUrl) return;
    const match = githubUrl.match(/github\.com\/([^/]+\/[^/]+)/);
    if (!match) return;
    const repo = match[1];
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.stargazers_count === "number") setStars(d.stargazers_count);
      })
      .catch(() => {});
  }, [githubUrl]);
  return stars;
}

/** Single fetch for all repo-derived stats to avoid duplicate network calls. */
function useGitHubData(username: string) {
  const [data, setData] = useState<{
    repos: number;
    stars: number;
    langs: { lang: string; pct: number }[];
  } | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((r) => r.json())
      .then((repos: { stargazers_count: number; language: string | null }[]) => {
        if (!Array.isArray(repos)) return;
        const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count ?? 0), 0);
        const counts: Record<string, number> = {};
        for (const r of repos) {
          if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1;
        }
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        const langs =
          total > 0
            ? Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([lang, count]) => ({ lang, pct: Math.round((count / total) * 100) }))
            : [];
        setData({ repos: repos.length, stars: totalStars, langs });
      })
      .catch(() => {});
  }, [username]);

  return data;
}

/** Build a 12-week × 7-day activity grid from public events. */
function useGitHubActivity(username: string) {
  const [grid, setGrid] = useState<number[][]>([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public?per_page=100`)
      .then((r) => r.json())
      .then((events: { created_at: string }[]) => {
        if (!Array.isArray(events)) return;
        const counts: Record<string, number> = {};
        for (const evt of events) {
          const date = evt.created_at?.slice(0, 10);
          if (date) counts[date] = (counts[date] ?? 0) + 1;
        }
        const today = new Date();
        const weeks: number[][] = [];
        for (let w = 11; w >= 0; w--) {
          const week: number[] = [];
          for (let d = 6; d >= 0; d--) {
            const day = new Date(today);
            day.setDate(today.getDate() - (w * 7 + d));
            const key = day.toISOString().slice(0, 10);
            week.push(Math.min(counts[key] ?? 0, 4));
          }
          weeks.push(week);
        }
        setGrid(weeks);
      })
      .catch(() => {});
  }, [username]);
  return grid;
}

/** Track which section is currently visible. Pass a stable (constant) ids array. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  // Stringify to avoid re-running when a new array ref with same contents is passed
  const key = ids.join(",");
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

// ─── scroll progress bar ──────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left print:hidden"
      style={{ scaleX, background: "var(--accent)" }}
    />
  );
}

// ─── scroll-to-top button ────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: EASE_IN }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-40 grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:border-foreground/30 hover:text-foreground print:hidden"
        >
          <ArrowUp size={14} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── keyboard shortcut toast ──────────────────────────────────────────────────

function KeyboardShortcutToast({ label, visible }: { label: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border bg-background px-4 py-2 font-mono text-[12px] text-muted-foreground shadow-md print:hidden"
        >
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── section wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mb-20 scroll-mt-24"
    >
      <div className="mb-7 flex items-center gap-3">
        <span className="whitespace-nowrap text-sm font-medium tracking-[0.18em] text-muted-foreground/60">
          {title}
        </span>
      </div>
      {children}
    </motion.section>
  );
}

// ─── project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const [isTouch] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches,
  );
  const reduce = useReducedMotion();
  const stars = useRepoStars(project.github);
  const primaryLink = project.demo || project.github;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: EASE_IN }}
      onHoverStart={() => { if (!isTouch) setOpen(true); }}
      onHoverEnd={() => { if (!isTouch) setOpen(false); }}
      onClick={() => { if (isTouch) setOpen((v) => !v); }}
      className="group relative rounded-lg transition-colors duration-200 hover:bg-card/40"
    >
      {primaryLink && (
        <a
          href={primaryLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="absolute inset-0 z-0 rounded-lg"
        />
      )}

      <div className="pointer-events-none relative z-10 px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="shrink-0 text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
              {project.title}
            </h3>
            {project.tag.slice(0, 1).map((t) => (
              <span
                key={t}
                className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${
                  t === "Hackathon"
                    ? "bg-primary/10 text-primary"
                    : "bg-foreground/8 text-muted-foreground"
                }`}
              >
                {t}
              </span>
            ))}
            {project.users != null && (
              <span className="inline-flex shrink-0 items-center gap-0.5 text-[10px] font-medium text-primary">
                {project.users.toLocaleString()}+
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            {stars !== null && stars > 0 && (
              <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-muted-foreground/50">
                <Star size={9} className="fill-muted-foreground/40 stroke-none" />
                {stars}
              </span>
            )}
            <span className="whitespace-nowrap font-mono text-[11px] text-muted-foreground/60">
              {project.date}
            </span>
            <div className="pointer-events-auto flex items-center gap-0.5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source on GitHub"
                  className="relative z-20 grid h-6 w-6 place-items-center rounded text-muted-foreground/50 transition-colors hover:bg-card hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open demo"
                  className="relative z-20 grid h-6 w-6 place-items-center rounded text-muted-foreground/50 transition-colors hover:bg-card hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="details"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={ISLAND_SPRING}
              className="overflow-hidden"
            >
              <div className="pb-2 pt-1.5">
                <p className="text-[12.5px] leading-[1.6] text-muted-foreground">
                  {project.description}
                </p>
                {project.note && (
                  <p className="mt-1 text-[11px] italic text-muted-foreground/50">
                    {project.note}
                  </p>
                )}
                {project.tech.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── writing entry (sidebar compact) ─────────────────────────────────────────

function WritingEntry({
  post,
  index,
  onClick,
}: {
  post: (typeof WRITINGS)[number];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: EASE_IN }}
      className="group w-full cursor-pointer rounded-md px-2.5 py-2.5 text-left transition-colors hover:bg-card/50 active:scale-[0.98]"
    >
      <span className="block font-mono text-[9.5px] text-muted-foreground/40 mb-1">
        {post.date}
      </span>
      <p className="text-[11.5px] font-medium leading-[1.45] text-foreground/80 group-hover:text-foreground transition-colors">
        {post.title}
      </p>
    </motion.button>
  );
}

// ─── writing modal (full detail card) ────────────────────────────────────────

function WritingModalContent({
  post,
  onClose,
}: {
  post: (typeof WRITINGS)[number];
  onClose: () => void;
}) {
  return (
    <div>
      {/* header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText size={14} className="mt-0.5 shrink-0 text-muted-foreground/50" />
          <span className="font-mono text-[10px] text-muted-foreground/50">{post.date}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground/50 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
        >
          <X size={13} />
        </button>
      </div>

      {/* title */}
      <h2 className="mb-3 text-[17px] font-semibold leading-[1.35] tracking-[-0.02em] text-foreground">
        {post.title}
      </h2>

      {/* divider */}
      <div className="mb-4 h-px bg-border/50" />

      {/* body */}
      <p className="text-[13.5px] leading-[1.7] text-muted-foreground">
        {post.description}
      </p>

      {/* footer */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] text-muted-foreground/30">
          unpublished draft
        </span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 items-center justify-center rounded-full bg-foreground/[0.06] px-4 text-[12px] font-medium text-foreground transition-colors hover:bg-foreground/[0.1]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ─── language bar ──────────────────────────────────────────────────────────────

function LanguageBar({ langs }: { langs: { lang: string; pct: number }[] }) {
  if (!langs.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-20"
    >
      <div className="mb-7">
        <span className="whitespace-nowrap text-sm font-medium tracking-[0.18em] text-muted-foreground/60">
          GitHub Languages
        </span>
      </div>
      {/* bar */}
      <div className="mb-4 flex h-2 w-full overflow-hidden rounded-full">
        {langs.map(({ lang, pct }) => (
          <motion.div
            key={lang}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: `${pct}%`,
              background: LANG_COLORS[lang] ?? "#888",
              transformOrigin: "left",
            }}
          />
        ))}
        {/* remainder */}
        {langs.reduce((a, b) => a + b.pct, 0) < 100 && (
          <div
            style={{ flex: 1, background: "var(--border)" }}
            className="opacity-30"
          />
        )}
      </div>
      {/* legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {langs.map(({ lang, pct }) => (
          <div key={lang} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ background: LANG_COLORS[lang] ?? "#888" }}
            />
            <span className="font-mono text-[11px] text-muted-foreground">
              {lang}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/40">
              {pct}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── activity heatmap ─────────────────────────────────────────────────────────

const INTENSITY_BG = [
  "bg-foreground/[0.06]",   // 0 – empty
  "bg-accent/20",           // 1
  "bg-accent/45",           // 2
  "bg-accent/70",           // 3
  "bg-accent",              // 4+
] as const;

function ActivityHeatmap({ grid }: { grid: number[][] }) {
  if (!grid.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-20"
    >
      {/* title — matches LanguageBar */}
      <div className="mb-7">
        <span className="whitespace-nowrap text-sm font-medium tracking-[0.18em] text-muted-foreground/60">
          Activity · last 12 weeks
        </span>
      </div>

      {/* fixed-size grid — same compact style as GitHub */}
      <div className="flex gap-[3px]">
        {grid.map((week, wi) => (
          <motion.div
            key={wi}
            className="flex flex-col gap-[3px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: wi * 0.03, duration: 0.35, ease: "easeOut" }}
          >
            {week.map((count, di) => (
              <div
                key={di}
                title={count > 0 ? `${count} event${count > 1 ? "s" : ""}` : "No activity"}
                className={`h-[10px] w-[10px] rounded-[2px] transition-colors ${INTENSITY_BG[Math.min(count, 4)]}`}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* footer row — legend + caption */}
      <div className="mt-3 flex items-center justify-between">
        <p className="font-mono text-[10px] text-muted-foreground/30">
          sourced from GitHub public events
        </p>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] text-muted-foreground/30">less</span>
          {INTENSITY_BG.map((cls, i) => (
            <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${cls}`} />
          ))}
          <span className="font-mono text-[9px] text-muted-foreground/30">more</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── sticky sidebar ───────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "building", label: "Building" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
];

function Sidebar({ onWritingOpen }: { onWritingOpen: (index: number) => void }) {
  const active = useActiveSection(NAV_SECTIONS.map((s) => s.id));

  return (
    <aside className="hidden lg:block w-[200px] shrink-0 print:hidden">
      <div className="sticky top-10">
        {/* mini nav */}
        <nav className="mb-8">
          <p className="mb-3 font-mono text-[9px] tracking-[0.18em] text-muted-foreground/35 uppercase">
            On this page
          </p>
          <ul className="flex flex-col gap-0.5">
            {NAV_SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-full text-left rounded px-2 py-1.5 text-[12px] transition-colors ${
                    active === id
                      ? "bg-foreground/6 font-medium text-foreground"
                      : "text-muted-foreground/60 hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* divider */}
        <div className="mb-6 h-px bg-border/40" />

        {/* writing section */}
        <div>
          <p className="mb-3 font-mono text-[9px] tracking-[0.18em] text-muted-foreground/35 uppercase">
            Writing
          </p>
          <div className="flex flex-col gap-0.5">
            {WRITINGS.map((post, i) => (
              <WritingEntry
                key={post.title}
                post={post}
                index={i}
                onClick={() => onWritingOpen(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── print stylesheet ─────────────────────────────────────────────────────────

const PRINT_STYLES = `
@media print {
  body { background: white !important; color: black !important; }
  .print\\:hidden { display: none !important; }
  @page { margin: 1.5cm; }
  * { color: black !important; border-color: #ccc !important; background: transparent !important; }
  a { color: #1a1a1a !important; text-decoration: underline; }
  .font-mono { font-family: monospace; }
}
`;

// ─── page ─────────────────────────────────────────────────────────────────────

export default function ResumeClient() {
  const ghData = useGitHubData("Wooinxlkz");
  const ghActivity = useGitHubActivity("Wooinxlkz");

  const [activeWriting, setActiveWriting] = useState<number | null>(null);
  const closeWriting = useCallback(() => setActiveWriting(null), []);

  const [kbLabel, setKbLabel] = useState<string | null>(null);

  const flash = useCallback((label: string) => {
    setKbLabel(label);
    setTimeout(() => setKbLabel(null), 1600);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key.toLowerCase()) {
        case "g":
          window.open("https://github.com/Wooinxlkz", "_blank", "noopener,noreferrer");
          flash("g → GitHub");
          break;
        case "b":
          window.open("https://www.cal.eu/karim-sc0t1-vj6ju6/30min", "_blank", "noopener,noreferrer");
          flash("b → Book a call");
          break;
        case "x":
          window.open("https://x.com/syncinitstation", "_blank", "noopener,noreferrer");
          flash("x → X social");
          break;
        case "t":
          window.scrollTo({ top: 0, behavior: "smooth" });
          flash("t → top");
          break;
        case "p":
          window.print();
          flash("p → print / save PDF");
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flash]);

  return (
    <>
      {/* print styles */}
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />

      <ScrollProgressBar />
      <ScrollToTop />
      <KeyboardShortcutToast label={kbLabel ?? ""} visible={kbLabel !== null} />

      {/* ── Writing detail modal ─────────────────────────────────────────────── */}
      <MorphingModal
        viewId={activeWriting !== null ? String(activeWriting) : null}
        onClose={closeWriting}
        placement="center"
        className="max-w-md"
      >
        {activeWriting !== null ? (
          <WritingModalContent post={WRITINGS[activeWriting]} onClose={closeWriting} />
        ) : null}
      </MorphingModal>

      <div className="relative">
        <div className="mx-auto max-w-[960px] px-6 pb-40 pt-20 sm:px-8 sm:pt-28">
          <div className="flex gap-14 lg:gap-16">

            {/* ══ STICKY SIDEBAR ══════════════════════════════════════════════ */}
            <Sidebar onWritingOpen={setActiveWriting} />

            {/* ══ MAIN CONTENT ════════════════════════════════════════════════ */}
            <div className="min-w-0 flex-1">

              {/* ── HEADER ─────────────────────────────────────────────────── */}
              <motion.header
                className="mb-20 flex flex-col gap-7"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
                }}
              >
                {/* name row + badges */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_IN } } }}
                  className="flex flex-wrap items-center gap-2.5"
                >
                  <span className="text-[12px] font-semibold text-muted-foreground tracking-wide">
                    Wooinxlkz
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/60 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    Open to work
                  </span>
                  {ghData && (
                    <motion.a
                      href="https://github.com/Wooinxlkz"
                      target="_blank"
                      rel="noreferrer noopener"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/60 px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground/60 transition-colors hover:text-foreground"
                    >
                      <GithubIcon className="h-2.5 w-2.5" />
                      {ghData.repos} repos · {ghData.stars} ★
                    </motion.a>
                  )}

                  {/* print button */}
                  <button
                    onClick={() => window.print()}
                    aria-label="Print / Save as PDF"
                    title="Save as PDF (or press P)"
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/40 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground/50 transition-colors hover:border-foreground/30 hover:text-foreground print:hidden"
                  >
                    <Printer size={9} />
                    PDF
                  </button>
                </motion.div>

                {/* big title */}
                <div className="flex flex-col gap-1 font-pixel">
                  <motion.h1
                    variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_IN } } }}
                    className="text-[36px] font-bold leading-[1.05] text-foreground sm:text-[44px]"
                  >
                    Software Engineer
                  </motion.h1>
                  <motion.h1
                    variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_IN } } }}
                    className="text-[36px] font-bold leading-[1.05] text-muted-foreground sm:text-[44px]"
                  >
                    &amp; Tool Builder.
                  </motion.h1>
                </div>

                {/* bio */}
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_IN } } }}
                  className="max-w-[460px] text-[15px] leading-[1.65] text-muted-foreground"
                >
                  I build authentication systems, developer tooling, and automation
                  pipelines. Mostly writing TypeScript and Python.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_IN } } }}
                  className="flex flex-wrap gap-2.5"
                >
                  <a
                    href="https://github.com/Wooinxlkz"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[13px] font-semibold text-background transition-opacity hover:opacity-85"
                  >
                    GitHub
                    <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://www.cal.eu/karim-sc0t1-vj6ju6/30min"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] font-semibold text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    Book a call
                  </a>
                  <a
                    href="https://x.com/syncinitstation"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] font-semibold text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    X social
                  </a>
                </motion.div>

                {/* keyboard shortcuts hint */}
                <motion.p
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } } }}
                  className="font-mono text-[10px] text-muted-foreground/35 print:hidden"
                >
                  press{" "}
                  {[
                    { key: "g", label: "github" },
                    { key: "b", label: "book" },
                    { key: "x", label: "x" },
                    { key: "p", label: "pdf" },
                    { key: "t", label: "top" },
                  ].map(({ key, label }, i, arr) => (
                    <span key={key}>
                      <kbd className="rounded border border-border/50 bg-card/50 px-1 py-px font-mono text-[10px]">
                        {key}
                      </kbd>
                      {" "}
                      <span className="text-muted-foreground/25">{label}</span>
                      {i < arr.length - 1 && <span className="mx-1 text-muted-foreground/20">·</span>}
                    </span>
                  ))}
                </motion.p>
              </motion.header>

              {/* ── CURRENTLY BUILDING ───────────────────────────────────────── */}
              <Section title="Currently Building" id="building">
                <motion.a
                  href={CURRENTLY_BUILDING.href}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border/50 bg-card/30 px-5 py-4 transition-colors hover:border-border hover:bg-card/60"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <Hammer size={12} className="text-muted-foreground/50" />
                      <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
                        {CURRENTLY_BUILDING.title}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-sm bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                        <span className="relative flex h-1 w-1">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                          <span className="relative inline-flex h-1 w-1 rounded-full bg-accent" />
                        </span>
                        {CURRENTLY_BUILDING.status}
                      </span>
                    </div>
                    <p className="max-w-[440px] text-[13px] leading-[1.6] text-muted-foreground">
                      {CURRENTLY_BUILDING.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="mt-0.5 shrink-0 text-muted-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </motion.a>
              </Section>

              {/* ── ABOUT ────────────────────────────────────────────────────── */}
              <Section title="About" id="about">
                <p
                  className="mb-7 max-w-[500px] text-[14px] leading-[1.7] text-muted-foreground"
                  style={{ textWrap: "pretty" } as React.CSSProperties}
                >
                  I build security libraries, language tooling, and automation systems.
                  I care about how software works under the hood — from biometric
                  authentication algorithms to DSL interpreters and browser-native
                  privacy tools. These days I&apos;m deep into AI integration and developer
                  tooling, and shipping{" "}
                  <Link
                    href="/"
                    className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                  >
                    Kinetic UI
                  </Link>
                  {" "}— bespoke motion components for React.
                  Always down to ship something useful.
                </p>

                {ROLES.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {ROLES.map((r, i) => (
                      <motion.div
                        key={r.company}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.4, ease: EASE_IN }}
                        className="flex items-baseline justify-between gap-4 py-1"
                      >
                        <div className="flex min-w-0 items-baseline gap-2.5">
                          <span className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-primary"
                            >
                              {r.company}
                            </a>
                          </span>
                          {r.current && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                            </span>
                          )}
                          <span className="truncate text-[12px] text-muted-foreground">{r.role}</span>
                        </div>
                        <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-muted-foreground/60">
                          {r.period}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Section>

              {/* ── PROJECTS ─────────────────────────────────────────────────── */}
              <Section title="Projects" id="projects">
                <div className="flex flex-col gap-px">
                  {FEATURED_PROJECTS.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} />
                  ))}
                </div>
                <div className="mt-6">
                  <a
                    href="https://github.com/Wooinxlkz"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    View all on GitHub
                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </Section>

              {/* ── STACK ────────────────────────────────────────────────────── */}
              <Section title="Stack" id="stack">
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/40 px-3 py-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>

              {/* ── LANGUAGE BREAKDOWN ───────────────────────────────────────── */}
              <LanguageBar langs={ghData?.langs ?? []} />

              {/* ── ACTIVITY HEATMAP ─────────────────────────────────────────── */}
              <ActivityHeatmap grid={ghActivity} />

              {/* ── WRITING (mobile only — sidebar shows on desktop) ─────────── */}
              <div className="lg:hidden">
                <Section title="Writing" id="writing">
                  <div className="flex flex-col gap-px">
                    {WRITINGS.map((post, i) => (
                      <motion.button
                        key={post.title}
                        type="button"
                        onClick={() => setActiveWriting(i)}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.4, ease: EASE_IN }}
                        className="group w-full cursor-pointer rounded-lg px-3 py-3 text-left transition-colors hover:bg-card/40 active:scale-[0.99]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
                            {post.title}
                          </h3>
                          <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-muted-foreground/50">
                            {post.date}
                          </span>
                        </div>
                        <p className="mt-1 text-[12.5px] leading-[1.6] text-muted-foreground">
                          {post.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </Section>
              </div>

              {/* ── FOOTER ───────────────────────────────────────────────────── */}
              <footer className="flex flex-col items-center gap-5 border-t border-border/40 pt-16">
                <div className="flex items-center gap-6">
                  {FOOTER_LINKS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="text-muted-foreground/50 transition-colors hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </a>
                  ))}
                </div>
                <p className="font-mono text-[11px] text-muted-foreground/50">
                  Created by{" "}
                  <a
                    href="https://x.com/syncinitstation"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-muted-foreground/70 transition-colors hover:text-foreground"
                  >
                    Nulltrace
                  </a>
                </p>
              </footer>

            </div>{/* end main */}
          </div>{/* end flex */}
        </div>
      </div>
      <div className="-mb-32">
        <SiteFooter />
      </div>
    </>
  );
}
