"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplitLayout from "./components/SplitLayout";
import DomainSelector from "./components/DomainSelector";
import HeroHeader from "./components/HeroHeader";
import ProjectGrid from "./components/ProjectGrid";

export default function Home() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  return (
    <div className="min-h-screen flex flex-col pt-4 px-4 md:pt-6 md:px-6 lg:pt-6 lg:px-6 pb-0 bg-[var(--body-bg)]">
      <main className="notebook-page flex-grow w-full overflow-hidden relative">
        
        <div className="notebook-header-space" />
        <div className="margin-line-page" />

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
            <div className="flex h-full items-center justify-center relative z-20">
              <DomainSelector 
                selectedDomains={selectedDomains} 
                toggleDomain={toggleDomain} 
              />
            </div>
          }
        />
      </main>
    </div>
  );
}