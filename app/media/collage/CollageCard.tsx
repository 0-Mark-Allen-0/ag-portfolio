"use client";

import React from "react";
import { motion } from "framer-motion";
import { MediaItem } from "../types";
import { CollageSlot, CollageTheme } from "./types";

interface CollageCardProps {
  item: MediaItem;
  slot: CollageSlot;
  index: number;
  theme: CollageTheme;
  /** "tile" = absolute-positioned desktop mosaic; "masonry" = mobile columns */
  variant: "tile" | "masonry";
  onClick: (item: MediaItem) => void;
}

export default function CollageCard({
  item,
  slot,
  index,
  theme,
  variant,
  onClick,
}: CollageCardProps) {
  if (variant === "tile") {
    return (
      <motion.button
        type="button"
        onClick={() => onClick(item)}
        aria-label={`Open details for ${item.title}`}
        className="group absolute block overflow-hidden"
        style={{
          left: `${slot.leftPct}%`,
          top: `${slot.topPct}%`,
          width: `${slot.widthPct}%`,
          height: `${slot.heightPct}%`,
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.bg,
          boxShadow: theme.cardGlow,
          cursor: "pointer",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
        whileHover={{
          scale: 1.06,
          zIndex: 30,
          transition: { duration: 0.12, ease: "easeOut" },
        }}
      >
        {/* object-contain: the whole cover stays visible and keeps its aspect ratio */}
        <img
          src={item.coverUrl}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </motion.button>
    );
  }

  // Masonry (mobile) — bordered card that keeps the cover's natural height.
  return (
    <motion.button
      type="button"
      onClick={() => onClick(item)}
      aria-label={`Open details for ${item.title}`}
      className="mb-3 block w-full break-inside-avoid overflow-hidden"
      style={{
        borderRadius: 4,
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.bg,
        boxShadow: theme.cardGlowMobile,
        cursor: "pointer",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.12, ease: "easeOut" },
      }}
    >
      <img src={item.coverUrl} alt={item.title} className="block w-full" />
    </motion.button>
  );
}
