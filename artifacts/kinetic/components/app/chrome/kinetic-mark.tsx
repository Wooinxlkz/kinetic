"use client";

import { useId } from "react";

/**
 * Inline SVG of the Kinetic mark — pentagon with 10-ray starburst cut.
 * Accepts any `color` so the logo background can be themed at runtime.
 */
export function KineticMark({
  color,
  size = 24,
  className,
}: {
  color: string;
  size?: number;
  className?: string;
}) {
  const id = useId();
  // Strip characters that would break an id attribute
  const clipId = `km${id.replace(/[^a-zA-Z0-9]/g, "")}`;

  // "mono" is a sentinel value (not a real color) meaning: follow the app's
  // theme instead of a fixed hex — black mark on light, white mark on dark.
  const isMono = color === "mono";
  const bgFill = isMono ? "var(--foreground)" : color;
  const starFill = isMono ? "var(--background)" : "white";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="180" height="180" rx="40" fill={bgFill} />
      <defs>
        <clipPath id={clipId}>
          <polygon points="90,15 161.32,66.84 134.09,150.68 45.91,150.68 18.68,66.84" />
        </clipPath>
      </defs>
      <polygon
        points="90,15 161.32,66.84 134.09,150.68 45.91,150.68 18.68,66.84"
        fill={starFill}
      />
      <g
        clipPath={`url(#${clipId})`}
        stroke={bgFill}
        strokeWidth="5"
        strokeLinecap="butt"
      >
        <line x1="90" y1="90" x2="90" y2="15" />
        <line x1="90" y1="90" x2="125.68" y2="40.92" />
        <line x1="90" y1="90" x2="161.32" y2="66.84" />
        <line x1="90" y1="90" x2="147.72" y2="108.76" />
        <line x1="90" y1="90" x2="134.09" y2="150.68" />
        <line x1="90" y1="90" x2="90" y2="150.68" />
        <line x1="90" y1="90" x2="45.91" y2="150.68" />
        <line x1="90" y1="90" x2="32.28" y2="108.76" />
        <line x1="90" y1="90" x2="18.68" y2="66.84" />
        <line x1="90" y1="90" x2="54.32" y2="40.92" />
      </g>
    </svg>
  );
}
