"use client";

import { Check, ChevronDown, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
import { useRecentComponents } from "@/lib/hooks/use-recent-components";
import { KineticMark } from "@/components/app/chrome/kinetic-mark";

// ── Logo colors ───────────────────────────────────────────────────────────────

const LOGO_COLORS = [
  { id: "orange", color: "#FF3C00" },
  { id: "violet", color: "#7C3AED" },
  { id: "blue",   color: "#2563EB" },
  { id: "green",  color: "#16A34A" },
  { id: "amber",  color: "#D97706" },
  { id: "pink",   color: "#DB2777" },
  { id: "red",    color: "#DC2626" },
  { id: "cyan",   color: "#0891B2" },
];

// ── Option sets ───────────────────────────────────────────────────────────────

const RADIUS_OPTIONS: { id: BorderRadius; label: string }[] = [
  { id: "sharp",   label: "Sharp"   },
  { id: "default", label: "Default" },
  { id: "rounded", label: "Rounded" },
  { id: "pill",    label: "Pill"    },
];

const FONT_OPTIONS: { id: FontFamily; label: string; cssVar: string }[] = [
  { id: "sans",          label: "Inter",          cssVar: "var(--font-sans)"          },
  { id: "space-grotesk", label: "Space Grotesk",  cssVar: "var(--font-space-grotesk)" },
  { id: "syne",          label: "Syne",           cssVar: "var(--font-syne)"          },
  { id: "plus-jakarta",  label: "Plus Jakarta",   cssVar: "var(--font-plus-jakarta)"  },
  { id: "mono",          label: "Mono",           cssVar: "var(--font-mono)"          },
  { id: "pixel",         label: "Pixel",          cssVar: "var(--font-geist-pixel-square), var(--font-mono)" },
];

const INTENSITY_OPTIONS: { id: AccentIntensity; label: string }[] = [
  { id: "subtle", label: "Subtle" },
  { id: "normal", label: "Normal" },
  { id: "vivid",  label: "Vivid"  },
];

const SPEED_OPTIONS: { id: MotionSpeed; label: string }[] = [
  { id: "slow",   label: "Slow"   },
  { id: "normal", label: "Normal" },
  { id: "fast",   label: "Fast"   },
];

const TINT_OPTIONS: { id: BgTint; label: string }[] = [
  { id: "off",  label: "Off"  },
  { id: "warm", label: "Warm" },
  { id: "rich", label: "Rich" },
];

// ── Section label ─────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-pixel text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  );
}

// ── Generic dropdown row ──────────────────────────────────────────────────────

function DropdownRow<T extends string>({
  label,
  description,
  options,
  value,
  onChange,
  renderOption,
  renderValue,
}: {
  label: string;
  description?: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  renderOption?: (o: { id: T; label: string }) => React.ReactNode;
  renderValue?: (o: { id: T; label: string } | undefined) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.id === value);

  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Row */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3 text-sm"
      >
        <span className="text-foreground/80">{label}</span>
        <span className="flex items-center gap-1.5 text-foreground">
          {renderValue ? renderValue(selected) : (
            <span>{selected?.label ?? "—"}</span>
          )}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-150",
              open && "rotate-180",
            )}
          />
        </span>
      </button>
      {description && (
        <p className="pb-1 text-[11px] leading-relaxed text-muted-foreground/60">
          {description}
        </p>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-0.5 min-w-[160px] max-h-60 overflow-y-auto rounded-xl border border-border bg-popover/95 p-1 shadow-xl backdrop-blur-xl"
          >
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => { onChange(o.id); setOpen(false); }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  value === o.id
                    ? "bg-foreground/8 text-foreground"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                )}
              >
                {renderOption ? renderOption(o) : <span>{o.label}</span>}
                {value === o.id && <Check className="h-3.5 w-3.5 shrink-0 text-foreground/60" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Row divider ───────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px bg-border" />;
}

// ── Main tab ──────────────────────────────────────────────────────────────────

const DOCK_OPTIONS: { id: "enabled" | "disabled"; label: string }[] = [
  { id: "enabled",  label: "Enabled"  },
  { id: "disabled", label: "Disabled" },
];

const GITHUB_BUTTON_OPTIONS: { id: "visible" | "hidden"; label: string }[] = [
  { id: "visible", label: "Show" },
  { id: "hidden",  label: "Hide" },
];

