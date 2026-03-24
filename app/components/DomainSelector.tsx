import React from 'react';
import DomainBadge from './DomainBadge';

const AVAILABLE_DOMAINS = [
  "Graphic Design",
  "Marketing",
  "Simulations",
  "Web Development",
  "Game Design",
];

interface DomainSelectorProps {
  selectedDomains: string[];
  toggleDomain: (domain: string) => void;
}

export default function DomainSelector({ selectedDomains, toggleDomain }: DomainSelectorProps) {
  return (
    <div className="relative w-full max-w-sm bg-white shadow-[0_2px_4px_rgba(0,0,0,0.4),0_6px_8px_rgba(0,0,0,0.35)] rounded-sm p-8 md:p-10 tab-noise transform rotate-1 border border-gray-100">
      <h2 className="text-3xl mb-8 font-bold opacity-80">Domains</h2>
      
      <div className="flex flex-col items-start gap-4">
        {AVAILABLE_DOMAINS.map((domain) => (
          <DomainBadge
            key={domain}
            domain={domain}
            isSelected={selectedDomains.includes(domain)}
            onClick={() => toggleDomain(domain)}
          />
        ))}
      </div>
    </div>
  );
}