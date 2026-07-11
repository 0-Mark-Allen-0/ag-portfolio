import { CollageSlot } from "./types";

/**
 * The shared, hand-composed collage geometry used by ALL THREE media pages
 * (games / movies / series). It is position-only: slot[i] is applied to the
 * i-th media item of whichever category renders it, so every page inherits the
 * identical asymmetrical composition while showing its own covers.
 *
 * Ordering here matches the media data order (item 1..15), so the Games page
 * reproduces its exact approved arrangement. Edit this file alone to recompose
 * the mosaic for every page at once.
 *
 * Composition: covers frame the perimeter (jagged top/bottom bands, offset
 * left/right stacks) around a large empty centre for the title. Edges align in
 * places but sizes vary, so there are no continuous rows or columns.
 */
export const COLLAGE_LAYOUT: CollageSlot[] = [
  { leftPct: 0, topPct: 0, widthPct: 17, heightPct: 30 }, // item 1  (top-left, tall)
  { leftPct: 0, topPct: 30, widthPct: 14, heightPct: 25 }, // item 2  (left edge upper)
  { leftPct: 63, topPct: 0, widthPct: 18, heightPct: 19 }, // item 3  (top)
  { leftPct: 36, topPct: 80, widthPct: 17, heightPct: 20 }, // item 4  (bottom)
  { leftPct: 0, topPct: 79, widthPct: 17, heightPct: 21 }, // item 5  (bottom-left)
  { leftPct: 17, topPct: 0, widthPct: 12, heightPct: 20 }, // item 6  (top)
  { leftPct: 0, topPct: 55, widthPct: 17, heightPct: 24 }, // item 7  (left edge lower)
  { leftPct: 29, topPct: 0, widthPct: 19, heightPct: 16 }, // item 8  (top, wide short)
  { leftPct: 17, topPct: 77, widthPct: 19, heightPct: 23 }, // item 9  (bottom)
  { leftPct: 82, topPct: 28, widthPct: 18, heightPct: 26 }, // item 10 (right edge upper)
  { leftPct: 81, topPct: 0, widthPct: 19, heightPct: 28 }, // item 11 (top-right, tall)
  { leftPct: 80, topPct: 54, widthPct: 20, heightPct: 25 }, // item 12 (right edge lower)
  { leftPct: 48, topPct: 0, widthPct: 15, heightPct: 24 }, // item 13 (top, tall)
  { leftPct: 53, topPct: 78, widthPct: 16, heightPct: 22 }, // item 14 (bottom)
  { leftPct: 69, topPct: 79, widthPct: 31, heightPct: 21 }, // item 15 (bottom-right, wide)
];
