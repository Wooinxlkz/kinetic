"use client";

import { HeroVideoDialog } from "@/components/motion/hero-video-dialog";

export function HeroVideoDialogPreview() {
  return (
    <div className="w-full max-w-lg px-4">
      <HeroVideoDialog
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        thumbnailSrc="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
        thumbnailAlt="Video preview"
        animationStyle="from-center"
      />
    </div>
  );
}
