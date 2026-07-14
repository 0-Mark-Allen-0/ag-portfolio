"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Video } from "../videosData";

// ============================================================
//  VIDEO DISPLAY — main viewer.
// ============================================================
//  Plays the selected video with no distortion (object-contain),
//  centered, supporting landscape and portrait alike. Crossfades
//  smoothly when the selection changes.
//
//  Playback is autoplay/muted/loop with no controls, matching the
//  ambient treatment used elsewhere in the site. Muted is what
//  makes autoplay permissible to browsers — dropping it would stop
//  the video from starting on its own.
// ============================================================

export interface VideoDisplayProps {
  video: Video | undefined;
}

export default function VideoDisplay({ video }: VideoDisplayProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden bg-black/40">
      <AnimatePresence mode="wait">
        {video && (
          <motion.video
            key={video.id}
            src={video.video}
            poster={video.poster}
            aria-label={video.title}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            draggable={false}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
