"use client";

import { useState, useEffect, useCallback } from "react";
import { StreamingText, StreamingCursor } from "@/components/ai/streaming-text";

const TEXTS = [
  "The StreamingText component reveals each character one by one, giving the illusion of a live AI response. You control the speed and can listen for completion.",
  "It tracks the previous target string and only streams the new suffix — so as tokens arrive and the string grows, it never re-streams text you've already seen.",
  "Pair it with the blinking StreamingCursor for a polished chat interface. The cursor fades out automatically when the full text has been revealed.",
];

export function StreamingTextPreview() {
  const [textIndex, setTextIndex] = useState(0);
  const [target, setTarget] = useState(TEXTS[0]);
  const [done, setDone] = useState(false);
  const [key, setKey] = useState(0);

  const next = useCallback(() => {
    const next = (textIndex + 1) % TEXTS.length;
    setTextIndex(next);
    setTarget(TEXTS[next]);
    setDone(false);
    setKey((k) => k + 1);
  }, [textIndex]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(next, 1800);
    return () => clearTimeout(t);
  }, [done, next]);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {/* Live streaming text */}
      <div className="rounded-2xl bg-card p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          Live preview
        </p>
        <p key={key} className="text-sm leading-relaxed text-foreground">
          <StreamingText
            text={target}
            speed={55}
            onComplete={() => setDone(true)}
          />
        </p>
      </div>

      {/* Cursor demo */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>StreamingCursor standalone</span>
        <StreamingCursor />
      </div>

      {/* Speed demo */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Slow", speed: 20, text: "Slow reveal…" },
          { label: "Normal", speed: 60, text: "Normal speed…" },
          { label: "Fast", speed: 200, text: "Fast reveal!" },
        ].map(({ label, speed, text }) => (
          <div key={label} className="rounded-xl bg-card px-3 py-2.5 text-center">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              {label}
            </p>
            <p className="text-xs text-foreground">
              <StreamingText key={`${key}-${label}`} text={text} speed={speed} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
