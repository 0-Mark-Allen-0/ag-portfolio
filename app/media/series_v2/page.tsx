"use client";

import React from "react";
import { MEDIA_CATEGORIES } from "../mediaData";
import { CollageTheme } from "../collage/types";
import CollagePoster from "../collage/CollagePoster";

// Quiet, dreamlike, late-night — dark navy + lavender, with a sparse starfield.
const LAVENDER = "#E7C8F5";
const LAV_GLOW = "rgba(231,200,245,";

const seriesTheme: CollageTheme = {
  bg: "#0A1832",
  modalBg: "#162543",
  overlay: "rgba(0,0,0,.65)",
  border: LAVENDER,
  text: "#F0D8FA",
  titleColor: "#E7C8F5",
  caption: "#E7C8F5",
  titleFont: "'Oswald', sans-serif",
  bodyFont: "'Inter', sans-serif",
  titleSize: "text-4xl lg:text-6xl xl:text-7xl font-medium",
  fontImport:
    "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
  cardGlow: `0 0 5px ${LAV_GLOW}.85), 0 0 44px ${LAV_GLOW}.55), 0 0 72px ${LAV_GLOW}.35)`,
  cardGlowMobile: `0 0 20px ${LAV_GLOW}.85), 0 0 44px ${LAV_GLOW}.55), 0 0 72px ${LAV_GLOW}.35)`,
  modalGlow: `0 0 24px ${LAV_GLOW}.4), 0 25px 80px rgba(0,0,0,0.55)`,
  titleGlow: `0 0 18px ${LAV_GLOW}.45), 0 0 40px ${LAV_GLOW}.25)`,
  texture: "stars",
  modalLayout: "stacked",
};

const series = MEDIA_CATEGORIES.find((c) => c.id === "series")!;

export default function SeriesV2Page() {
  return (
    <CollagePoster
      theme={seriesTheme}
      titleLines={["the shows that", "changed how I build"]}
      items={series.media}
    />
  );
}
