"use client";

import "./win95.css";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";

import {
  ARTWORKS,
  DESKTOP_ICONS,
  ICON_LAYOUT,
  WALLPAPER,
  WINDOW_LAYOUT,
  type IconId,
} from "./computerData";
import Window from "./components/Window";
import DesktopIcon from "./components/DesktopIcon";
import Taskbar from "./components/Taskbar";
import ConfirmationDialog from "./components/ConfirmationDialog";
import ArtworkGrid from "./components/ArtworkGrid";
import PreviewViewer from "./components/PreviewViewer";

// ============================================================
//  WINDOWS95 DESKTOP  (/computer)
// ============================================================
//  A component-built OS-alike. Only wallpaper + icons are image
//  assets; every window, border, button and panel is CSS.
//
//  The whole desktop lives inside a 4:3 "screen" that stays
//  squared regardless of the viewport (matching the mockup),
//  pillarboxed against the CRT bezel colour. All window/icon
//  positions come from the layout knobs in computerData.ts —
//  tweak them there, not here.
//
//  Routes live ONLY on this page: the 3D Videos icon opens
//  /3d-videos like launching an app; the confirm dialog's Yes
//  returns to /desk.
// ============================================================

const DESK_ROUTE = "/desk";
const VIDEOS_ROUTE = "/3d-videos";

// The screen is a true 4:3 box: as large as the viewport allows on
// whichever axis binds first, pillarboxed against the bezel.
const SCREEN_WIDTH = "min(133.3333vh, 100vw)";

export default function ComputerPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const desktopRef = useRef<HTMLDivElement>(null);

  const [selectedId, setSelectedId] = useState(ARTWORKS[0]?.id ?? "");
  const [selectedIcon, setSelectedIcon] = useState<IconId | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Simple z-order: last-focused window floats to the top.
  const [topWindow, setTopWindow] = useState<"artworks" | "preview">("preview");

  const selectedArtwork = ARTWORKS.find((a) => a.id === selectedId);
  const layout = isDesktop ? "floating" : "stacked";

  const openIcon = (id: IconId) => {
    if (id === "3d-videos") router.push(VIDEOS_ROUTE);
    // my-computer / recycle-bin are cosmetic here (windows already open).
  };

  const artworksWindow = (
    <Window
      title="My Computer/Artworks"
      layout={layout}
      draggable
      dragConstraints={desktopRef}
      frame={WINDOW_LAYOUT.artworks}
      zIndex={topWindow === "artworks" ? 30 : 20}
      onFocus={() => setTopWindow("artworks")}
      onClose={() => setConfirmOpen(true)}
      contentClassName="p-1"
    >
      <ArtworkGrid
        artworks={ARTWORKS}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </Window>
  );

  const previewWindow = (
    <Window
      title={`Preview: ${selectedArtwork?.title ?? "…"}`}
      layout={layout}
      draggable
      dragConstraints={desktopRef}
      frame={WINDOW_LAYOUT.preview}
      zIndex={topWindow === "preview" ? 30 : 20}
      onFocus={() => setTopWindow("preview")}
      onClose={() => setConfirmOpen(true)}
      contentClassName="p-1"
    >
      <PreviewViewer artwork={selectedArtwork} />
    </Window>
  );

  const screenStyle = isDesktop
    ? {
      width: SCREEN_WIDTH,
      aspectRatio: "4 / 3",
      backgroundImage: `url(${WALLPAPER})`,
      backgroundSize: "cover" as const,
      backgroundPosition: "center" as const,
    }
    : {
      minHeight: "100vh",
      width: "100%",
      backgroundImage: `url(${WALLPAPER})`,
      backgroundSize: "cover" as const,
      backgroundPosition: "center" as const,
    };

  return (
    <main className="win95 relative flex min-h-screen w-full justify-center overflow-hidden bg-[#b3afb2] text-black md:items-center">
      <div className="relative overflow-hidden" style={screenStyle}>
        {/* ── DESKTOP (md+): floating draggable windows over the wallpaper ── */}
        {isDesktop ? (
          <motion.div
            ref={desktopRef}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bottom-9"
          >
            {/* Top-left icon column */}
            <div
              className="absolute flex flex-col gap-3"
              style={ICON_LAYOUT.topLeft}
            >
              {DESKTOP_ICONS.filter((i) => i.corner === "top-left").map(
                (icon) => (
                  <DesktopIcon
                    key={icon.id}
                    label={icon.label}
                    icon={icon.icon}
                    selected={selectedIcon === icon.id}
                    onSelect={() => setSelectedIcon(icon.id)}
                    onOpen={() => openIcon(icon.id)}
                  />
                ),
              )}
            </div>

            {/* Bottom-right icon (3D Videos) */}
            <div className="absolute" style={ICON_LAYOUT.bottomRight}>
              {DESKTOP_ICONS.filter((i) => i.corner === "bottom-right").map(
                (icon) => (
                  <DesktopIcon
                    key={icon.id}
                    label={icon.label}
                    icon={icon.icon}
                    selected={selectedIcon === icon.id}
                    onSelect={() => setSelectedIcon(icon.id)}
                    onOpen={() => openIcon(icon.id)}
                  />
                ),
              )}
            </div>

            {artworksWindow}
            {previewWindow}

            <AnimatePresence>
              {confirmOpen && (
                <ConfirmationDialog
                  key="confirm"
                  title="Confirm"
                  prompt="Are you sure you want to:"
                  question="Go back to desk?"
                  zIndex={100}
                  frame={WINDOW_LAYOUT.confirm}
                  onConfirm={() => router.push(DESK_ROUTE)}
                  onCancel={() => setConfirmOpen(false)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ── MOBILE (<md): stacked windows in normal flow ── */
          <div className="relative z-10 flex min-h-screen flex-col gap-4 p-4 pb-14">
            <header className="w95-raised px-3 py-2">
              <h1 className="text-sm font-bold">My Computer</h1>
            </header>

            {artworksWindow}
            <div className="min-h-[260px]">{previewWindow}</div>

            <div className="flex flex-wrap gap-4">
              {DESKTOP_ICONS.map((icon) => (
                <DesktopIcon
                  key={icon.id}
                  label={icon.label}
                  icon={icon.icon}
                  selected={selectedIcon === icon.id}
                  onSelect={() => setSelectedIcon(icon.id)}
                  onOpen={() => openIcon(icon.id)}
                />
              ))}
            </div>

            {confirmOpen && (
              <ConfirmationDialog
                layout="stacked"
                title="Confirm"
                prompt="Are you sure you want to:"
                question="go back to desk?"
                onConfirm={() => router.push(DESK_ROUTE)}
                onCancel={() => setConfirmOpen(false)}
              />
            )}
          </div>
        )}

        {/* Taskbar spans the bottom of the screen */}
        <Taskbar
          activeTask="Welcome"
          onReturnToDesk={() => setConfirmOpen(true)}
        />
      </div>
    </main>
  );
}
