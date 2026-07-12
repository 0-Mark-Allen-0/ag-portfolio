// ============================================================
//  DESK SCENE — DATA MODEL & CONFIGURATION
// ============================================================
//  The scene is composed from a static base desk render plus a
//  set of layered sprites and invisible hitboxes. Everything the
//  renderer needs comes from this file — no hardcoded JSX
//  positioning lives in the components.
//
//  Positioning is percentage-based, relative to the fixed-ratio
//  scene container (SCENE_W x SCENE_H). `left`/`top`/`width` are
//  percentages; sprite `height` is derived automatically from the
//  image's natural aspect ratio, so only 3 numbers per sprite need
//  tuning. Hitboxes (lamp, computer-case) have no image, so they
//  require an explicit `height`.
//
//  Objects baked INTO the base render (not sprites): desk, printer,
//  speakers, keyboard, mouse, controller, and the lamp + computer
//  tower (which are driven by invisible hitboxes instead).
//
//  NOTE: sprite coordinates below are INITIAL ESTIMATES read off the
//  reference render. They are refined via the calibration overlay +
//  manual screenshot feedback, not automated testing.
// ============================================================

export const SCENE_W = 3840;
export const SCENE_H = 2160;

//  Never upscale the scene beyond this on-screen width.
export const SCENE_MAX_WIDTH = 1600;

//  Crossfade duration for day <-> night (ms).
export const THEME_FADE_MS = 450;

const DIR = "/images/desk";

//  Base desk renders (the static environment).
export const BASE = {
  dayImage: `${DIR}/desk-day.png`,
  nightImage: `${DIR}/desk-night.png`,
} as const;

//  Speaker audio — one track per theme. Drop these files into
//  public/audio (filenames can be changed here).
export const AUDIO = {
  day: "/audio/day.mp3",
  night: "/audio/night.mp3",
} as const;

// ------------------------------------------------------------
//  Types
// ------------------------------------------------------------

export type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type SceneAction =
  | { type: "navigate"; route: string }
  | { type: "toggleNight" }
  | { type: "toggleComputer" }
  | { type: "toggleAudio" };

export type HoverEffect = "lift" | "scale" | "glow" | "none";

export type SceneItem = {
  id: string;
  label: string;
  kind: "sprite" | "hitbox";

  //  Sprite images (omitted for pure hitboxes)
  dayImage?: string;
  nightImage?: string;

  //  Placement: % of the scene container.
  //  Sprites: height is auto (from image aspect) unless provided.
  //  Hitboxes: height is required.
  left: number;
  top: number;
  width: number;
  height?: number;

  zIndex: number;
  hover?: HoverEffect;

  //  Optional click-area override for sprites whose visible box
  //  contains a lot of transparent padding.
  hitbox?: Box;

  //  When set, the item only renders while the computer is "on"
  //  (used by the animated monitor-b screen overlay).
  showWhenComputerOn?: boolean;

  //  Omit `action` for purely decorative sprites (e.g. the monitor).
  action?: SceneAction;
};

// ------------------------------------------------------------
//  Scene items
//  Coordinates are first estimates — expect to calibrate.
//  ⚠ = placement is a rough guess (flagged to the user).
// ------------------------------------------------------------

