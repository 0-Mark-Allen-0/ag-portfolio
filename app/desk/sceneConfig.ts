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
//  The monitor's lit screen is a cropped, looping MP4 (`screen`) laid
//  over the static monitor sprite — see ScreenOverlay below.
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
  day: "/audio/track-day.wav",
  night: "/audio/track-night.wav",
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

export type HoverEffect = "lift" | "scale" | "rotate" | "none";

//  A looping video laid over a sprite's screen area (the monitor CRT).
//  Coordinates are % of the SPRITE box — not the scene — because the
//  overlay renders inside the sprite wrapper so that hover transforms
//  move the bezel and the screen together.
//
//  The source is deliberately cropped to the opaque screen rectangle:
//  H.264 has no alpha channel, so a full-frame video would paint a
//  black box over the desk. That crop is what makes MP4 viable here.
export type ScreenOverlay = {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  //  CSS border-radius, in %. The CRT's screen corners are rounded, so
  //  an unrounded rectangle pokes out into the bezel.
  radius?: number;
};

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

  //  Looping video layered over this sprite's screen area. Plays while
  //  the computer is "on" and fades out (and pauses) when it is off.
  screen?: ScreenOverlay;

  //  When set, `action` and hover only apply while the computer is
  //  "on" — the monitor is inert until its screen has woken up.
  requiresComputerOn?: boolean;

  //  Omit `action` for purely decorative sprites.
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
    hover: "scale",
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
    hover: "scale",
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
    hover: "scale",
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
    hover: "scale",
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
    hover: "scale",
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
    hover: "scale",
    action: { type: "navigate", route: "/reading" },
  },

  // ── Monitor + looping screen video ──────────────────────
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
    hover: "scale",
    //  Screen box measured off the dark screen region in
    //  monitor-day.png (x 123-917, y 122-726 of 1033x1020) rather than
    //  estimated — but it assumes the video is cropped to that same
    //  region, so verify on first paint and calibrate from there.
    screen: {
      src: `${DIR}/monitor-screen.mp4`,
      left: 11.91,
      top: 11.96,
      width: 76.96,
      height: 59.31,
      radius: 2.5, // ⚠ guess — eyeball against the bezel corners
    },
    //  Clickable ONLY while the computer is on (the computer-case
    //  hitbox drives the power). Opens the Windows95 desktop
    //  experience — like waking the machine.
    requiresComputerOn: true,
    action: { type: "navigate", route: "/computer" },
  },

  // ── Desk surface: VR + contact ──────────────────────────
  {
    id: "headset",
    label: "VR Headset",
    kind: "sprite",
    dayImage: `${DIR}/headset-day.png`,
    nightImage: `${DIR}/headset-night.png`,
    left: 70.4, // moved right onto the stand
    top: 41, // moved slightly higher
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
    hover: "rotate", // pivots from the hanger, tips slightly right
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
    left: 44.22, // left cubby under the tray, scaled up to fill it
    top: 88.2,
    width: 26.5,
    zIndex: 25,
    hover: "scale",
    action: { type: "navigate", route: "/projects" },
  },
  {
    id: "projects_future",
    label: "Future Projects",
    kind: "sprite",
    dayImage: `${DIR}/projects_future-day.png`,
    nightImage: `${DIR}/projects_future-night.png`,
    left: 14.9, // right cubby under the tray, scaled up to fill it
    top: 88.2,
    width: 27.65,
    zIndex: 25,
    hover: "scale",
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
    hover: "none",
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
    hover: "none",
    action: { type: "toggleAudio" },
  },
];
