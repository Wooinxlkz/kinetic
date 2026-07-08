"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FlickeringGridProps {
  className?: string;
  /** Side length of each square in px. Default 4. */
  squareSize?: number;
  /** Gap between squares in px. Default 6. */
  gridGap?: number;
  /**
   * Probability per frame that a given square changes its opacity.
   * Range 0–1. Default 0.05 (≈3 updates/sec/cell at 60 fps).
   */
  flickerChance?: number;
  /**
   * Fill color for the squares. Must be a concrete CSS color —
   * CSS variables are not resolved inside canvas (use a hex or rgb value).
   * Default "#000" (black, suitable for light backgrounds).
   * For dark themes pass e.g. "#fff" or "rgba(255,255,255,0.8)".
   */
  color?: string;
  /** Maximum opacity any square can reach. Range 0–1. Default 0.25. */
  maxOpacity?: number;
  /** Fixed canvas width in px. Defaults to container width. */
  width?: number;
  /** Fixed canvas height in px. Defaults to container height. */
  height?: number;
}

/**
 * Canvas grid where every cell independently flickers its opacity.
 * Works as a full-size background: give the parent `position: relative`
 * and render `<FlickeringGrid className="absolute inset-0" />` inside it.
 * The canvas auto-resizes with its container via ResizeObserver.
 */
export function FlickeringGrid({
  className,
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.05,
  color = "#000",
  maxOpacity = 0.25,
  width,
  height,
}: FlickeringGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let opacities: Float32Array = new Float32Array(0);
    let cols = 0;
    let rows = 0;
    let isDestroyed = false;

    const setup = () => {
      const w = width ?? container.clientWidth;
      const h = height ?? container.clientHeight;
      if (!w || !h) return;
      canvas.width = w;
      canvas.height = h;
      cols = Math.ceil(w / (squareSize + gridGap));
      rows = Math.ceil(h / (squareSize + gridGap));
      opacities = new Float32Array(cols * rows).map(() => Math.random() * maxOpacity);
    };

    const draw = () => {
      if (isDestroyed) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const idx = c * rows + r;
          if (!reduce && Math.random() < flickerChance) {
            opacities[idx] = Math.random() * maxOpacity;
          }
          ctx.globalAlpha = opacities[idx] ?? 0;
          ctx.fillRect(
            c * (squareSize + gridGap),
            r * (squareSize + gridGap),
            squareSize,
            squareSize,
          );
        }
      }
      ctx.globalAlpha = 1;
      if (!reduce && !isDestroyed) {
        animId = requestAnimationFrame(draw);
      }
    };

    setup();
    draw();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animId);
      setup();
      draw();
    });
    ro.observe(container);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [squareSize, gridGap, flickerChance, color, maxOpacity, width, height, reduce]);

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
