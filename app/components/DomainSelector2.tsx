import React, { useState } from "react";
import DomainBadge from "./DomainBadge";
import { NEED_TAGS, CONTEXT_TAGS, PLATFORM_TAGS } from "./projectsData";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DomainSelectorProps {
  selectedDomains: string[];
  toggleDomain: (domain: string) => void;
}

const STAGES = [
  { id: "need", title: "My need is", tags: NEED_TAGS },
  { id: "context", title: "In the context of", tags: CONTEXT_TAGS },
  { id: "platform", title: "Using platform", tags: PLATFORM_TAGS },
];

export default function DomainSelector2({
  selectedDomains,
  toggleDomain,
}: DomainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasExpandedOnce, setHasExpandedOnce] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const hasSelection = selectedDomains.length > 0;

  const handleNext = () => {
    if (currentStep < STAGES.length - 1 && hasSelection) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0 && hasSelection) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[3px] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        onMouseEnter={() => {
          if (!hasExpandedOnce) {
            setIsOpen(true);
            setHasExpandedOnce(true);
          }
        }}
        className={`
          relative z-50
          w-[93%] max-w-md mx-auto lg:mx-0
          lg:w-full lg:max-w-sm

          ${isOpen ? "h-[480px]" : "h-[160px]"}

          flex flex-col
          bg-[#FFECA0]/90 lg:bg-[#FFECA0]/95
          backdrop-blur-md lg:backdrop-blur-none

          shadow-[0_8px_24px_rgba(0,0,0,0.25),0_16px_32px_rgba(0,0,0,0.15)]
          lg:shadow-[0_6px_18px_rgba(0,0,0,0.4),0_16px_32px_rgba(0,0,0,0.35)]

          origin-center

          p-4 md:p-6 lg:pt-6 px-6
          overflow-hidden
        `}
      >
        {/* ✨ DOUBLE CREASE */}
        {isOpen && (
          <div className="pointer-events-none absolute left-0 top-0 w-full h-full">
            <div className="absolute top-1/3 w-full -translate-y-1/2">
              <div className="h-[5px] w-full bg-black/35 blur-[6px] opacity-70" />
              <div className="h-[3px] w-full bg-black/35 blur-[8px] opacity-70 -mt-[2px]" />
            </div>

            <div className="absolute top-2/3 w-full -translate-y-1/2">
              <div className="h-[5px] w-full bg-black/35 blur-[6px] opacity-70" />
              <div className="h-[3px] w-full bg-black/35 blur-[8px] opacity-70 -mt-[2px]" />
            </div>
          </div>
        )}

        {/* HEADER */}
        <div
          className={`
            relative z-10 cursor-pointer select-none
            flex items-center justify-center
            ${!isOpen ? "flex-1" : ""}
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Mobile Chevron */}
          <span
            className="absolute top-2 w-2 h-2 border-r-2 border-b-2 border-black md:hidden"
            style={{
              transform: `rotate(${isOpen ? 45 : -135}deg)`,
            }}
          />

          <h2
            className={`
              text-center lowercase font-bold opacity-90

              ${
                !isOpen
                  ? "text-xl md:text-xl lg:text-xl" // desktop folded stays same
                  : "text-xl lg:text-2xl"
              }

              ${!isOpen ? "md:text-xl text-2xl" : ""}
            `}
          >
            {!isOpen ? "choose from here" : STAGES[currentStep].title}
          </h2>
        </div>

        {/* TAGS */}
        {isOpen && (
          <div className="relative flex-1 mt-4 z-10">
            <div className="grid grid-cols-1 gap-2 w-full">
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
        )}

        {/* NAVIGATION */}
        {isOpen && hasSelection && (
          <div className="flex items-center justify-between mt-4 z-10">
            {currentStep > 0 ? (
              <button
                onClick={handlePrev}
                className="p-2 opacity-80 hover:opacity-100"
              >
                <ArrowLeft size={20} />
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={currentStep === STAGES.length - 1}
              className={`p-2 ml-auto ${
                currentStep === STAGES.length - 1
                  ? "opacity-20 cursor-not-allowed"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}