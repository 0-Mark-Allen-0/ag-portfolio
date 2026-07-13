// ============================================================
//  WINDOWS95 DESKTOP — DATA MODEL & CONFIGURATION
// ============================================================
//  Everything the desktop renders comes from this file. Components
//  receive this data as props and hold NO asset paths, routes, or
//  project entries of their own. Adding a project or icon means
//  editing data here, never component logic.
//
//  Asset locations are not assumed by any component — they are
//  supplied as strings below and can be repointed freely.
// ============================================================

const ASSETS = "/images/computer-assets";

export const WALLPAPER = `${ASSETS}/gta-bg.jpg`;

// ------------------------------------------------------------
//  Preview media — a project shows either a looping video or a
//  still image. The PreviewViewer branches on `kind`.
// ------------------------------------------------------------

export type Preview =
  | { kind: "video"; src: string; poster?: string }
  | { kind: "image"; src: string; alt?: string };

export interface ComputerProject {
  id: string;
  title: string;
  /** Optional small thumbnail shown beside the title in the list. */
  thumbnail?: string;
  /** Selected project's preview, rendered in the Preview window. */
  preview: Preview;
  /** Optional metadata line (year, tool, role…). */
  meta?: string;
}

// ------------------------------------------------------------
//  Desktop icons — the component gets image + label; the page
//  owns the click behaviour (keyed by `id`). No routing here.
// ------------------------------------------------------------

export type IconId = "my-computer" | "recycle-bin" | "digital-artworks";

export interface DesktopIconConfig {
  id: IconId;
  label: string;
  icon: string;
  /** Which desktop corner the icon anchors to on the floating layout. */
  corner: "top-left" | "bottom-right";
}

// ------------------------------------------------------------
//  DESKTOP LAYOUT KNOBS
//  ---------------------------------------------------------
//  Every default position/size lives here as a percentage of the
//  4:3 "screen" surface, so the layout scales with the viewport
//  and is trivial to hand-tune. To move or resize a window, edit
//  its left/top (top-left corner) and width/height below. Icons
//  anchor to a corner via the offsets in ICON_LAYOUT.
// ------------------------------------------------------------

export interface Frame {
  left: string;
  top: string;
  width: string;
  height?: string;
}

export const WINDOW_LAYOUT: Record<"projects" | "preview" | "confirm", Frame> = {
  // Tall, narrow list — left of centre, overlapping the preview a little.
  projects: { left: "5%", top: "28%", width: "30%", height: "70%" },
  // Large, near-square preview — right of centre.
  preview: { left: "37%", top: "6%", width: "52%", height: "80%" },
  // Small content-sized dialog near the top-left (height auto).
  confirm: { left: "3%", top: "6%", width: "30%" },
};

export const ICON_LAYOUT = {
  topLeft: { left: "1.5%", top: "3%" }, // Recycle Bin + My Computer column
  bottomRight: { right: "5%", bottom: "10%" }, // Digital Artworks
} as const;

export const DESKTOP_ICONS: DesktopIconConfig[] = [
  {
    id: "my-computer",
    label: "My Computer",
    icon: `${ASSETS}/icon-my-computer.png`,
    corner: "top-left",
  },
  {
    id: "recycle-bin",
    label: "Recycle Bin",
    icon: `${ASSETS}/icon-recycle-bin.png`,
    corner: "top-left",
  },
  {
    id: "digital-artworks",
    label: "Digital Artworks",
    icon: `${ASSETS}/icon-digital-artworks.png`,
    corner: "bottom-right",
  },
];

// ------------------------------------------------------------
//  Project list. Preview sources use the repo's existing sample
//  media (remote placeholders, mirroring projectsData.ts) so the
//  experience is populated out of the box — swap `preview.src`
//  for real captures when available.
// ------------------------------------------------------------

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1200&auto=format&fit=crop`;

export const PROJECTS: ComputerProject[] = [
  {
    id: "ttt-othello",
    title: "TTT & Othello Player",
    meta: "Unity · WebGL · 2023",
    thumbnail: UNSPLASH("1550684848-fac1c5b4e853"),
    preview: {
      kind: "video",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: UNSPLASH("1550684848-fac1c5b4e853"),
    },
  },
  {
    id: "virtual-ot",
    title: "Virtual OT",
    meta: "Unity · VR · Surgical training",
    thumbnail: UNSPLASH("1550751827-4bd374c3f58b"),
    preview: {
      kind: "video",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: UNSPLASH("1550751827-4bd374c3f58b"),
    },
  },
  {
    id: "leo-highway",
    title: "Leo Highway Chase",
    meta: "Blender · CGI · 12-hour build",
    thumbnail: UNSPLASH("1503376780353-7e6692767b70"),
    preview: {
      kind: "video",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      poster: UNSPLASH("1503376780353-7e6692767b70"),
    },
  },
  {
    id: "warehouse",
    title: "Warehouse Simulation",
    meta: "Unity · Real-time · VR",
    thumbnail: UNSPLASH("1553413077-190dd305871c"),
    preview: {
      kind: "image",
      src: UNSPLASH("1553413077-190dd305871c"),
      alt: "Warehouse simulation environment",
    },
  },
  {
    id: "photogrammetry",
    title: "Photogrammetry Scan",
    meta: "Blender · 3D reconstruction",
    thumbnail: UNSPLASH("1526304640581-d334cdbbf45e"),
    preview: {
      kind: "image",
      src: UNSPLASH("1526304640581-d334cdbbf45e"),
      alt: "Photogrammetry 3D head scan",
    },
  },
];
