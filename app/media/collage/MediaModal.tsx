"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MediaItem } from "../types";
import { CollageTheme } from "./types";

interface MediaModalProps {
  item: MediaItem | null;
  theme: CollageTheme;
  onClose: () => void;
}

/**
 * Glowing "information panel" embedded into the poster — not a browser dialog.
 * Portalled to document.body, locks page scroll while open, closes on backdrop
 * click or Escape. Behaviour is identical across all three pages; only the
 * CollageTheme colours differ.
 */
export default function MediaModal({ item, theme, onClose }: MediaModalProps) {
  // Lock body scroll + wire Escape while an item is selected.
  useEffect(() => {
    if (!item) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  // Portal target only exists on the client; render nothing during SSR.
  if (typeof document === "undefined") return null;

  const stacked = theme.modalLayout === "stacked";

  return createPortal(
    <>
      {/* Hide the scrollbar on the details pane while keeping it scrollable. */}
      <style>{`
        .collage-modal-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .collage-modal-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      <AnimatePresence>
        {item && (
        <motion.div
          key="collage-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            backgroundColor: theme.overlay,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <motion.div
            key="collage-modal-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className={
              stacked
                ? "relative flex w-[min(92vw,640px)] max-h-[85vh] flex-col overflow-hidden"
                : "relative flex w-[min(92vw,760px)] max-h-[85vh] flex-col overflow-hidden md:flex-row"
            }
            style={{
              borderRadius: 16,
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.modalBg,
              boxShadow: theme.modalGlow,
            }}
          >
            {stacked ? (
              <>
                {/* Cover — full-width 16:9 still across the top */}
                <div className="w-full flex-none">
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="block w-full object-cover"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                </div>

                {/* Details — scroll below the cover */}
                <div className="collage-modal-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-6 md:p-8">
                  <h2
                    className="text-lg leading-snug md:text-xl"
                    style={{
                      fontFamily: theme.titleFont,
                      color: theme.titleColor,
                      textShadow: theme.titleGlow,
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="text-[10px] uppercase tracking-[0.25em] opacity-70"
                    style={{ color: theme.caption, fontFamily: theme.bodyFont }}
                  >
                    Why I like this {item.type}
                  </p>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: theme.text, fontFamily: theme.bodyFont }}
                  >
                    {item.whyILikeIt}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Cover */}
                <div className="flex items-center justify-center p-5 md:w-1/2">
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="h-auto max-h-[45vh] w-full object-contain md:max-h-[70vh]"
                    style={{ borderRadius: 6 }}
                  />
                </div>

                {/* Details */}
                <div className="collage-modal-scroll flex flex-col justify-center gap-4 overflow-y-auto p-6 md:w-1/2 md:p-8">
                  <h2
                    className="text-lg leading-snug md:text-xl"
                    style={{
                      fontFamily: theme.titleFont,
                      color: theme.titleColor,
                      textShadow: theme.titleGlow,
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="text-[10px] uppercase tracking-[0.25em] opacity-70"
                    style={{ color: theme.caption, fontFamily: theme.bodyFont }}
                  >
                    Why I like this {item.type}
                  </p>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: theme.text, fontFamily: theme.bodyFont }}
                  >
                    {item.whyILikeIt}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
