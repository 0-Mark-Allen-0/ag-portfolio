import React from 'react';
import DomainBadge from './DomainBadge';
import { TAGS } from './projectsData';

/*
  DomainSelector now uses TAGS from centralized data.
  Desktop updated to use 2-column layout and reduced font size.
*/

interface DomainSelectorProps {
  selectedDomains: string[];
  toggleDomain: (domain: string) => void;
}

export default function DomainSelector({ selectedDomains, toggleDomain }: DomainSelectorProps) {
  return (
    <div className="
      relative 
      w-[90%] max-w-xs
      lg:w-full lg:max-w-sm

      bg-white/90 lg:bg-white 
      backdrop-blur-md lg:backdrop-blur-none 

      shadow-[0_4px_12px_rgba(0,0,0,0.25),0_8px_16px_rgba(0,0,0,0.15)] 
      lg:shadow-[0_2px_4px_rgba(0,0,0,0.4),0_6px_8px_rgba(0,0,0,0.35)] 

      p-4 md:p-6 lg:p-8   /* slightly reduced padding for desktop */

      tab-noise transform 
      border border-gray-200 lg:border-gray-100 
      transition-all
    ">
      
      <h2 className="
        text-xl lg:text-3xl   /* reduced desktop font size */
        mb-4 lg:mb-6         /* slightly tighter spacing */
        font-bold opacity-80
      ">
        Domains
      </h2>
      
      {/* 2-column layout for both mobile and desktop */}
      <div className="
        grid grid-cols-2 gap-2 
        lg:gap-3
      ">
        {TAGS.map((tag) => (
          <DomainBadge
            key={tag}
            domain={tag}
            isSelected={selectedDomains.includes(tag)}
            onClick={() => toggleDomain(tag)}
          />
        ))}
      </div>

    </div>
  );
}