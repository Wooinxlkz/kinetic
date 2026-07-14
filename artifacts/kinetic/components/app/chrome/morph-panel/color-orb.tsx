"use client";

import type React from "react";
import { cn } from "@/lib/utils";

interface OrbProps {
  dimension?: string;
  className?: string;
  /** CSS color values. Supports CSS variables e.g. `"var(--accent)"`. */
  tones?: {
    base?: string;
    accent1?: string;
    accent2?: string;
    accent3?: string;
  };
  spinDuration?: number;
}

/**
 * ColorOrb — animated conic-gradient sphere.
 *
 * Default tones blend the active theme's --accent with --neon and --violet
 * so the gradient reads as multi-colour while still being dominated by
 * whatever theme colour the user has selected.
 *
 * CSS animation lives in globals.css (.color-orb / --orb-* properties).
 */
export const ColorOrb: React.FC<OrbProps> = ({
  dimension = "192px",
  className,
  tones,
  spinDuration = 16,
}) => {
  const fallbackTones = {
    base: "var(--background)",
    // Dominant: the active theme's accent
    accent1: "var(--accent)",
    // Secondary: theme accent mixed with the app's fixed neon green
    accent2: "color-mix(in oklch, var(--accent) 55%, var(--neon) 45%)",
    // Tertiary: theme accent mixed with the app's fixed violet
    accent3: "color-mix(in oklch, var(--accent) 55%, var(--violet) 45%)",
  };

  const palette = { ...fallbackTones, ...tones };
  const dimValue = parseInt(dimension.replace("px", ""), 10);

  const blurStrength =
    dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4);
  const contrastStrength =
    dimValue < 50 ? Math.max(dimValue * 0.004, 1.2) : Math.max(dimValue * 0.008, 1.5);
  const pixelDot =
    dimValue < 50 ? Math.max(dimValue * 0.004, 0.05) : Math.max(dimValue * 0.008, 0.1);
  const shadowRange =
    dimValue < 50 ? Math.max(dimValue * 0.004, 0.5) : Math.max(dimValue * 0.008, 2);
  const maskRadius =
    dimValue < 30 ? "0%" : dimValue < 50 ? "5%" : dimValue < 100 ? "15%" : "25%";
  const adjustedContrast =
    dimValue < 30 ? 1.1 : dimValue < 50 ? Math.max(contrastStrength * 1.2, 1.3) : contrastStrength;

  return (
    <div
      className={cn("color-orb", className)}
      style={
        {
          width: dimension,
          height: dimension,
          "--orb-base": palette.base,
          "--orb-accent1": palette.accent1,
          "--orb-accent2": palette.accent2,
          "--orb-accent3": palette.accent3,
          "--orb-spin-duration": `${spinDuration}s`,
          "--orb-blur": `${blurStrength}px`,
          "--orb-contrast": adjustedContrast,
          "--orb-dot": `${pixelDot}px`,
          "--orb-shadow": `${shadowRange}px`,
          "--orb-mask": maskRadius,
        } as React.CSSProperties
      }
    />
  );
};
