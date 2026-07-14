---
name: Sandboxed live JSX/React preview without a bundler
description: How to render untrusted user-submitted React+Tailwind code live in an iframe with no build step, for community/UGC preview features.
---

For rendering untrusted user-submitted React components live (not just as static code/screenshots), a bundler-free sandbox works well:

- `<iframe sandbox="allow-scripts" srcDoc={html}>` — deliberately omit `allow-same-origin`, which gives the doc a unique opaque origin (no access to parent cookies/localStorage/DOM).
- Inside the srcDoc: an `<script type="importmap">` mapping bare specifiers (`react`, `react-dom/client`, `framer-motion`, `lucide-react`, etc.) to esm.sh CDN URLs, so the user's code can use normal `import` statements with zero bundling.
- Babel Standalone (`@babel/standalone` from unpkg) transforms only JSX (`presets: ["react"]`) — leave `import`/`export default` untouched since the output is loaded as a real ES module (via `Blob` + `URL.createObjectURL` + dynamic `import()`), not eval'd as a script.
- Tailwind's Play CDN script (`cdn.tailwindcss.com`) JIT-compiles utility classes found in the rendered markup — no build step needed for styling either.
- User code is embedded via `<script type="text/plain">` (inert, read via `.textContent`), not interpolated as executable JS — but you must still escape literal `</script` sequences in it, because the HTML tokenizer closes the tag on that string regardless of `type`.
- Contract: require a default-exported component function; reject anything else with a caught error rendered inline (and optionally `postMessage`'d to the parent for logging).

**Why:** this was built for Kinetic's community "publish your work" feature — needed real interactive live previews (not screenshots), and a full bundler pipeline per submission was too heavy for MVP scope.

**How to apply:** reuse this pattern for any future UGC/sandbox-preview feature needing live, isolated JS execution without server-side bundling.
