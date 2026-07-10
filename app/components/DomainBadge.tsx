import React from 'react';
import { cn } from '../lib/cn';


interface DomainBadgeProps {
  domain: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function DomainBadge({ domain, isSelected, onClick }: DomainBadgeProps) {
  const words = domain.split(' ');

  return (
    <button
      onClick={onClick}
      className={cn(
        // text-ink uses the @theme color token instead of text-[#0d094c]
        "relative text-xl md:text-xl text-left transition-colors duration-200 w-fit flex flex-wrap gap-x-2 gap-y-1",
        isSelected ? "text-ink" : "text-ink/90 hover:text-ink/50"
      )}
    >
      {words.map((word, index) => (
        <span key={index} className="relative inline-block lowercase">
          {word}

          {/* Static underline per word — appears on selection, no animation */}
          {isSelected && (
            <div
              // bg-ink uses the @theme color token
              className="absolute -bottom-1 left-0 right-0 h-[3px] bg-ink rounded-full"
            />
          )}
        </span>
      ))}
    </button>
  );
}