"use client";

import { useEffect, useRef, useState } from "react";
import {
  AUDIO,
  BASE,
  SCENE_ITEMS,
  SCENE_MAX_WIDTH,
  SCENE_W,
  SCENE_H,
  THEME_FADE_MS,
  type SceneItem,
} from "./sceneConfig";
import InteractiveAsset from "./InteractiveAsset";
import CalibrationOverlay from "./CalibrationOverlay";

// ============================================================
//  DESK SCENE  (desktop / md+ only)
// ============================================================
//  Composition (bottom -> top):
//    1. base desk (day + night crossfade)
//    2. sprites + hitboxes from SCENE_ITEMS, ordered by zIndex
//    3. calibration legend (dev-only)
//
//  Local state:
//    - isNight    : lamp hitbox toggles it; only the desk changes.
//    - computerOn : computer-case hitbox toggles the monitor-b overlay
//                   (and whether the monitor is clickable). Defaults ON.
//    - audioOn    : speaker hitbox toggles the ambient track; the track
//                   follows the day/night theme.
// ============================================================

export default function DeskScene() {
  const [isNight, setIsNight] = useState(false);
  //  Computer starts switched on (monitor-b showing).
  const [computerOn, setComputerOn] = useState(true);
  const [audioOn, setAudioOn] = useState(false);
  const [calibrate, setCalibrate] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  //  Enable calibrate mode from ?calibrate in the URL, and toggle it
  //  live with the "c" key.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("calibrate")
    ) {
      setCalibrate(true);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "c" || e.key === "C") setCalibrate((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  //  Play/pause + swap track when the theme flips while playing.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (audioOn) {
      a.play().catch(() => {
        /* autoplay may reject until a user gesture — click unlocks it */
      });
    } else {
      a.pause();
    }
  }, [audioOn, isNight]);

  function dispatch(item: SceneItem) {
    if (!item.action) return;
    switch (item.action.type) {
      case "toggleNight":
        setIsNight((v) => !v);
        break;
      case "toggleComputer":
        setComputerOn((v) => !v);
        break;
      case "toggleAudio":
        setAudioOn((v) => !v);
        break;
      case "navigate":
        //  Empty route = intentionally unconfigured (no-op for now).
        if (item.action.route) window.location.href = item.action.route;
        break;
    }
  }

  return (
    <main
      className="hidden min-h-[100dvh] w-full items-center justify-center md:flex"
      style={{
        backgroundColor: isNight ? "#14100f" : "#d9d4cc",
        transition: `background-color ${THEME_FADE_MS}ms ease`,
      }}
    >
      {/* Ambient audio — src follows the theme. */}
      <audio
        ref={audioRef}
        src={isNight ? AUDIO.night : AUDIO.day}
        loop
        preload="none"
      />

      <div
        className="relative w-full"
        style={{
          maxWidth: SCENE_MAX_WIDTH,
          aspectRatio: `${SCENE_W} / ${SCENE_H}`,
        }}
      >
        {/* ── Base desk: day + night stacked, crossfaded ── */}
        <img
          src={BASE.dayImage}
          alt="Workstation desk — day"
          className="absolute inset-0 block h-full w-full select-none"
          draggable={false}
          style={{
            opacity: isNight ? 0 : 1,
            transition: `opacity ${THEME_FADE_MS}ms ease`,
          }}
        />
        <img
          src={BASE.nightImage}
          alt="Workstation desk — night"
          className="absolute inset-0 block h-full w-full select-none"
          draggable={false}
          style={{
            opacity: isNight ? 1 : 0,
            transition: `opacity ${THEME_FADE_MS}ms ease`,
          }}
        />

        {/* ── Sprites + hitboxes ── */}
        {SCENE_ITEMS.map((item) => (
          <InteractiveAsset
            key={item.id}
            item={item}
            isNight={isNight}
            calibrate={calibrate}
            visible={item.showWhenComputerOn ? computerOn : true}
            onActivate={() => dispatch(item)}
          />
        ))}

        {/* ── Dev calibration legend ── */}
        {calibrate && <CalibrationOverlay />}
      </div>
    </main>
  );
}
