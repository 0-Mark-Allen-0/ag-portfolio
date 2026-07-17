"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MediaItem } from "../types";
import { CollageSlot, CollageTheme } from "./types";
import { COLLAGE_LAYOUT } from "./collageLayout";
import CollageCard from "./CollageCard";
import MediaModal from "./MediaModal";
import Starfield from "./Starfield";

interface CollagePosterProps {
  theme: CollageTheme;
  /** Title lines, rendered stacked and centred in the empty space. */
  titleLines: string[];
  /** Media items for this category (first `layout.length` placed on desktop). */
  items: MediaItem[];
  /**
   * Desktop mosaic geometry. Defaults to the shared COLLAGE_LAYOUT (games /
   * movies); series passes a landscape-tuned layout for its 16:9 covers.
   */
  layout?: CollageSlot[];
}

/**
 * The single reusable collage-poster page shell shared by games_v2, movies_v2
 * and series_v2. Layout, animation, modal and responsive behaviour live here;
 * pages differ only via `theme`, `titleLines` and `items`.
 */
export default function CollagePoster({
  theme,
  titleLines,
  items,
  layout = COLLAGE_LAYOUT,
}: CollagePosterProps) {
  const [selected, setSelected] = useState<MediaItem | null>(null);

  // Zip geometry -> items by index (all categories have >= layout.length).
  const tiles = layout
    .map((slot, i) => (items[i] ? { item: items[i], slot } : null))
    .filter((t): t is { item: MediaItem; slot: CollageSlot } => t !== null);

  const Title = titleLines.map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </React.Fragment>
  ));

  return (
    <>
      {/* Route-scoped fonts (per-page @import pattern used across /media) */}
      <style>{`@import url('${theme.fontImport}');`}</style>

      <main className="relative min-h-screen w-full" style={{ backgroundColor: theme.bg }}>
        {/* ── Desktop / tablet: hand-composed asymmetrical mosaic ── */}
        <div className="relative hidden h-screen w-full overflow-hidden md:block">
          {/* Optional ambient texture behind the collage */}
          {theme.texture === "grid" && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, ${theme.border}0D 1px, transparent 1px),
                  linear-gradient(to bottom, ${theme.border}0D 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px",
              }}
            />
          )}
          {theme.texture === "stars" && <Starfield color={theme.border} />}

          {tiles.map(({ item, slot }, index) => (
            <CollageCard
              key={item.id}
              item={item}
              slot={slot}
              index={index}
              theme={theme}
              variant="tile"
              onClick={setSelected}
            />
          ))}

          {/* Centre title, floating in the empty framed space */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 px-4 text-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: selected ? 0.15 : 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h1
              className={`leading-[1.7] ${theme.titleSize}`}
              style={{
                fontFamily: theme.titleFont,
                color: theme.titleColor,
                textShadow: theme.titleGlow,
              }}
            >
              {Title}
            </h1>
          </motion.div>
        </div>

        {/* ── Mobile: Pinterest-style masonry ─────────────────────── */}
        <div className="relative block px-4 py-10 md:hidden">
          {theme.texture === "stars" && <Starfield color={theme.border} />}
          <h1
            className="relative z-10 mb-8 text-center text-2xl leading-[1.6]"
            style={{
              fontFamily: theme.titleFont,
              color: theme.titleColor,
              textShadow: theme.titleGlow,
            }}
          >
            {Title}
          </h1>
          <div className="relative z-10 columns-2 gap-3 [column-fill:balance]">
            {items.map((item, index) => (
              <CollageCard
                key={item.id}
                item={item}
                slot={COLLAGE_LAYOUT[0]}
                index={index}
                theme={theme}
                variant="masonry"
                onClick={setSelected}
              />
            ))}
          </div>
        </div>
      </main>

      <MediaModal item={selected} theme={theme} onClose={() => setSelected(null)} />
    </>
  );
}
