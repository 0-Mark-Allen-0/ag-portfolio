"use client";

import React from "react";
import { MEDIA_CATEGORIES } from "../mediaData";
import { CollageTheme } from "../collage/types";
import CollagePoster from "../collage/CollagePoster";

const NEON = "#39FF14";

const gamesTheme: CollageTheme = {
  bg: "#05100a",
  modalBg: "rgba(6, 18, 12, 0.82)",
  overlay: "rgba(4, 12, 8, 0.72)",
  border: NEON,
  text: "#E8FFE8",
  titleColor: "#FFFFFF",
  caption: "#00BFFF",
  titleFont: "'Press Start 2P', monospace",
  bodyFont: "'Rajdhani', sans-serif",
  titleSize: "text-xl lg:text-3xl xl:text-4xl",
  fontImport:
    "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Rajdhani:wght@400;500;600;700&display=swap",
  cardGlow: `0 0 5px ${NEON}, 0 0 40px ${NEON}99, 0 0 70px ${NEON}55`,
  cardGlowMobile: `0 0 18px ${NEON}, 0 0 40px ${NEON}99, 0 0 70px ${NEON}55`,
  modalGlow: `0 0 24px ${NEON}66, 0 0 60px ${NEON}33, 0 25px 80px rgba(0,0,0,0.6)`,
  titleGlow: `0 0 18px ${NEON}55, 0 0 40px ${NEON}33`,
  texture: "grid",
};

const games = MEDIA_CATEGORIES.find((c) => c.id === "games")!;

export default function GamesV2Page() {
  return (
    <CollagePoster
      theme={gamesTheme}
      titleLines={["THE GAMES", "THAT MADE ME"]}
      items={games.media}
    />
  );
}
