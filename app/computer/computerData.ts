// ============================================================
//  WINDOWS95 DESKTOP — DATA MODEL & CONFIGURATION
// ============================================================
//  Everything the desktop renders comes from this file. Components
//  receive this data as props and hold NO asset paths, routes, or
//  artwork entries of their own. Adding an artwork or icon means
//  editing data here, never component logic.
//
//  Asset locations are not assumed by any component — they are
//  supplied as strings below and can be repointed freely.
// ============================================================

import { imageSrc, imageThumb } from "@/app/lib/cloudinary";

const ASSETS = "/images/computer-assets";

export const WALLPAPER = `${ASSETS}/gta-bg.jpg`;

// ------------------------------------------------------------
//  Preview media — an artwork shows either a looping video or a
//  still image. The PreviewViewer branches on `kind`. The union
//  outlives the current all-image set on purpose: dropping a video
//  in later is a data edit, not a component change.
// ------------------------------------------------------------

export type Preview =
  | { kind: "video"; src: string; poster?: string }
  | { kind: "image"; src: string; alt?: string };

export interface ComputerArtwork {
  id: string;
  title: string;
  /** Square thumbnail shown in the Artworks window grid. */
  thumbnail: string;
  /** Selected artwork's preview, rendered in the Preview window. */
  preview: Preview;
  /** Optional metadata line (year, tool, role…). */
  meta?: string;
}

// ------------------------------------------------------------
//  Desktop icons — the component gets image + label; the page
//  owns the click behaviour (keyed by `id`). No routing here.
// ------------------------------------------------------------

export type IconId = "my-computer" | "recycle-bin" | "3d-videos";

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

export const WINDOW_LAYOUT: Record<"artworks" | "preview" | "confirm", Frame> = {
  // Tall, narrow grid — left of centre, overlapping the preview a little.
  artworks: { left: "5%", top: "28%", width: "30%", height: "70%" },
  // Large, near-square preview — right of centre.
  preview: { left: "37%", top: "6%", width: "52%", height: "80%" },
  // Small content-sized dialog near the top-left (height auto).
  confirm: { left: "3%", top: "6%", width: "30%" },
};

export const ICON_LAYOUT = {
  topLeft: { left: "1.5%", top: "3%" }, // Recycle Bin + My Computer column
  bottomRight: { right: "2%", bottom: "11%" }, // 3D Videos
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
    id: "3d-videos",
    label: "3D Videos",
    icon: `${ASSETS}/icon-digital-artworks.png`,
    corner: "bottom-right",
  },
];

// ------------------------------------------------------------
//  Artwork list. Paste the plain Cloudinary URL from the Media
//  Library; the grid thumbnail and the full-size preview are both
//  derived from it (see app/lib/cloudinary.ts). The id is
//  slugified from the title, so there is no extra field to keep in
//  sync — it is what selection state keys on.
// ------------------------------------------------------------

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const entry = (title: string, url: string, meta?: string): ComputerArtwork => ({
  id: slug(title),
  title,
  thumbnail: imageThumb(url),
  preview: { kind: "image", src: imageSrc(url), alt: title },
  meta,
});

const CDN = "https://res.cloudinary.com/drxjblwds/image/upload";

export const ARTWORKS: ComputerArtwork[] = [
  // TODO: 30 entries. Paste each Cloudinary URL and give it a title,
  // e.g. entry("Neon Alley", `${CDN}/v1784022453/neon-alley.png`).
  // `meta` is optional and shows as the preview caption's second line.
  entry("Music video - looping visual (2020)", `${CDN}/v1784019195/60_vijpbo.png`),
  entry("Voxels experiment", `${CDN}/v1784019193/56_zblx6x.png`),
  entry("The never-ending world of shows", `${CDN}/v1784019192/22_krpklj.png`),
  entry("When I was obsessed with emissive glow (2020)", `${CDN}/v1784019191/88_mtfmcs.png`),
  entry("Artwork for 74th Day", `${CDN}/v1784019191/74_fc4wzf.png`),
  entry("Cyberpunk Room Render (2020)", `${CDN}/v1784016424/2020_Render_-_Cyberpunk_Room_mdompq.jpg`),
  entry("Break Art Expectation (2019)", `${CDN}/v1784016229/2019_DigitalArt_-_break_art_expectation_jd9c2h.png`),
  entry("Thor: Stormbreaker & Mjolnir", `${CDN}/v1784016228/2019_DigitalArt_-_Thor-Stormbreaker-Mjolnir_9.12.19_kxjfpx.png`),
  entry("Portait (2020)", `${CDN}/v1784016227/2020_DigitalArt_-_Portrait_kktchz.png`),
  entry("High-scream (2020)", `${CDN}/v1784016227/2020_DigitalArt_-_High-scream_3_r1x4h5.png`),
  entry("Kratos (2020)", `${CDN}/v1784016225/2020_DigitalArt_-_Kratos_a1li7v.png`),
  entry("Isometric Car Render (2019)", `${CDN}/v1784016224/2019_Render_-_isoMetric_Car_laymq4.png`),
  entry("Tony (2020)", `${CDN}/v1784016224/2020_DigitalArt_-_Tony_a3s7m3.png`),
  entry("Music Video Render (2021)", `${CDN}/v1784016222/2021_Render_-_MusicVideo_raw_shot_hn2dpi.png`),
  entry("NFT Dog Concept Render (2021)", `${CDN}/v1784016220/2021_Render_-_NFTConcept_dog_2_reouyn.png`),
  entry("House Set Render (2022)", `${CDN}/v1784016219/2022_Render_-_HouseSet_qh7cse.png`),
  entry("NFT Skelly Concept Render (2021)", `${CDN}/v1784016219/2021_Render_-_NFTConcept_Skelly_mjtknr.png`),
  entry("GoDown Game Concept Render (2024)", `${CDN}/v1784016217/2024_ConceptRender_-_GoDown_Game_oxzv4q.png`),
  entry("Mini Village Set Render (2022)", `${CDN}/v1784016216/2022_Render_-_miniVillageSet_oejdzu.png`),
  entry("Spaceman Blackhole Render (2021)", `${CDN}/v1784016215/2021_Render_-_spaceman_Blackhole_knuuyi.png`),
  entry("Office Setup Concept Render (2024)", `${CDN}/v1784016214/2024_ConceptRender_-_OfficeSetup_bun4n8.png`),
  entry("City Roadside Render (2024)", `${CDN}/v1784016214/2024_Render_-_CityRoadside_byluvx.png`),
  entry("UCLH Operating Room Render (2025)", `${CDN}/v1784016213/2025_Render_-_UCLH_OperatingRoom_5_trgvuj.png`),
  entry("IsoRoom", `${CDN}/v1784016207/isoRoom_i3gw4y.png`),
  entry("House Render (WIP)", `${CDN}/v1784016204/House_-_WIP_Render5_mxatpg.png`),
  entry("VITU Results Poster", `${CDN}/v1784016107/VITU_results_3Dposter_vwqyhl.png`),
  entry("BGC Logo", `${CDN}/v1784015948/BGC_Logo_2_dcgbch.png`),
  entry("BGC Chronos - Title Story", `${CDN}/v1784015933/BGC_Chronos_TitleStory_clrrmf.png`),
  entry("Album Cover Concept Render (2020)", `${CDN}/v1784015533/2020_Render_-_AlbumCover_Concept_mj3qdg.png`),
];
