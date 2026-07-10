/**
 * DomainSelector — three-step tag filter for the project grid.
 *
 * Previously DomainSelector2.tsx (the "v1" file was deleted in Phase 0).
 * Renamed to DomainSelector as part of Phase 5 polish.
 *
 * Changes from DomainSelector2:
 *   • Uses cn() from shared lib (no more template string concatenation)
 *   • Chevron rotation uses conditional Tailwind classes instead of
 *     style={{ transform: `rotate(...)` }}
 *   • Background colour uses bg-note-yellow @theme token instead of
 *     a raw bg-[#FFECA0] arbitrary value
 */

import React, { useState } from "react";
import { cn } from "../lib/cn";
import DomainBadge from "./DomainBadge";
import { NEED_TAGS, CONTEXT_TAGS, PLATFORM_TAGS } from "./projectsData";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface DomainSelectorProps {
  selectedDomains: string[];
  toggleDomain: (domain: string) => void;
}

const STAGES = [
  { id: "need", title: "My need is", tags: NEED_TAGS },
  { id: "context", title: "In the context of", tags: CONTEXT_TAGS },
  { id: "platform", title: "Using platform", tags: PLATFORM_TAGS },
];

export default function DomainSelector({
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
      {/* Mobile backdrop */}
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
        className={cn(
          // Base layout
          "relative z-50 flex flex-col overflow-hidden",
          "w-[93%] max-w-md mx-auto lg:mx-0 lg:w-full lg:max-w-sm",
          "origin-center p-4 md:p-6 lg:pt-6 px-6",
          // Height: collapses when closed
          isOpen ? "h-[480px]" : "h-[160px]",
          // Background — bg-note-yellow from @theme token
          "bg-note-yellow/90 lg:bg-note-yellow/95",
          "backdrop-blur-md lg:backdrop-blur-none",
          // Shadows differ between mobile and desktop
          "shadow-[0_8px_24px_rgba(0,0,0,0.25),0_16px_32px_rgba(0,0,0,0.15)]",
          "lg:shadow-[0_6px_18px_rgba(0,0,0,0.4),0_16px_32px_rgba(0,0,0,0.35)]"
        )}
      >

        {/* ✨ Double crease lines when unfolded */}
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

        {/* Desktop collapse button — X icon, top-right (desktop only) */}
        {isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Collapse"
            className="absolute top-3 right-3 z-20 hidden md:flex items-center justify-center p-1 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X size={20} />
          </button>
        )}

        {/* Header / toggle */}
        <div
          className={cn(
            "relative z-10 cursor-pointer select-none",
            "flex items-center justify-center",
            !isOpen && "flex-1"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/*
           * Chevron (mobile only) — visible only while the panel is
           * closed; hidden once it has been opened.
           */}
          {!isOpen && (
            <span className="absolute top-2 w-2 h-2 border-r-2 border-b-2 border-black md:hidden -rotate-[135deg]" />
          )}

          <h2
            className={cn(
              "font-['Patrick_Hand'] text-center lowercase font-bold opacity-90",
              !isOpen ? "text-xl" : "text-xl lg:text-2xl"
            )}
          >
            {!isOpen ? "choose from here" : STAGES[currentStep].title}
          </h2>
        </div>

        {/* Tag list */}
        {isOpen && (
          <div className="relative flex-1 mt-4 z-10 font-['Patrick_Hand']">
            <div className="grid grid-cols-1 gap-2 w-full ">
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

        {/* Step navigation */}
        {isOpen && hasSelection && (
          <div className="flex items-center justify-between mt-4 z-10">
            {currentStep > 0 ? (
              <button onClick={handlePrev} className="p-2 opacity-80 hover:opacity-100">
                <ArrowLeft size={20} />
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={currentStep === STAGES.length - 1}
              className={cn(
                "p-2 ml-auto",
                currentStep === STAGES.length - 1
                  ? "opacity-20 cursor-not-allowed"
                  : "opacity-80 hover:opacity-100"
              )}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
