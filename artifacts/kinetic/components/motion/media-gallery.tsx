"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  height: number;
}

const IMAGES: GalleryImage[] = [
  { id: 1, src: "https://picsum.photos/seed/1/600/400", title: "Mountain Serenity", height: 400 },
  { id: 2, src: "https://picsum.photos/seed/2/600/500", title: "Urban Geometry", height: 500 },
  { id: 3, src: "https://picsum.photos/seed/3/600/300", title: "Forest Path", height: 300 },
  { id: 4, src: "https://picsum.photos/seed/4/600/400", title: "Ocean Horizon", height: 400 },
  { id: 5, src: "https://picsum.photos/seed/5/600/500", title: "Desert Dunes", height: 500 },
  { id: 6, src: "https://picsum.photos/seed/6/600/300", title: "City at Night", height: 300 },
  { id: 7, src: "https://picsum.photos/seed/7/600/400", title: "Misty Valley", height: 400 },
  { id: 8, src: "https://picsum.photos/seed/8/600/500", title: "Autumn Leaves", height: 500 },
  { id: 9, src: "https://picsum.photos/seed/9/600/300", title: "Coastal Cliffs", height: 300 },
  { id: 10, src: "https://picsum.photos/seed/10/600/400", title: "Snowy Peaks", height: 400 },
  { id: 11, src: "https://picsum.photos/seed/11/600/500", title: "Tropical Beach", height: 500 },
  { id: 12, src: "https://picsum.photos/seed/12/600/300", title: "Lavender Fields", height: 300 },
];

export function MediaGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [navDir, setNavDir] = useState<1 | -1>(1);

  const open = (index: number) => setLightboxIndex(index);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setNavDir(-1);
    setLightboxIndex((i) => (i! - 1 + IMAGES.length) % IMAGES.length);
  }, [lightboxIndex]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setNavDir(1);
    setLightboxIndex((i) => (i! + 1) % IMAGES.length);
  }, [lightboxIndex]);

  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next, close]);

  const currentImage = lightboxIndex !== null ? IMAGES[lightboxIndex] : null;

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 gap-3 space-y-3 w-full">
        {IMAGES.map((img, idx) => (
          <motion.div
            key={img.id}
            layoutId={`gallery-img-${img.id}`}
            onClick={() => open(idx)}
            className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <img
              src={img.src}
              alt={img.title}
              style={{ height: img.height }}
              className="w-full object-cover block"
              loading="lazy"
            />
            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-black/50 flex items-end p-3"
            >
              <p className="text-sm font-medium text-white leading-tight">{img.title}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <X className="size-4" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="size-5" />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.88, x: navDir * 60 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: navDir * -60 }}
                transition={SPRING_PANEL}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full mx-16 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.title}
                  className="w-full max-h-[80vh] object-contain bg-black"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
                  <p className="text-sm font-medium text-white">{currentImage.title}</p>
                  <p className="text-xs text-white/60 mt-0.5">{lightboxIndex + 1} / {IMAGES.length}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
