"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/motion/select";
import type { CommunityCategory, CommunityComponentDTO, CommunityQuota } from "@/lib/community/types";
import { COMMUNITY_TAG_GROUPS } from "@/lib/community/types";
import { createCommunityComponent } from "./community-client-api";
import { CommunityPreviewFrame } from "./community-preview-frame";

const CATEGORY_OPTIONS: { value: CommunityCategory; label: string }[] = [
  { value: "component", label: "Component" },
  { value: "block", label: "Block" },
  { value: "pattern", label: "Pattern" },
];

const DEFAULT_CODE = `import { useState } from "react";
import { motion } from "motion/react";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white"
      animate={{ x: pos.x, y: pos.y }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) * 0.3,
          y: (e.clientY - rect.top - rect.height / 2) * 0.3,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}
`;

const DEFAULT_DEMO = `import { MagneticButton } from "./component";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <MagneticButton>Hover me</MagneticButton>
    </div>
  );
}
`;

type CodeTab = "component" | "demo";

/**
 * Inspects the component code, finds named exports, detects compound
 * component patterns (Root + Trigger + Content), and generates a ready-to-use
 * demo stub that imports from "./component".
 */
function generateDemo(componentCode: string): string {
  const names: string[] = [];
  const fnRe = /export\s+(?:function|class)\s+([A-Za-z_$][\w$]*)/g;
  const constRe = /export\s+const\s+([A-Za-z_$][\w$]*)\s*[:=]/g;
  let m: RegExpExecArray | null;
  while ((m = fnRe.exec(componentCode))) names.push(m[1]);
  while ((m = constRe.exec(componentCode))) names.push(m[1]);

  // Keep only PascalCase component names (skip Props/Type/Context suffixes)
  const components = names.filter(
    (n) => /^[A-Z]/.test(n) && !/(Props|Type|Context|Value)$/.test(n),
  );

  if (components.length === 0) {
    return `import { /* YourComponent */ } from "./component";\n\nexport default function Demo() {\n  return (\n    <div className="flex h-full items-center justify-center">\n      {/* render your component here */}\n    </div>\n  );\n}\n`;
  }

  const byLength = [...components].sort((a, b) => a.length - b.length);
  let usedNames: string[] = [];
  let body = "";

  // Detect compound pattern: shortest name is Root, look for Trigger + Content siblings
  for (const root of byLength) {
    const trigger = components.find(
      (n) => n !== root && n.startsWith(root) && /trigger$/i.test(n),
    );
    const content = components.find(
      (n) => n !== root && n.startsWith(root) && /(content|panel|menu|body|list|dropdown)$/i.test(n),
    );
    if (trigger && content) {
      usedNames = [root, trigger, content];
      body = `  return (
    <div className="flex h-full items-center justify-center">
      <${root}>
        <${trigger}>
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm">
            Open
          </button>
        </${trigger}>
        <${content}>
          <div className="p-4 text-sm text-gray-700">Preview content</div>
        </${content}>
      </${root}>
    </div>
  );`;
      break;
    }
  }

  if (!body) {
    // Single component or no compound pattern found — render the first one
    const main = byLength[0];
    usedNames = [main];
    body = `  return (
    <div className="flex h-full items-center justify-center">
      <${main} />
    </div>
  );`;
  }

  const importLine = `import { ${usedNames.join(", ")} } from "./component";`;
  return `${importLine}\n\nexport default function Demo() {\n${body}\n}\n`;
}

const MAX_TAGS = 1;

function TagPicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (tags: string[]) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COMMUNITY_TAG_GROUPS;
    return COMMUNITY_TAG_GROUPS.map((g) => ({
      ...g,
      tags: g.tags.filter((t) => t.includes(q)),
    })).filter((g) => g.tags.length > 0);
  }, [search]);

  const picked = selected[0] ?? null;

  function toggle(t: string) {
    onChange(picked === t ? [] : [t]);
  }

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-xs font-medium text-muted-foreground">Tag</span>
        {picked && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="flex items-center gap-0.5 text-[11px] text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="h-2.5 w-2.5" /> clear
          </button>
        )}
      </div>

      {/* Selected pill */}
      {picked && (
        <div className="mb-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            {picked}
          </span>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-1.5">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tags…"
          className="h-7 w-full rounded-lg border border-border bg-background pl-7 pr-3 text-xs text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-foreground/20 transition-colors"
        />
      </div>

      {/* Grouped options */}
      <div className="max-h-44 overflow-y-auto rounded-xl border border-border bg-card p-2 scrollbar-hide">
        {filtered.length === 0 ? (
          <p className="py-3 text-center text-[11px] text-muted-foreground/50">No tags match</p>
        ) : (
          filtered.map((group) => (
            <div key={group.label} className="mb-2.5 last:mb-0">
              <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1">
                {group.tags.map((t) => {
                  const active = picked === t;
                  const taken  = !active && picked !== null;
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={taken}
                      onClick={() => toggle(t)}
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors",
                        active ? "bg-primary/15 text-primary"
                          : taken ? "cursor-not-allowed text-muted-foreground/25"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function PublishDialog({
  open,
  quota,
  onClose,
  onPublished,
}: {
  open: boolean;
  quota: CommunityQuota | null;
  onClose: () => void;
  onPublished: (item: CommunityComponentDTO) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<CommunityCategory>("component");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState("");
  const [code, setCode] = useState(DEFAULT_CODE);
  const [demoCode, setDemoCode] = useState(DEFAULT_DEMO);
  const [activeTab, setActiveTab] = useState<CodeTab>("component");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setCategory("component");
      setSelectedTags([]);
      setTagSearch("");
      setCode(DEFAULT_CODE);
      setDemoCode(DEFAULT_DEMO);
      setActiveTab("component");
      setError(null);
    }
  }, [open]);

  const quotaReached = quota !== null && quota.limit !== null && quota.remaining !== null && quota.remaining <= 0;

  const handlePublish = async () => {
    if (name.trim().length < 2) {
      setError("Give your work a name (at least 2 characters)");
      return;
    }
    if (!description.trim()) {
      setError("Add a short description");
      return;
    }
    if (!code.trim()) {
      setError("Paste in your component's code");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const tags = selectedTags.slice(0, 1);
      const item = await createCommunityComponent({
        name: name.trim(),
        description: description.trim(),
        category,
        tags,
        code,
        demoCode: demoCode.trim() || undefined,
      });
      onPublished(item);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Publish your work"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Publish your work</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Shared to the community — separate from Kinetic UI&apos;s own component library.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body — 3 columns: meta | code | preview */}
            <div className="grid flex-1 grid-cols-1 gap-0 overflow-hidden md:grid-cols-[240px_1fr_1fr]">
              {/* Column 1: meta fields */}
              <div className="space-y-4 overflow-y-auto border-b border-border p-5 md:border-b-0 md:border-r">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={60}
                    placeholder="e.g. Magnetic Button"
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-(--color-border-strong)"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Description</span>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={280}
                    rows={3}
                    placeholder="What does it do?"
                    className="w-full resize-none rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-(--color-border-strong)"
                  />
                </label>

                <div>
                  <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Category</span>
                  <Select
                    value={category}
                    onValueChange={(v) => setCategory(v as CommunityCategory)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tag picker */}
                <TagPicker selected={selectedTags} onChange={setSelectedTags} />
              </div>

              {/* Column 2: code editor with Component / Demo tabs */}
              <div className="flex flex-col overflow-hidden border-b border-border md:border-b-0 md:border-r">
                {/* Tab switcher */}
                <div className="flex shrink-0 items-center gap-0 border-b border-border">
                  {(["component", "demo"] as CodeTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "flex-1 px-4 py-2.5 text-xs font-medium transition-colors",
                        activeTab === tab
                          ? "border-b-2 border-foreground text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {tab === "component" ? "Component" : "Demo"}
                    </button>
                  ))}
                  {activeTab === "demo" && (
                    <button
                      type="button"
                      title="Generate demo from component code"
                      onClick={() => setDemoCode(generateDemo(code))}
                      className="mr-2 flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                    >
                      <Sparkles className="h-3 w-3" />
                      Generate
                    </button>
                  )}
                </div>

                {/* Code textarea */}
                <div className="relative flex-1 overflow-hidden">
                  {activeTab === "component" ? (
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      spellCheck={false}
                      placeholder="// Your component code here"
                      className="h-full w-full resize-none bg-card px-4 py-3 font-mono text-[12px] leading-relaxed text-foreground outline-none"
                    />
                  ) : (
                    <textarea
                      value={demoCode}
                      onChange={(e) => setDemoCode(e.target.value)}
                      spellCheck={false}
                      placeholder={`import { MyComponent } from "./component";\n\nexport default function Demo() {\n  return <MyComponent />;\n}`}
                      className="h-full w-full resize-none bg-card px-4 py-3 font-mono text-[12px] leading-relaxed text-foreground outline-none"
                    />
                  )}
                </div>

                {/* Hint */}
                <div className="shrink-0 border-t border-border px-4 py-2">
                  {activeTab === "component" ? (
                    <p className="text-[11px] text-muted-foreground">
                      Your component source — named exports are fine. Can import{" "}
                      <code className="font-mono">react</code>,{" "}
                      <code className="font-mono">motion/react</code>, and{" "}
                      <code className="font-mono">lucide-react</code>.
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">
                      Import your component and wrap it for the preview. The import path is resolved automatically — just use{" "}
                      <code className="font-mono">./component</code>.
                      Must have a <code className="font-mono">default export</code>.
                    </p>
                  )}
                </div>
              </div>

              {/* Column 3: live preview */}
              <div className="flex flex-col p-5">
                <span className="mb-1.5 block shrink-0 text-xs font-medium text-muted-foreground">Live preview</span>
                <div className="flex-1 overflow-hidden rounded-xl border border-border bg-background/40">
                  <CommunityPreviewFrame
                    code={code}
                    demoCode={demoCode.trim() || null}
                    scrollable
                    eager
                    debounceMs={450}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-5 py-4">
              <div className="text-xs text-muted-foreground">
                {quota &&
                  (quota.limit === null ? (
                    <span>{quota.used} published · unlimited on your plan</span>
                  ) : (
                    <span>
                      {quota.used} of {quota.limit} published this plan
                    </span>
                  ))}
                {error && <p className="mt-0.5 text-red-400">{error}</p>}
                {quotaReached && (
                  <p className="mt-0.5">
                    Upgrade your{" "}
                    <a href="/sponsors" className="text-accent underline">
                      membership
                    </a>{" "}
                    to publish more.
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={saving || quotaReached}
                  className={cn(
                    "rounded-xl bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60",
                  )}
                >
                  {saving ? "Publishing…" : "Publish"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
