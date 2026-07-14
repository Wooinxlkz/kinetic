"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ── Particle system ──────────────────────────────────────────────────────────

type Shape = "circle" | "square" | "ribbon";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  angle: number; spin: number;
  color: string;
  shape: Shape;
  w: number; h: number;
  life: number; // 0 → 1
}

const COLORS = [
  "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff",
  "#ff9de2", "#c3f584", "#ffe599", "#b5deff",
];

function rand(min: number, max: number) { return min + Math.random() * (max - min); }
function pick<T>(arr: readonly T[]): T { return arr[Math.floor(Math.random() * arr.length)]!; }

function spawnParticles(ox: number, oy: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const speed = rand(3, 12);
    const a = rand(0, Math.PI * 2);
    const w = rand(5, 13);
    const isRibbon = Math.random() < 0.3;
    return {
      x: ox, y: oy,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed - rand(2, 7),
      angle: rand(0, Math.PI * 2),
      spin: rand(-0.2, 0.2),
      color: pick(COLORS),
      shape: isRibbon ? "ribbon" : pick(["circle", "square"] as const),
      w,
      h: isRibbon ? w * 0.32 : w,
      life: 0,
    };
  });
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, 1 - p.life);
  ctx.fillStyle = p.color;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  if (p.shape === "circle") {
    ctx.beginPath();
    ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.shape === "square") {
    ctx.fillRect(-p.w / 2, -p.w / 2, p.w, p.w);
  } else {
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
  }
  ctx.restore();
}

function runBurst(ox: number, oy: number, count: number) {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Object.assign(canvas.style, {
    position: "fixed", top: "0", left: "0",
    pointerEvents: "none", zIndex: "99999",
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) { canvas.remove(); return; }

  const particles = spawnParticles(ox, oy, count);
  const TOTAL = 90;
  let frame = 0;

  function tick() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;   // gravity
      p.vx *= 0.983; // air drag
      p.angle += p.spin;
      p.life = frame / TOTAL;
      drawParticle(ctx!, p);
    }
    frame++;
    if (frame <= TOTAL) requestAnimationFrame(tick);
    else canvas.remove();
  }
  requestAnimationFrame(tick);
}

// ── Public API ────────────────────────────────────────────────────────────────

export interface ConfettiOptions {
  /** Number of particles. Default 80. */
  count?: number;
  /** Viewport origin of the burst. Defaults to top-center of the screen. */
  origin?: { x?: number; y?: number };
}

/** Imperatively fire a confetti burst from a viewport position. */
export function fireConfetti({ count = 80, origin }: ConfettiOptions = {}) {
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 3;
  runBurst(x, y, count);
}

export interface ConfettiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Options forwarded to fireConfetti on each click. */
  options?: ConfettiOptions;
}

/**
 * A `<button>` that fires a confetti burst from the click point.
 * Passes all standard button props through; style it however you like.
 * Respects prefers-reduced-motion — no burst fires when motion is reduced.
 */
export function ConfettiButton({
  children,
  options,
  className,
  onClick,
  ...rest
}: ConfettiButtonProps) {
  const reduce = useReducedMotion();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!reduce) {
        fireConfetti({
          count: options?.count ?? 80,
          origin: { x: e.clientX, y: e.clientY },
        });
      }
      onClick?.(e);
    },
    [reduce, options, onClick],
  );

  return (
    <button className={cn(className)} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
}
