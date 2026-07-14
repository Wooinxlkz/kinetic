<div align="center">

<img src="https://kinetic.dev/kinetic-mark.png" width="72" height="72" alt="Kinetic" />

# Kinetic

**Motion-driven UI components for React & Next.js**

Built on [Framer Motion](https://www.framer.com/motion/) · Styled with [Tailwind CSS](https://tailwindcss.com/) · Installed via [shadcn/ui](https://ui.shadcn.com/)

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-purple?logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)

---

</div>

## What is Kinetic?

Kinetic is a production-ready UI component toolkit where **every component moves**. Browse, preview, copy, and install animated React components built on top of Framer Motion and Tailwind CSS — from motion primitives to full interactive blocks.

- 🎬 **100+ animated components** — buttons, inputs, modals, drawers, carousels, tables, and more
- 🎨 **Animated icons** — a full set of purposeful micro-animated SVG icons
- 🧱 **Full UI blocks** — wallet cards, command palettes, prediction markets, knockout brackets, swap interfaces, and more
- ⚡ **One-line install** — copy any component with `npx shadcn add`
- 🛝 **Interactive playground** — tweak spring, tween, and stagger configs live
- 🌗 **Dark mode** — every component supports it out of the box
- 🤖 **AI-agent ready** — MCP server + registry endpoints for Cursor, Claude, Amp, and Codex

---

## Component Categories

| Category | Description |
|----------|-------------|
| **Motion** | Core animated primitives — inputs, buttons, selects, modals, tooltips, tabs, sliders |
| **Blocks** | Fully composed product-ready widgets — wallet card, swap UI, command palette, OTP input |
| **AI** | Components built for AI products — streaming text, agent input, chat bubbles, tool cards |
| **Icons (Animated)** | Micro-animated icons — bell, spinner, heart, bookmark, sparkle, trash, and 30+ more |
| **Icons (Static)** | A complete static icon set across 15 categories |

---

## Quick Start

### Install a component

```bash
npx shadcn@latest add https://kinetic.dev/r/tilt-card
```

### Or install manually

```bash
# 1. Make sure you have shadcn set up
npx shadcn@latest init

# 2. Add any Kinetic component
npx shadcn@latest add https://kinetic.dev/r/<component-slug>
```

### Available components (sample)

```bash
npx shadcn@latest add https://kinetic.dev/r/button
npx shadcn@latest add https://kinetic.dev/r/dialog
npx shadcn@latest add https://kinetic.dev/r/drawer
npx shadcn@latest add https://kinetic.dev/r/tilt-card
npx shadcn@latest add https://kinetic.dev/r/morphing-modal
npx shadcn@latest add https://kinetic.dev/r/text-scramble
npx shadcn@latest add https://kinetic.dev/r/dock
npx shadcn@latest add https://kinetic.dev/r/command-palette
npx shadcn@latest add https://kinetic.dev/r/wallet-card
npx shadcn@latest add https://kinetic.dev/r/confetti
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Animation** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) |
| **Database** | PostgreSQL + [Drizzle ORM](https://orm.drizzle.team/) |
| **Auth** | Custom session-based auth |
| **Payments** | [DodoPayments](https://dodopayments.com/) |
| **Package Manager** | [pnpm](https://pnpm.io/) workspaces |

---

## Project Structure

```
kinetic/
├── artifacts/
│   ├── kinetic/          # Main Next.js web app
│   │   ├── app/          # App Router pages & API routes
│   │   ├── components/
│   │   │   ├── motion/   # All animated components ← the gold
│   │   │   ├── icons/    # Animated + static icon sets
│   │   │   ├── ai/       # AI-focused components
│   │   │   └── app/      # Site shell (nav, auth, docs UI)
│   │   └── lib/          # Registry, theme, auth, utilities
│   └── api-server/       # Express API (auth, storage, community)
├── lib/
│   ├── db/               # Drizzle schema & migrations
│   ├── api-spec/         # OpenAPI contract
│   └── api-client-react/ # Generated React Query hooks
└── README.md
```

---

## Running Locally

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/Wooinxlkz/kinetic.git
cd kinetic

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Fill in: DATABASE_URL, SESSION_SECRET, DODO_PAYMENTS_API_KEY, etc.

# 4. Push the database schema
pnpm --filter @workspace/db run push

# 5. Start the apps
pnpm --filter @workspace/kinetic run dev       # Web app → localhost:3000
pnpm --filter @workspace/api-server run dev    # API → localhost:5000
```

---

## AI Agent Integration

Kinetic exposes a full MCP server and REST registry so AI coding agents can list, search, and install components directly into your project.

### MCP (Claude, Cursor, Amp, Codex)

```json
{
  "mcpServers": {
    "kinetic": {
      "type": "http",
      "url": "https://kinetic.dev/api/mcp"
    }
  }
}
```

### REST Endpoints

```bash
GET https://kinetic.dev/r                     # List all components
GET https://kinetic.dev/r/<slug>.json         # shadcn registry format
GET https://kinetic.dev/r/<slug>/raw          # Raw source with all imports
GET https://kinetic.dev/registry.json         # Full registry manifest
GET https://kinetic.dev/llms.txt              # LLM-friendly component list
```

---

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

This means:
- ✅ You can view, fork, and learn from this code
- ✅ You can use it in open-source projects
- ⚠️ If you run a modified version as a service, you **must** release your source code
- ❌ You cannot use it in closed-source commercial products without releasing your code

See the [LICENSE](./LICENSE) file for full terms.

> **Commercial licensing:** If you need to use Kinetic in a closed-source product, contact us.

---

<div align="center">

Built with ❤️ · [kinetic.dev](https://kinetic.dev) · Give it a ⭐ if it helped you

</div>
