'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group [perspective:1000px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ 
          scale: 1.1, 
          rotate: 0, 
          zIndex: 20,
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        }}
        className={`relative bg-white p-1 pb-4 border border-gray-200 shadow-md cursor-pointer`}
        style={{ 
          rotate: game.rotation?.includes('rotate') ? parseInt(game.rotation.replace(/[^0-9-]/g, '')) : 0 
        }}
      >
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 shadow-inner">
          <img 
            src={game.coverUrl} 
            alt={game.title} 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="mt-3 px-1 text-center">
          <p className="font-display text-base md:text-lg text-ink font-bold leading-tight">
            {game.title}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-3 bg-pastel-yellow border-2 border-ink rounded-lg shadow-xl"
            style={{ pointerEvents: 'none' }}
          >
            <div className="relative">
              <p className="font-body text-xs text-ink italic leading-tight">
                "Why I like this game?"
              </p>
              <p className="font-body text-sm text-ink mt-1 font-semibold">
                {game.whyILikeIt}
              </p>
              {/* Tooltip arrow */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-pastel-yellow border-r-2 border-b-2 border-ink transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
