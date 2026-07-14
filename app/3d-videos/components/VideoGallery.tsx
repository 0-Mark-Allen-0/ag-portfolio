"use client";

import { cn } from "@/app/lib/cn";
import type { Video } from "../videosData";

// ============================================================
//  VIDEO GALLERY — left panel.
// ============================================================
//  Scrollable, two-per-row thumbnails. Selecting one lifts the id
//  up; the parent re-drives every other panel. Semantic listbox,
//  fully keyboard-navigable.
//
//  Thumbnails are still frames Cloudinary derives from each
//  video, so they load as ordinary images.
//
//  ROWS_VISIBLE is what makes the grid hint that it scrolls. The
//  panel's height is fixed by the page grid, so the only way to
//  land a row half-cut at the bottom edge — rather than leaving it
//  to however the tiles happen to divide into the viewport — is to
//  derive the row height from the panel: show a deliberate 4.5
//  rows, and the fifth always peeks. The .5 is the affordance.
//  Tiles are therefore not perfectly square and object-cover trims
//  the overflow; the scrollbar itself is hidden per the design.
// ============================================================

const ROWS_VISIBLE = 4.5;
const GAP_PX = 12; // matches gap-3 below
// Gaps sitting between the visible rows, which the rows don't get to use.
const GAPS_IN_VIEW = Math.ceil(ROWS_VISIBLE) - 1;

export interface VideoGalleryProps {
  videos: Video[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function VideoGallery({
  videos,
  selectedId,
  onSelect,
}: VideoGalleryProps) {
  return (
    <ul
      role="listbox"
      aria-label="Videos"
      className={cn(
        "grid h-full grid-cols-2 gap-3 overflow-y-auto p-3",
        // Scroll without the bar: Firefox/standards, then WebKit.
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      )}
      style={{
        gridAutoRows: `calc((100% - ${GAPS_IN_VIEW * GAP_PX}px) / ${ROWS_VISIBLE})`,
      }}
    >
      {videos.map((video) => {
        const selected = video.id === selectedId;
        return (
          <li key={video.id} role="option" aria-selected={selected} className="min-h-0">
            <button
              type="button"
              onClick={() => onSelect(video.id)}
              aria-label={video.title}
              className={cn(
                "block h-full w-full overflow-hidden border-2 transition-[border-color,transform] duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4933b] focus-visible:ring-offset-1 focus-visible:ring-offset-black",
                selected
                  ? "border-[#f4933b] shadow-[0_0_0_2px_rgba(244,147,59,0.35)]"
                  : "border-[#f4933b]/25 hover:border-[#f4933b]/70",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.thumbnail}
                alt=""
                aria-hidden
                loading="lazy"
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
