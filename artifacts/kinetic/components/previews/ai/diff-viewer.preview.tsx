"use client";

import { DiffViewer, type DiffLine } from "@/components/ai/diff-viewer";

const LINES: DiffLine[] = [
  { kind: "hunk",      content: "@@ -1,6 +1,8 @@",                                          oldNo: undefined, newNo: undefined },
  { kind: "unchanged", content: 'import { useState } from "react";',                          oldNo: 1, newNo: 1 },
  { kind: "unchanged", content: "",                                                            oldNo: 2, newNo: 2 },
  { kind: "unchanged", content: "export function Counter() {",                                 oldNo: 3, newNo: 3 },
  { kind: "remove",    content: "  const [count, setCount] = useState(0);",                   oldNo: 4 },
  { kind: "add",       content: "  const [count, setCount] = useState(0);",                   newNo: 4 },
  { kind: "add",       content: "  const [history, setHistory] = useState<number[]>([]);",    newNo: 5 },
  { kind: "unchanged", content: "",                                                            oldNo: 5, newNo: 6 },
  { kind: "remove",    content: "  const increment = () => setCount(c => c + 1);",            oldNo: 6 },
  { kind: "add",       content: "  const increment = () => {",                                newNo: 7 },
  { kind: "add",       content: "    setHistory(h => [...h, count]);",                        newNo: 8 },
  { kind: "add",       content: "    setCount(c => c + 1);",                                  newNo: 9 },
  { kind: "add",       content: "  };",                                                       newNo: 10 },
  { kind: "unchanged", content: "",                                                            oldNo: 7, newNo: 11 },
  { kind: "unchanged", content: "  return (",                                                 oldNo: 8, newNo: 12 },
  { kind: "unchanged", content: "    <button onClick={increment}>{count}</button>",            oldNo: 9, newNo: 13 },
  { kind: "unchanged", content: "  );",                                                       oldNo: 10, newNo: 14 },
  { kind: "unchanged", content: "}",                                                          oldNo: 11, newNo: 15 },
];

export function DiffViewerPreview() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <DiffViewer
        lines={LINES}
        filename="components/counter.tsx"
        language="tsx"
        collapseUnchanged={3}
      />
    </div>
  );
}
