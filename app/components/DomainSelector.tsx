import React, { useState } from "react";
import { motion } from "framer-motion";
import DomainBadge from "./DomainBadge";
import { TAGS } from "./projectsData";

interface DomainSelectorProps {
  selectedDomains: string[];
  toggleDomain: (domain: string) => void;
  collapsedHeight?: number; // height of the closed accordion in px
}

export default function DomainSelector({
  selectedDomains,
  toggleDomain,
  collapsedHeight = 40, // default collapsed height
}: DomainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
      relative 
      w-[93%] max-w-md
      lg:w-full lg:max-w-sm

      lg:min-h-[360px]

      bg-[#FFECA0]/90 lg:bg-[#FFECA0]/95 
      backdrop-blur-md lg:backdrop-blur-none 

      shadow-[0_8px_24px_rgba(0,0,0,0.25),0_16px_32px_rgba(0,0,0,0.15)] 
      lg:shadow-[0_6px_18px_rgba(0,0,0,0.4),0_16px_32px_rgba(0,0,0,0.35)] 

      p-4 md:p-6 lg:pt-6 px-6

      tab-noise transform 
      transition-all
    "
    >
      {/* Heading: Clickable on mobile */}
      <div
        className="flex flex-col items-center justify-center cursor-pointer select-none relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Left placeholder to help center */}
        <div className="w-6 md:hidden" /> 

        {/* Right-aligned chevron */}
        {/* <motion.span
          className="w-2 h-2 border-r-2 border-b-2 border-black md:hidden mb-2"
          animate={{ rotate: isOpen ? 45 : -135 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        /> */}
        <span
          className="w-2 h-2 border-r-2 border-b-2 border-black md:hidden mb-3"
          style={{
            transform: `rotate(${isOpen ? 45 : -135}deg)`,
          }}
        />

        {/* Centered heading */}
        <h2 className="text-xl lg:text-2xl font-bold opacity-90 text-center flex-1 lowercase">
          Choose From Here
        </h2>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden">
        {/* <motion.div
          initial={{ height: collapsedHeight, opacity: 0.8 }}
          animate={{
            height: isOpen ? "auto" : collapsedHeight,
            opacity: isOpen ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden grid grid-cols-2 gap-2 justify-items-center mt-2"
        > */}
        <div
          className={`overflow-hidden grid grid-cols-2 gap-2 justify-items-center mt-2 ${
          isOpen ? "" : "h-[40px]"
          }`}
        >
          {TAGS.map((tag) => (
            <DomainBadge
              key={tag}
              domain={tag}
              isSelected={selectedDomains.includes(tag)}
              onClick={() => toggleDomain(tag)}
            />
          ))}
        {/* </motion.div> */}
        </div>
      </div>

      {/* Desktop: Always expanded */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-2 gap-3 justify-items-center mt-4">
        {TAGS.map((tag) => (
          <DomainBadge
            key={tag}
            domain={tag}
            isSelected={selectedDomains.includes(tag)}
            onClick={() => toggleDomain(tag)}
          />
        ))}
      </div>
        <div className="pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2">
          <div className="h-[6px] w-full bg-black/30 blur-[6px] opacity-70" />
          <div className="h-[4px] w-full bg-black/30 blur-[8px] opacity-70 -mt-[3px]" />
        </div>
    </div>
    
  );
}