export const SCENE_ITEMS: SceneItem[] = [
  // ── Wall: whiteboard + posters ──────────────────────────
  {
    id: "whiteboard",
    label: "Whiteboard",
    kind: "sprite",
    dayImage: `${DIR}/whiteboard-day.png`,
    nightImage: `${DIR}/whiteboard-night.png`,
    left: 16.2,
    top: 3.5,
    width: 25.5,
    zIndex: 10,
    hover: "glow",
    action: { type: "navigate", route: "/whiteboard" },
  },
  {
    id: "games-poster",
    label: "Games",
    kind: "sprite",
    dayImage: `${DIR}/games-poster-day.png`,
    nightImage: `${DIR}/games-poster-night.png`,
    left: 50,
    top: 0,
    width: 12.5,
    zIndex: 10,
    hover: "glow",
    action: { type: "navigate", route: "/media/games_v2" },
  },
  {
    id: "series-poster",
    label: "Series",
    kind: "sprite",
    dayImage: `${DIR}/series-poster-day.png`,
    nightImage: `${DIR}/series-poster-night.png`,
    left: 63.78,
    top: 0,
    width: 12.75,
    zIndex: 10,
    hover: "glow",
    action: { type: "navigate", route: "/media/series_v2" },
  },
  {
    id: "movies-poster",
    label: "Movies",
    kind: "sprite",
    dayImage: `${DIR}/movies-poster-day.png`,
    nightImage: `${DIR}/movies-poster-night.png`,
    left: 77.8,
    top: 0,
    width: 13,
    zIndex: 10,
    hover: "glow",
    action: { type: "navigate", route: "/media/movies_v2" },
  },

  // ── Left alcove ─────────────────────────────────────────
  {
    id: "artworks",
    label: "Artworks",
    kind: "sprite",
    dayImage: `${DIR}/artworks-day.png`,
    nightImage: `${DIR}/artworks-night.png`,
    left: 0.1,
    top: 37, // moved up the shelf
    width: 7, // ⚠ guess
    zIndex: 10,
    hover: "glow",
    action: { type: "navigate", route: "/artworks" }, // 404 is acceptable for now
  },
  {
    id: "books",
    label: "Books",
    kind: "sprite",
    dayImage: `${DIR}/books-day.png`,
    nightImage: `${DIR}/books-night.png`,
    left: 0,
    top: 70, // moved up so it no longer clips past the frame
    width: 7, // ⚠ guess
    zIndex: 10,
    hover: "glow",
    action: { type: "navigate", route: "/reading" },
  },

  // ── Monitor (decorative) + animated screen overlay ──────
  {
    id: "monitor",
    label: "Monitor",
    kind: "sprite",
    dayImage: `${DIR}/monitor-day.png`,
    nightImage: `${DIR}/monitor-night.png`,
    left: 42,
    top: 30,
    width: 21.5,
    zIndex: 20,
    // decorative: no action (the computer-case hitbox drives it)
  },
  {
    id: "monitor-b",
    label: "Monitor (on)",
    kind: "sprite",
    dayImage: `${DIR}/monitor-b-day.gif`,
    nightImage: `${DIR}/monitor-b-night.gif`,
    left: 42, // scaled up + recentred to fill the monitor screen
    top: 30,
    width: 21.5, // ⚠ must align to the monitor screen area
    zIndex: 30,
    showWhenComputerOn: true,
    hover: "glow",
    //  Clickable ONLY while the computer is on. Destination page is
    //  not decided yet — empty route is a no-op for now.
    action: { type: "navigate", route: "" }, // TODO: set monitor page route
  },

  // ── Desk surface: VR + contact ──────────────────────────
  {
    id: "headset",
    label: "VR Headset",
    kind: "sprite",
    dayImage: `${DIR}/headset-day.png`,
    nightImage: `${DIR}/headset-night.png`,
    left: 70.4, // moved right onto the stand
    top: 42, // moved slightly higher
    width: 9.75,
    zIndex: 20,
    hover: "lift",
    action: { type: "navigate", route: "/vr" },
  },
  {
    id: "contact",
    label: "Contact",
    kind: "sprite",
    dayImage: `${DIR}/contact-day.png`,
    nightImage: `${DIR}/contact-night.png`,
    left: 88, // nudged left on the wall
    top: 18.25,
    width: 5, // scaled down
    zIndex: 15,
    hover: "lift",
    action: { type: "navigate", route: "/contact" },
  },
  {
    id: "resume",
    label: "Resume",
    kind: "sprite",
    dayImage: `${DIR}/resume-day.png`,
    nightImage: `${DIR}/resume-night.png`,
    left: 17.55,
    top: 58,
    width: 11.25,
    zIndex: 25,
    hover: "lift",
    action: { type: "navigate", route: "/resume" },
  },

  // ── Pull-out tray: phone + journal ──────────────────────
  {
    id: "phone",
    label: "Phone",
    kind: "sprite",
    dayImage: `${DIR}/phone-day.png`,
    nightImage: `${DIR}/phone-night.png`,
    left: 21,
    top: 78.35,
    width: 9, // ⚠ guess (leftmost tray object) — left in place, not flagged for change
    zIndex: 25,
    hover: "lift",
    action: { type: "navigate", route: "/phone" },
  },
  {
    id: "journal",
    label: "Journal",
    kind: "sprite",
    dayImage: `${DIR}/journal-day.png`,
    nightImage: `${DIR}/journal-night.png`,
    left: 72.35, // resting on top of the computer case
    top: 73.5,
    width: 16.25,
    zIndex: 0, // above the computer-case hitbox so it stays clickable
    hover: "lift",
    action: { type: "navigate", route: "/journal" },
  },

  // ── Lower shelf: project binders ────────────────────────
  {
    id: "projects_completed",
    label: "Completed Projects",
    kind: "sprite",
    dayImage: `${DIR}/projects_completed-day.png`,
    nightImage: `${DIR}/projects_completed-night.png`,
    left: 42.15, // left cubby under the tray, scaled up to fill it
    top: 88,
    width: 28.55,
    zIndex: 25,
    hover: "glow",
    action: { type: "navigate", route: "/projects" },
  },
  {
    id: "projects_future",
    label: "Future Projects",
    kind: "sprite",
    dayImage: `${DIR}/projects_future-day.png`,
    nightImage: `${DIR}/projects_future-night.png`,
    left: 14.91, // right cubby under the tray, scaled up to fill it
    top: 88,
    width: 25.65,
    zIndex: 25,
    hover: "glow",
    action: { type: "navigate", route: "/projects" },
  },

  // ── Base-baked hitboxes (no sprite) ─────────────────────
  {
    id: "computer-case",
    label: "Computer (power)",
    kind: "hitbox",
    left: 74.5,
    top: 81.5, // reduced to just the first optical-drive/button row
    width: 15,
    height: 5.5,
    zIndex: 50,
    hover: "glow",
    action: { type: "toggleComputer" },
  },
  {
    id: "lamp",
    label: "Lamp (day / night)",
    kind: "hitbox",
    left: 1.0,
    top: 12,
    width: 5,
    height: 24, // taller hitbox to cover the full lamp
    zIndex: 60,
    hover: "none", // no glow on the lamp
    action: { type: "toggleNight" },
  },
  {
    id: "speaker",
    label: "Speaker (audio)",
    kind: "hitbox",
    left: 64.35,
    top: 62.35,
    width: 4.25,
    height: 3,
    zIndex: 60,
    hover: "glow",
    action: { type: "toggleAudio" },
  },
];
