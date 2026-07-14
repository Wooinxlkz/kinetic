"use client";

import { type ReactNode, useState, useCallback, useEffect, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Monitor, Tablet, Smartphone, RotateCcw, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { CommunityPreviewFrame } from "./community-preview-frame";

type Viewport = "desktop" | "tablet" | "phone";

const VIEWPORTS: { id: Viewport; icon: typeof Monitor; label: string; maxWidth?: string }[] = [
  { id: "desktop", icon: Monitor, label: "Desktop" },
  { id: "tablet", icon: Tablet, label: "Tablet (768 px)", maxWidth: "768px" },
  { id: "phone", icon: Smartphone, label: "Phone (390 px)", maxWidth: "390px" },
];

const ZOOM_BASE = 0.8;
const ZOOM_STEP = 0.1;
const ZOOM_MIN = 0.4;
const ZOOM_MAX = 2;

const BTN_STYLE = {
  border: "1px solid rgb(255 255 255 / 0.14)",
  background: "rgb(255 255 255 / 0.04)",
} as const;

/** Watches document.documentElement for a "dark" class toggle. */
function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    setIsDark(el.classList.contains("dark"));
    const observer = new MutationObserver(() =>
      setIsDark(el.classList.contains("dark")),
    );
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function TabletShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-6 w-full max-w-[768px]">
      {/* bg-background matches the iframe body background exactly — no color seams */}
      <div
        className="relative rounded-[1.6rem] bg-background shadow-xl"
        style={{
          border: "2px solid rgb(255 255 255 / 0.14)",
          height: "540px",
          overflow: "hidden",
        }}
      >
        {/* Front camera */}
        <div
          className="absolute left-1/2 top-3 z-10 h-[10px] w-[10px] -translate-x-1/2 rounded-full"
          style={{ background: "rgb(0 0 0 / 0.6)" }}
        />
        {/* 540px shell - 32px camera padding = 508px for content */}
        <div className="h-[508px] pt-8">{children}</div>
      </div>
    </div>
  );
}

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-6 w-full max-w-[390px]">
      <div
        className="relative overflow-hidden rounded-[2.8rem] bg-background shadow-xl"
        style={{
          border: "2px solid rgb(255 255 255 / 0.14)",
          height: "690px",
        }}
      >
        {/* Dynamic island */}
        <div
          className="absolute left-1/2 top-3 z-10 h-[18px] w-[90px] -translate-x-1/2 rounded-full"
          style={{ background: "rgb(0 0 0 / 0.8)" }}
        />
        {/* 690px shell - 40px island margin = 650px for content */}
        <div className="mt-10 h-[650px]">{children}</div>
      </div>
    </div>
  );
}

/**
 * Wraps `CommunityPreviewFrame` with the same device-picker toolbar
 * (Desktop / Tablet / Phone), Refresh, and Fullscreen buttons as the
 * built-in `PreviewContainer`, including animated viewport transitions,
 * device shells, fullscreen zoom+pan, and dark-mode forwarding.
 */
