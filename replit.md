# Kinetic

Kinetic is a UI component toolkit site for React & Next.js — a docs/marketing site where developers browse, preview, and copy motion-driven components (built on Framer Motion), plus icons, playground tools, and a membership tier.

## Run & Operate

- `pnpm --filter @workspace/kinetic run dev` — run the Kinetic web app (Next.js, artifact dir `artifacts/kinetic`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/kinetic` — the live Kinetic web app (Next.js), package `@workspace/kinetic`, artifact id `artifacts/kinetic`, served at `/`.
- `artifacts/api-server` — shared Express API (auth, feedback, referrals, object storage).
- `artifacts/mockup-sandbox` — canvas design/preview sandbox.
- `lib/db` — Drizzle schema (users, sessions, feedback, referrals, copy-usage).
- `lib/api-spec`, `lib/api-client-react`, `lib/api-zod` — OpenAPI contract + generated client/schemas.

## Product

Kinetic is a component toolkit/docs site: browse motion components and icons, preview them live, copy install commands (npm/pnpm/bun/yarn), explore a playground, and view membership plans. Includes auth (dev-login + standard), a dev-center admin panel (users, feedback inbox), and a referrals system.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
