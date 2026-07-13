"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/app/lib/cn";

// ============================================================
//  PORTRAIT DISPLAY — circular avatar with a fade transition.
// ============================================================
//  Purely presentational: it renders whatever portrait src it's
//  given. Which portrait to show (the random pick) is decided by
//  useRandomPortrait, not here.
// ============================================================

export interface PortraitDisplayProps {
  portrait: string;
  /** Accessible label, e.g. the speaker/artist name. */
  name?: string;
  className?: string;
}

export default function PortraitDisplay({
  portrait,
  name = "Artist",
  className,
}: PortraitDisplayProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-full border-[3px] border-[#f4933b] bg-[#12224a] shadow-[0_0_18px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        {portrait && (
          <motion.img
            key={portrait}
            src={portrait}
            alt={name}
            draggable={false}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
