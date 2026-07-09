export type ComponentExample = {
  slug: string;
  name: string;
  description?: string;
  /** Optional install slug for variants that have their own registry command. */
  installSlug?: string;
  /** Source file shown under Source tab. */
  file: string;
  /** Key into the previews registry (e.g. "motion/button-base"). */
  previewKey: string;
  /** Path to the preview file used for the Usage tab. */
  previewFile: string;
};

export type ComponentEntry = {
  slug: string;
  name: string;
  description: string;
  file: string;
  badge?: "new";
  /** ISO date the component shipped. Drives newest-first order in the landing
   * "Recently launched" section. Set it when adding a "new" badge component. */
  launchedAt?: string;
  /** Optional hand-tuned SEO keywords, merged on top of generated ones. */
  keywords?: string[];
  /** Extra source files bundled under this slug (e.g. multi-file components). */
  extraFiles?: string[];
  /** Per-variant breakdown rendered as separate Preview / Usage / Source on the page. */
  examples?: ComponentExample[];
  /** Filter tags shown as chips on the category page (e.g. "form", "overlay", "mobile"). */
  tags?: string[];
};

export type CategoryEntry = {
  slug: string;
  name: string;
  description: string;
  components: ComponentEntry[];
};

export const registry: CategoryEntry[] = [
  {
    slug: "motion",
    name: "Components",
    description: "Bespoke motion primitives with shadcn-compatible registry endpoints.",
    components: [
      {
        slug: "tilt-card",
        name: "Tilt Card",
        description: "3D perspective tilt on hover with cursor-tracked glare.",
        file: "components/motion/tilt-card.tsx",
        tags: ["interaction", "hover", "card"],
      },
      {
        slug: "button",
        name: "Button",
        description: "Spring-pressed Button plus StatefulButton (idle → loading → success / error) and MagneticButton.",
        file: "components/motion/button/index.tsx",
        extraFiles: [
          "components/motion/button/base.tsx",
          "components/motion/button/stateful.tsx",
          "components/motion/button/magnetic.tsx",
        ],
        tags: ["interaction", "form", "input"],
        examples: [
          {
            slug: "base",
            name: "Button",
            description: "Press scale, hover lift, variants and sizes.",
            installSlug: "button-base",
            file: "components/motion/button/base.tsx",
            previewKey: "motion/button-base",
            previewFile: "components/previews/motion/button-base.preview.tsx",
          },
          {
            slug: "stateful",
            name: "Stateful Button",
            description: "Idle → loading → success / error with blur-swap slots and morphing width.",
            installSlug: "button-stateful",
            file: "components/motion/button/stateful.tsx",
            previewKey: "motion/button-stateful",
            previewFile: "components/previews/motion/button-stateful.preview.tsx",
          },
          {
            slug: "magnetic",
            name: "Magnetic Button",
            description: "Button composed with the Magnetic wrapper for cursor-attracted pull.",
            installSlug: "button-magnetic",
            file: "components/motion/button/magnetic.tsx",
            previewKey: "motion/button-magnetic",
            previewFile: "components/previews/motion/button-magnetic.preview.tsx",
          },
        ],
      },
      {
        slug: "marquee",
        name: "Marquee",
        description: "Infinite horizontal or vertical scroll with pause-on-hover.",
        file: "components/motion/marquee.tsx",
        tags: ["display", "scroll", "media"],
      },
      {
        slug: "tabs",
        name: "Tabs",
        description: "Pill, segment or underline tabs with a spring layoutId indicator.",
        file: "components/motion/tabs.tsx",
        tags: ["navigation", "layout"],
      },
      {
        slug: "switch",
        name: "Switch",
        description: "Toggle with a spring-driven thumb and press feedback.",
        file: "components/motion/switch.tsx",
        tags: ["form", "toggle", "input"],
      },
      {
        slug: "input",
        name: "Input",
        description: "Text input with label, left/right icons, error shake and success check draw.",
        file: "components/motion/input.tsx",
        tags: ["form", "text", "input"],
        keywords: [
          "react animated input",
          "input error shake",
          "floating label input",
          "react form input animation",
          "animated text field",
        ],
      },
      {
        slug: "select",
        name: "Select",
        description: "Composable select primitives whose panel bouncily unfolds out of the trigger and separates, plus a Morph variant where the trigger grows into the panel via shared layout.",
        file: "components/motion/select.tsx",
        tags: ["form", "dropdown", "input"],
        examples: [
          {
            slug: "default",
            name: "Select",
            description: "Composable primitives (Select, SelectTrigger, SelectValue, SelectContent, SelectItem); the panel pinches off the trigger and separates, with staggered items. Position-aware (opens upward when needed).",
            installSlug: "select",
            file: "components/motion/select.tsx",
            previewKey: "motion/select",
            previewFile: "components/previews/motion/select.preview.tsx",
          },
          {
            slug: "morph",
            name: "Morph Select",
            description: "Composable primitives (MorphSelect, MorphSelectTrigger, MorphSelectValue, MorphSelectContent, MorphSelectItem) where the trigger morphs into the panel via a shared layoutId — one continuous surface that grows open and shrinks back, never detaching.",
            installSlug: "select-morph",
            file: "components/motion/select-morph.tsx",
            previewKey: "motion/select-morph",
            previewFile: "components/previews/motion/select-morph.preview.tsx",
          },
        ],
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        description:
          "Form choice control with a draw-on checkmark, spring press feedback and indeterminate state support.",
        file: "components/motion/checkbox.tsx",
        tags: ["form", "input"],
      },
      {
        slug: "radio",
        name: "Radio Group",
        description:
          "Single-select choice control with a gliding layoutId indicator dot and spring press feedback.",
        file: "components/motion/radio.tsx",
        tags: ["form", "input"],
      },
      {
        slug: "bottom-sheet",
        name: "Bottom Sheet",
        description: "Vaul-inspired draggable bottom sheet with snap points, inertia and glass surface.",
        file: "components/motion/bottom-sheet.tsx",
        tags: ["overlay", "mobile", "drag"],
      },
      {
        slug: "shared-layout-bg",
        name: "Shared Layout Background",
        description: "A pill that glides between hovered items via motion's shared layout, with blur enter/exit.",
        file: "components/motion/shared-layout-bg.tsx",
        tags: ["interaction", "hover", "layout"],
      },
      {
        slug: "dock",
        name: "Dock",
        description: "macOS-style dock with grouped actions and a gliding active pill.",
        file: "components/motion/dock.tsx",
        tags: ["navigation", "layout"],
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        description: "Hover or focus tooltip with blur enter/exit and spring spawn.",
        file: "components/motion/tooltip.tsx",
        tags: ["overlay", "feedback"],
      },
      {
        slug: "morphing-modal",
        name: "Morphing Modal",
        description: "Family-app-style modal. A single panel that morphs its height as you navigate between inner views, with blur cross-fade on content.",
        file: "components/motion/morphing-modal.tsx",
        tags: ["overlay", "navigation"],
      },
      {
        slug: "text-animation",
        name: "Text Animation",
        description: "Animated text primitives for reveal sequences, shimmer loading states and letter-cascade swaps.",
        file: "components/motion/text-reveal.tsx",
        extraFiles: [
          "components/motion/text-shimmer.tsx",
          "components/motion/text-cascade.tsx",
        ],
        tags: ["display", "text"],
        examples: [
          {
            slug: "reveal",
            name: "Text Reveal",
            description: "Word or character reveal with spring slide-up and blur.",
            installSlug: "text-reveal",
            file: "components/motion/text-reveal.tsx",
            previewKey: "motion/text-reveal",
            previewFile: "components/previews/motion/text-reveal.preview.tsx",
          },
          {
            slug: "shimmer",
            name: "Text Shimmer",
            description: "Gradient sweep across text for loading or emphasis.",
            installSlug: "text-shimmer",
            file: "components/motion/text-shimmer.tsx",
            previewKey: "motion/text-shimmer",
            previewFile: "components/previews/motion/text-shimmer.preview.tsx",
          },
          {
            slug: "cascade",
            name: "Text Cascade",
            description: "Letter-by-letter slot roll for standalone text — old letters drop away as new ones land, left to right.",
            installSlug: "text-cascade",
            file: "components/motion/text-cascade.tsx",
            previewKey: "motion/text-cascade",
            previewFile: "components/previews/motion/text-cascade.preview.tsx",
          },
        ],
      },
      {
        slug: "number",
        name: "Number Animation",
        description: "Animated number primitives for count-up values and rolling digit tickers.",
        file: "components/motion/animated-number.tsx",
        extraFiles: ["components/motion/number-ticker.tsx"],
        tags: ["display", "counter", "data"],
        examples: [
          {
            slug: "ticker",
            name: "Number Ticker",
            description: "Slot-machine rolling digits with staggered entry.",
            installSlug: "number-ticker",
            file: "components/motion/number-ticker.tsx",
            previewKey: "motion/number-ticker",
            previewFile: "components/previews/motion/number-ticker.preview.tsx",
          },
          {
            slug: "animated",
            name: "Animated Number",
            description: "Spring-driven count-up triggered when in view.",
            installSlug: "animated-number",
            file: "components/motion/animated-number.tsx",
            previewKey: "motion/animated-number",
            previewFile: "components/previews/motion/animated-number.preview.tsx",
          },
        ],
      },
      {
        slug: "animated-badge",
        name: "Animated Badge",
        description: "Status badge with animated state icons, pulse feedback and compact size variants.",
        file: "components/motion/animated-badge.tsx",
        tags: ["display", "feedback", "status"],
      },
      {
        slug: "action-swap",
        name: "Action Swap",
        description: "CTA button and slot primitives for swapping text and icons with blur motion.",
        file: "components/motion/action-swap.tsx",
        tags: ["interaction", "display", "text"],
        examples: [
          {
            slug: "cascade",
            name: "Cascade",
            description: "Letter-by-letter slot roll — the old label's letters drop away as the new ones land, left to right.",
            installSlug: "action-swap-cascade",
            file: "components/motion/action-swap-cascade.tsx",
            previewKey: "motion/action-swap-cascade",
            previewFile: "components/previews/motion/action-swap-cascade.preview.tsx",
          },
          {
            slug: "blur",
            name: "Blur",
            description: "Copy-button style swap with blur, opacity and scale.",
            installSlug: "action-swap-blur",
            file: "components/motion/action-swap-blur.tsx",
            previewKey: "motion/action-swap-blur",
            previewFile: "components/previews/motion/action-swap-blur.preview.tsx",
          },
          {
            slug: "roll",
            name: "Roll",
            description: "The next text or icon rolls in from below with blur.",
            installSlug: "action-swap-roll",
            file: "components/motion/action-swap-roll.tsx",
            previewKey: "motion/action-swap-roll",
            previewFile: "components/previews/motion/action-swap-roll.preview.tsx",
          },
        ],
      },
      {
        slug: "animated-toast-stack",
        name: "Animated Toast Stack",
        description: "Stacked toasts with status morphs, swipe dismissal, actions and layout-aware motion.",
        file: "components/motion/animated-toast-stack.tsx",
        tags: ["overlay", "feedback", "notification"],
      },
      {
        slug: "theme-toggle",
        name: "Theme Toggle",
        description: "Theme toggle button with a full-page rectangle clip-path reveal via the View Transition API.",
        file: "components/motion/theme-toggle.tsx",
        tags: ["interaction", "display"],
      },
      {
        slug: "bouncy-accordion",
        name: "Bouncy Accordion",
        description: "Single-open accordion with weighted spring layout, icon rows and reduced-motion-safe content reveals.",
        file: "components/motion/bouncy-accordion.tsx",
        tags: ["navigation", "layout", "disclosure"],
      },
      {
        slug: "drawer",
        name: "Drawer",
        description: "Side panel that slides in from the left or right with a spring, backdrop blur, body scroll lock and esc-to-close.",
        file: "components/motion/drawer.tsx",
        tags: ["overlay", "navigation", "mobile"],
      },
      {
        slug: "scroll-animation",
        name: "Scroll Animation",
        description: "Scroll-driven motion: a Lenis smooth-scroll provider and a reading-progress indicator that reads from it.",
        file: "components/motion/smooth-scroll.tsx",
        extraFiles: [
          "components/motion/scroll-progress.tsx",
          "components/motion/parallax.tsx",
          "components/motion/scroll-to.tsx",
          "components/motion/scroll-reveal.tsx",
        ],
        tags: ["scroll", "layout"],
        keywords: [
          "smooth scroll",
          "lenis",
          "scroll progress",
          "reading progress",
          "momentum scroll",
          "scroll velocity",
        ],
        examples: [
          {
            slug: "smooth-scroll",
            name: "Smooth Scroll",
            description: "Smooth-scroll provider over Lenis with a useSmoothScroll hook exposing scroll offset, progress and velocity. Reduced-motion safe.",
            installSlug: "smooth-scroll",
            file: "components/motion/smooth-scroll.tsx",
            previewKey: "motion/smooth-scroll",
            previewFile: "components/previews/motion/smooth-scroll.preview.tsx",
          },
          {
            slug: "scroll-progress",
            name: "Scroll Progress",
            description: "Reading-progress indicator — fixed bar or circular ring — driven by scroll position via useSmoothScroll, with spring smoothing.",
            installSlug: "scroll-progress",
            file: "components/motion/scroll-progress.tsx",
            previewKey: "motion/scroll-progress",
            previewFile: "components/previews/motion/scroll-progress.preview.tsx",
          },
          {
            slug: "parallax",
            name: "Parallax",
            description: "Wrapper that drifts its children at a speed factor as they cross the viewport, on either axis. Reduced-motion safe.",
            installSlug: "parallax",
            file: "components/motion/parallax.tsx",
            previewKey: "motion/parallax",
            previewFile: "components/previews/motion/parallax.preview.tsx",
          },
          {
            slug: "scroll-to",
            name: "Scroll To",
            description: "Button that smooth-scrolls to a target (offset, selector or element) via the active SmoothScroll provider; reduced-motion jumps instantly.",
            installSlug: "scroll-to",
            file: "components/motion/scroll-to.tsx",
            previewKey: "motion/scroll-to",
            previewFile: "components/previews/motion/scroll-to.preview.tsx",
          },
          {
            slug: "scroll-reveal",
            name: "Scroll Reveal",
            description: "Reveals its children with a spring slide and blur as they enter the viewport, once or every time. Reduced-motion keeps a fade.",
            installSlug: "scroll-reveal",
            file: "components/motion/scroll-reveal.tsx",
            previewKey: "motion/scroll-reveal",
            previewFile: "components/previews/motion/scroll-reveal.preview.tsx",
          },
        ],
      },
      {
        slug: "range-slider",
        name: "Range Slider",
        description: "Range slider with tick dots and a bouncy vertical-bar thumb that glides between snapped steps; drag and keyboard control, reduced-motion safe.",
        file: "components/motion/range-slider.tsx",
        tags: ["form", "input", "drag"],
        keywords: ["slider", "range slider", "range input", "stepped slider", "ticks"],
      },
      {
        slug: "table",
        name: "Table",
        description:
          "Virtualized data table that stays smooth at 10k+ rows, with sortable headers, row selection, column resize and reorder, and a sticky header. Minimal, reduced-motion-safe motion.",
        file: "components/motion/table/index.tsx",
        tags: ["data", "display", "layout"],
        keywords: [
          "react data table",
          "virtualized table",
          "sortable table",
          "table row selection",
          "react table 10k rows",
          "editable table react",
        ],
        examples: [
          {
            slug: "data",
            name: "Data Table",
            description:
              "10k virtualized rows with sortable headers, row selection, column resize and reorder.",
            installSlug: "table",
            file: "components/motion/table/index.tsx",
            previewKey: "motion/table",
            previewFile: "components/previews/motion/table.preview.tsx",
          },
          {
            slug: "editable",
            name: "Editable Table",
            description:
              "Edit cells inline and insert or delete rows and columns via border handles; the table re-renders from the updated data and column defs.",
            installSlug: "table-editable",
            file: "components/motion/table/index.tsx",
            previewKey: "motion/table-editable",
            previewFile: "components/previews/motion/table-editable.preview.tsx",
          },
          {
            slug: "async",
            name: "Async Table",
            description:
              "Loads pages on demand — skeleton rows on first load, then infinite scroll via onEndReached as the virtualized list nears the bottom.",
            installSlug: "table-async",
            file: "components/motion/table/index.tsx",
            previewKey: "motion/table-async",
            previewFile: "components/previews/motion/table-async.preview.tsx",
          },
        ],
      },
      {
        slug: "shader-background",
        name: "Shader Background",
        description:
          "Canvas shader backgrounds (mesh gradient, grain, warp, waves, voronoi, dot orbit and more) with a single typed variant prop. Reduced-motion freezes animated variants.",
        file: "components/motion/shader-background.tsx",
        tags: ["display", "media", "visual"],
        keywords: [
          "shader background react",
          "webgl background",
          "mesh gradient react",
          "animated background react",
          "canvas shader",
          "gradient background component",
        ],
      },
      {
        slug: "cylinder-carousel",
        name: "Cylinder Carousel",
        description:
          "A carousel whose items line the inside of a cylinder, receding into the center and growing toward the edges. Drag, scroll or arrow-key to roll it, with a springy glide and snap. Reduced-motion drops the glide.",
        file: "components/motion/cylinder-carousel.tsx",
        tags: ["display", "drag", "media"],
        keywords: [
          "3d carousel react",
          "cylinder carousel",
          "coverflow react",
          "rolling carousel",
          "draggable carousel react",
        ],
      },
      {
        slug: "loader",
        name: "Loader",
        description:
          "Loading indicator with seventeen variants: spinner, dots, bars, dot-matrix, dither, morph, comet, scramble, metaballs, newton, helix, percent, and five terminal-style ascii spinners. Scales from one size prop, uses currentColor, and reduced-motion swaps every transform for a calm opacity pulse.",
        file: "components/motion/loader.tsx",
        tags: ["feedback", "display", "status"],
        keywords: [
          "loader react",
          "loading spinner",
          "dot matrix loader",
          "dithering loader",
          "loading indicator",
        ],
      },
      {
        slug: "dialog",
        name: "Dialog",
        description:
          "Spring-scale modal with backdrop blur, focus trap, Esc-to-close, and body scroll lock. Composable sub-components: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose.",
        file: "components/motion/dialog.tsx",
        tags: ["overlay", "interaction"],
        keywords: [
          "react dialog",
          "animated modal react",
          "spring modal",
          "accessible dialog react",
          "framer motion modal",
        ],
      },
      {
        slug: "dropdown-menu",
        name: "Dropdown Menu",
        description:
          "Click-triggered positioned menu with staggered item entrance, separator, label, shortcut and destructive variants. Closes on outside click, item select, or Esc.",
        file: "components/motion/dropdown-menu.tsx",
        tags: ["navigation", "overlay", "interaction"],
        keywords: [
          "react dropdown menu",
          "animated dropdown",
          "context menu react",
          "action menu react",
          "framer motion dropdown",
        ],
      },
      {
        slug: "popover",
        name: "Popover",
        description:
          "Click-triggered floating panel with side and alignment control, spring blur entrance, and outside-click / Esc dismissal. Composable sub-components: Popover, PopoverTrigger, PopoverContent, PopoverClose.",
        file: "components/motion/popover.tsx",
        tags: ["overlay", "interaction"],
        keywords: [
          "react popover",
          "animated popover",
          "floating panel react",
          "popover animation",
          "framer motion popover",
        ],
      },
      {
        slug: "progress",
        name: "Progress",
        description:
          "Animated progress bar with spring fill, five status variants (default, success, warning, error, info), four sizes, indeterminate mode, and a StackedProgress multi-segment variant with legend.",
        file: "components/motion/progress.tsx",
        tags: ["display", "feedback", "status"],
        keywords: [
          "react progress bar",
          "animated progress react",
          "progress indicator",
          "loading bar react",
          "stacked progress react",
        ],
      },
      {
        slug: "textarea",
        name: "Textarea",
        description:
          "Auto-resizing textarea with spring error-shake, success/error state icons, floating label, hint text, and min/max row bounds. Same classNames API as the motion Input.",
        file: "components/motion/textarea.tsx",
        tags: ["form", "input", "text"],
        keywords: [
          "react textarea",
          "auto resize textarea react",
          "animated textarea",
          "textarea validation react",
          "growing textarea react",
        ],
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        description:
          "Shimmer loading placeholder with rect, circle, and multi-line text variants, plus SkeletonCard and SkeletonTable composites. Reduced-motion falls back to opacity pulse.",
        file: "components/motion/skeleton.tsx",
        tags: ["display", "feedback"],
        keywords: [
          "react skeleton",
          "skeleton loader react",
          "shimmer effect react",
          "loading placeholder react",
          "content placeholder react",
        ],
      },
      {
        slug: "avatar",
        name: "Avatar",
        description:
          "Image with animated fallback (initials or icon), six sizes, four status dot indicators, and an AvatarGroup stacked with spring entrance and overflow counter.",
        file: "components/motion/avatar.tsx",
        tags: ["display", "media"],
        keywords: [
          "react avatar",
          "avatar component react",
          "avatar group react",
          "user avatar react",
          "avatar with status react",
        ],
      },
      {
        slug: "combobox",
        name: "Combobox",
        description:
          "Searchable select with spring dropdown, layout-animated filtered list, selected checkmark, description rows, icon support, clear button, and an empty state.",
        file: "components/motion/combobox.tsx",
        tags: ["form", "input", "dropdown"],
        keywords: [
          "react combobox",
          "searchable select react",
          "animated select react",
          "autocomplete react",
          "react command select",
        ],
      },
      {
        slug: "text-morph",
        name: "Text Morph",
        description:
          "Morphs between strings character-by-character via layoutId — shared characters physically glide to their new positions, removed ones fade out, new ones fade in.",
        file: "components/motion/text-morph.tsx",
        tags: ["text", "display", "animation"],
        keywords: [
          "text morph react",
          "character morph animation",
          "text transition react",
          "animated text swap",
          "letter morph animation",
        ],
      },
      {
        slug: "morphing-text",
        name: "Morphing Text",
        description:
          "Auto-cycles through a list of words with each character blurring in from below and out upward with a staggered delay — a melting-and-reforming effect for hero headings.",
        file: "components/motion/morphing-text.tsx",
        tags: ["text", "display", "animation"],
        keywords: [
          "rotating text react",
          "word cycling animation",
          "hero text animation",
          "morphing headline react",
          "text blur effect",
        ],
      },
      {
        slug: "magic-card",
        name: "Magic Card",
        description:
          "Card with a spring-following radial gradient spotlight that tracks the cursor. The surface stays flat while a light source moves behind it.",
        file: "components/motion/magic-card.tsx",
        tags: ["interaction", "hover", "card"],
        keywords: [
          "magic card react",
          "cursor spotlight card",
          "hover glow card",
          "radial gradient hover",
          "interactive card react",
        ],
      },
      {
        slug: "border-beam",
        name: "Border Beam",
        description:
          "A sweeping gradient comet that travels clockwise around the border of its container. Drop it inside any positioned element to add a dynamic border highlight.",
        file: "components/motion/border-beam.tsx",
        tags: ["visual", "display", "card"],
        keywords: [
          "border beam react",
          "animated border react",
          "gradient border animation",
          "glowing border react",
          "conic gradient border",
        ],
      },
      {
        slug: "orbiting-circles",
        name: "Orbiting Circles",
        description:
          "Elements orbit a center point at configurable radii, speeds, and phase offsets. Multiple items stay upright throughout via counter-rotation.",
        file: "components/motion/orbiting-circles.tsx",
        badge: "new",
        launchedAt: "2026-06-20",
        tags: ["visual", "display", "animation"],
        keywords: [
          "orbiting circles react",
          "orbit animation react",
          "rotating icons react",
          "tech stack showcase animation",
          "circular orbit react",
        ],
      },
      {
        slug: "confetti",
        name: "Confetti",
        description:
          "Canvas particle burst (circles, squares, ribbons) fired from any screen position. Exposes a fireConfetti() function and a ConfettiButton convenience wrapper. Respects prefers-reduced-motion.",
        file: "components/motion/confetti.tsx",
        badge: "new",
        launchedAt: "2026-06-22",
        tags: ["interaction", "feedback", "display"],
        keywords: [
          "confetti react",
          "celebration animation react",
          "particle burst react",
          "confetti button react",
          "success animation react",
        ],
      },
      {
        slug: "animated-beam",
        name: "Animated Beam",
        description:
          "SVG beam that connects two DOM elements with an animated traveling spot of light along a static dim track. Supports bezier curvature, reverse direction, and multiple beams.",
        file: "components/motion/animated-beam.tsx",
        badge: "new",
        launchedAt: "2026-06-25",
        tags: ["visual", "display", "data"],
        keywords: [
          "animated beam react",
          "svg beam animation",
          "connection line animation react",
          "flow diagram react",
          "node connection animation",
        ],
      },
      {
        slug: "flickering-grid",
        name: "Flickering Grid",
        description:
          "Canvas grid where each cell independently and randomly updates its opacity, creating a living breathing background texture. Lightweight and customizable.",
        file: "components/motion/flickering-grid.tsx",
        badge: "new",
        launchedAt: "2026-06-27",
        tags: ["visual", "display", "background"],
        keywords: [
          "flickering grid react",
          "canvas grid background animation",
          "animated grid background react",
          "dot grid animation react",
          "pixel grid react",
        ],
      },
      {
        slug: "wheel-picker",
        name: "Wheel Picker",
        description:
          "iOS-style 3D cylinder picker with physics-based flick, touch drag, mouse drag, trackpad wheel, and keyboard navigation. Controlled and uncontrolled. Reduced-motion safe.",
        file: "components/motion/wheel-picker.tsx",
        badge: "new",
        launchedAt: "2026-07-09",
        tags: ["form", "input", "mobile", "interaction"],
        keywords: [
          "ios wheel picker react",
          "drum picker react",
          "cylinder picker",
          "date picker wheel react",
          "scroll picker react",
        ],
      },
    ],
  },
  {
    slug: "blocks",
    name: "Patterns",
    description: "Composed, product-ready widgets built from beUI motion primitives.",
    components: [
      {
        slug: "swap",
        name: "Multi-chain Swap",
        description: "Cross-chain swap widget with chain + token selectors, morphing views, animated flip and quote.",
        file: "components/motion/swap.tsx",
        tags: ["data", "finance", "form"],
      },
      {
        slug: "dynamic-island",
        name: "Dynamic Island",
        description: "iOS-style island pill that morphs between live activity views with bouncy shell resize and blur crossfades.",
        file: "components/motion/dynamic-island.tsx",
        tags: ["overlay", "mobile", "notification"],
      },
      {
        slug: "command-palette",
        name: "Command Palette",
        description: "⌘K palette with fuzzy filter, spring-animated active row and glass surface.",
        file: "components/motion/command-palette.tsx",
        tags: ["navigation", "overlay", "search"],
      },
      {
        slug: "expandable-action-bar",
        name: "Expandable Action Bar",
        description: "Compact icon actions that expand into labeled controls on hover or focus with shared layout motion.",
        file: "components/motion/expandable-action-bar.tsx",
        tags: ["navigation", "interaction", "layout"],
      },
      {
        slug: "overflow-actions",
        name: "Overflow Actions",
        description: "Connected pill rail for primary actions that springs open to reveal extra controls.",
        file: "components/motion/overflow-actions.tsx",
        tags: ["navigation", "interaction"],
      },
      {
        slug: "expandable-tabs",
        name: "Expandable Tabs",
        description: "Icon tab bar where the active tab expands to a labelled pill, with a panel above that morphs height and slides content direction-aware on switch.",
        file: "components/motion/expandable-tabs.tsx",
        tags: ["navigation", "mobile", "layout"],
      },
      {
        slug: "swipeable-list",
        name: "Swipeable List",
        description: "Mobile-style list rows that swipe left or right to reveal contextual action buttons.",
        file: "components/motion/swipeable-list.tsx",
        tags: ["mobile", "interaction", "drag"],
      },
      {
        slug: "file-upload",
        name: "File Upload",
        description: "Drag-and-drop upload queue with progress rows, retry/remove actions and reduced-motion-safe state changes.",
        file: "components/motion/file-upload.tsx",
        tags: ["form", "input", "drag"],
      },
      {
        slug: "prediction-market",
        name: "Prediction Market",
        description: "Prediction market trade ticket with buy/sell modes, outcome prices, rolling amount entry, quick add chips and trade states.",
        file: "components/motion/prediction-market.tsx",
        tags: ["data", "finance", "form"],
      },
      {
        slug: "wallet-card",
        name: "Wallet Card",
        description: "Wallet overview card with an account switcher and search that morph open from their triggers, a cascading balance with a live change pill and privacy toggle, copy-address, and Send / Deposit / Swap / Buy actions.",
        file: "components/motion/wallet-card/index.tsx",
        badge: "new",
        launchedAt: "2026-07-01",
        tags: ["data", "finance", "display"],
        keywords: [
          "wallet card react",
          "web3 wallet component",
          "crypto balance component",
          "account switcher react",
          "chain switcher react",
        ],
      },
      {
        slug: "otp-input",
        name: "OTP Input",
        description: "One-time-code input with a gliding focus ring, digits that roll in per slot, error shake and a success check draw.",
        file: "components/motion/otp-input.tsx",
        tags: ["form", "input", "text"],
      },
      {
        slug: "bloom-menu",
        name: "Bloom Menu",
        description: "A button that morphs open into a menu and blooms iris-out from the center, the grid revealing in every direction with radially staggered items.",
        file: "components/motion/bloom-menu.tsx",
        badge: "new",
        launchedAt: "2026-07-03",
        tags: ["navigation", "overlay", "interaction"],
      },
      {
        slug: "feedback-widget",
        name: "Feedback Widget",
        description: "Corner trigger that morphs open into a feedback popup with message entry and animated sending, success and retry states.",
        file: "components/motion/feedback-widget.tsx",
        badge: "new",
        launchedAt: "2026-07-05",
        tags: ["form", "overlay", "feedback"],
        keywords: [
          "react feedback widget",
          "feedback popover react",
          "in-app feedback component",
          "feedback form animation",
          "react feedback button",
        ],
      },
      {
        slug: "not-found",
        name: "404 / Not Found",
        description: "Animated 404 pages in five styles: glitch scramble, magnetic digits, cursor spotlight, a fanning card stack and a typed terminal.",
        file: "components/motion/not-found/index.tsx",
        tags: ["display", "page"],
        extraFiles: [
          "components/motion/not-found/shared.tsx",
          "components/motion/not-found/glitch.tsx",
          "components/motion/not-found/magnetic.tsx",
          "components/motion/not-found/spotlight.tsx",
          "components/motion/not-found/stacked.tsx",
          "components/motion/not-found/terminal.tsx",
        ],
        examples: [
          {
            slug: "glitch",
            name: "Glitch",
            description:
              "Digits scramble through random glyphs before resolving, with a chromatic split on hover.",
            installSlug: "not-found-glitch",
            file: "components/motion/not-found/glitch.tsx",
            previewKey: "blocks/not-found-glitch",
            previewFile: "components/previews/blocks/not-found-glitch.preview.tsx",
          },
          {
            slug: "magnetic",
            name: "Magnetic",
            description:
              "Each digit is cursor-attracted via the Magnetic wrapper and springs back on leave.",
            installSlug: "not-found-magnetic",
            file: "components/motion/not-found/magnetic.tsx",
            previewKey: "blocks/not-found-magnetic",
            previewFile: "components/previews/blocks/not-found-magnetic.preview.tsx",
          },
          {
            slug: "spotlight",
            name: "Spotlight",
            description:
              "A dark panel where a cursor-tracked spotlight reveals the bright code from a dim base.",
            installSlug: "not-found-spotlight",
            file: "components/motion/not-found/spotlight.tsx",
            previewKey: "blocks/not-found-spotlight",
            previewFile: "components/previews/blocks/not-found-spotlight.preview.tsx",
          },
          {
            slug: "stacked",
            name: "Stacked",
            description:
              "A code card over a hidden stack that fans out with a spring on hover.",
            installSlug: "not-found-stacked",
            file: "components/motion/not-found/stacked.tsx",
            previewKey: "blocks/not-found-stacked",
            previewFile: "components/previews/blocks/not-found-stacked.preview.tsx",
          },
          {
            slug: "terminal",
            name: "Terminal",
            description:
              "A terminal window that types a failed cd command and a 404 status, with a blinking caret.",
            installSlug: "not-found-terminal",
            file: "components/motion/not-found/terminal.tsx",
            previewKey: "blocks/not-found-terminal",
            previewFile: "components/previews/blocks/not-found-terminal.preview.tsx",
          },
        ],
      },
      {
        slug: "hero-video-dialog",
        name: "Hero Video Dialog",
        description:
          "Thumbnail with an animated play button that opens a fullscreen video dialog. Supports YouTube / Vimeo embed URLs or direct video files. Six configurable entry animations.",
        file: "components/motion/hero-video-dialog.tsx",
        badge: "new",
        launchedAt: "2026-07-06",
        tags: ["media", "overlay", "display"],
        keywords: [
          "hero video react",
          "video dialog react",
          "video lightbox react",
          "play button overlay react",
          "video modal react",
        ],
      },
    ],
  },
  {
    slug: "ai",
    name: "AI",
    description: "Production-ready UI primitives for chat interfaces, streaming responses, and AI agent workflows.",
    components: [
      {
        slug: "agent-input",
        name: "Agent Input",
        description: "Auto-resizing chat input with send / stop states, suggestion chips, and staged file attachments — wires directly into any AI SDK.",
        file: "components/ai/agent-input.tsx",
        badge: "new",
        launchedAt: "2026-07-04",
        tags: ["form", "input", "interaction"],
        keywords: [
          "ai chat input",
          "agent input bar",
          "chat input react",
          "llm chat input",
          "ai message input",
        ],
      },
      {
        slug: "chat-bubble",
        name: "Chat Bubble",
        description: "Animated user and assistant message bubbles with a spring entry, typing indicator, and a composable MessageList for full conversation threads.",
        file: "components/ai/chat-bubble.tsx",
        badge: "new",
        launchedAt: "2026-07-04",
        tags: ["display", "feedback", "text"],
        keywords: [
          "chat bubble react",
          "ai message bubble",
          "chat message component",
          "llm chat ui",
          "assistant message react",
        ],
      },
      {
        slug: "streaming-text",
        name: "Streaming Text",
        description: "Character-by-character text reveal that tracks append-only target strings — simulates live token streaming. Includes a blinking cursor and a word-level TokenStream variant.",
        file: "components/ai/streaming-text.tsx",
        badge: "new",
        launchedAt: "2026-07-04",
        tags: ["display", "text", "animation"],
        keywords: [
          "streaming text react",
          "typewriter effect react",
          "ai text streaming",
          "character reveal react",
          "llm streaming response",
        ],
      },
      {
        slug: "tool-card",
        name: "Tool Card",
        description: "Collapsible card for AI tool invocations — shows the tool name, status (running / done / error) with spring-animated icon transitions, and an expandable input / output body.",
        file: "components/ai/tool-card.tsx",
        badge: "new",
        launchedAt: "2026-07-04",
        tags: ["display", "data", "feedback"],
        keywords: [
          "ai tool card react",
          "agent tool invocation",
          "llm tool use ui",
          "tool call react",
          "ai agent ui component",
        ],
      },
    ],
  },
];

export function findCategory(slug: string) {
  return registry.find((c) => c.slug === slug);
}

export function findComponent(categorySlug: string, slug: string) {
  return findCategory(categorySlug)?.components.find((c) => c.slug === slug);
}

export function allComponents() {
  return registry.flatMap((c) =>
    c.components.map((comp) => ({ ...comp, category: c }))
  );
}

/** Top-level components and total installable targets (counting variants). */
export const COMPONENT_COUNT = registry.reduce(
  (n, c) => n + c.components.length,
  0,
);

export const INSTALLABLE_COUNT = registry.reduce(
  (n, c) =>
    n +
    c.components.reduce((m, comp) => {
      const variants = (comp.examples ?? []).filter((e) => e.installSlug).length;
      return m + (variants || 1);
    }, 0),
  0,
);
