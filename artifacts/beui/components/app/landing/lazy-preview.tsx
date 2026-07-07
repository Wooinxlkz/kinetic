"use client";

import { useEffect, useRef, useState } from "react";
import { getPreview } from "@/components/previews";

/**
 * Defers mounting the live preview until the card is within 300 px of the
 * viewport. Once active it never unmounts, so re-scrolling to a card shows
 * the already-running animation with no flicker.
 *
 * Why: the landing page can show 24+ preview components simultaneously.
 * All of them spin up their Framer Motion WAAPI animations on mount — even
 * cards far below the fold. This wrapper cuts the active-animation count
 * down to only the cards the user has actually scrolled near, which:
 *   1. Reduces CPU/GPU load while browsing the landing page.
 *   2. Reduces the number of running animations the VT snapshot has to
 *      deal with during theme switching, making the transition smoother.
 *
 * Accepts plain strings (category / slug) so it can be used from a Server
 * Component without serialization errors — component references can't cross
 * the server→client boundary, but strings can.
 */
export function LazyPreview({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Preview = active ? getPreview(category, slug) : null;

  return (
    <div
      ref={ref}
      className="pointer-events-none flex w-full max-w-full origin-center scale-80 items-center justify-center overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] contain-[paint] group-hover/card:scale-[0.84] group-focus-within/card:scale-[0.84] [&_*]:!cursor-default"
    >
      {Preview ? <Preview /> : null}
    </div>
  );
}
