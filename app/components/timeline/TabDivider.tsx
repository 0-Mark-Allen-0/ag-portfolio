"use client";

// components/timeline/TabDivider.tsx
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

interface TabProps {
  label:    string;
  stage:    string;
  isActive: boolean;
  onClick:  () => void;
  index:    number;
}

const pastelColors = [
  "bg-pastel-yellow",
  "bg-pastel-orange",
  "bg-pastel-blue",
  "bg-pastel-pink",
  "bg-pastel-green",
];

export const TabDivider: React.FC<TabProps> = ({
  label,
  stage,
  isActive,
  onClick,
  index,
}) => {
  const topPosition = `calc(40vh + ${index * 90}px)`;

  return (
    <>
      {/* ── DESKTOP sidebar tab ── */}
      <motion.button
        onClick={onClick}
        className="fixed left-0 z-50 hidden md:flex items-center outline-none"
        style={{ top: topPosition }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: isActive ? 20 : 0, opacity: 1 }}
        whileHover={{ x: 15 }}
        transition={{
          delay: index * 0.05,
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          className={cn(
            "relative flex flex-col justify-center",
            "rounded-r-xl overflow-hidden cursor-pointer",
            "shadow-lg tab-noise brightness-110",
            pastelColors[index % 5]
          )}
          animate={{ width: "9.25rem", opacity: 0.9 }}
          transition={{ type: "tween", ease: "linear", duration: 0.2 }}
        >
          <div className="relative z-10 flex flex-col items-start px-7 py-3">
            <span className="text-xs text-gray-800 font-patrick uppercase tracking-[0.2em] mb-1">
              {stage}
            </span>
            <span className="text-xl text-gray-900 font-architect leading-tight">
              {label}
            </span>
          </div>
        </motion.div>
      </motion.button>

      {/* ── MOBILE bottom-bar tab ── */}
      <motion.button
        onClick={onClick}
        className="md:hidden flex flex-col items-center justify-center flex-1 py-3 bg-page outline-none cursor-pointer transition-all duration-200 z-50"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.08 }}
      >
        <span
          className={`text-[11px] font-patrick uppercase tracking-wider mb-2 ${
            isActive ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {stage}
        </span>
        <span
          className={`text-base font-architect leading-tight ${
            isActive ? "text-gray-900" : "text-gray-500 opacity-80"
          }`}
        >
          {label}
        </span>
        {isActive && (
          <motion.div
            className="w-2 h-2 rounded-full bg-gray-800 mt-1"
            layoutId="activeTabDot"
          />
        )}
      </motion.button>
    </>
  );
};
