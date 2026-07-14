export type ColorTheme =
  | "sun"
  | "honey"
  | "blood-orange"
  | "coral"
  | "copper"
  | "rose"
  | "berry"
  | "orchid"
  | "violet"
  | "indigo"
  | "storm"
  | "electric"
  | "jade"
  | "lime"
  | "sand"
  | "default";

type Vars = Record<string, string>;
type Theme = { name: string; swatch: string; light: Vars; dark: Vars };

// Full neutral token set. Colored themes start here and override the brand
// tokens, so every theme exports a complete, drop-in palette.
const BASE_LIGHT: Vars = {
  "--background": "oklch(99% 0 0)",
  "--foreground": "oklch(15% 0 0)",
  "--card": "oklch(97% 0 0)",
  "--card-foreground": "oklch(15% 0 0)",
  "--popover": "oklch(97% 0 0)",
  "--popover-foreground": "oklch(15% 0 0)",
  "--primary": "oklch(15% 0 0)",
  "--primary-foreground": "oklch(99% 0 0)",
  "--secondary": "oklch(97% 0 0)",
  "--secondary-foreground": "oklch(15% 0 0)",
  "--muted": "oklch(97% 0 0)",
  "--muted-foreground": "oklch(50% 0 0)",
  "--accent": "oklch(72% 0.18 195)",
  "--accent-foreground": "oklch(15% 0 0)",
  "--destructive": "oklch(62% 0.22 25)",
  "--border": "oklch(15% 0 0 / 0.06)",
  "--input": "oklch(15% 0 0 / 0.06)",
  "--ring": "oklch(15% 0 0 / 0.12)",
};

const BASE_DARK: Vars = {
  "--background": "#151515",
  "--foreground": "oklch(96% 0 0)",
  "--card": "#1c1c1c",
  "--card-foreground": "oklch(96% 0 0)",
  "--popover": "#1c1c1c",
  "--popover-foreground": "oklch(96% 0 0)",
  "--primary": "oklch(96% 0 0)",
  "--primary-foreground": "#151515",
  "--secondary": "#1c1c1c",
  "--secondary-foreground": "oklch(96% 0 0)",
  "--muted": "#1c1c1c",
  "--muted-foreground": "oklch(62% 0 0)",
  "--accent": "oklch(80% 0.18 195)",
  "--accent-foreground": "#151515",
  "--destructive": "oklch(62% 0.22 25)",
  "--border": "rgb(255 255 255 / 0.05)",
  "--input": "rgb(255 255 255 / 0.05)",
  "--ring": "rgb(255 255 255 / 0.1)",
};

/** Build a colored theme: neutral surfaces + a hue-tinted brand ramp. */
function brand(opts: {
  light: { hue: string; onHue: string };
  dark: { hue: string; onHue: string };
  tintL?: string;
  tintD?: string;
}): { light: Vars; dark: Vars } {
  const lHue = opts.light.hue;
  const dHue = opts.dark.hue;
  return {
    light: {
      ...BASE_LIGHT,
      "--primary": lHue,
      "--primary-foreground": opts.light.onHue,
      "--accent": lHue,
      "--accent-foreground": opts.light.onHue,
      "--ring": opts.tintL ?? lHue,
    },
    dark: {
      ...BASE_DARK,
      "--primary": dHue,
      "--primary-foreground": opts.dark.onHue,
      "--accent": dHue,
      "--accent-foreground": opts.dark.onHue,
      "--ring": opts.tintD ?? dHue,
    },
  };
}

