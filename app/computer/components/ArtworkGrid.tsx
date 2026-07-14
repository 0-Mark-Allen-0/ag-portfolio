"use client";

import { cn } from "@/app/lib/cn";
import type { ComputerArtwork } from "../computerData";

// ============================================================
//  ARTWORK GRID — Window B contents.
// ============================================================
//  A semantic, keyboard-navigable grid of thumbnails. Selecting
//  an entry calls onSelect; the parent lifts that into state and
//  feeds the Preview window. Entries are rendered from supplied
//  data only.
//
//  Thumbnails load lazily: the full set runs to thirty remote
//  images, and only the first rows are in view on open.
// ============================================================

export interface ArtworkGridProps {
  artworks: ComputerArtwork[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ArtworkGrid({
  artworks,
  selectedId,
  onSelect,
}: ArtworkGridProps) {
  return (
    <div className="w95-sunken w95-scroll h-full overflow-y-auto p-0.5">
      <ul
        role="listbox"
        aria-label="Artworks"
        className="grid grid-cols-2 gap-1 p-1"
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
                  "block w-full p-0.5 focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-black",
                  selected ? "bg-[#000080]" : "bg-transparent hover:bg-black/5",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artwork.thumbnail}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  draggable={false}
                  className="aspect-square w-full object-cover"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
