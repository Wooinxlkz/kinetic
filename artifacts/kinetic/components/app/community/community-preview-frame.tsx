"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "@/components/motion/skeleton";
import { cn } from "@/lib/utils";

/**
 * Renders community-submitted code live inside a locked-down sandboxed
 * iframe (`sandbox="allow-scripts"`, deliberately *without*
 * `allow-same-origin` — the sandboxed document gets a unique opaque origin,
 * so submitted code can never read cookies, localStorage, or reach the
 * parent page). Native ES modules + an import map resolve bare imports of
 * "react", "framer-motion"/"motion/react", and "lucide-react" to esm.sh —
 * no bundler needed. Tailwind's Play CDN JIT-compiles utility classes found
 * in the rendered markup.
 *
 * Contract for `code`: ideally a self-contained component with a default
 * export, e.g. `export default function MyComponent() { return <div .../>; }`.
 * Real components copied straight out of a project (like Kinetic's own
 * source) often don't look like that — they have several named exports
 * (a root + Trigger/Content-style subcomponents) and no default export at
 * all. To handle that gracefully:
 *  - if there's no default export, we statically scan for named exports and
 *    synthesize a small demo that renders them together (see
 *    `buildAutoDemo`), so pasting real source "just works" the way it does
 *    on 21st.dev — the raw code is still what gets saved/shown in the Code
 *    tab, only the *preview* gets the synthesized wrapper appended.
 *  - common project-local imports (`@/lib/utils`'s `cn`, `@/lib/ease`'s
 *    spring/easing tokens) are shimmed via the import map below, since
 *    those are exactly the helpers Kinetic's own components import.
 *    Other `@/...` imports (e.g. other local components) aren't resolvable
 *    in this bundler-less sandbox and will surface as a clear error.
 */

function escapeForInlineScript(code: string): string {
  // The HTML tokenizer ends a <script> element on literal "</script"
  // regardless of its `type` attribute, so this must be escaped even though
  // we're embedding as inert text, not executing it directly.
  return code.replace(/<\/script/gi, "<\\/script");
}

function hasDefaultExport(code: string): boolean {
  return /export\s+default\b/.test(code);
}

/** Statically finds `export function Name` / `export const Name =` identifiers. */
function detectNamedExports(code: string): string[] {
  const names = new Set<string>();
  const fnRe = /export\s+function\s+([A-Za-z_$][\w$]*)/g;
  const constRe = /export\s+const\s+([A-Za-z_$][\w$]*)\s*[:=]/g;
  let m: RegExpExecArray | null;
  while ((m = fnRe.exec(code))) names.add(m[1]);
  while ((m = constRe.exec(code))) names.add(m[1]);
  return [...names];
}

/**
 * Builds a small demo snippet (appended to the user's source, not replacing
 * it) that renders whatever named exports it can find. Recognizes the
 * common compound pattern — a "Root" export plus `*Trigger` / `*Content`
 * siblings sharing its name as a prefix (Popover/Dialog/Dropdown-style
 * components) — and composes a minimal working demo from them. Falls back
 * to rendering the first export with no props.
 */
function buildAutoDemo(exportNames: string[]): string | null {
  if (exportNames.length === 0) return null;

  const byLength = [...exportNames].sort((a, b) => a.length - b.length);
  for (const root of byLength) {
    const trigger = exportNames.find((n) => n !== root && n.startsWith(root) && /trigger$/i.test(n));
    const content = exportNames.find(
      (n) => n !== root && n.startsWith(root) && /(content|panel|menu|body|list)$/i.test(n),
    );
    if (trigger && content) {
      return `function __AutoPreviewDemo() {
  return (
    <${root}>
      <${trigger}>
        <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm">Open</button>
      </${trigger}>
      <${content}>
        <div className="p-4 text-sm text-gray-700">Preview content</div>
      </${content}>
    </${root}>
  );
}
export default __AutoPreviewDemo;`;
    }
  }

  return `function __AutoPreviewDemo() {
  return <${exportNames[0]} />;
}
export default __AutoPreviewDemo;`;
}

/** Minimal `cn` shim mirroring `@/lib/utils` closely enough for preview purposes. */
const CN_SHIM_SRC = `export function cn(...inputs) {
  const flat = (arr) => arr.flatMap((v) => (Array.isArray(v) ? flat(v) : v));
  return flat(inputs)
    .map((v) => {
      if (!v) return "";
      if (typeof v === "string" || typeof v === "number") return String(v);
      if (typeof v === "object") return Object.keys(v).filter((k) => v[k]).join(" ");
      return "";
    })
    .filter(Boolean)
    .join(" ");
}`;

