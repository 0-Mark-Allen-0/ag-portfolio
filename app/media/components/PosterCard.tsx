"use client";

import React from "react";
import { motion } from "framer-motion";
import { MediaItem } from "../types";
import { PosterPageTheme } from "../../components/PosterPage";

interface PosterCardProps {
  item: MediaItem;
  index: number;
  theme: PosterPageTheme;
  onClick?: (item: MediaItem) => void;
}

export default function PosterCard({ item, index, theme, onClick }: PosterCardProps) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        onClick={() => onClick?.(item)}
        className="relative cursor-pointer p-1.5 pb-5"
        style={{
          backgroundColor: theme.surface,
          border: `1px solid ${theme.primary}22`,
        }}
      >
        {/* Cover image */}
        <div
          className="relative overflow-hidden bg-black/30"
          style={{ aspectRatio: item.aspectRatio || 2 / 3 }}
        >
          <img
            src={item.coverUrl}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <div className="mt-3 px-1 text-center">
          <p
            className="text-sm md:text-base font-bold leading-tight"
            style={{ fontFamily: theme.fontPrimary, color: theme.text }}
          >
            {item.title}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
