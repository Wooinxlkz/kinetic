"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

// ── Color math ────────────────────────────────────────────────────────────────

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const hex = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${hex(f(0))}${hex(f(8))}${hex(f(4))}`;
}

function hexToHsl(hex: string): [number, number, number] | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, "#$1$1$2$2$3$3"),
  );
  if (!m) return null;
  let r = parseInt(m[1], 16) / 255, g = parseInt(m[2], 16) / 255, b = parseInt(m[3], 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// ── Saturation/Brightness canvas ──────────────────────────────────────────────

function SBCanvas({ hue, sat, bright, onChange }: {
  hue: number; sat: number; bright: number; onChange: (s: number, b: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const pick = useCallback((e: MouseEvent | React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const s = Math.round(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * 100);
    const b = Math.round(Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height)) * 100);
    onChange(s, b);
  }, [onChange]);

  useEffect(() => {
    const move = (e: MouseEvent) => { if (dragging.current) pick(e); };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [pick]);

  return (
    <div
      ref={ref}
      className="relative h-36 w-full cursor-crosshair select-none overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,hsl(${hue},100%,50%))` }}
      onMouseDown={(e) => { dragging.current = true; pick(e); }}
    >
      <motion.div
        className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg ring-1 ring-black/20"
        style={{ left: `${sat}%`, top: `${100 - bright}%`, backgroundColor: hslToHex(hue, sat, bright) }}
        transition={SPRING_LAYOUT}
      />
    </div>
  );
}

// ── Hue slider ────────────────────────────────────────────────────────────────

function HueSlider({ hue, onChange }: { hue: number; onChange: (h: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const pick = useCallback((e: MouseEvent | React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    onChange(Math.round(Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360))));
  }, [onChange]);

  useEffect(() => {
    const move = (e: MouseEvent) => { if (dragging.current) pick(e); };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [pick]);

  return (
    <div
      ref={ref}
      className="relative h-3 w-full cursor-pointer select-none rounded-full"
      style={{ background: "linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" }}
      onMouseDown={(e) => { dragging.current = true; pick(e); }}
    >
      <motion.div
        className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg ring-1 ring-black/20"
        style={{ left: `${(hue / 360) * 100}%`, backgroundColor: `hsl(${hue},100%,50%)` }}
        transition={SPRING_LAYOUT}
      />
    </div>
  );
}

// ── Public API ─────────────────────────────────────────────────────────────────

export interface ColorPickerProps {
  value?: string;
  onChange?: (hex: string) => void;
  className?: string;
}

const PRESETS = [
  "#ef4444","#f97316","#eab308","#22c55e","#06b6d4","#3b82f6","#8b5cf6","#ec4899",
  "#ffffff","#d1d5db","#6b7280","#374151","#1f2937","#111827","#000000","#f8fafc",
];

export function ColorPicker({ value = "#3b82f6", onChange, className }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const parsed = hexToHsl(value) ?? [210, 83, 60];
  const [hue, setHue] = useState(parsed[0]);
  const [sat, setSat] = useState(parsed[1]);
  const [bright, setBright] = useState(parsed[2]);
  const [hexInput, setHexInput] = useState(value);

  const hex = hslToHex(hue, sat, bright);

  useEffect(() => {
    setHexInput(hex);
    onChange?.(hex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hue, sat, bright]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const applyHex = (raw: string) => {
    setHexInput(raw);
    const hsl = hexToHsl(raw);
    if (hsl) { setHue(hsl[0]); setSat(hsl[1]); setBright(hsl[2]); }
  };

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING_LAYOUT}
        className="flex h-9 items-center gap-2.5 rounded-xl border border-border bg-background px-3 shadow-sm focus:outline-none"
      >
        <motion.span
          className="h-5 w-5 rounded-md border border-black/10 shadow-sm"
          animate={{ backgroundColor: hex }}
          transition={{ duration: 0.12 }}
        />
        <span className="font-mono text-xs text-muted-foreground">{hex.toUpperCase()}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 38 }}
          className="text-[10px] text-muted-foreground/50"
        >▾</motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -6, filter: "blur(6px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -4, filter: "blur(6px)" }}
            transition={reduce ? { duration: 0.15 } : SPRING_PANEL}
            className="absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-border bg-popover p-3 shadow-2xl"
          >
            <SBCanvas hue={hue} sat={sat} bright={bright} onChange={(s, b) => { setSat(s); setBright(b); }} />

            <div className="mt-3 flex items-center gap-2.5">
              <motion.div
                className="h-8 w-8 shrink-0 rounded-lg border border-black/10 shadow-sm"
                animate={{ backgroundColor: hex }}
                transition={{ duration: 0.1 }}
              />
              <div className="flex-1">
                <HueSlider hue={hue} onChange={setHue} />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2.5 py-1.5">
              <span className="text-xs font-medium text-muted-foreground">#</span>
              <input
                value={hexInput.replace(/^#/, "")}
                onChange={(e) => applyHex(`#${e.target.value}`)}
                maxLength={6}
                className="flex-1 bg-transparent font-mono text-xs text-foreground focus:outline-none"
                spellCheck={false}
              />
            </div>

            <div className="mt-3 grid grid-cols-8 gap-1.5">
              {PRESETS.map((p) => (
                <motion.button
                  key={p}
                  type="button"
                  onClick={() => { const hsl = hexToHsl(p); if (hsl) { setHue(hsl[0]); setSat(hsl[1]); setBright(hsl[2]); } }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.88 }}
                  transition={SPRING_LAYOUT}
                  className={cn(
                    "h-6 w-6 rounded-md border border-black/10 shadow-sm focus:outline-none",
                    hex.toLowerCase() === p.toLowerCase() && "ring-2 ring-primary ring-offset-1 ring-offset-popover",
                  )}
                  style={{ backgroundColor: p }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
