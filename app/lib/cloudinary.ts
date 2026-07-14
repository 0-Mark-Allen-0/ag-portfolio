/**
 * cloudinary — derive delivery variants from a pasted Cloudinary URL.
 *
 * Assets are authored by pasting the plain URL copied from the Media
 * Library, e.g.
 *
 *   https://res.cloudinary.com/<cloud>/video/upload/v1784022453/take-me-down-easy.mp4
 *
 * Cloudinary builds any variant of that asset on demand when transformation
 * directives are inserted into the path, so a single pasted URL is enough to
 * serve the full-size asset, a resized copy, and — for video — a still frame
 * used as the gallery thumbnail and <video poster>. Nothing extra is uploaded.
 *
 * Directives belong between `upload/` and the version segment, and the file
 * extension selects the delivered format:
 *
 *   .../video/upload/so_auto,w_400,c_fill/v1784022453/take-me-down-easy.jpg
 *
 * Every helper leaves a non-Cloudinary URL untouched, so local or third-party
 * sources can be mixed into the same data files without special-casing.
 */

const UPLOAD = "/upload/";

/**
 * Insert `directives` into a Cloudinary URL, optionally re-pointing the
 * delivered format via `ext` (without the dot).
 */
export function transform(url: string, directives: string, ext?: string): string {
  const marker = url.indexOf(UPLOAD);
  if (marker === -1) return url;

  const base = url.slice(0, marker);
  const path = url.slice(marker + UPLOAD.length);
  const retargeted = ext ? path.replace(/\.[^./]+$/, `.${ext}`) : path;

  return `${base}${UPLOAD}${directives}/${retargeted}`;
}

/**
 * Video sized for playback. `f_auto:video` lets Cloudinary pick a codec the
 * requesting browser supports; `q_auto` picks the bitrate.
 */
export function videoSrc(url: string): string {
  return transform(url, "f_auto:video,q_auto");
}

/**
 * Square still frame lifted out of a video, for gallery tiles and posters.
 * `so_auto` asks Cloudinary to choose the most representative frame rather
 * than a fixed timestamp.
 */
export function videoThumb(url: string, size = 400): string {
  return transform(
    url,
    `so_auto,w_${size},h_${size},c_fill,q_auto,f_auto`,
    "jpg",
  );
}

/**
 * Still frame at the video's own aspect ratio, shown while playback buffers.
 * Unlike videoThumb this must not crop, or the poster would jump to a
 * different framing the moment the first video frame paints.
 */
export function videoPoster(url: string, width = 1400): string {
  return transform(url, `so_auto,w_${width},c_limit,q_auto,f_auto`, "jpg");
}

/** Full-size image, capped so an oversized master isn't shipped whole. */
export function imageSrc(url: string, width = 1400): string {
  return transform(url, `w_${width},c_limit,q_auto,f_auto`);
}

/** Square image tile for thumbnail grids. */
export function imageThumb(url: string, size = 400): string {
  return transform(url, `w_${size},h_${size},c_fill,q_auto,f_auto`);
}
