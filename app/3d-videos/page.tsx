"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { VIDEOS, PORTRAIT_POOL, SCENE_BACKGROUND } from "./videosData";
import { useRandomPortrait } from "./useRandomPortrait";
import VideoGallery from "./components/VideoGallery";
import VideoDisplay from "./components/VideoDisplay";
import PortraitDisplay from "./components/PortraitDisplay";
import DialogueBox from "./components/DialogueBox";

// ============================================================
//  3D VIDEOS — RPG DIALOGUE VIEWER  (/3d-videos)
// ============================================================
//  Reached by "opening" the 3D Videos icon on /computer, so Quit
//  returns there — like closing an app back to the OS.
//
//  The scene sits inside a 4:3 "screen" that stays squared on any
//  viewport, centred on the CRT bezel colour. Only the videos,
//  thumbnails and portrait are remote assets; the frame, borders
//  and panels are CSS. All text uses the VT323 pixel face.
//
//  Selecting a video re-drives every panel: viewer, dialogue,
//  and a freshly-rolled portrait.
// ============================================================

const COMPUTER_ROUTE = "/computer";

// Shared retro frame: dark-red translucent fill + orange border.
const PANEL = "border-[3px] border-[#f4933b] bg-[#3a0d0d]/70 backdrop-blur-sm";

// ------------------------------------------------------------
//  LAYOUT KNOBS — tweak these to reposition/resize the panels.
//  Columns/rows are fractions of the 4:3 screen; the portrait
//  values are relative to the dialogue row it overlaps.
// ------------------------------------------------------------
const GALLERY_COL = "29%"; // left gallery column width
const DIALOGUE_ROW = "24%"; // bottom dialogue row height
const PANEL_GAP = "0.5rem"; // gap between panels
const PORTRAIT = {
  height: "90%", // portrait size vs. the dialogue row height (square)
  left: "-0.1%", // inset from the dialogue box's left edge
  bottom: "0%", // how far it sits above the row's bottom
};
const DIALOGUE_TEXT_INSET = "25%"; // left padding so text clears the portrait

// The screen is a true 4:3 box: as large as the viewport allows on
// whichever axis binds first, pillarboxed against the bezel.
const SCREEN_WIDTH = "min(133.3333vh, 100vw)";

export default function ThreeDVideosPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [selectedId, setSelectedId] = useState(VIDEOS[0]?.id ?? "");
  const selected = VIDEOS.find((v) => v.id === selectedId);

  const portraitPool = selected?.portraits ?? PORTRAIT_POOL;
  const portrait = useRandomPortrait(portraitPool, selectedId);

  const dialogue = selected && (
    <DialogueBox
      id={selected.id}
      title={selected.title}
      text={selected.description}
    />
  );

  const sceneBackground = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.82)), url(${SCENE_BACKGROUND})`,
    backgroundSize: "cover" as const,
    backgroundPosition: "center" as const,
  };

  const quitButton = (
    <button
      type="button"
      onClick={() => router.push(COMPUTER_ROUTE)}
      className="absolute right-[0.9%] top-[2.5%] z-30 border-2 border-[#f4933b] bg-[#3a0d0d] px-6 py-1 text-xl leading-none text-orange-50 transition-colors hover:bg-[#5a1616] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4933b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#b3afb2]"
    >
      Quit
    </button>
  );

  return (
    <main className="flex min-h-screen w-full justify-center overflow-hidden bg-[#b3afb2] md:items-center">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-vt323 relative overflow-hidden bg-black text-orange-50"
        style={
          isDesktop
            ? {
              width: SCREEN_WIDTH,
              aspectRatio: "4 / 3",
              ...sceneBackground,
            }
            : { minHeight: "100vh", width: "100%", ...sceneBackground }
        }
      >
        {quitButton}

        {isDesktop ? (
          /* ── DESKTOP (md+): faithful mockup grid ── */
          <div
            className="h-full w-full"
            style={{
              display: "grid",
              gridTemplateColumns: `${GALLERY_COL} 1fr`,
              gridTemplateRows: `1fr ${DIALOGUE_ROW}`,
              gap: PANEL_GAP,
              padding: PANEL_GAP,
              paddingTop: "calc(2.5% + 2rem)", // clear the Quit button
            }}
          >
            {/* Left gallery — spans both rows */}
            <section
              aria-label="Video gallery"
              className={`${PANEL} min-h-0 overflow-hidden`}
              style={{ gridRow: "1 / 3" }}
            >
              <VideoGallery
                videos={VIDEOS}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </section>

            {/* Main viewer */}
            <section
              aria-label="Video viewer"
              className={`${PANEL} max-h-[100%] overflow-hidden`}
            >
              <VideoDisplay video={selected} />
            </section>

            {/* Dialogue row with overlapping portrait */}
            <section aria-label="Description" className="relative min-h-0">
              <div
                className={`${PANEL} h-[65%] py-4 pr-6`}
                style={{ paddingLeft: DIALOGUE_TEXT_INSET }}
              >
                {dialogue}
              </div>
              {/* Portrait straddles the dialogue box's lower-left. */}
              <div
                className="absolute aspect-square"
                style={{
                  height: PORTRAIT.height,
                  left: PORTRAIT.left,
                  bottom: PORTRAIT.bottom,
                }}
              >
                <PortraitDisplay
                  portrait={portrait}
                  className="h-full w-full"
                />
              </div>
            </section>
          </div>
        ) : (
          /* ── MOBILE (<md): stacked ── */
          <div className="flex min-h-screen flex-col gap-3 p-3 pt-16">
            <section
              aria-label="Video viewer"
              className={`${PANEL} aspect-[4/3] w-full overflow-hidden`}
            >
              <VideoDisplay video={selected} />
            </section>

            <section aria-label="Description" className="relative">
              <div className={`${PANEL} min-h-[120px] py-3 pl-28 pr-4`}>
                {dialogue}
              </div>
              <div className="absolute -top-4 bottom-3 left-3 aspect-square">
                <PortraitDisplay portrait={portrait} className="h-full w-full" />
              </div>
            </section>

            <section
              aria-label="Video gallery"
              className={`${PANEL} max-h-[42vh] overflow-hidden`}
            >
              <VideoGallery
                videos={VIDEOS}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </section>
          </div>
        )}
      </motion.div>
    </main>
  );
}