export function CommunityPreviewContainer({
  code,
  demoCode,
  title,
}: {
  code: string;
  demoCode?: string | null;
  title?: string;
}) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(ZOOM_BASE);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDark = useIsDark();
  const layoutId = useId();

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);
  const zoomIn = useCallback(
    () => setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 10) / 10)),
    [],
  );
  const zoomOut = useCallback(
    () => setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 10) / 10)),
    [],
  );

  // Reset zoom + pan when leaving fullscreen
  useEffect(() => {
    if (!fullscreen) {
      setZoom(ZOOM_BASE);
      setPan({ x: 0, y: 0 });
    }
  }, [fullscreen]);

  // Reset pan when switching viewport
  useEffect(() => {
    setPan({ x: 0, y: 0 });
  }, [viewport]);

  // Escape closes fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      dragStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
      e.preventDefault();
    },
    [pan],
  );
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    const canvas = canvasRef.current;
    const maxX = canvas ? canvas.offsetWidth * 0.5 : 9999;
    const maxY = canvas ? canvas.offsetHeight * 0.5 : 9999;
    setPan({
      x: Math.max(-maxX, Math.min(maxX, dragStart.current.px + dx)),
      y: Math.max(-maxY, Math.min(maxY, dragStart.current.py + dy)),
    });
  }, []);
  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const vp = VIEWPORTS.find((v) => v.id === viewport)!;
  const phoneFrame = viewport === "phone";
  const tabletFrame = viewport === "tablet";

  // Key includes refreshKey + isDark so the iframe reloads on each
  const frameKey = `${refreshKey}-${isDark ? "dark" : "light"}`;

  // The iframe itself — explicit heights so h-full on the iframe resolves correctly
  const iframeEl = (
    <div className={cn("w-full", phoneFrame ? "h-[650px]" : tabletFrame ? "h-[476px]" : "min-h-[320px]")}>
      <CommunityPreviewFrame
        key={frameKey}
        code={code}
        demoCode={demoCode}
        title={title}
        isDark={isDark}
        scrollable
        eager
      />
    </div>
  );

  // Content shown inside the viewport (with shells for phone/tablet)
  const previewContent = phoneFrame ? (
    <PhoneShell>{iframeEl}</PhoneShell>
  ) : tabletFrame ? (
    <TabletShell>{iframeEl}</TabletShell>
  ) : (
    <div className="min-h-[320px] w-full">{iframeEl}</div>
  );

  const makeViewportPicker = (scope: string) => (
    <div className="flex items-center rounded-lg p-0.5" style={BTN_STYLE}>
      {VIEWPORTS.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          title={label}
          onClick={() => setViewport(id)}
          className={cn(
            "relative flex h-6 w-7 items-center justify-center rounded-md",
            "text-muted-foreground transition-colors hover:text-foreground",
            viewport === id && "text-foreground",
          )}
        >
          {viewport === id && (
            <motion.span
              layoutId={`${layoutId}-vp-${scope}`}
              className="absolute inset-0 rounded-md"
              style={{ background: "rgb(255 255 255 / 0.12)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <Icon className="relative h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );

  const retryBtn = (
    <button
      type="button"
      aria-label="Retry preview"
      title="Retry preview"
      onClick={refresh}
      className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
      style={BTN_STYLE}
    >
      <RotateCcw className="h-3.5 w-3.5" />
    </button>
  );

  const fullscreenBtn = (
    <button
      type="button"
      aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
      title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
      onClick={() => setFullscreen((f) => !f)}
      className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
      style={BTN_STYLE}
    >
      {fullscreen ? <X className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
    </button>
  );

  /* ── FULLSCREEN ── */
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        <div
          className="flex shrink-0 items-center justify-between px-4 py-2"
          style={{ borderBottom: "1px solid rgb(255 255 255 / 0.08)" }}
        >
          <span className="text-sm font-medium text-foreground">Preview</span>
          <div className="flex items-center gap-1.5">
            {makeViewportPicker("fs")}
            {/* Zoom controls — fullscreen only */}
            <div className="flex items-center rounded-lg p-0.5" style={BTN_STYLE}>
              <button
                type="button"
                aria-label="Zoom out"
                onClick={zoomOut}
                disabled={zoom <= ZOOM_MIN}
                className="relative flex h-6 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground disabled:opacity-35"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[2.8rem] select-none text-center font-mono text-[11px] text-muted-foreground">
                {Math.round((zoom / ZOOM_BASE) * 100)}%
              </span>
              <button
                type="button"
                aria-label="Zoom in"
                onClick={zoomIn}
                disabled={zoom >= ZOOM_MAX}
                className="relative flex h-6 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground disabled:opacity-35"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
            {retryBtn}
            {fullscreenBtn}
          </div>
        </div>

        {/* Canvas — drag to pan */}
        <div
          ref={canvasRef}
          className="relative flex-1 select-none overflow-hidden"
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "none" }}>
            <div
              style={{
                width: vp.maxWidth ?? "100%",
                maxWidth: vp.maxWidth ?? "100%",
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                willChange: "transform",
                transition: isDragging.current
                  ? "none"
                  : "transform 0.1s ease-out, width 0.2s ease, max-width 0.2s ease",
                pointerEvents: "auto",
              }}
            >
              {previewContent}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── INLINE ── */
  return (
    <div className="relative rounded-2xl border border-border">
      {/* Toolbar — floats top-right */}
      <div className="absolute right-3 top-3 z-10">
        <div className="flex items-center gap-1.5">
          {makeViewportPicker("inline")}
          {retryBtn}
          {fullscreenBtn}
        </div>
      </div>

      {/* Preview area — overflow-x-auto so phone/tablet can scroll horizontally */}
      <div className="overflow-x-auto overflow-y-auto px-4 py-10">
        <AnimatePresence mode="wait" initial={false}>
          {phoneFrame ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ width: 390, marginLeft: "auto", marginRight: "auto" }}
            >
              <PhoneShell>{iframeEl}</PhoneShell>
            </motion.div>
          ) : tabletFrame ? (
            <motion.div
              key="tablet"
              className="w-full"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <TabletShell>{iframeEl}</TabletShell>
            </motion.div>
          ) : (
            <motion.div
              key="flat"
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <div className="min-h-[320px] w-full">{iframeEl}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
