import React, { useState } from "react";
import DomainBadge from "./DomainBadge";
import { NEED_TAGS, CONTEXT_TAGS, PLATFORM_TAGS } from "./projectsData";

interface DomainSelectorProps {
  selectedDomains: string[];
  toggleDomain: (domain: string) => void;
  collapsedHeight?: number; // height of the closed accordion in px
}

const STAGES = [
  { id: "need", title: "My need is", tags: NEED_TAGS },
  { id: "context", title: "In the context of", tags: CONTEXT_TAGS },
  { id: "platform", title: "Using platform", tags: PLATFORM_TAGS },
];

export default function DomainSelector2({
  selectedDomains,
  toggleDomain,
  collapsedHeight = 40,
}: DomainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STAGES.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay - Only shows when expanded */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[3px] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
        relative z-50
        w-[93%] max-w-md mx-auto lg:mx-0
        lg:w-full lg:max-w-sm
        ${isOpen ? "h-[480px]" : "h-auto"} md:h-[480px]
        flex flex-col

        bg-[#FFECA0]/90 lg:bg-[#FFECA0]/95 
        backdrop-blur-md lg:backdrop-blur-none 

        shadow-[0_8px_24px_rgba(0,0,0,0.25),0_16px_32px_rgba(0,0,0,0.15)] 
        lg:shadow-[0_6px_18px_rgba(0,0,0,0.4),0_16px_32px_rgba(0,0,0,0.35)] 

        p-4 md:p-6 lg:pt-6 px-6

        tab-noise transform 
        overflow-hidden
      `}
      >
        {isOpen && (
          <div className="pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2">
            <div className="h-[6px] w-full bg-black/30 blur-[6px] opacity-70" />
            <div className="h-[4px] w-full bg-black/30 blur-[8px] opacity-70 -mt-[3px]" />
          </div>
        )}

        {/* Heading: Clickable on mobile to expand/collapse */}
        <div
          className="flex flex-col items-center justify-center cursor-pointer select-none relative z-10 md:cursor-default"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Chevron */}
          <span
            className="w-2 h-2 border-r-2 border-b-2 border-black md:hidden mb-2"
            style={{
              transform: `rotate(${isOpen ? 45 : -135}deg)`, // Points Up when closed, Down when open
            }}
          />
          
          {/* Dynamic Title based on stage / Closed Mobile State */}
          <h2 className="text-xl lg:text-2xl font-bold opacity-90 text-center flex-1 lowercase mb-2">
            <span className={`${isOpen ? 'hidden' : 'inline'} md:hidden`}>
              choose from here
            </span>
            <span className={`${isOpen ? 'inline' : 'hidden'} md:inline`}>
              {STAGES[currentStep].title}
            </span>
          </h2>
        </div>

        {/* Tags Container (Handles mobile collapse & desktop static) */}
        <div
          className={`relative flex-1 z-10 ${
            !isOpen ? "hidden md:block md:mt-4 md:overflow-y-auto md:overflow-x-hidden md:custom-scrollbar" : "mt-4 overflow-y-auto overflow-x-hidden custom-scrollbar"
          }`}
        >
          <div className="grid grid-cols-1 gap-2 justify-items-start w-full">
            {STAGES[currentStep].tags.map((tag) => (
              <DomainBadge
                key={tag}
                domain={tag}
                isSelected={selectedDomains.includes(tag)}
                onClick={() => toggleDomain(tag)}
              />
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div 
          className={`flex items-center justify-between mt-4 pt-2 border-t border-black/10 z-10 ${
            !isOpen ? "hidden md:flex" : "flex"
          }`}
        >
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`p-2 ${currentStep === 0 ? "opacity-20 cursor-not-allowed" : "opacity-80 hover:opacity-100 cursor-pointer"}`}
          >
            <span className="block w-3 h-3 border-l-2 border-t-2 border-black transform -rotate-45" />
          </button>

          <span className="text-sm font-semibold opacity-70 tracking-widest">
            {currentStep + 1} / 3
          </span>

          <button
            onClick={handleNext}
            disabled={currentStep === STAGES.length - 1}
            className={`p-2 ${currentStep === STAGES.length - 1 ? "opacity-20 cursor-not-allowed" : "opacity-80 hover:opacity-100 cursor-pointer"}`}
          >
            <span className="block w-3 h-3 border-r-2 border-t-2 border-black transform rotate-45" />
          </button>
        </div>
      </div>
    </>
  );
}