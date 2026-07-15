/**
 * ArtworkPolaroid — one scrapbook photo on the /artworks sheet.
 *
 * Deliberately separate from components/PolaroidCard: that card locks its
 * image to aspect-square inside an aspect-[3/4] frame, which /projects
 * depends on for its three-up grid and swipe stack. A fixed height would
 * make every masonry column identical and flatten the scrapbook back into
 * a plain grid, so here the image keeps its natural ratio and the frame
 * grows to fit.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Artwork } from "./artworksData";

/**
 * Tilts cycle by position rather than Math.random(): a random angle picked
 * during render differs between the server and client passes and trips a
 * hydration mismatch. A prime-length cycle keeps neighbouring columns from
 * landing on the same angle.
 */
const TILTS = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "rotate-0",
] as const;

interface ArtworkPolaroidProps {
  artwork: Artwork;
  /** Position in the collection — selects the tilt. */
  index: number;
}

export default function ArtworkPolaroid({ artwork, index }: ArtworkPolaroidProps) {
  const tilt = TILTS[index % TILTS.length];

  return (
    <motion.figure
      whileHover={{ scale: 1.03, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`
        bg-white p-2 pb-1 border border-gray-200/80
        origin-center transform ${tilt}
        shadow-[0_1px_3px_rgba(0,0,0,0.06),0_6px_16px_rgba(0,0,0,0.08)]
        transition-shadow duration-200
        hover:shadow-[0_2px_6px_rgba(0,0,0,0.08),0_12px_28px_rgba(0,0,0,0.12)]
      `}
    >
      {/*
        No width/height and no aspect class: the natural ratio drives the
        column, so tiles reflow into place as images decode.
      */}
      <img
        src={artwork.image}
        alt={artwork.title}
        loading="lazy"
        decoding="async"
        className="w-full h-auto block bg-gray-100 pointer-events-none"
      />

      <figcaption className="pt-3 pb-2 px-1 text-center font-patrick text-ink/80 text-sm leading-snug">
        {artwork.title}
      </figcaption>
    </motion.figure>
  );
}
