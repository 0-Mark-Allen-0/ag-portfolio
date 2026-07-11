/**
 * Shared theming + layout types for the collage-poster media pages
 * (games_v2, movies_v2, series_v2). All three pages render the SAME layout
 * and components — only the CollageTheme values differ.
 */

/** A single cover's position + size on the desktop mosaic (percentages of canvas). */
export interface CollageSlot {
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
}

/** Optional ambient background texture behind the collage. */
export type CollageTexture = "none" | "grid" | "stars";

/**
 * Everything a page needs to skin the shared collage components. Layout,
 * animations, modal behaviour and responsiveness are fixed in the components;
 * only these values change between Games / Movies / Series.
 */
export interface CollageTheme {
  /** Page background color. */
  bg: string;
  /** Modal panel background. */
  modalBg: string;
  /** Modal overlay color, e.g. "rgba(0,0,0,.65)". */
  overlay: string;
  /** Accent color used for card + modal borders (6-digit hex — alpha may be appended). */
  border: string;
  /** Body / description text color. */
  text: string;
  /** Title text color. */
  titleColor: string;
  /** Small caption ("Why I like this …") color. */
  caption: string;
  /** font-family string for the title. */
  titleFont: string;
  /** font-family string for body + captions. */
  bodyFont: string;
  /** Tailwind size classes for the desktop title (fonts differ in scale). */
  titleSize: string;
  /** Google-Fonts @import url string loading titleFont + bodyFont. */
  fontImport: string;
  /** Permanent box-shadow (soft glow) for desktop mosaic cards. */
  cardGlow: string;
  /** Permanent box-shadow (soft glow) for masonry (mobile) cards. */
  cardGlowMobile: string;
  /** box-shadow for the modal panel. */
  modalGlow: string;
  /** text-shadow for the title. */
  titleGlow: string;
  /** Ambient background texture. */
  texture: CollageTexture;
}
