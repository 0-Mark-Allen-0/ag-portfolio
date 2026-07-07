"use client";

import { useState } from "react";
import PosterPage, { PosterPageTheme } from "../../components/PosterPage";
import PosterCard from "../components/PosterCard";
import { MEDIA_CATEGORIES } from "../mediaData";
import { MediaItem } from "../types";
import { motion, AnimatePresence } from "framer-motion";

const theme: PosterPageTheme = {
  bg: "#0F172A",
  browserBg: "#080c16",
  surface: "#1E293B",
  primary: "#39FF14",
  secondary: "#00BFFF",
  highlight: "#FF4D9D",
  text: "#F8FAFC",
  fontPrimary: "'Orbitron', sans-serif",
  fontSecondary: "'Rajdhani', sans-serif",
  label: "Gaming",
};

const games = MEDIA_CATEGORIES.find((c) => c.id === "games")!;

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<MediaItem | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
      `}</style>
      <div className="min-h-screen p-4 md:p-8 xl:p-12" style={{ backgroundColor: theme.browserBg }}>
        <PosterPage
          title="My Favourite Games"
          theme={theme}
          className="max-w-[1400px] mx-auto"
        >
          <motion.div
            className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-6 [column-fill:balance]"
            initial="hidden"
            animate="visible"
          >
            {games.media.map((item, idx) => (
              <div key={item.id} className="break-inside-avoid mb-6 inline-block w-full">
                <PosterCard item={item} index={idx} theme={theme} onClick={setSelectedGame} />
              </div>
            ))}
          </motion.div>
        </PosterPage>
      </div>

      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{
              backgroundColor: "rgba(8, 12, 22, 0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col md:flex-row"
              style={{
                backgroundColor: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 25px 80px -20px rgba(0,0,0,0.6)",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedGame(null)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full text-lg font-bold"
                style={{
                  backgroundColor: `${theme.bg}CC`,
                  color: theme.text,
                  border: `1px solid ${theme.primary}44`,
                }}
              >
                ×
              </button>

              {/* Image */}
              <div className="md:w-1/2 flex items-center justify-center p-4">
                <img
                  src={selectedGame.coverUrl}
                  alt={selectedGame.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center gap-4">
                <h2
                  className="text-2xl md:text-3xl font-black leading-tight"
                  style={{ fontFamily: theme.fontPrimary, color: theme.primary }}
                >
                  {selectedGame.title}
                </h2>
                <p
                  className="text-[11px] uppercase tracking-widest opacity-60"
                  style={{ color: theme.secondary, fontFamily: theme.fontSecondary }}
                >
                  Why I like this {selectedGame.type}
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: theme.text, fontFamily: theme.fontSecondary }}
                >
                  {selectedGame.whyILikeIt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
