"use client";

import React from "react";
import { MEDIA_CATEGORIES } from "../mediaData";
import { CollageTheme } from "../collage/types";
import CollagePoster from "../collage/CollagePoster";

// Warm, cinematic, nostalgic — deep plum + peach "projector light".
const PEACH = "#F2C5A7";
const PEACH_GLOW = "rgba(242,197,167,";

const moviesTheme: CollageTheme = {
  bg: "#2B1C3A",
  modalBg: "#2B1C3A",
  overlay: "rgba(0,0,0,.65)",
  border: PEACH,
  text: "#F5C9A9",
  titleColor: "#F5C9A9",
  caption: "#F2C5A7",
  titleFont: "'Fredoka', sans-serif",
  bodyFont: "'Nunito', sans-serif",
  titleSize: "text-3xl lg:text-5xl xl:text-6xl font-semibold",
  fontImport:
    "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap",
  cardGlow: `0 0 5px ${PEACH_GLOW}.75), 0 0 44px ${PEACH_GLOW}.5), 0 0 72px ${PEACH_GLOW}.3)`,
  cardGlowMobile: `0 0 20px ${PEACH_GLOW}.75), 0 0 44px ${PEACH_GLOW}.5), 0 0 72px ${PEACH_GLOW}.3)`,
  modalGlow: `0 0 24px ${PEACH_GLOW}.3), 0 25px 80px rgba(0,0,0,0.55)`,
  titleGlow: `0 0 20px ${PEACH_GLOW}.3)`,
  texture: "none",
};

const movies = MEDIA_CATEGORIES.find((c) => c.id === "movies")!;

export default function MoviesV2Page() {
  return (
    <CollagePoster
      theme={moviesTheme}
      titleLines={["the movies that", "shaped my thinking"]}
      items={movies.media}
    />
  );
}
