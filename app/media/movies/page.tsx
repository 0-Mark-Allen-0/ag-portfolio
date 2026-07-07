"use client";

import React from "react";
import PosterPage, { PosterPageTheme } from "../../components/PosterPage";
import PosterCard from "../components/PosterCard";
import { MEDIA_CATEGORIES } from "../mediaData";
import { motion } from "framer-motion";

const theme: PosterPageTheme = {
  bg: "#121212",
  browserBg: "#080808",
  surface: "#1E1E1E",
  primary: "#F5C451",
  secondary: "#C44536",
  text: "#F5F1E8",
  fontPrimary: "'Playfair Display', serif",
  fontSecondary: "'Inter', sans-serif",
  label: "Cinema",
};

const movies = MEDIA_CATEGORIES.find((c) => c.id === "movies")!;

export default function MoviesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      <div className="min-h-screen p-4 md:p-8 xl:p-12" style={{ backgroundColor: theme.browserBg }}>
        <PosterPage
          title="My Favourite Movies"
          theme={theme}
          className="max-w-[1400px] mx-auto"
        >
          <motion.div
            className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-6 [column-fill:balance]"
            initial="hidden"
            animate="visible"
          >
            {movies.media.map((item, idx) => (
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
