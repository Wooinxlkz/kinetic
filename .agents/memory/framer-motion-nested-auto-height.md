---
name: Nested framer-motion height:"auto" races
description: Why a morph/expand panel stutters or glitches on open/close when it and a nested child both animate height to "auto".
---

Animating `height: "auto"` on a wrapper while a nested child (e.g. a
message thread that mounts/unmounts via `AnimatePresence`) *also*
animates its own `height` from `0` to `"auto"` creates two competing
height measurements. framer-motion measures the parent's "auto" target
once, but the child may still be mid-resize at that moment, producing a
visible stutter/jump ("morph glitch") specifically on open/close once
the child's content becomes non-empty (e.g. once there's chat history).

**Why:** framer-motion's height:"auto" support works by measuring the
DOM once per animation start and tweening between fixed pixel bounds —
it does not continuously re-measure a child that is independently
animating its own height at the same time.

**How to apply:** Prefer switching a wrapper between fixed pixel height
constants (e.g. `FORM_HEIGHT_EMPTY` / `FORM_HEIGHT_CHAT`) driven by a
simple boolean/state, rather than `height: "auto"`. If a child needs to
mount/unmount inside that fixed-height wrapper, animate its `opacity`
only — let it take its natural flow height instantly. This matches a
proven working pattern seen in a comparable app (an AI "ask" morph
panel) and eliminates the race entirely.
