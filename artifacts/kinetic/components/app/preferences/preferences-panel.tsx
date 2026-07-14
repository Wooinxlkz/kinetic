"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Drawer } from "@/components/motion/drawer";
import { cn } from "@/lib/utils";
import { THEME_LIST, themeExportCss } from "@/lib/themes";
import {
  type BorderRadius,
  type FontFamily,
  type MotionSpeed,
  type BgTint,
  type AccentIntensity,
  usePreferences,
} from "@/components/app/preferences/preferences-provider";
import { KineticMark } from "@/components/app/chrome/kinetic-mark";
import { X } from "lucide-react";

// ── Shared toggle-row component ───────────────────────────────────────────────

function ToggleRow<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mt-3 flex gap-1.5">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={active}
            className={cn(
              "flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
              active
                ? "border-foreground/25 bg-card text-foreground"
                : "border-border text-muted-foreground hover:border-foreground/15 hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-pixel text-xs font-medium uppercase text-muted-foreground">
      {children}
    </p>
  );
}

// ── Logo colors ───────────────────────────────────────────────────────────────

const LOGO_COLORS: { id: string; color: string; name: string }[] = [
  { id: "orange", color: "#FF3C00", name: "Orange" },
  { id: "violet", color: "#7C3AED", name: "Violet" },
  { id: "blue", color: "#2563EB", name: "Blue" },
  { id: "green", color: "#16A34A", name: "Green" },
  { id: "amber", color: "#D97706", name: "Amber" },
  { id: "pink", color: "#DB2777", name: "Pink" },
  { id: "red", color: "#DC2626", name: "Red" },
  { id: "cyan", color: "#0891B2", name: "Cyan" },
  { id: "mono", color: "mono", name: "Mono" },
  { id: "rose", color: "#E11D48", name: "Rose" },
];

// ── Option sets ───────────────────────────────────────────────────────────────

const RADIUS_OPTIONS: { id: BorderRadius; label: string }[] = [
  { id: "sharp", label: "Sharp" },
  { id: "default", label: "Default" },
  { id: "rounded", label: "Rounded" },
  { id: "pill", label: "Pill" },
];

const FONT_OPTIONS: { id: FontFamily; label: string; cssVar: string }[] = [
  { id: "sans",          label: "Inter",   cssVar: "var(--font-sans)"          },
  { id: "space-grotesk", label: "Space G", cssVar: "var(--font-space-grotesk)" },
  { id: "syne",          label: "Syne",    cssVar: "var(--font-syne)"          },
  { id: "plus-jakarta",  label: "Jakarta", cssVar: "var(--font-plus-jakarta)"  },
  { id: "mono",          label: "Mono",    cssVar: "var(--font-mono)"          },
  { id: "pixel",         label: "Pixel",   cssVar: "var(--font-geist-pixel-square), var(--font-mono)" },
];

const INTENSITY_OPTIONS: { id: AccentIntensity; label: string }[] = [
  { id: "subtle", label: "Subtle" },
  { id: "normal", label: "Normal" },
  { id: "vivid", label: "Vivid" },
];

const SPEED_OPTIONS: { id: MotionSpeed; label: string }[] = [
  { id: "slow", label: "Slow" },
  { id: "normal", label: "Normal" },
  { id: "fast", label: "Fast" },
];

const TINT_OPTIONS: { id: BgTint; label: string }[] = [
  { id: "off", label: "Off" },
  { id: "warm", label: "Warm" },
  { id: "rich", label: "Rich" },
];

// ── Panel ─────────────────────────────────────────────────────────────────────

export function PreferencesPanel() {
  const {
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
    panelOpen,
    setPanelOpen,
  } = usePreferences();

  const [copied, setCopied] = useState(false);

  const copyTheme = async () => {
    await navigator.clipboard.writeText(themeExportCss(colorTheme));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Drawer
      open={panelOpen}
      onOpenChange={setPanelOpen}
      side="right"
      ariaLabel="Customize"
      className="p-0"
    >
      {/* Sticky header — never scrolls */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-sm font-semibold text-foreground">Customize</h2>
        <button
          type="button"
          onClick={() => setPanelOpen(false)}
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 py-6">

      {/* ── THEME ─────────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Theme</SectionLabel>
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          {THEME_LIST.map((t) => {
            const active = colorTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setColorTheme(t.id)}
                aria-pressed={active}
                aria-label={t.name}
                title={t.name}
                className={cn(
                  "relative flex h-6 w-6 items-center justify-center rounded-full ring-offset-2 ring-offset-background transition-shadow",
                  active && "ring-2 ring-foreground/40",
                )}
                style={{ background: t.swatch }}
              >
                {active ? <Check className="h-3 w-3 text-white" /> : null}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={copyTheme}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-card/70"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied CSS" : "Copy theme CSS"}
        </button>
      </section>

      {/* ── LOGO ──────────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Logo</SectionLabel>
        <p className="mt-1 text-xs text-muted-foreground">
          Changes the header logo and tab icon.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {LOGO_COLORS.map((lc) => {
            const active = logoColor === lc.color;
            return (
              <button
                key={lc.id}
                type="button"
                onClick={() => setLogoColor(lc.color)}
                aria-pressed={active}
                aria-label={lc.name}
                title={lc.name}
                className={cn(
                  "relative rounded-xl transition-[box-shadow,transform] duration-150",
                  active
                    ? "ring-2 ring-foreground/40 ring-offset-2 ring-offset-background scale-105"
                    : "hover:scale-105",
                )}
              >
                <KineticMark color={lc.color} size={40} className="rounded-xl" />
                {active && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white drop-shadow-sm" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── RADIUS ────────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Radius</SectionLabel>
        <ToggleRow
          options={RADIUS_OPTIONS}
          value={borderRadius}
          onChange={setBorderRadius}
        />
      </section>

      {/* ── FONT ──────────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Font</SectionLabel>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {FONT_OPTIONS.map((o) => {
            const active = fontFamily === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => setFontFamily(o.id)}
                aria-pressed={active}
                style={{ fontFamily: o.cssVar }}
                className={cn(
                  "rounded-lg border px-2 py-2 text-[11px] transition-colors",
                  active
                    ? "border-foreground/25 bg-card text-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/15 hover:text-foreground",
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── INTENSITY ─────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Intensity</SectionLabel>
        <p className="mt-1 text-xs text-muted-foreground">
          Scales how vivid the accent color appears.
        </p>
        <ToggleRow
          options={INTENSITY_OPTIONS}
          value={accentIntensity}
          onChange={setAccentIntensity}
        />
      </section>

      {/* ── SPEED ─────────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Motion</SectionLabel>
        <p className="mt-1 text-xs text-muted-foreground">
          Controls transition speed across the UI.
        </p>
        <ToggleRow
          options={SPEED_OPTIONS}
          value={motionSpeed}
          onChange={setMotionSpeed}
        />
      </section>

      {/* ── TINT ──────────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Surface Tint</SectionLabel>
        <p className="mt-1 text-xs text-muted-foreground">
          Adds a hint of the theme color to backgrounds.
        </p>
        <ToggleRow
          options={TINT_OPTIONS}
          value={bgTint}
          onChange={setBgTint}
        />
        <p className="mt-3 text-xs text-muted-foreground">
          Preferences reset on refresh.
        </p>
      </section>
      </div>
    </Drawer>
  );
}
