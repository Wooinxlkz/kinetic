"use client";

import { useState } from "react";
import { TagInput } from "@/components/motion/tag-input";

const SUGGESTIONS = ["react", "typescript", "nextjs", "tailwind", "framer", "vite", "shadcn", "vercel", "bun", "pnpm"];

export function TagInputPreview() {
  const [tags, setTags] = useState(["react", "typescript"]);
  return (
    <div className="mx-auto max-w-md p-8">
      <p className="mb-3 text-sm font-semibold text-foreground">Technologies</p>
      <TagInput
        value={tags}
        onChange={setTags}
        suggestions={SUGGESTIONS}
        placeholder="Add technology…"
        maxTags={8}
      />
    </div>
  );
}
