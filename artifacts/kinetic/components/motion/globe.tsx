"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface GlobeProps {
  className?: string;
  /** Rendered size in px. */
  size?: number;
  /** Rotation speed in radians per frame. */
  speed?: number;
  /** Number of dots on the sphere surface. */
  dotCount?: number;
}

export function Globe({ className, size = 300, speed = 0.003, dotCount = 500 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const r = size * 0.42;
    const cx = size / 2;
    const cy = size / 2;

    // Resolve --primary to an rgb triple via a throwaway element.
    // CSS vars may store oklch, hsl components, or full color strings —
    // the browser always gives back "rgb(r, g, b)" from getComputedStyle.
    const probe = document.createElement("div");
    probe.style.cssText = "position:absolute;width:0;height:0;background-color:oklch(var(--primary,68% 0.24 38))";
    document.body.appendChild(probe);
    const raw = getComputedStyle(probe).backgroundColor; // "rgb(r, g, b)" or "rgba(…)"
    document.body.removeChild(probe);
    const [pr = 130, pg = 80, pb = 255] = (raw.match(/[\d.]+/g) ?? []).map(Number);
    const hsl = (alpha: number) => `rgba(${pr},${pg},${pb},${alpha})`;

    // Fibonacci sphere for even dot distribution
    const dots: { lat: number; lng: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2;
      const theta = golden * i;
      dots.push({ lat: Math.asin(y), lng: theta });
    }

    // Arcs that animate around the globe
    const arcs: Array<{
      a: { lat: number; lng: number };
      b: { lat: number; lng: number };
      progress: number;
      speed: number;
    }> = [
      { a: { lat: 0.5, lng: 0 }, b: { lat: -0.3, lng: 2.5 }, progress: 0, speed: 0.0045 },
      { a: { lat: 0.8, lng: 1 }, b: { lat: 0.1, lng: 4 }, progress: 0.4, speed: 0.006 },
      { a: { lat: -0.5, lng: 0.5 }, b: { lat: 0.6, lng: 3 }, progress: 0.7, speed: 0.005 },
      { a: { lat: 0.2, lng: 2 }, b: { lat: -0.6, lng: 5 }, progress: 0.2, speed: 0.004 },
    ];

    let angle = 0;
    let raf = 0;

    const project = (lat: number, lng: number, rotAngle: number) => {
      const rotLng = lng + rotAngle;
      const x3d = Math.cos(lat) * Math.cos(rotLng);
      const y3d = Math.sin(lat);
      const z3d = Math.cos(lat) * Math.sin(rotLng);
      return { px: cx + x3d * r, py: cy - y3d * r, z: z3d };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Subtle outer glow ring
      const grd = ctx.createRadialGradient(cx, cy, r * 0.65, cx, cy, r * 1.2);
      grd.addColorStop(0, hsl(0));
      grd.addColorStop(1, hsl(0.07));
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Collect + sort dots back-to-front for depth painting
      const projected = dots.map((d) => project(d.lat, d.lng, angle));
      projected.sort((a, b) => a.z - b.z);

      for (const { px, py, z } of projected) {
        const depth = (z + 1) / 2; // 0 = back, 1 = front
        if (depth < 0.02) continue;
        ctx.beginPath();
        ctx.arc(px, py, 0.9 + depth * 1.0, 0, Math.PI * 2);
        ctx.fillStyle = hsl(0.08 + depth * 0.78);
        ctx.fill();
      }

      // Animate arcs
      for (const arc of arcs) {
        const steps = 70;
        const trailLen = 22;
        const head = Math.floor(arc.progress * steps);
        const tail = Math.max(0, head - trailLen);

        ctx.beginPath();
        let started = false;
        for (let s = tail; s <= head; s++) {
          const t = s / steps;
          const lat = arc.a.lat + (arc.b.lat - arc.a.lat) * t;
          const lng = arc.a.lng + (arc.b.lng - arc.a.lng) * t;
          const { px, py, z } = project(lat, lng, angle);
          if (z < -0.15) continue;
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }

        const alpha = ((head - tail) / trailLen) * 0.75;
        ctx.strokeStyle = hsl(alpha);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        arc.progress = (arc.progress + arc.speed) % 1;
      }

      if (!reduce) {
        angle += speed;
        raf = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, speed, dotCount, reduce]);

  return <canvas ref={canvasRef} className={cn("block", className)} />;
}
