"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type ColorTheme, themesStylesheet } from "@/lib/themes";

export type { ColorTheme };

export type BorderRadius = "sharp" | "default" | "rounded" | "pill";
export type FontFamily = "sans" | "mono" | "pixel" | "space-grotesk" | "syne" | "plus-jakarta";
export type MotionSpeed = "slow" | "normal" | "fast";
export type BgTint = "off" | "warm" | "rich";
export type AccentIntensity = "subtle" | "normal" | "vivid";
export type GithubButtonVisibility = "visible" | "hidden";

/** Default logo background colour — the original Kinetic orange. */
export const DEFAULT_LOGO_COLOR = "#FF3C00";

const RADIUS_MAP: Record<BorderRadius, { base: string; full: string }> = {
  sharp:   { base: "3px",  full: "5px"    },
  default: { base: "8px",  full: "9999px" },
  rounded: { base: "14px", full: "9999px" },
  pill:    { base: "32px", full: "9999px" },
};

const FONT_MAP: Record<FontFamily, string | null> = {
  sans:            null, // use default (Inter)
  mono:            "var(--font-mono), ui-monospace, monospace",
  pixel:           "var(--font-geist-pixel-square), var(--font-mono), ui-monospace, monospace",
  "space-grotesk": "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif",
  syne:            "var(--font-syne), ui-sans-serif, system-ui, sans-serif",
  "plus-jakarta":  "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif",
};

type Preferences = {
  colorTheme: ColorTheme;
  setColorTheme: (v: ColorTheme) => void;
  logoColor: string;
  setLogoColor: (v: string) => void;
  borderRadius: BorderRadius;
  setBorderRadius: (v: BorderRadius) => void;
  fontFamily: FontFamily;
  setFontFamily: (v: FontFamily) => void;
  motionSpeed: MotionSpeed;
  setMotionSpeed: (v: MotionSpeed) => void;
  bgTint: BgTint;
  setBgTint: (v: BgTint) => void;
  accentIntensity: AccentIntensity;
  setAccentIntensity: (v: AccentIntensity) => void;
  githubButtonVisibility: GithubButtonVisibility;
  setGithubButtonVisibility: (v: GithubButtonVisibility) => void;
  panelOpen: boolean;
  setPanelOpen: (v: boolean) => void;
};

const PreferencesCtx = createContext<Preferences | null>(null);

export function usePreferences() {
  const ctx = useContext(PreferencesCtx);
  if (!ctx)
    throw new Error("usePreferences must be used inside <PreferencesProvider>");
  return ctx;
}

/**
 * Build the favicon SVG string for a given background colour.
 * `starColor` is the star-cutout fill — defaults to white, but must be
 * flipped to black when the background itself is light (e.g. "mono" in
 * dark mode resolves to a white background, which needs a dark star).
 */
function buildFaviconSvg(color: string, starColor = "white") {
  return `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" rx="40" fill="${color}"/><defs><clipPath id="p"><polygon points="90,15 161.32,66.84 134.09,150.68 45.91,150.68 18.68,66.84"/></clipPath></defs><polygon points="90,15 161.32,66.84 134.09,150.68 45.91,150.68 18.68,66.84" fill="${starColor}"/><g clip-path="url(#p)" stroke="${color}" stroke-width="5" stroke-linecap="butt"><line x1="90" y1="90" x2="90" y2="15"/><line x1="90" y1="90" x2="125.68" y2="40.92"/><line x1="90" y1="90" x2="161.32" y2="66.84"/><line x1="90" y1="90" x2="147.72" y2="108.76"/><line x1="90" y1="90" x2="134.09" y2="150.68"/><line x1="90" y1="90" x2="90" y2="150.68"/><line x1="90" y1="90" x2="45.91" y2="150.68"/><line x1="90" y1="90" x2="32.28" y2="108.76"/><line x1="90" y1="90" x2="18.68" y2="66.84"/><line x1="90" y1="90" x2="54.32" y2="40.92"/></g></svg>`;
}