/** Mirrors the shared motion tokens from `@/lib/ease` for preview purposes. */
const EASE_SHIM_SRC = `export const EASE_OUT=[0.16,1,0.3,1];
export const EASE_IN_OUT=[0.77,0,0.175,1];
export const EASE_DRAWER=[0.32,0.72,0,1];
export const EASE_OUT_CSS="cubic-bezier(0.16,1,0.3,1)";
export const SPRING_PRESS={type:"spring",stiffness:500,damping:30,mass:0.6};
export const SPRING_SWAP={type:"spring",stiffness:460,damping:30,mass:0.55};
export const SPRING_PANEL={type:"spring",stiffness:420,damping:40,mass:0.5};
export const SPRING_LAYOUT={type:"spring",stiffness:360,damping:32,mass:0.6};
export const SPRING_MOUSE={stiffness:200,damping:15,mass:0.3};`;

function toDataModuleUrl(src: string): string {
  return `data:text/javascript;charset=utf-8,${encodeURIComponent(src)}`;
}

/**
 * When a separate demoCode is provided, strips import statements that
 * reference the component file itself (relative paths like "./button" or
 * project aliases like "@/components/ui/button") from the demo, then
 * concatenates component + demo into a single module. The component's named
 * exports are then already in scope when the demo code runs.
 *
 * Uses a full-string regex (with the `s` dotAll flag) so that multiline
 * imports — e.g. `import {\n  Foo,\n  Bar,\n} from "./component"` — are
 * matched and removed as a single unit. A line-by-line approach only sees
 * the first `import {` line and leaves the remaining lines in place, which
 * causes "Identifier already declared" errors in the sandbox.
 */
