"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ComputerProject } from "../computerData";

// ============================================================
//  PREVIEW VIEWER — Window C contents.
// ============================================================
//  Shows the selected project's preview. Prefers HTML5 video
//  (autoplay / muted / loop / playsInline); falls back to an
//  image when the preview has none. Crossfades on change.
// ============================================================

export interface PreviewViewerProps {
  project: ComputerProject | undefined;
}

export default function PreviewViewer({ project }: PreviewViewerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col gap-1">
      <div className="w95-sunken relative grid flex-1 place-items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={project?.id ?? "empty"}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid h-full w-full place-items-center bg-white"
          >
            {!project ? (
              <p className="px-4 text-center text-sm text-black/50">
                Select a project to preview it.
              </p>
            ) : project.preview.kind === "video" ? (
              <video
                key={project.preview.src}
                src={project.preview.src}
                poster={project.preview.poster}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                className="h-full w-full object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.preview.src}
                alt={project.preview.alt ?? project.title}
                className="h-full w-full object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Statusbar-style caption */}
      {project && (
        <div className="w95-sunken shrink-0 px-2 py-1 text-xs text-black">
          <span className="font-semibold">{project.title}</span>
          {project.meta && <span className="text-black/60"> — {project.meta}</span>}
        </div>
      )}
    </div>
  );
}
