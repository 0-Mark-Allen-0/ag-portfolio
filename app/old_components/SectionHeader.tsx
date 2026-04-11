// components/SectionHeader.tsx
import React from "react";

interface SectionHeaderProps {
  stage: string;
  subtitle: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  stage,
  subtitle,
  description,
}) => {
  return (
    <div className="relative pl-6 md:pl-8 py-8 md:py-10 mb-10 md:mb-14">
      {/* Left Accent Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-800/80" />

      {/* Stage Badge */}
      <div className="inline-block bg-gray-800 rounded-2xl text-white font-semibold font-['Architects_Daughter'] tracking-widest text-xs md:text-sm px-3 py-1.5 mb-5">
        {stage}
      </div>

      {/* Section Title */}
      <h2 className="font-bold text-gray-900 font-['Architects_Daughter'] text-4xl md:text-5xl mb-5 leading-tight">
        {subtitle}
      </h2>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-600 italic max-w-2xl font-['Patrick_Hand'] leading-relaxed">
        “{description}”
      </p>
    </div>
  );
};