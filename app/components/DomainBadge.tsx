import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Quick utility for clean tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DomainBadgeProps {
  domain: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function DomainBadge({ domain, isSelected, onClick }: DomainBadgeProps) {
  // Split the domain into words to handle multiline underlines perfectly
  const words = domain.split(' ');

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative text-xl md:text-xl text-left transition-colors duration-200 w-fit flex flex-wrap gap-x-2 gap-y-1",
        isSelected ? "text-[#0d094c]" : "text-[#0d094c]/90 hover:text-[#0d094c]/50"
      )}
    >
      {words.map((word, index) => (
        <span key={index} className="relative inline-block lowercase">
          {word}
          
          {/* The Animated Underline applied to each word */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#0d094c] origin-left rounded-full"
              />
            )}
          </AnimatePresence>
        </span>
      ))}
    </button>
  );
}