"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface StickyNoteProps {
  title: string;
  description: string;
  mediaSrc: string;
  mediaType?: "image" | "video";
  color?: "yellow" | "blue" | "pink" | "green";
}

const colorMap = {
  yellow: "bg-[#fef3c7]",
  blue: "bg-[#dbeafe]",
  pink: "bg-[#fce7f3]",
  green: "bg-[#d1fae5]",
};

export const StickyNote: React.FC<StickyNoteProps> = ({
  title,
  description,
  mediaSrc,
  mediaType = "image",
  color = "yellow",
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full"
      style={{ isolation: "isolate" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Note Body — animates upward in z via scale + translateY */}
      <motion.div
        className={`relative w-full ${colorMap[color]} shadow-lg origin-center p-6 md:p-8 xl:p-9`}
        style={{ zIndex: hovered ? 30 : 10 }}
        animate={
          hovered
            ? {
                scale: 1.03,
                y: -6,
                boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
              }
            : {
                scale: 1,
                y: 0,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }
        }
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
      >
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 font-['Architects_Daughter'] border-b border-black/10 pb-3 mb-6 leading-tight">
          {title}
        </h3>

        {/* Media */}
        <motion.div
          className="relative w-full aspect-[4/3] overflow-hidden shadow-sm bg-gray-100 border-4 border-white mb-6"
          animate={hovered ? { rotate: 2 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {mediaType === "image" ? (
            <Image src={mediaSrc} alt={title} fill className="object-cover" />
          ) : (
            <iframe
              src={mediaSrc}
              title={title}
              className="w-full h-full"
              allowFullScreen
            />
          )}
        </motion.div>

        {/* Description */}
        <p className="text-gray-800 text-lg md:text-xl font-['Patrick_Hand'] leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Tape — always on top via z-index, never animates z */}
      <motion.div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 md:w-36 h-9 bg-white/40 backdrop-blur-sm border-l-2 border-r-2 border-white/20 shadow-sm"
        style={{ zIndex: hovered ? 5 : 20 }}
        animate={
          hovered ? { rotate: -1, scaleX: 1.04 } : { rotate: -2, scaleX: 1 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </div>
  );
};