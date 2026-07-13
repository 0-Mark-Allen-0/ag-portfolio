"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Artwork } from "../artworksData";

// ============================================================
//  ARTWORK DISPLAY — main viewer.
// ============================================================
//  Shows the full artwork with no distortion (object-contain),
//  centered, supporting landscape and portrait alike. Crossfades
//  smoothly when the selection changes.
// ============================================================

export interface ArtworkDisplayProps {
  artwork: Artwork | undefined;
}

export default function ArtworkDisplay({ artwork }: ArtworkDisplayProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden bg-black/40">
      <AnimatePresence mode="wait">
        {artwork && (
          <motion.img
            key={artwork.id}
            src={artwork.image}
            alt={artwork.title}
            draggable={false}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