export const THEMES: Record<ColorTheme, Theme> = {
  // ── Warm / bright ───────────────────────────────────────────────────────────
  sun: {
    // #fde12d — vivid bright yellow
    name: "Sun",
    swatch: "oklch(90% 0.19 100)",
    ...brand({
      light: { hue: "oklch(72% 0.18 96)", onHue: "oklch(20% 0.04 96)" },
      dark: { hue: "oklch(90% 0.19 100)", onHue: "oklch(18% 0.04 100)" },
      tintL: "oklch(72% 0.18 96 / 0.5)",
      tintD: "oklch(90% 0.19 100 / 0.55)",
    }),
  },
  honey: {
    // #f5cb5c — warm golden yellow
    name: "Honey",
    swatch: "oklch(83% 0.15 82)",
    ...brand({
      light: { hue: "oklch(70% 0.15 80)", onHue: "oklch(20% 0.03 80)" },
      dark: { hue: "oklch(83% 0.15 82)", onHue: "oklch(18% 0.03 80)" },
      tintL: "oklch(70% 0.15 80 / 0.5)",
      tintD: "oklch(83% 0.15 82 / 0.55)",
    }),
  },
  "blood-orange": {
    name: "Blood Orange",
    swatch: "#E93202",
    ...brand({
      light: { hue: "#E93202", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(68% 0.24 38)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(56% 0.24 38 / 0.5)",
      tintD: "oklch(68% 0.24 38 / 0.55)",
    }),
  },
  coral: {
    // Warm peachy coral — sits between blood-orange and rose
    name: "Coral",
    swatch: "oklch(68% 0.18 30)",
    ...brand({
      light: { hue: "oklch(62% 0.18 28)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(74% 0.16 30)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(62% 0.18 28 / 0.5)",
      tintD: "oklch(74% 0.16 30 / 0.55)",
    }),
  },
  copper: {
    // Warm metallic brownish-amber — earthy and rich
    name: "Copper",
    swatch: "oklch(60% 0.12 50)",
    ...brand({
      light: { hue: "oklch(54% 0.12 50)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(70% 0.12 52)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(54% 0.12 50 / 0.5)",
      tintD: "oklch(70% 0.12 52 / 0.55)",
    }),
  },
  // ── Pink / purple ────────────────────────────────────────────────────────────
  rose: {
    name: "Rose",
    swatch: "oklch(58% 0.2 12)",
    ...brand({
      light: { hue: "oklch(58% 0.2 12)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(70% 0.17 12)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(58% 0.2 12 / 0.5)",
      tintD: "oklch(70% 0.17 12 / 0.55)",
    }),
  },
  berry: {
    // #af3b6e — deep magenta / berry
    name: "Berry",
    swatch: "oklch(46% 0.19 348)",
    ...brand({
      light: { hue: "oklch(46% 0.19 348)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(68% 0.16 348)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(46% 0.19 348 / 0.5)",
      tintD: "oklch(68% 0.16 348 / 0.55)",
    }),
  },
  orchid: {
    // Vibrant purple-rose — between violet and berry
    name: "Orchid",
    swatch: "oklch(54% 0.19 320)",
    ...brand({
      light: { hue: "oklch(50% 0.19 320)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(68% 0.17 320)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(50% 0.19 320 / 0.5)",
      tintD: "oklch(68% 0.17 320 / 0.55)",
    }),
  },
  violet: {
    name: "Violet",
    swatch: "oklch(55% 0.2 290)",
    ...brand({
      light: { hue: "oklch(55% 0.2 290)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(72% 0.16 290)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(55% 0.2 290 / 0.5)",
      tintD: "oklch(72% 0.16 290 / 0.55)",
    }),
  },
  // ── Cool / dark ──────────────────────────────────────────────────────────────
  indigo: {
    name: "Indigo",
    swatch: "oklch(50% 0.2 275)",
    ...brand({
      light: { hue: "oklch(50% 0.2 275)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(70% 0.16 275)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(50% 0.2 275 / 0.5)",
      tintD: "oklch(70% 0.16 275 / 0.55)",
    }),
  },
  storm: {
    // Deep dramatic blue-grey — cool and cinematic
    name: "Storm",
    swatch: "oklch(48% 0.10 258)",
    ...brand({
      light: { hue: "oklch(42% 0.10 258)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(66% 0.12 258)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(42% 0.10 258 / 0.5)",
      tintD: "oklch(66% 0.12 258 / 0.55)",
    }),
  },
  electric: {
    // Vivid neon azure — bright and energetic
    name: "Electric",
    swatch: "oklch(58% 0.22 242)",
    ...brand({
      light: { hue: "oklch(52% 0.22 240)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(68% 0.20 242)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(52% 0.22 240 / 0.5)",
      tintD: "oklch(68% 0.20 242 / 0.55)",
    }),
  },
  // ── Earth / neutral ──────────────────────────────────────────────────────────
  jade: {
    // Rich deep forest green — not boring, more jewel-toned
    name: "Jade",
    swatch: "oklch(52% 0.14 162)",
    ...brand({
      light: { hue: "oklch(48% 0.14 162)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(66% 0.14 162)", onHue: "oklch(15% 0 0)" },
      tintL: "oklch(48% 0.14 162 / 0.5)",
      tintD: "oklch(66% 0.14 162 / 0.55)",
    }),
  },
  lime: {
    name: "Lime",
    swatch: "oklch(72% 0.18 130)",
    ...brand({
      light: { hue: "oklch(72% 0.18 130)", onHue: "oklch(20% 0.04 130)" },
      dark: { hue: "oklch(80% 0.18 130)", onHue: "oklch(18% 0.04 130)" },
      tintL: "oklch(72% 0.18 130 / 0.5)",
      tintD: "oklch(80% 0.18 130 / 0.55)",
    }),
  },
  sand: {
    // #eae6e1 — warm cream / off-white
    name: "Sand",
    swatch: "oklch(78% 0.06 78)",
    ...brand({
      light: { hue: "oklch(58% 0.08 78)", onHue: "oklch(99% 0 0)" },
      dark: { hue: "oklch(80% 0.06 78)", onHue: "oklch(18% 0.02 78)" },
      tintL: "oklch(58% 0.08 78 / 0.5)",
      tintD: "oklch(80% 0.06 78 / 0.55)",
    }),
  },
  // ── Mono (last) ─────────────────────────────────────────────────────────────
  // True black/white/grey theme — no hue anywhere, including the accent
  // (BASE_LIGHT/BASE_DARK's default --accent is a cyan brand color, which
  // would contradict the "Mono" name if left as-is).
  default: {
    name: "Mono",
    swatch: "oklch(40% 0 0)",
    light: {
      ...BASE_LIGHT,
      "--accent": "oklch(15% 0 0)",
      "--accent-foreground": "oklch(99% 0 0)",
      "--ring": "oklch(15% 0 0 / 0.25)",
    },
    dark: {
      ...BASE_DARK,
      "--accent": "oklch(96% 0 0)",
      "--accent-foreground": "#151515",
      "--ring": "rgb(255 255 255 / 0.25)",
    },
  },
};

export const THEME_LIST = Object.entries(THEMES).map(([id, t]) => ({
  id: id as ColorTheme,
  name: t.name,
  swatch: t.swatch,
}));

function block(selector: string, vars: Vars): string {
  const body = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  return `${selector} {\n${body}\n}`;
}

/** Stylesheet injected once: full token sets keyed by data-theme. */
export function themesStylesheet(): string {
  return (Object.entries(THEMES) as [ColorTheme, Theme][])
    .filter(([id]) => id !== "default")
    .map(
      ([id, t]) =>
        `${block(`[data-theme="${id}"]`, t.light)}\n${block(
          `.dark[data-theme="${id}"]`,
          t.dark,
        )}`,
    )
    .join("\n\n");
}

/** Copyable theme for a user's globals.css: standard :root / .dark blocks. */
export function themeExportCss(id: ColorTheme): string {
  const t = THEMES[id];
  return `${block(":root", t.light)}\n\n${block(".dark", t.dark)}`;
}
