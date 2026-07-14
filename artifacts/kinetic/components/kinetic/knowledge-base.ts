/**
 * Kinetic AI — Knowledge Base
 *
 * Every entry describes a topic the assistant knows about.
 * keywords: words that trigger this entry (lowercased)
 * answer: the response shown to the user (markdown-lite: **bold**, `code`, newlines)
 */

export interface KbEntry {
  id: string;
  keywords: string[];
  answer: string;
}

export const KB: KbEntry[] = [
  // ─── WHAT IS KINETIC ──────────────────────────────────────────────────────
  {
    id: "what-is",
    keywords: ["what is kinetic", "what is this", "about", "kinetic ui", "what does this do", "overview", "intro", "introduction", "explain"],
    answer: `**Kinetic UI** is an open-source React component toolkit built for Next.js and React projects.

It provides motion-first primitives — every component is animated by default using **motion/react** (Framer Motion), with spring physics, blur transitions, and reduced-motion support baked in.

Components install in one command via the **shadcn registry**. Everything is MIT-licensed and free to use. Pro membership unlocks early access, source downloads, and Discord.

Browse at **/components**, **/icons**, **/playground**, and **/docs**.`,
  },

  // ─── INSTALLATION ─────────────────────────────────────────────────────────
  {
    id: "install",
    keywords: ["install", "installation", "how to use", "get started", "setup", "add to project", "npx", "cli", "shadcn", "registry"],
    answer: `Install any component with the shadcn CLI:

\`\`\`
npx shadcn@latest add https://kinetic.dev/r/<component-slug>
\`\`\`

For example, to install the **Button**:
\`npx shadcn@latest add https://kinetic.dev/r/button-base\`

You can also visit **/docs/installation** for a full walkthrough, or **/r/registry.json** for the full registry JSON.

Requirements: React 18+, Tailwind CSS v4, **motion** (motion/react).`,
  },

  // ─── COMPONENTS OVERVIEW ──────────────────────────────────────────────────
  {
    id: "components-overview",
    keywords: ["components", "all components", "list components", "what components", "how many components", "component list"],
    answer: `Kinetic UI has **3 categories** of components:

**Components** (motion primitives) — ~50 individual components covering buttons, inputs, overlays, tables, text effects, scroll, backgrounds, and more.

**Patterns** (blocks) — ~15 composed, product-ready widgets: swap widget, wallet card, command palette, dynamic island, file upload, OTP input, bloom menu, feedback widget, 404 pages, and more.

**AI components** — 4 primitives for chat UIs: Agent Input, Chat Bubble, Streaming Text, and Tool Card.

Browse them all at **/components**.`,
  },

  // ─── BUTTON ───────────────────────────────────────────────────────────────
  {
    id: "button",
    keywords: ["button", "btn", "stateful button", "magnetic button", "press"],
    answer: `The **Button** component comes in three variants:

**Button** (base) — spring press scale, hover lift, all standard variants and sizes.
\`npx shadcn@latest add https://kinetic.dev/r/button-base\`

**Stateful Button** — transitions through idle → loading → success/error with blur-swap slots and morphing width.
\`npx shadcn@latest add https://kinetic.dev/r/button-stateful\`

**Magnetic Button** — cursor-attracted pull via the Magnetic wrapper.
\`npx shadcn@latest add https://kinetic.dev/r/button-magnetic\`

View at **/components/motion/button**.`,
  },

  // ─── TABLE ────────────────────────────────────────────────────────────────
  {
    id: "table",
    keywords: ["table", "data table", "virtualized", "sortable", "editable table", "async table", "10k rows"],
    answer: `The **Table** component is a virtualized data table that stays smooth at 10,000+ rows.

Three variants:
- **Data Table** — sortable headers, row selection, column resize and reorder, sticky header.
- **Editable Table** — edit cells inline, insert/delete rows and columns via border handles.
- **Async Table** — loads pages on demand with skeleton rows and infinite scroll.

\`npx shadcn@latest add https://kinetic.dev/r/table\`

View at **/components/motion/table**.`,
  },

  // ─── DOCK ─────────────────────────────────────────────────────────────────
  {
    id: "dock",
    keywords: ["dock", "macos dock", "navigation dock", "app dock"],
    answer: `The **Dock** is a macOS-style navigation dock with grouped actions and a gliding active pill indicator.

\`npx shadcn@latest add https://kinetic.dev/r/dock\`

View at **/components/motion/dock**.`,
  },

  // ─── DIALOG / MODAL ───────────────────────────────────────────────────────
  {
    id: "dialog",
    keywords: ["dialog", "modal", "popup", "overlay", "morphing modal"],
    answer: `**Dialog** — spring-scale modal with backdrop blur, focus trap, Esc-to-close, body scroll lock. Composable sub-components: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose.
\`npx shadcn@latest add https://kinetic.dev/r/dialog\`

**Morphing Modal** — a single panel that morphs its height as you navigate between inner views, with blur cross-fade on content.
\`npx shadcn@latest add https://kinetic.dev/r/morphing-modal\`

View at **/components/motion/dialog** and **/components/motion/morphing-modal**.`,
  },

  // ─── INPUT / TEXTAREA ─────────────────────────────────────────────────────
  {
    id: "input",
    keywords: ["input", "text input", "textarea", "form input", "floating label", "error shake"],
    answer: `**Input** — text input with floating label, left/right icons, error shake animation, and success check draw.
\`npx shadcn@latest add https://kinetic.dev/r/input\`

**Textarea** — auto-resizing textarea with spring error-shake, success/error state icons, floating label, hint text, and min/max row bounds.
\`npx shadcn@latest add https://kinetic.dev/r/textarea\`

View at **/components/motion/input** and **/components/motion/textarea**.`,
  },

  // ─── TABS ─────────────────────────────────────────────────────────────────
  {
    id: "tabs",
    keywords: ["tabs", "tab bar", "tab indicator", "segmented control"],
    answer: `The **Tabs** component supports pill, segment, and underline variants with a spring layoutId indicator that glides between tabs.

\`npx shadcn@latest add https://kinetic.dev/r/tabs\`

View at **/components/motion/tabs**.`,
  },

  // ─── SWITCH / CHECKBOX / RADIO ───────────────────────────────────────────
  {
    id: "form-controls",
    keywords: ["switch", "toggle", "checkbox", "radio", "radio group", "form controls"],
    answer: `**Switch** — spring-driven thumb with press feedback.
\`npx shadcn@latest add https://kinetic.dev/r/switch\`

**Checkbox** — draw-on checkmark, spring press feedback, indeterminate state.
\`npx shadcn@latest add https://kinetic.dev/r/checkbox\`

**Radio Group** — gliding layoutId indicator dot and spring press feedback.
\`npx shadcn@latest add https://kinetic.dev/r/radio\`

View at **/components/motion**.`,
  },

  // ─── SELECT / COMBOBOX ───────────────────────────────────────────────────
  {
    id: "select",
    keywords: ["select", "dropdown", "combobox", "searchable select", "morph select", "autocomplete"],
    answer: `**Select** — composable primitives where the panel bouncily unfolds. A **Morph Select** variant grows the trigger into the panel via shared layout.
\`npx shadcn@latest add https://kinetic.dev/r/select\`
\`npx shadcn@latest add https://kinetic.dev/r/select-morph\`

**Combobox** — searchable select with spring dropdown, filtered list, checkmarks, description rows, icon support, clear button, empty state.
\`npx shadcn@latest add https://kinetic.dev/r/combobox\`

View at **/components/motion/select**.`,
  },

  // ─── SCROLL ───────────────────────────────────────────────────────────────
  {
    id: "scroll",
    keywords: ["scroll", "smooth scroll", "lenis", "scroll progress", "parallax", "scroll reveal", "scroll to"],
    answer: `Kinetic has a full **Scroll Animation** suite built on Lenis:

- **Smooth Scroll** — Lenis provider with a \`useSmoothScroll\` hook.
- **Scroll Progress** — fixed bar or circular ring reading progress indicator.
- **Parallax** — drifts children at a speed factor as they cross the viewport.
- **Scroll To** — smooth-scrolls to a target element.
- **Scroll Reveal** — spring slide + blur as elements enter the viewport.

\`npx shadcn@latest add https://kinetic.dev/r/smooth-scroll\`

View at **/components/motion/scroll-animation**.`,
  },

  // ─── TEXT EFFECTS ─────────────────────────────────────────────────────────
  {
    id: "text",
    keywords: ["text", "text reveal", "text shimmer", "text cascade", "text morph", "morphing text", "typewriter", "word cycle", "hero text"],
    answer: `Kinetic has several **text animation** components:

- **Text Reveal** — word or character reveal with spring slide-up and blur.
- **Text Shimmer** — gradient sweep for loading states or emphasis.
- **Text Cascade** — letter-by-letter slot roll (old letters drop, new ones land).
- **Text Morph** — shared characters physically glide to new positions via layoutId.
- **Morphing Text** — auto-cycles through words with blur-in/out per character.

\`npx shadcn@latest add https://kinetic.dev/r/text-reveal\`

View at **/components/motion/text-animation**.`,
  },

  // ─── LOADERS ──────────────────────────────────────────────────────────────
  {
    id: "loader",
    keywords: ["loader", "loading", "spinner", "loading indicator", "dots", "bars", "skeleton"],
    answer: `**Loader** — 17 variants: spinner, dots, bars, dot-matrix, dither, morph, comet, scramble, metaballs, newton, helix, percent, and 5 terminal ASCII spinners.
\`npx shadcn@latest add https://kinetic.dev/r/loader\`

**Skeleton** — shimmer placeholder with rect, circle, and multi-line text variants. Includes SkeletonCard and SkeletonTable composites.
\`npx shadcn@latest add https://kinetic.dev/r/skeleton\`

View at **/components/motion/loader**.`,
  },

  // ─── BACKGROUNDS ──────────────────────────────────────────────────────────
  {
    id: "backgrounds",
    keywords: ["background", "shader", "mesh gradient", "grain", "warp", "waves", "flickering grid", "animated background", "canvas"],
    answer: `**Shader Background** — WebGL canvas shader backgrounds: mesh gradient, grain, warp, waves, voronoi, dot orbit, and more. Single \`variant\` prop.
\`npx shadcn@latest add https://kinetic.dev/r/shader-background\`

**Flickering Grid** — canvas grid where each cell independently flickers its opacity for a living texture.
\`npx shadcn@latest add https://kinetic.dev/r/flickering-grid\`

View at **/components/motion/shader-background**.`,
  },

  // ─── CAROUSEL / WHEEL ─────────────────────────────────────────────────────
  {
    id: "carousel",
    keywords: ["carousel", "cylinder carousel", "wheel picker", "ios picker", "drum picker", "3d carousel", "coverflow"],
    answer: `**Cylinder Carousel** — items line the inside of a 3D cylinder, receding into the center and growing toward edges. Drag, scroll, or arrow-key to roll it.
\`npx shadcn@latest add https://kinetic.dev/r/cylinder-carousel\`

**Wheel Picker** — iOS-style 3D cylinder picker with physics-based flick, touch drag, mouse drag, trackpad wheel, and keyboard navigation.
\`npx shadcn@latest add https://kinetic.dev/r/wheel-picker\`

View at **/components/motion/cylinder-carousel**.`,
  },

  // ─── BOTTOM SHEET / DRAWER ───────────────────────────────────────────────
  {
    id: "sheet-drawer",
    keywords: ["bottom sheet", "drawer", "side panel", "sheet", "slide in", "vaul"],
    answer: `**Bottom Sheet** — Vaul-inspired draggable bottom sheet with snap points, inertia, and glass surface.
\`npx shadcw@latest add https://kinetic.dev/r/bottom-sheet\`

**Drawer** — side panel that slides in from left or right with a spring, backdrop blur, body scroll lock, and Esc-to-close.
\`npx shadcn@latest add https://kinetic.dev/r/drawer\``,
  },

  // ─── CARD EFFECTS ─────────────────────────────────────────────────────────
  {
    id: "cards",
    keywords: ["tilt card", "magic card", "border beam", "card", "spotlight", "glow", "hover effect"],
    answer: `**Tilt Card** — 3D perspective tilt on hover with cursor-tracked glare.
\`npx shadcn@latest add https://kinetic.dev/r/tilt-card\`

**Magic Card** — cursor-tracking radial gradient spotlight behind the card surface.
\`npx shadcn@latest add https://kinetic.dev/r/magic-card\`

**Border Beam** — sweeping gradient comet that travels clockwise around any container's border.
\`npx shadcn@latest add https://kinetic.dev/r/border-beam\``,
  },

  // ─── PATTERNS/BLOCKS ──────────────────────────────────────────────────────
  {
    id: "patterns",
    keywords: ["patterns", "blocks", "widgets", "command palette", "dynamic island", "wallet card", "swap widget", "otp", "bloom menu", "feedback widget", "file upload", "prediction market", "expandable"],
    answer: `**Patterns** are composed, product-ready widgets at **/components/blocks**:

- **Command Palette** — ⌘K palette with fuzzy filter and glass surface.
- **Dynamic Island** — iOS-style pill that morphs between live activity views.
- **Wallet Card** — crypto wallet overview with account switcher, balance, and actions.
- **Multi-chain Swap** — cross-chain token swap widget.
- **Bloom Menu** — button that morphs into a radially-staggered grid menu.
- **OTP Input** — one-time-code input with rolling digits and gliding focus ring.
- **File Upload** — drag-and-drop queue with progress rows.
- **Feedback Widget** — corner trigger that morphs into a feedback popup.
- **Hero Video Dialog** — thumbnail with animated play button opening a fullscreen dialog.
- **404 / Not Found** — 5 animated 404 page styles (glitch, magnetic, spotlight, stacked, terminal).
- **Swipeable List**, **Overflow Actions**, **Expandable Action Bar**, **Expandable Tabs**`,
  },

  // ─── AI COMPONENTS ────────────────────────────────────────────────────────
  {
    id: "ai-components",
    keywords: ["ai component", "chat bubble", "agent input", "streaming text", "tool card", "chat ui", "llm ui"],
    answer: `The **AI** category has 4 components for building chat and agent UIs:

**Agent Input** — auto-resizing chat input with send/stop states, suggestion chips, and staged file attachments.
\`npx shadcn@latest add https://kinetic.dev/r/agent-input\`

**Chat Bubble** — animated user/assistant message bubbles with spring entry, typing indicator, and MessageList.
\`npx shadcn@latest add https://kinetic.dev/r/chat-bubble\`

**Streaming Text** — character-by-character text reveal that simulates live token streaming, with blinking cursor.
\`npx shadcn@latest add https://kinetic.dev/r/streaming-text\`

**Tool Card** — collapsible card for AI tool invocations with running/done/error states and expandable I/O.
\`npx shadcn@latest add https://kinetic.dev/r/tool-card\`

View at **/components/ai**.`,
  },

  // ─── ICONS OVERVIEW ───────────────────────────────────────────────────────
  {
    id: "icons-overview",
    keywords: ["icons", "icon", "all icons", "icon list", "what icons"],
    answer: `Kinetic UI ships two icon sets at **/icons**:

**Static Icons** — clean stroke-based SVG components across 12 categories: Interface, Arrows, Actions, Media, Tech, Social, Communication, Data, Design, Devices, Files, Map, Navigation, Status, Time, User, Misc.

**Animated Icons** — motion-first icon components: Bell, Bookmark, Check, Chevron Down, Cloud Upload, Copy, Download, Edit Pencil, Eye Blink, Heart, Loading Dots, Lock, Magnet, Menu↔Close, Plus↔Minus, Progress, Pulse Dot, Refresh, Rocket, Search, Send, Settings Gear, Sparkle, Spinner, Star, Sun↔Moon, Thumbs Up, Toggle, Trash, Typing Indicator, Volume Wave, Alert Pulse, Arrow Right Slide.

Browse and copy at **/icons**.`,
  },

  // ─── ANIMATED ICONS ───────────────────────────────────────────────────────
  {
    id: "animated-icons",
    keywords: ["animated icon", "animated icons", "motion icon", "spinning", "bell icon", "sparkle icon", "spinner icon"],
    answer: `Kinetic has **30+ animated icons** at **/icons/animated**:

Bell, Bookmark, Check, Chevron Down, Cloud Upload, Copy, Download, Edit Pencil, Eye Blink, Heart, Loading Dots, Lock, Magnet, Menu↔Close, Plus↔Minus, Progress, Pulse Dot, Refresh, Rocket, Search, Send, Settings Gear, Sparkle, Spinner, Star, Sun↔Moon, Thumbs Up, Toggle, Trash, Typing Indicator, Volume Wave, Alert Pulse, Arrow Right Slide.

Each icon is a self-contained React component with a trigger prop (hover, click, always). No extra deps.`,
  },

  // ─── PLAYGROUND ───────────────────────────────────────────────────────────
  {
    id: "playground",
    keywords: ["playground", "motion playground", "spring", "tween", "easing", "stagger", "gestures", "keyframes", "scroll demo", "curve editor"],
    answer: `The **Motion Playground** at **/playground** is an interactive lab for exploring motion parameters in real time.

**Demos available:**
- **Spring** — stiffness, damping, mass controls with live preview.
- **Tween** — duration and custom cubic-bezier curve editor.
- **Stagger** — staggered child animations with delay and order controls.
- **Gestures** — drag, hover, and tap interactions.
- **Keyframes** — multi-step keyframe sequences.
- **Scroll** — scroll-triggered animation preview.

Each demo shows the **code output** you can copy directly into your project.`,
  },

  // ─── MOTION PATTERNS / DOCS ───────────────────────────────────────────────
  {
    id: "motion-patterns",
    keywords: ["motion pattern", "motion guide", "animation guide", "when to animate", "icon motion", "reveal", "press", "expand", "page shift", "easing"],
    answer: `**/docs/motion-patterns** covers 5 core motion patterns used throughout Kinetic UI:

**Icon motion** (480–720ms) — move icons like their real action. Bell swings from the top, download drops.

**Reveal** (480–560ms) — fade in, lift 12px, remove blur. Don't stagger every tiny child.

**Press** (120–180ms) — scale down slightly, spring back fast.

**Expand** (260–360ms) — open the shape first, then reveal the content. Text fades in after the shape moves.

**Page shift** (160–240ms) — old view exits fast, new view fades in with a 4px move.`,
  },

  // ─── EASING & SPRINGS ────────────────────────────────────────────────────
  {
    id: "easing",
    keywords: ["easing", "ease", "cubic bezier", "spring", "stiffness", "damping", "mass", "spring physics", "docs easing", "docs springs"],
    answer: `Kinetic documents its motion constants at **/docs/motion/easing** and **/docs/motion/springs**.

**Easing** — custom cubic-bezier presets used across components: ease-out for reveals, custom curves for snap interactions.

**Springs** — spring configs (stiffness, damping, mass) for different feels:
- Snappy UI: stiffness 500–620, damping 28–38, mass 0.5–0.8
- Bouncy: stiffness 300, damping 20, mass 1
- Slow/heavy: stiffness 80, damping 15, mass 1.5

The **Playground** at **/playground** lets you tune these values live.`,
  },

  // ─── THEME ────────────────────────────────────────────────────────────────
  {
    id: "theme",
    keywords: ["theme", "color theme", "dark mode", "light mode", "theming", "css variables", "blood orange", "palette"],
    answer: `Kinetic uses a **CSS variable theming system** documented at **/docs/theme**.

Themes are applied via \`data-theme\` on the root element. The default theme is **blood-orange**.

You can toggle between light and dark mode — the **Theme Toggle** component (**/components/motion/theme-toggle**) does a full-page clip-path reveal via the View Transition API.

CSS variables cover colors, radius, fonts, and spacing. Import the theme CSS from **/theme.css**.`,
  },

  // ─── MEMBERSHIP / PLANS ──────────────────────────────────────────────────
  {
    id: "membership",
    keywords: ["membership", "pricing", "plans", "pro", "sponsor", "lifetime", "free", "cost", "subscribe", "paid", "price"],
    answer: `Kinetic UI has 4 tiers — all components are free and MIT licensed:

**Free** ($0) — all motion components, blocks, shadcn registry install, MIT license, community support.

**Pro** ($9/mo or ~$7/mo yearly) — everything in Free + early access to new components, GIF avatars & banners, source file downloads, private Discord channel, priority GitHub issues.

**Sponsor** ($29/mo or ~$23/mo yearly) — everything in Pro + logo on site & README, custom component requests, 3 team seats, 48h priority support, Slack/Discord access.

**Lifetime** ($229, one-time) — all Pro features forever, no renewals, unlimited copies.

View plans at **/membership**.`,
  },

  // ─── RESUME PAGE ──────────────────────────────────────────────────────────
  {
    id: "resume",
    keywords: ["resume", "cv", "portfolio", "about author", "who made this", "creator"],
    answer: `The **/resume** page is an interactive resume / CV with animated sections.

It displays professional experience, skills, education, achievements, and contact information. Sections use Kinetic's own scroll-reveal and text animations. There's a downloadable option for the full CV.`,
  },

  // ─── DOCS OVERVIEW ────────────────────────────────────────────────────────
  {
    id: "docs",
    keywords: ["docs", "documentation", "guide", "how to", "changelog", "help", "ai agents", "mcp", "llms"],
    answer: `The **/docs** section covers:

- **/docs/installation** — how to install Kinetic and add components.
- **/docs/theme** — CSS variable theming system and color palettes.
- **/docs/motion-patterns** — 5 core animation patterns with specs and code.
- **/docs/motion/easing** — cubic-bezier presets.
- **/docs/motion/springs** — spring configuration reference.
- **/docs/changelog** — every release and update in reverse-chronological order.
- **/docs/ai-agents** — how to use Kinetic with AI coding agents.
- **/docs/ai-agents/mcp** — Model Context Protocol server for Kinetic.
- **/docs/ai-agents/registry** — shadcn registry endpoint for AI tools.
- **/docs/help** — FAQ and support.`,
  },

  // ─── AI AGENTS / MCP ─────────────────────────────────────────────────────
  {
    id: "ai-agents",
    keywords: ["ai agent", "mcp", "cursor", "copilot", "claude", "llm integration", "llms.txt", "registry json", "ai coding"],
    answer: `Kinetic UI integrates with AI coding assistants at **/docs/ai-agents**:

**MCP Server** — a Model Context Protocol server lets Cursor, Claude, and other MCP-capable tools query Kinetic components directly.

**Registry endpoint** — \`/r/registry.json\` and \`/registry.json\` expose the full shadcn-compatible registry for AI tools.

**llms.txt** — \`/llms.txt\` provides a structured text summary of all components optimized for LLM context.

These allow AI agents to find, suggest, and install Kinetic components without browsing the docs manually.`,
  },

  // ─── ORBITING CIRCLES / VISUAL ───────────────────────────────────────────
  {
    id: "visual-effects",
    keywords: ["orbiting circles", "orbit", "animated beam", "confetti", "number ticker", "animated number", "animated badge", "marquee"],
    answer: `Visual effect components in Kinetic:

**Orbiting Circles** — elements orbit a center point at configurable radii, speeds, and phase offsets. New.
**Animated Beam** — SVG beam connecting two DOM elements with a traveling light spot. New.
**Confetti** — canvas particle burst (circles, squares, ribbons) fired from any position. New.
**Flickering Grid** — canvas grid with independently flickering cells. New.
**Marquee** — infinite horizontal or vertical scroll with pause-on-hover.
**Number Ticker** — slot-machine rolling digits with staggered entry.
**Animated Number** — spring-driven count-up triggered when in view.
**Animated Badge** — status badge with animated state icons and pulse feedback.

View at **/components/motion**.`,
  },

  // ─── TOOLTIP / POPOVER / DROPDOWN ────────────────────────────────────────
  {
    id: "overlay-components",
    keywords: ["tooltip", "popover", "dropdown", "dropdown menu", "context menu", "floating", "hover tooltip"],
    answer: `**Tooltip** — hover or focus tooltip with blur enter/exit and spring spawn.
\`npx shadcn@latest add https://kinetic.dev/r/tooltip\`

**Popover** — click-triggered floating panel with side/alignment control, spring blur entrance, outside-click and Esc dismissal.
\`npx shadcn@latest add https://kinetic.dev/r/popover\`

**Dropdown Menu** — click-triggered menu with staggered item entrance, separator, label, shortcut, and destructive variants.
\`npx shadcn@latest add https://kinetic.dev/r/dropdown-menu\``,
  },

  // ─── AVATAR / PROGRESS ───────────────────────────────────────────────────
  {
    id: "data-display",
    keywords: ["avatar", "avatar group", "progress bar", "progress", "stacked progress", "range slider"],
    answer: `**Avatar** — image with animated fallback (initials or icon), 6 sizes, 4 status dots, and AvatarGroup with spring entrance and overflow counter.
\`npx shadcn@latest add https://kinetic.dev/r/avatar\`

**Progress** — animated progress bar with spring fill, 5 status variants, 4 sizes, indeterminate mode, and StackedProgress multi-segment variant.
\`npx shadcn@latest add https://kinetic.dev/r/progress\`

**Range Slider** — tick-dot slider with a bouncy vertical-bar thumb that glides between snapped steps.
\`npx shadcn@latest add https://kinetic.dev/r/range-slider\``,
  },

  // ─── ACTION SWAP ─────────────────────────────────────────────────────────
  {
    id: "action-swap",
    keywords: ["action swap", "swap text", "blur swap", "roll text", "cascade text", "cta button"],
    answer: `**Action Swap** — CTA button primitives for swapping text/icons with motion:

- **Cascade** — letter-by-letter slot roll (old letters drop, new ones land left to right).
- **Blur** — copy-button style swap with blur, opacity and scale.
- **Roll** — next text or icon rolls in from below with blur.

\`npx shadcn@latest add https://kinetic.dev/r/action-swap-blur\`

View at **/components/motion/action-swap**.`,
  },

  // ─── FALLBACK ─────────────────────────────────────────────────────────────
  {
    id: "fallback",
    keywords: [],
    answer: `I know about all of Kinetic UI's components, icons, playground, docs, and membership plans. Try asking about:

- A specific component (e.g. "how do I use the Table?" or "what is the Dock?")
- Icons ("what animated icons are available?")
- The Playground ("what can I do in the playground?")
- Membership plans ("what does Pro include?")
- Installation ("how do I install a component?")
- Docs ("what's in the docs?")`,
  },
];
