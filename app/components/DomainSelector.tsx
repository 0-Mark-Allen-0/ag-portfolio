import React from 'react';
import DomainBadge from './DomainBadge';
import { TAGS } from './projectsData';

interface DomainSelectorProps {
  selectedDomains: string[];
  toggleDomain: (domain: string) => void;
}

export default function DomainSelector({ selectedDomains, toggleDomain }: DomainSelectorProps) {
  return (
    <div className="
      relative 
      w-[93%] max-w-md
      lg:w-full lg:max-w-sm

      bg-white/90 lg:bg-white 
      backdrop-blur-md lg:backdrop-blur-none 

      shadow-[0_4px_12px_rgba(0,0,0,0.25),0_8px_16px_rgba(0,0,0,0.15)] 
      lg:shadow-[0_2px_4px_rgba(0,0,0,0.4),0_6px_8px_rgba(0,0,0,0.35)] 

      p-4 md:p-6 lg:p-8

      tab-noise transform 
      border border-gray-200 lg:border-gray-100 
      transition-all
    ">
      
      {/* Centered Heading */}
      <h2 className="
        text-xl lg:text-3xl
        mb-4 lg:mb-6
        font-bold opacity-80
        text-center
      ">
        Domains
      </h2>
      
      {/* Centered Grid */}
      <div className="
        grid grid-cols-2 
        gap-2 lg:gap-3
        justify-items-center
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