/**
 * Site-only customization state. Intentionally NOT persisted — resets on refresh.
 */
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blood-orange");
  const [logoColor, setLogoColor] = useState<string>(DEFAULT_LOGO_COLOR);
  const [borderRadius, setBorderRadius] = useState<BorderRadius>("default");
  const [fontFamily, setFontFamily] = useState<FontFamily>("space-grotesk");
  const [motionSpeed, setMotionSpeed] = useState<MotionSpeed>("normal");
  const [bgTint, setBgTint] = useState<BgTint>("off");
  const [accentIntensity, setAccentIntensity] =
    useState<AccentIntensity>("normal");
  const [githubButtonVisibility, setGithubButtonVisibility] =
    useState<GithubButtonVisibility>("visible");
  const [panelOpen, setPanelOpen] = useState(false);

  // ── Color theme ────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = document.documentElement;
    if (colorTheme === "default") delete el.dataset.theme;
    else el.dataset.theme = colorTheme;
  }, [colorTheme]);

  // ── Favicon ────────────────────────────────────────────────────────────────
  // A data-URI SVG has no access to the page's CSS variables, so the "mono"
  // sentinel (theme-adaptive black/white) must be resolved to a literal hex
  // based on the current light/dark mode before it can be used here.
  useEffect(() => {
    const applyFavicon = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const resolvedColor =
        logoColor === "mono" ? (isDark ? "#FFFFFF" : "#000000") : logoColor;
      const resolvedStarColor =
        logoColor === "mono" ? (isDark ? "#000000" : "#FFFFFF") : "white";
      const svg = buildFaviconSvg(resolvedColor, resolvedStarColor);
      const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      const links = document.querySelectorAll<HTMLLinkElement>(
        'link[rel*="icon"]',
      );
      links.forEach((link) => {
        link.href = dataUrl;
      });
      if (links.length === 0) {
        const injected = document.createElement("link");
        injected.rel = "icon";
        injected.type = "image/svg+xml";
        injected.href = dataUrl;
        document.head.appendChild(injected);
        return injected;
      }
      return null;
    };

    const previousHrefs = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]'),
    ).map((l) => l.href);
    let injected = applyFavicon();

    // Keep the favicon in sync with theme toggles while "mono" is active.
    let observer: MutationObserver | null = null;
    if (logoColor === "mono") {
      observer = new MutationObserver(() => applyFavicon());
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      observer?.disconnect();
      const links = document.querySelectorAll<HTMLLinkElement>(
        'link[rel*="icon"]',
      );
      links.forEach((link, i) => {
        link.href = previousHrefs[i] ?? "";
      });
      if (injected) document.head.removeChild(injected);
    };
  }, [logoColor]);

  // ── Border radius ──────────────────────────────────────────────────────────
  useEffect(() => {
    const { base, full } = RADIUS_MAP[borderRadius];
    document.documentElement.style.setProperty("--ui-radius", base);
    document.documentElement.style.setProperty("--radius-full", full);
  }, [borderRadius]);

  // ── Font family ────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = document.documentElement;
    const value = FONT_MAP[fontFamily];
    if (value === null) {
      el.style.removeProperty("--ui-font-body");
    } else {
      el.style.setProperty("--ui-font-body", value);
    }
  }, [fontFamily]);

  // ── Motion speed ───────────────────────────────────────────────────────────
  useEffect(() => {
    const el = document.documentElement;
    if (motionSpeed === "normal") delete el.dataset.speed;
    else el.dataset.speed = motionSpeed;
  }, [motionSpeed]);

  // ── Background tint ────────────────────────────────────────────────────────
  // Sets --background / --card as inline style (highest specificity) so it wins
  // over both .dark and [data-theme] CSS rules.
  useEffect(() => {
    const el = document.documentElement;
    if (bgTint === "off") {
      el.style.removeProperty("--background");
      el.style.removeProperty("--card");
      return () => {};
    }
    const pct = bgTint === "warm" ? "5%" : "10%";
    // --ui-bg / --ui-card are set per-mode in globals.css (:root / .dark)
    el.style.setProperty(
      "--background",
      `color-mix(in oklch, var(--ui-bg), var(--primary) ${pct})`,
    );
    el.style.setProperty(
      "--card",
      `color-mix(in oklch, var(--ui-card), var(--primary) ${pct})`,
    );
    return () => {
      el.style.removeProperty("--background");
      el.style.removeProperty("--card");
    };
  }, [bgTint, colorTheme]);

  // ── Accent intensity ───────────────────────────────────────────────────────
  useEffect(() => {
    const el = document.documentElement;
    if (accentIntensity === "normal") delete el.dataset.intensity;
    else el.dataset.intensity = accentIntensity;
  }, [accentIntensity]);

  return (
    <PreferencesCtx.Provider
      value={{
        colorTheme,
        setColorTheme,
        logoColor,
        setLogoColor,
        borderRadius,
        setBorderRadius,
        fontFamily,
        setFontFamily,
        motionSpeed,
        setMotionSpeed,
        bgTint,
        setBgTint,
        accentIntensity,
        setAccentIntensity,
        githubButtonVisibility,
        setGithubButtonVisibility,
        panelOpen,
        setPanelOpen,
      }}
    >
      {/* Full per-theme token sets, applied via data-theme on <html>. */}
      <style dangerouslySetInnerHTML={{ __html: themesStylesheet() }} />
      {children}
    </PreferencesCtx.Provider>
  );
}
