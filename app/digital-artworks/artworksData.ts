// ============================================================
//  DIGITAL ARTWORKS (RPG VIEWER) — DATA MODEL & CONFIGURATION
// ============================================================
//  Fully data-driven. Components receive this data and hold no
//  asset paths of their own.
//
//  Portraits: the pixel-art avatar sprites form a shared pool.
//  Each artwork draws its portrait from `portraits` when set,
//  otherwise from PORTRAIT_POOL. The actual random pick happens
//  in one place only — see useRandomPortrait.
// ============================================================

const SPRITES = "/images/rpg-sprites";
const SCENE = "/images/computer-assets";

/** Ambient backdrop behind the whole RPG scene. */
export const SCENE_BACKGROUND = `${SCENE}/rpg-scene-bg.png`;

/** Shared portrait pool — all 16 avatar variants. */
export const PORTRAIT_POOL: string[] = Array.from(
  { length: 16 },
  (_, i) => `${SPRITES}/rpg-sprite-${i + 1}.png`,
);

export interface Artwork {
  id: string;
  title: string;
  /** Full-resolution image shown in the viewer (any aspect ratio). */
  image: string;
  /** Square thumbnail for the gallery grid. */
  thumbnail: string;
  /** Dialogue line displayed in the RPG text box. */
  description: string;
  /** Optional per-artwork portrait subset; falls back to PORTRAIT_POOL. */
  portraits?: string[];
}

// ------------------------------------------------------------
//  Placeholder artwork images (remote, mirroring the repo's
//  projectsData.ts convention). Swap `image`/`thumbnail` for
//  real artwork exports when available — no component changes
//  required.
// ------------------------------------------------------------

const art = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const entry = (
  id: string,
  title: string,
  photoId: string,
  description: string,
): Artwork => ({
  id,
  title,
  image: art(photoId, 1400),
  thumbnail: art(photoId, 400),
  description,
});

export const ARTWORKS: Artwork[] = [
  entry(
    "neon-alley",
    "Neon Alley",
    "1493514789931-586cb221d7a7",
    "A rain-slicked backstreet at 2AM. I wanted the puddles to do the storytelling.",
  ),
  entry(
    "desert-drive",
    "Desert Drive",
    "1500530855697-b586d89ba3ee",
    "Endless asphalt and a low sun. This one is about the space between places.",
  ),
  entry(
    "cold-peaks",
    "Cold Peaks",
    "1519681393784-d120267933ba",
    "Studied how moonlight falls on snow for weeks before I got this right.",
  ),
  entry(
    "harbor-dusk",
    "Harbor at Dusk",
    "1507525428034-b723cf961d3e",
    "The horizon line kept fighting me. Eventually I let the water win.",
  ),
  entry(
    "forest-path",
    "Forest Path",
    "1441974231531-c6227db76b6e",
    "Composed entirely around a single shaft of light through the canopy.",
  ),
  entry(
    "city-rush",
    "City Rush",
    "1449824913935-59a10b8d2000",
    "Motion blur as emotion. Everyone here is late to something.",
  ),
  entry(
    "quiet-room",
    "Quiet Room",
    "1513694203232-719a280e022f",
    "An interior study — soft shadows, warm wood, nobody home.",
  ),
  entry(
    "storm-front",
    "Storm Front",
    "1500534623283-312aade485b7",
    "Painted the sky first, then dared myself not to touch it again.",
  ),
];
