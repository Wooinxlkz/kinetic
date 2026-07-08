import type { Metadata } from "next";
import { CodeBlock } from "@/components/app/docs/code-block";

export const metadata: Metadata = {
  title: "MCP Server",
  description:
    "Connect the Kinetic UI MCP server to Claude, Codex, Cursor, or any MCP-compatible agent. Full tool reference with parameters and response shapes.",
  alternates: { canonical: "/docs/ai-agents/mcp" },
  openGraph: {
    title: "MCP Server · Kinetic UI",
    description: "Full tool reference for the Kinetic UI MCP server.",
    url: "/docs/ai-agents/mcp",
    type: "article",
    siteName: "Kinetic UI",
    images: ["/api/og"],
  },
};

const MCP_URL = "https://mcp.beui.dev/mcp";

const CLAUDE_SNIPPET = `# Claude Code
claude mcp add --transport http beui ${MCP_URL}

# Codex
codex mcp add beui --url ${MCP_URL}

# Amp
amp mcp add beui ${MCP_URL}

# Cursor / any JSON config
{
  "mcpServers": {
    "beui": { "type": "http", "url": "${MCP_URL}" }
  }
}`;

const LIST_SNIPPET = `// Tool: list_components
// No required parameters

// Response
[
  {
    "slug": "tilt-card",
    "name": "Tilt Card",
    "category": "motion",
    "description": "Smooth 3-axis perspective tilt that tracks the cursor.",
    "page_url": "https://beui.dev/components/motion/tilt-card"
  },
  // …one entry per component
]`;

const SEARCH_SNIPPET = `// Tool: search_components
// Parameters:
//   query  string  — free-text search across name, description, and category

// Example call (agent pseudo-code)
await mcp.callTool("beui", "search_components", { query: "toast notification" });

// Response — same shape as list_components, filtered by relevance`;

const GET_SNIPPET = `// Tool: get_component
// Parameters:
//   slug  string  — component slug (from list or search)

// Example
await mcp.callTool("beui", "get_component", { slug: "animated-toast-stack" });

// Response
{
  "slug": "animated-toast-stack",
  "name": "Animated Toast Stack",
  "description": "Stacked toast notifications with spring entrance and swipe-to-dismiss.",
  "category": "motion",
  "page_url": "https://beui.dev/components/motion/animated-toast-stack",
  "detail_url": "https://beui.dev/r/animated-toast-stack",
  "raw_url":    "https://beui.dev/r/animated-toast-stack/raw",
  "dependencies": ["motion", "lucide-react"],
  "internal":     ["@/lib/utils"],
  "files": [
    {
      "path":    "components/motion/animated-toast-stack.tsx",
      "type":    "component",
      "content": "/* full source */"
    },
    {
      "path":    "lib/utils.ts",
      "type":    "util",
      "content": "/* full source */"
    }
  ]
}`;

const INSTALL_CMD_SNIPPET = `// Tool: get_install_command
// Parameters:
//   slug  string  — component slug
//   pm    string  — "npx" | "pnpm" | "bun" | "yarn"  (optional, default "npx")

await mcp.callTool("beui", "get_install_command", {
  slug: "tilt-card",
  pm: "pnpm",
});

// Response
"pnpm dlx shadcn@latest add https://beui.dev/r/tilt-card.json"`;

const AGENT_FLOW = `// Typical agent workflow using MCP tools

// 1. User: "add an animated notification component"
const results = await mcp.callTool("beui", "search_components", {
  query: "notification toast"
});

// 2. Agent picks the best match
const component = await mcp.callTool("beui", "get_component", {
  slug: results[0].slug
});

// 3. Write files
for (const file of component.files) {
  await fs.writeFile(\`src/\${file.path}\`, file.content);
}

// 4. Install deps
await exec(\`pnpm add \${component.dependencies.join(" ")}\`);

// 5. Confirm with user
console.log(\`Installed \${component.name}. Import from ./\${component.files[0].path}\`);`;

export default function McpPage() {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        AI Agents · Reference
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        MCP Server
      </h1>
      <p className="mt-3 text-muted-foreground">
        The Kinetic UI MCP server exposes four tools that let any compatible
        agent list, search, fetch, and install components without leaving the
        conversation. Hosted at{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs text-foreground">
          {MCP_URL}
        </code>
        .
      </p>

      <h2 id="connect" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Connect
      </h2>
      <p className="mt-2 text-muted-foreground">
        One command for most CLI-based agents. For GUI tools (Cursor, Windsurf)
        use the JSON config snippet.
      </p>
      <div className="mt-4">
        <CodeBlock code={CLAUDE_SNIPPET} lang="bash" filename="terminal" />
      </div>

      <h2 id="tools" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Tool reference
      </h2>

      <h3 id="list-components" className="mt-8 text-base font-semibold tracking-tight text-foreground">
        list_components
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Returns the full catalogue — slug, name, category, and description for
        every component. No parameters required. Call this first to orient the
        agent.
      </p>
      <div className="mt-3">
        <CodeBlock code={LIST_SNIPPET} lang="ts" filename="list_components" />
      </div>

      <h3 id="search-components" className="mt-8 text-base font-semibold tracking-tight text-foreground">
        search_components
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Full-text search across name, description, and category. Returns the
        same shape as{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">list_components</code>
        , filtered to matching results.
      </p>
      <div className="mt-3">
        <CodeBlock code={SEARCH_SNIPPET} lang="ts" filename="search_components" />
      </div>

      <h3 id="get-component" className="mt-8 text-base font-semibold tracking-tight text-foreground">
        get_component
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Fetches the full entry for one component: source files, external
        dependencies, and internal utilities. All files arrive inline — no
        secondary fetches needed.
      </p>
      <div className="mt-3">
        <CodeBlock code={GET_SNIPPET} lang="ts" filename="get_component" />
      </div>

      <h3 id="get-install-command" className="mt-8 text-base font-semibold tracking-tight text-foreground">
        get_install_command
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Returns the ready-to-run{" "}
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">shadcn add</code>{" "}
        command for a given slug and package manager. Useful when you want the
        agent to hand off installation to the user rather than writing files
        directly.
      </p>
      <div className="mt-3">
        <CodeBlock code={INSTALL_CMD_SNIPPET} lang="ts" filename="get_install_command" />
      </div>

      <h2 id="typical-workflow" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Typical agent workflow
      </h2>
      <p className="mt-2 text-muted-foreground">
        Search → pick → fetch → write files → install deps. The component entry
        ships all internal utilities inline, so the agent never has to chase
        transitive imports.
      </p>
      <div className="mt-4">
        <CodeBlock code={AGENT_FLOW} lang="ts" filename="agent-workflow.ts" />
      </div>

      <h2 id="notes" className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        Notes
      </h2>
      <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {[
          "The MCP server is read-only — it has no write tools. All modifications happen in the user's project.",
          "Responses are fully static and CDN-cached. Sub-millisecond latency from most regions.",
          "file.type is either 'component', 'preview', or 'util'. Agents should only write component and util types.",
          "dependencies lists npm package names only. internal lists @/ aliased paths that are shipped inline.",
          "The server is transport-agnostic. HTTP streaming and SSE are both supported.",
        ].map((note, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5">
            <span className="mt-0.5 font-mono text-xs text-muted-foreground">{i + 1}.</span>
            <p className="text-sm text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
