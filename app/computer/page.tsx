"use client";

import "./win95.css";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";

import {
  DESKTOP_ICONS,
  ICON_LAYOUT,
  PROJECTS,
  WALLPAPER,
  WINDOW_LAYOUT,
  type IconId,
} from "./computerData";
import Window from "./components/Window";
import DesktopIcon from "./components/DesktopIcon";
import Taskbar from "./components/Taskbar";
import ConfirmationDialog from "./components/ConfirmationDialog";
import ProjectList from "./components/ProjectList";
import PreviewViewer from "./components/PreviewViewer";

// ============================================================
//  WINDOWS95 DESKTOP  (/computer)
// ============================================================
//  A component-built OS-alike. Only wallpaper + icons are image
//  assets; every window, border, button and panel is CSS.
//
//  The whole desktop lives inside a 4:3 "screen" that stays
//  squared regardless of the viewport (matching the mockup),
//  letterboxed on black. All window/icon positions come from the
//  layout knobs in computerData.ts — tweak them there, not here.
//
//  Routes live ONLY on this page: the Digital Artworks icon opens
//  /digital-artworks like launching an app; the confirm dialog's
//  Yes returns to /desk.
// ============================================================

const DESK_ROUTE = "/desk";
const ARTWORKS_ROUTE = "/digital-artworks";

export default function ComputerPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const desktopRef = useRef<HTMLDivElement>(null);

  const [selectedId, setSelectedId] = useState(PROJECTS[0]?.id ?? "");
  const [selectedIcon, setSelectedIcon] = useState<IconId | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Simple z-order: last-focused window floats to the top.
  const [topWindow, setTopWindow] = useState<"projects" | "preview">("preview");

  const selectedProject = PROJECTS.find((p) => p.id === selectedId);
  const layout = isDesktop ? "floating" : "stacked";

  const openIcon = (id: IconId) => {
    if (id === "digital-artworks") router.push(ARTWORKS_ROUTE);
    // my-computer / recycle-bin are cosmetic here (windows already open).
  };

  const projectsWindow = (
    <Window
      title="My Computer/Projects"
      layout={layout}
      draggable
      dragConstraints={desktopRef}
      frame={WINDOW_LAYOUT.projects}
      zIndex={topWindow === "projects" ? 30 : 20}
      onFocus={() => setTopWindow("projects")}
      onClose={() => setConfirmOpen(true)}
      contentClassName="p-1"
    >
      <ProjectList
        projects={PROJECTS}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </Window>
  );

  const previewWindow = (
    <Window
      title={`Preview: ${selectedProject?.title ?? "…"}`}
      layout={layout}
      draggable
      dragConstraints={desktopRef}
      frame={WINDOW_LAYOUT.preview}
      zIndex={topWindow === "preview" ? 30 : 20}
      onFocus={() => setTopWindow("preview")}
      onClose={() => setConfirmOpen(true)}
      contentClassName="p-1"
    >
      <PreviewViewer project={selectedProject} />
    </Window>
  );

  // The screen fills the whole viewport (its ratio is simply the
  // viewport's — 16:9 on a standard monitor, wider on ultrawide).
  const screenStyle = isDesktop
    ? {
      width: "100%",
      height: "100vh",
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
    <main className="win95 relative flex min-h-screen w-full justify-center overflow-hidden bg-black text-black md:items-center">
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

            {/* Bottom-right icon (Digital Artworks) */}
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

            {projectsWindow}
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

            {projectsWindow}
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
