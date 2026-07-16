"use client";

import { Marker } from "@/components/motion/marker";

export function MarkerPreview() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-10 p-10">
      {/* Highlight */}
      <p className="text-2xl font-semibold leading-relaxed text-foreground">
        Ship features{" "}
        <Marker variant="highlight" color="yellow" delay={0.1}>
          ten times faster
        </Marker>{" "}
        with Kinetic.
      </p>

      {/* Underline */}
      <p className="text-2xl font-semibold leading-relaxed text-foreground">
        Every component is{" "}
        <Marker variant="underline" color="blue" delay={0.2}>
          fully accessible
        </Marker>{" "}
        out of the box.
      </p>

      {/* Wavy */}
      <p className="text-2xl font-semibold leading-relaxed text-foreground">
        Built for{" "}
        <Marker variant="wavy" color="pink" delay={0.15}>
          modern React
        </Marker>{" "}
        and Next.js.
      </p>

      {/* Circle */}
      <p className="text-2xl font-semibold leading-relaxed text-foreground">
        Animations that feel{" "}
        <Marker variant="circle" color="green" delay={0.1}>
          just right
        </Marker>
        .
      </p>
    </div>
  );
}
