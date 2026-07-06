---
name: pnpm + Next.js motion/framer-motion fix
description: Running a bun/npm Next.js app inside a pnpm workspace causes vendor chunk and hook errors for the motion package. Documents the exact fix.
---

## The rule

When hosting a Next.js app (designed for bun/npm) inside a pnpm workspace monorepo, add both `transpilePackages` and `allowedDevOrigins` to `next.config.mjs`.

**Why:** pnpm's virtual symlink store gives packages paths like `.pnpm/motion@11.18.2_react-dom@19.1.0_.../node_modules/motion`. Next.js webpack uses these paths as vendor chunk filenames. Two failure modes result:

1. **Missing vendor chunk 500** — webpack-runtime.js references `motion@11.18.2_react-dom@19.1.0_react@19.1.0__react@19.1.0.js` but it is never written to `.next/server/vendor-chunks/`.
2. **"useState is null" hook crash** — `serverExternalPackages: ['motion']` avoids the chunk but makes motion load framer-motion via Node's `require()`, giving it a different React instance than webpack's bundle.

`transpilePackages: ['motion', 'framer-motion']` forces webpack to process both packages through its own pipeline (unified React, proper chunk generation).

**How to apply:** Add to next.config.mjs alongside `allowedDevOrigins` for Replit's proxy:

```js
transpilePackages: ["motion", "framer-motion"],
allowedDevOrigins: [
  "*.replit.dev",
  "*.spock.replit.dev",
  "*.replit.app",
  "127.0.0.1",
  "localhost",
],
```

Also always clear `.next/` cache after changing next.config.mjs, then restart.

**Dead end:** `serverExternalPackages: ['motion']` — fixes the chunk but causes "two React copies" (motion@11's CJS re-exports framer-motion which has its own React reference).

## Known remaining issues (upstream, not introduced)

- `SwapPreview` hydration mismatch — SSR/client diff in the original repo's DeFi preview component. Not our bug.
- HMR WebSocket 502 — Replit's proxy doesn't tunnel `/_next/webpack-hmr` WebSocket. Dev edits require manual page refresh. Expected.
- Homepage hero text invisible in static screenshots — hero uses enter animations (starts invisible). Real users see it animate in; the screenshot tool captures before animation runs.
