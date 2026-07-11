"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplitLayout from "../components/SplitLayout";
import HeroHeader from "../components/HeroHeader";
import ProjectGrid from "../components/ProjectGrid";
import DomainSelector from "../components/DomainSelector";

export default function Whiteboard() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  return (
    <main className="whiteboard-page font-architect min-h-screen w-full flex flex-col bg-page text-ink relative">
      <SplitLayout
        leftContent={
          <AnimatePresence mode="wait">
            {selectedDomains.length === 0 ? (
              <HeroHeader key="hero" />
            ) : (
              <ProjectGrid key="grid" selectedDomains={selectedDomains} />
            )}
          </AnimatePresence>
        }
        rightContent={
          <div className="flex w-full justify-center lg:justify-start">
            <DomainSelector
              selectedDomains={selectedDomains}
              toggleDomain={toggleDomain}
            />
          </div>
        }
      />
    </main>
  );
}
