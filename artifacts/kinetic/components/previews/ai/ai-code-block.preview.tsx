"use client";

import { useState } from "react";
import { AiCodeBlock } from "@/components/ai/ai-code-block";

const CODE = `async function fetchUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`, {
    headers: { Authorization: \`Bearer \${token}\` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
  }

  const data = await res.json();
  return data as User;
}`;

const OUTPUT = `{
  "id": "usr_01j3k9",
  "name": "Alex Kim",
  "email": "alex@example.com",
  "plan": "pro",
  "createdAt": "2025-03-14T08:21:00Z"
}`;

export function AiCodeBlockPreview() {
  const [streaming, setStreaming] = useState(true);

  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      {/* Streaming variant */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Streaming</p>
          <button
            type="button"
            onClick={() => setStreaming((s) => !s)}
            className="rounded-lg bg-muted px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none"
          >
            Toggle stream
          </button>
        </div>
        <AiCodeBlock code={CODE} language="typescript" streaming={streaming} />
      </div>

      {/* Static with run */}
      <div>
        <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Runnable</p>
        <AiCodeBlock
          code={CODE}
          language="typescript"
          streaming={false}
          output={OUTPUT}
          onRun={async () => {
            await new Promise((r) => setTimeout(r, 1400));
          }}
        />
      </div>
    </div>
  );
}
