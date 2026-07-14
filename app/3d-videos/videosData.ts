// ============================================================
//  3D VIDEOS (RPG VIEWER) — DATA MODEL & CONFIGURATION
// ============================================================
//  Fully data-driven. Components receive this data and hold no
//  asset paths of their own.
//
//  Portraits: the pixel-art avatar sprites form a shared pool.
//  Each video draws its portrait from `portraits` when set,
//  otherwise from PORTRAIT_POOL. The actual random pick happens
//  in one place only — see useRandomPortrait.
//
//  Videos: paste the plain Cloudinary URL from the Media Library.
//  The playback source and the gallery thumbnail are both derived
//  from it (see app/lib/cloudinary.ts) — there is no second asset
//  to upload or keep in sync.
// ============================================================

import { videoPoster, videoSrc, videoThumb } from "@/app/lib/cloudinary";

const SPRITES = "/images/rpg-sprites";
const SCENE = "/images/computer-assets";

/** Ambient backdrop behind the whole RPG scene. */
export const SCENE_BACKGROUND = `${SCENE}/rpg-scene-bg.png`;

/** Shared portrait pool — all 16 avatar variants. */
export const PORTRAIT_POOL: string[] = Array.from(
  { length: 16 },
  (_, i) => `${SPRITES}/rpg-sprite-${i + 1}.png`,
);

export interface Video {
  id: string;
  title: string;
  /** Playback source, sized and codec-picked for the browser. */
  video: string;
  /** Square still frame for the gallery grid. */
  thumbnail: string;
  /** Still frame at the video's own ratio, held until playback starts. */
  poster: string;
  /** Dialogue line displayed in the RPG text box. */
  description: string;
  /** Optional per-video portrait subset; falls back to PORTRAIT_POOL. */
  portraits?: string[];
}

// ------------------------------------------------------------
//  Authoring an entry: title, pasted Cloudinary URL, dialogue.
//  The id is slugified from the title, so there is no extra field
//  to keep in sync — it is what selection state keys on.
// ------------------------------------------------------------

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const entry = (title: string, url: string, description: string): Video => ({
  id: slug(title),
  title,
  video: videoSrc(url),
  thumbnail: videoThumb(url),
  poster: videoPoster(url),
  description,
});

const CDN = "https://res.cloudinary.com/drxjblwds/video/upload";

export const VIDEOS: Video[] = [
  entry(
    "Drone shot of a futuristic city (2023)",
    `${CDN}/v1784022061/droneshot_1_-_daytime_qi3guw.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Apricot Field Proto Shot (2024)",
    `${CDN}/v1784022453/apr_shot1_0001-0240_yyblr2.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Loading Animation Loop (2020)",
    `${CDN}/v1784021546/BallLooped_nlowpc.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Art for 76th Day",
    `${CDN}/v1784019257/76_yadfwy.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Art for 66th Day",
    `${CDN}/v1784019255/66_lvnuuy.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Stylised Experiment of scale (2024)",
    `${CDN}/v1784015675/Day4Final_vv3pqd.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Take Me Down Easy - visual (2020)",
    `${CDN}/v1784015559/2020_RenderVideo_-_TakeMeDownEasy_lcw795.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Promo Video for BGC Event",
    `${CDN}/v1784015554/PromoVideo_-_BGC_ad_my4spf.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Prison Introduction (2020)",
    `${CDN}/v1784015548/2020_RenderVideo_-_PrisonIntro_lypns1.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "VFX Shot - Quick Replica (2024)",
    `${CDN}/v1784015539/2024_RenderVideo_-_QuickReplicate_VFXShot_fdntqc.mov`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Board Gamers' Club - Promo (2020)",
    `${CDN}/v1784015537/PromoVideo_-_BGC_akv8jd.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Kobam Yenadi - Lyric Video (2020)",
    `${CDN}/v1784015531/2020_LyricVideo_-_KobamYenadi_zs6k4x.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Enna Aagumo - Lyric Video (2020)",
    `${CDN}/v1784015529/LyricVideo_-_EnnaAagumo_a_part_of_10DaysOfSongs_challenge_kchi6w.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Looping Battle Axe Animation (2020)",
    `${CDN}/v1784015527/2020_RenderVideo_-_BattleAxe_loopable_raz8fc.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "University Outdoor Tour (2025)",
    `${CDN}/v1784015527/2025_RenderVideo_-_UniversityOutdoorTour_dtdibk.mp4`,
    "TODO: dialogue line for this video.",
  ),
  entry(
    "Photogrammetry Experiment (2021)",
    `${CDN}/v1784015527/2021_RenderVideo_-_Photogrammetry_Shot_f7fohr.mp4`,
    "TODO: dialogue line for this video.",
  ),
];