export function AppearanceTab() {
  const {
    colorTheme, setColorTheme,
    logoColor, setLogoColor,
    borderRadius, setBorderRadius,
    fontFamily, setFontFamily,
    motionSpeed, setMotionSpeed,
    bgTint, setBgTint,
    accentIntensity, setAccentIntensity,
    githubButtonVisibility, setGithubButtonVisibility,
  } = usePreferences();
  const { enabled: dockEnabled, setEnabled: setDockEnabled } = useRecentComponents();
  const [copied, setCopied] = useState(false);

  // Build theme options from THEME_LIST
  const themeOptions = THEME_LIST.map((t) => ({ id: t.id as string, label: t.name, swatch: t.swatch }));
  const selectedTheme = THEME_LIST.find((t) => t.id === colorTheme);

  return (
    <div className="flex flex-col px-7 py-5">

      {/* ── Theme ──────────────────────────────────────────────────────────── */}
      <DropdownRow
        label="Theme"
        description="Sets the overall color palette of the interface. Themes affect backgrounds, text, borders, and accent colors."
        options={themeOptions as { id: string; label: string }[]}
        value={colorTheme}
        onChange={(v) => setColorTheme(v as typeof colorTheme)}
        renderValue={(opt) => (
          <span className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full shrink-0"
              style={{ background: (opt as { swatch?: string })?.swatch ?? selectedTheme?.swatch }}
            />
            <span>{opt?.label ?? selectedTheme?.name}</span>
          </span>
        )}
        renderOption={(o) => (
          <span className="flex items-center gap-2.5">
            <span
              className="h-3 w-3 rounded-full shrink-0"
              style={{ background: (o as { swatch?: string }).swatch }}
            />
            <span>{o.label}</span>
          </span>
        )}
      />

      <Divider />

      {/* ── Radius ─────────────────────────────────────────────────────────── */}
      <DropdownRow
        label="Radius"
        options={RADIUS_OPTIONS}
        value={borderRadius}
        onChange={setBorderRadius}
      />

      <Divider />

      {/* ── Font ───────────────────────────────────────────────────────────── */}
      <DropdownRow
        label="Font"
        options={FONT_OPTIONS}
        value={fontFamily}
        onChange={setFontFamily}
        renderValue={(opt) => {
          const fontOpt = FONT_OPTIONS.find((f) => f.id === opt?.id);
          return (
            <span style={{ fontFamily: fontOpt?.cssVar }}>{opt?.label}</span>
          );
        }}
        renderOption={(o) => {
          const fontOpt = FONT_OPTIONS.find((f) => f.id === o.id);
          return (
            <span style={{ fontFamily: fontOpt?.cssVar }}>{o.label}</span>
          );
        }}
      />

      <Divider />

      {/* ── Accent intensity ────────────────────────────────────────────────── */}
      <DropdownRow
        label="Accent intensity"
        options={INTENSITY_OPTIONS}
        value={accentIntensity}
        onChange={setAccentIntensity}
      />

      <Divider />

      {/* ── Motion speed ────────────────────────────────────────────────────── */}
      <DropdownRow
        label="Motion speed"
        options={SPEED_OPTIONS}
        value={motionSpeed}
        onChange={setMotionSpeed}
      />

      <Divider />

      {/* ── Surface tint ────────────────────────────────────────────────────── */}
      <DropdownRow
        label="Surface tint"
        options={TINT_OPTIONS}
        value={bgTint}
        onChange={setBgTint}
      />

      <Divider />

      {/* ── History dock ────────────────────────────────────────────────────── */}
      <DropdownRow
        label="History dock"
        description="Shows a faint dock on the left edge with your recently visited components."
        options={DOCK_OPTIONS}
        value={dockEnabled ? "enabled" : "disabled"}
        onChange={(v) => setDockEnabled(v === "enabled")}
      />

      <Divider />

      {/* ── GitHub button ────────────────────────────────────────────────────── */}
      <DropdownRow
        label="GitHub button"
        description="Shows or hides the GitHub star counter in the header."
        options={GITHUB_BUTTON_OPTIONS}
        value={githubButtonVisibility}
        onChange={setGithubButtonVisibility}
      />

      {/* ── Logo color ──────────────────────────────────────────────────────── */}
      <div className="mt-6 flex flex-col gap-2">
        <Label>Logo color</Label>
        <p className="text-[11px] leading-relaxed text-muted-foreground/60">
          Choose an accent color for the Kinetic logo mark shown across the app.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {LOGO_COLORS.map((lc) => {
            const active = logoColor === lc.color;
            return (
              <button
                key={lc.id}
                type="button"
                onClick={() => setLogoColor(lc.color)}
                aria-pressed={active}
                className={cn(
                  "relative rounded-xl transition-[box-shadow,transform] duration-150",
                  active ? "ring-2 ring-foreground/40 ring-offset-2 ring-offset-background scale-110" : "hover:scale-105",
                )}
              >
                <KineticMark color={lc.color} size={34} className="rounded-xl" />
                {active && (
                  <Check className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-white drop-shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Copy CSS ────────────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(themeExportCss(colorTheme));
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copied!" : "Copy theme CSS"}
      </button>

    </div>
  );
}