function mergeComponentAndDemo(componentCode: string, demoCode: string): string {
  const strippedDemo = demoCode.replace(
    // Matches: import [type] <bindings> from "<relative-or-@/components-path>";
    // The `s` flag lets [^}]* cross newlines so multi-line { } blocks are captured.
    /import(?:\s+type)?\s+(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+["'](?:\.\.?\/[^"'\n]*|@\/components[^"'\n]*)["'];?[ \t]*\n?/g,
    "",
  );
  return `${componentCode}\n\n${strippedDemo}`;
}

const DARK_THEME_VARS = `
  --background: #151515;
  --foreground: oklch(96% 0 0);
  --card: #1c1c1c;
  --muted-foreground: oklch(62% 0 0);
  --border: rgb(255 255 255 / 0.05);
  --border-strong: rgb(255 255 255 / 0.1);`;

const LIGHT_THEME_VARS = `
  --background: oklch(99% 0 0);
  --foreground: oklch(15% 0 0);
  --card: oklch(97% 0 0);
  --muted-foreground: oklch(50% 0 0);
  --border: oklch(15% 0 0 / 0.06);
  --border-strong: oklch(15% 0 0 / 0.12);`;

function buildSrcDoc(code: string, demoCode?: string | null, isDark?: boolean): string {
  let finalCode = code;

  if (demoCode && demoCode.trim()) {
    // Merge component + demo: demo provides the default export for the preview
    finalCode = mergeComponentAndDemo(code, demoCode);
    // If the merged result still has no default export, fall through to auto-demo
    if (!hasDefaultExport(finalCode)) {
      const demo = buildAutoDemo(detectNamedExports(finalCode));
      if (demo) finalCode = `${finalCode}\n\n${demo}`;
    }
  } else if (!hasDefaultExport(code)) {
    const demo = buildAutoDemo(detectNamedExports(code));
    if (demo) finalCode = `${code}\n\n${demo}`;
  }
  const safeCode = escapeForInlineScript(finalCode);
  const themeVars = isDark ? DARK_THEME_VARS : LIGHT_THEME_VARS;
  return `<!doctype html>
<html${isDark ? ' class="dark"' : ""}>
<head>
<meta charset="utf-8" />
<!-- Early connection hints shave ~200-400 ms off first render -->
<link rel="preconnect" href="https://esm.sh" crossorigin>
<link rel="preconnect" href="https://cdn.tailwindcss.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="dns-prefetch" href="https://esm.sh">
<link rel="dns-prefetch" href="https://cdn.tailwindcss.com">
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
<script>
  // Configure Tailwind before the CDN loads so dark: variants work
  window.tailwind = window.tailwind || {};
  window.tailwindConfig = { darkMode: "class" };
</script>
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config = { darkMode: "class" }</script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@19",
    "react/jsx-runtime": "https://esm.sh/react@19/jsx-runtime",
    "react-dom": "https://esm.sh/react-dom@19",
    "react-dom/client": "https://esm.sh/react-dom@19/client",
    "framer-motion": "https://esm.sh/framer-motion@11?deps=react@19,react-dom@19",
    "motion/react": "https://esm.sh/motion@11/react?deps=react@19,react-dom@19",
    "lucide-react": "https://esm.sh/lucide-react@0.462.0?deps=react@19,react-dom@19",
    "@/lib/utils": "${toDataModuleUrl(CN_SHIM_SRC)}",
    "@/lib/ease": "${toDataModuleUrl(EASE_SHIM_SRC)}"
  }
}
</script>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7/babel.min.js"></script>
<style>
  :root {${themeVars}
  }
  html, body {
    margin: 0;
    height: 100%;
    background: var(--background);
    color: var(--foreground);
    color-scheme: ${isDark ? "dark" : "light"};
  }
  #root {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
  }
</style>
</head>
<body>
<div id="root"></div>
<script id="community-user-code" type="text/plain">${safeCode}</script>
<script type="module">
  import * as React from "react";
  import { createRoot } from "react-dom/client";
  window.React = React;

  const root = document.getElementById("root");
  const src = document.getElementById("community-user-code").textContent;

  function showError(message) {
    root.innerHTML =
      '<pre style="color:#f87171;font-size:11px;line-height:1.5;white-space:pre-wrap;padding:12px;margin:0;font-family:ui-monospace,monospace;">' +
      String(message).replace(/</g, "&lt;") +
      "</pre>";
    parent.postMessage({ type: "community-preview-error", message: String(message) }, "*");
  }

  try {
    // Community code is often TSX (interfaces, type-only imports, generics),
    // not just JSX -- strip TypeScript syntax too, not only JSX.
    const transformed = Babel.transform(src, {
      presets: [["typescript", { isTSX: true, allExtensions: true }], "react"],
      filename: "component.tsx",
    }).code;
    const blob = new Blob([transformed], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const mod = await import(url);
    URL.revokeObjectURL(url);
    const Component = mod.default;
    if (typeof Component !== "function") {
      throw new Error("Your code must have a default export that is a component function.");
    }
    createRoot(root).render(React.createElement(Component));
    parent.postMessage({ type: "community-preview-ready" }, "*");
  } catch (err) {
    showError(err && err.message ? err.message : err);
  }
</script>
</body>
</html>`;
}

/**
 * Debounces a fast-changing value (e.g. a code textarea) so downstream work —
 * here, tearing down and reloading an entire sandboxed iframe (Tailwind CDN +
 * Babel + esm.sh module imports) — doesn't repeat on every keystroke.
 */
function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export function CommunityPreviewFrame({
  code,
  demoCode,
  title,
  className,
  scrollable = false,
  /** Skip the "load only when near viewport" behavior — use for a single,
   * already-visible preview (dialogs, detail pages). Grids of cards should
   * leave this false so only on-screen previews spend the CPU/network cost. */
  eager = false,
  /** Debounce srcDoc rebuilds while `code` is actively changing (e.g. a live
   * editor). 0 disables debouncing. */
  debounceMs = 0,
  /** Forward the app's current dark/light theme into the sandboxed iframe. */
  isDark = false,
}: {
  code: string;
  /** Optional demo file — merged with `code` for the live preview. */
  demoCode?: string | null;
  title?: string;
  className?: string;
  scrollable?: boolean;
  eager?: boolean;
  debounceMs?: number;
  isDark?: boolean;
}) {
  const debouncedCode = useDebouncedValue(code, debounceMs);
  const debouncedDemoCode = useDebouncedValue(demoCode ?? "", debounceMs);
  const [visible, setVisible] = useState(eager);
  const [ready, setReady] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eager || visible) return;
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, visible]);

  // Reset the "ready" fade-in whenever the actual rendered code changes.
  useEffect(() => {
    setReady(false);
  }, [debouncedCode, debouncedDemoCode]);

  useEffect(() => {
    if (!visible) return;
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "community-preview-ready" || e.data?.type === "community-preview-error") {
        setReady(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [visible]);

  const srcDoc = useMemo(
    () => (visible ? buildSrcDoc(debouncedCode, debouncedDemoCode || null, isDark) : ""),
    [visible, debouncedCode, debouncedDemoCode, isDark],
  );

  return (
    <div ref={wrapperRef} className={cn("relative h-full w-full", className)}>
      {!ready && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
      {visible && (
        <iframe
          title={title ?? "Live component preview"}
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className={cn(
            "relative h-full w-full border-0 bg-transparent transition-opacity duration-200",
            ready ? "opacity-100" : "opacity-0",
          )}
          style={{ overflow: scrollable ? "auto" : "hidden" }}
        />
      )}
    </div>
  );
}
