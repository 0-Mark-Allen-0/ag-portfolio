"use client";

import { cn } from "@/app/lib/cn";
import type { Artwork } from "../artworksData";

// ============================================================
//  ARTWORK GALLERY — left panel.
// ============================================================
//  Scrollable, two-per-row square thumbnails. Selecting one
//  lifts the id up; the parent re-drives every other panel.
//  Semantic listbox, fully keyboard-navigable.
// ============================================================

export interface ArtworkGalleryProps {
  artworks: Artwork[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ArtworkGallery({
  artworks,
  selectedId,
  onSelect,
}: ArtworkGalleryProps) {
  return (
    <ul
      role="listbox"
      aria-label="Artworks"
      className="grid grid-cols-2 gap-3 overflow-y-auto p-3"
    >
      {artworks.map((artwork) => {
        const selected = artwork.id === selectedId;
        return (
          <li key={artwork.id} role="option" aria-selected={selected}>
            <button
              type="button"
              onClick={() => onSelect(artwork.id)}
              aria-label={artwork.title}
              className={cn(
                "block aspect-square w-full overflow-hidden border-2 transition-[border-color,transform] duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4933b] focus-visible:ring-offset-1 focus-visible:ring-offset-black",
                selected
                  ? "border-[#f4933b] shadow-[0_0_0_2px_rgba(244,147,59,0.35)]"
                  : "border-[#f4933b]/25 hover:border-[#f4933b]/70",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artwork.thumbnail}
                alt=""
                aria-hidden
                draggable={false}
                className={cn(
                  "h-full w-full object-cover transition-opacity",
                  selected ? "opacity-100" : "opacity-80",
                )}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
