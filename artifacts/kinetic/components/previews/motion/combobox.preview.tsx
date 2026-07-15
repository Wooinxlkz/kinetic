"use client";

import { useState } from "react";
import { Combobox } from "@/components/motion/combobox";

const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "svelte", label: "SvelteKit" },
  { value: "solid", label: "SolidStart" },
  { value: "qwik", label: "Qwik City" },
  { value: "gatsby", label: "Gatsby" },
];

const LANGUAGES = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "python", label: "Python" },
  { value: "elixir", label: "Elixir" },
];

export function ComboboxPreview() {
  const [framework, setFramework] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6 p-8">
      <div className="w-full">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Framework</p>
        <Combobox
          items={FRAMEWORKS}
          value={framework}
          onChange={setFramework}
          placeholder="Select a framework…"
        />
        {framework && (
          <p className="mt-2 text-xs text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{FRAMEWORKS.find((f) => f.value === framework)?.label}</span>
          </p>
        )}
      </div>

      <div className="w-full">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Language</p>
        <Combobox
          items={LANGUAGES}
          value={language}
          onChange={setLanguage}
          placeholder="Pick a language…"
        />
      </div>

      <div className="w-full rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
        <p>Type to filter · ↑↓ navigate · Enter select · Esc close</p>
      </div>
    </div>
  );
}
