"use client";

import { useState } from "react";
import { Code, Globe, Layers, Palette, Zap, Database, Lock, Mail } from "lucide-react";
import { Combobox } from "@/components/motion/combobox";

const FRAMEWORKS = [
  { value: "react", label: "React", description: "A JavaScript library for building user interfaces", icon: <Layers className="h-4 w-4" /> },
  { value: "vue", label: "Vue", description: "The progressive JavaScript framework", icon: <Zap className="h-4 w-4" /> },
  { value: "svelte", label: "Svelte", description: "Cybernetically enhanced web apps", icon: <Code className="h-4 w-4" /> },
  { value: "angular", label: "Angular", description: "Platform for building mobile and desktop web apps", icon: <Globe className="h-4 w-4" /> },
  { value: "solid", label: "SolidJS", description: "Simple and performant reactivity for building UIs", icon: <Palette className="h-4 w-4" /> },
  { value: "qwik", label: "Qwik", description: "Resumable JavaScript framework", icon: <Zap className="h-4 w-4" /> },
  { value: "remix", label: "Remix", description: "Full-stack web framework", icon: <Database className="h-4 w-4" /> },
  { value: "nextjs", label: "Next.js", description: "The React framework for production", icon: <Lock className="h-4 w-4" /> },
  { value: "nuxt", label: "Nuxt", description: "The intuitive Vue framework", icon: <Mail className="h-4 w-4" /> },
];

const TIMEZONES = [
  { value: "utc", label: "UTC +0:00 — London" },
  { value: "et", label: "UTC −5:00 — New York" },
  { value: "ct", label: "UTC −6:00 — Chicago" },
  { value: "mt", label: "UTC −7:00 — Denver" },
  { value: "pt", label: "UTC −8:00 — Los Angeles" },
  { value: "ist", label: "UTC +5:30 — Mumbai" },
  { value: "cst", label: "UTC +8:00 — Beijing" },
  { value: "jst", label: "UTC +9:00 — Tokyo" },
  { value: "aest", label: "UTC +10:00 — Sydney" },
];

export function ComboboxPreview() {
  const [framework, setFramework] = useState("");
  const [timezone, setTimezone] = useState("");

  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Framework</label>
        <Combobox
          options={FRAMEWORKS}
          value={framework}
          onValueChange={setFramework}
          placeholder="Select a framework…"
          searchPlaceholder="Search frameworks…"
        />
        {framework && (
          <p className="text-xs text-muted-foreground">
            Selected: <span className="font-medium text-foreground capitalize">{framework}</span>
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Timezone</label>
        <Combobox
          options={TIMEZONES}
          value={timezone}
          onValueChange={setTimezone}
          placeholder="Select timezone…"
          searchPlaceholder="Search timezones…"
          emptyMessage="No timezone matched."
        />
      </div>
    </div>
  );
}
