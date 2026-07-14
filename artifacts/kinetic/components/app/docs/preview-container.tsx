"use client";

import {
  useState,
  useCallback,
  type ReactNode,
  useEffect,
  useRef,
  useId,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Viewport = "desktop" | "tablet" | "phone";

const VIEWPORTS: {
  id: Viewport;
  icon: typeof Monitor;
  label: string;
  maxWidth: string | undefined;
}[] = [
  { id: "desktop", icon: Monitor, label: "Desktop", maxWidth: undefined },
  { id: "tablet", icon: Tablet, label: "Tablet (768 px)", maxWidth: "768px" },
  { id: "phone", icon: Smartphone, label: "Phone (390 px)", maxWidth: "390px" },
];

const ZOOM_BASE = 0.8; // physical scale shown as "100%"
const ZOOM_STEP = 0.1;
const ZOOM_MIN = 0.4;
const ZOOM_MAX = 2;

const BTN_STYLE = {
  border: "1px solid rgb(255 255 255 / 0.14)",
  background: "rgb(255 255 255 / 0.04)",
} as const;

interface PreviewContainerProps {
  children: ReactNode;
  minHeight?: string;
}

export function PreviewContainer({
  children,
  minHeight = "320px",
}: PreviewContainerProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(ZOOM_BASE);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
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

  const phoneFrame = viewport === "phone";
  const tabletFrame = viewport === "tablet";
  const vp = VIEWPORTS.find((v) => v.id === viewport)!;

  // Pan drag handlers — clamp to ±50% of canvas size
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
    e.preventDefault();
  }, [pan]);

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

  const previewContent = (
    <div
      key={refreshKey}
      className="flex items-center justify-center"
      style={{ minHeight: fullscreen ? "auto" : minHeight }}
    >
      {children}
    </div>
  );

  /* ── viewport picker — scope keeps layoutId unique per toolbar instance ── */
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
        {/* Header */}
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
                title="Zoom out"
                onClick={zoomOut}
                disabled={zoom <= ZOOM_MIN}
                className="relative flex h-6 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground disabled:opacity-35"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[2.8rem] text-center font-mono text-[11px] text-muted-foreground select-none">
                {Math.round((zoom / ZOOM_BASE) * 100)}%
              </span>
              <button
                type="button"
                aria-label="Zoom in"
                title="Zoom in"
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

        {/* Canvas — no scrollbar, drag to pan */}
        <div
          ref={canvasRef}
          className="relative flex-1 overflow-hidden select-none"
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Centered + transformed content */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ pointerEvents: "none" }}
          >
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
              {phoneFrame ? (
                <PhoneShell>{previewContent}</PhoneShell>
              ) : tabletFrame ? (
                <TabletShell>{previewContent}</TabletShell>
              ) : (
                previewContent
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── INLINE (normal) ── */
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

      {/* Preview area.
          Block container (no flex) + overflow-x-auto: phone/tablet use
          margin:auto to self-center; when the frame is wider than the
          container the auto-margins collapse to 0 and overflow-x-auto
          kicks in — no left-clip, no justify-center scroll trap. */}
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
              <PhoneShell>{previewContent}</PhoneShell>
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
              <TabletShell>{previewContent}</TabletShell>
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
              {previewContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabletShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-6 w-full max-w-[768px]">
      <div
        className="relative rounded-[1.6rem] bg-card shadow-xl"
        style={{
          border: "2px solid rgb(255 255 255 / 0.14)",
          minHeight: "540px",
          overflow: "hidden",
        }}
      >
        {/* Front camera */}
        <div
          className="absolute left-1/2 top-3 z-10 h-[10px] w-[10px] -translate-x-1/2 rounded-full"
          style={{ background: "rgb(0 0 0 / 0.8)" }}
        />
        {/* Content below camera — let the component handle its own scroll */}
        <div className="pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-6 w-full max-w-[390px]">
      <div
        className="relative overflow-hidden rounded-[2.8rem] bg-card shadow-xl"
        style={{
          border: "2px solid rgb(255 255 255 / 0.14)",
          minHeight: "680px",
        }}
      >
        {/* Dynamic island */}
        <div
          className="absolute left-1/2 top-3 z-10 h-[18px] w-[90px] -translate-x-1/2 rounded-full"
          style={{ background: "rgb(0 0 0 / 0.8)" }}
        />
        {/* Content below notch */}
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
