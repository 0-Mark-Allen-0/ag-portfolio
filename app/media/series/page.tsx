"use client";

import React from "react";
import PosterPage, { PosterPageTheme } from "../../components/PosterPage";
import PosterCard from "../components/PosterCard";
import { MEDIA_CATEGORIES } from "../mediaData";
import { motion } from "framer-motion";

const theme: PosterPageTheme = {
  bg: "#0B1020",
  browserBg: "#05070f",
  surface: "#182033",
  primary: "#8B5CF6",
  secondary: "#22D3EE",
  text: "#E5E7EB",
  fontPrimary: "'Poppins', sans-serif",
  fontSecondary: "'Manrope', sans-serif",
  label: "Streaming",
};

const series = MEDIA_CATEGORIES.find((c) => c.id === "series")!;

export default function SeriesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Manrope:wght@400;500;600;700&display=swap');
      `}</style>
      <div className="min-h-screen p-4 md:p-8 xl:p-12" style={{ backgroundColor: theme.browserBg }}>
        <PosterPage
          title="My Favourite Series"
          theme={theme}
          className="max-w-[1400px] mx-auto"
        >
          <motion.div
            className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-6 [column-fill:balance]"
            initial="hidden"
            animate="visible"
          >
            {series.media.map((item, idx) => (
              <div key={item.id} className="break-inside-avoid mb-6 inline-block w-full">
                <PosterCard item={item} index={idx} theme={theme} />
              </div>
            ))}
          </motion.div>
        </PosterPage>
      </div>
    </>
  );
}
