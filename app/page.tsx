"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplitLayout from "./components/SplitLayout";
import DomainSelector from "./components/DomainSelector";
import HeroHeader from "./components/HeroHeader";
import ProjectGrid from "./components/ProjectGrid";
import SmartDateHeader from "./components/SmartDateHeader";
import DomainSelector2 from "./components/DomainSelector2";

export default function Home() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  // Get today's date
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dayNum = today.getDate();
  const month = today.toLocaleDateString("en-US", { month: "long" });

  return (
    <div className="
      min-h-screen flex flex-col 
      pt-2 md:pt-4 lg:pt-0   // REDUCED TOP SPACE
      px-4 md:px-6 lg:px-6 
      pb-0 
      bg-[var(--body-bg)]
    ">
      <main className="notebook-page flex-grow w-full overflow-hidden relative">
        <SmartDateHeader dayName={dayName} dayNum={dayNum} month={month} />
        {/* <div className="notebook-header-space" /> */}
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
            <div className="
              flex w-full justify-center
              lg:justify-start
            ">
              {/* <DomainSelector 
                selectedDomains={selectedDomains} 
                toggleDomain={toggleDomain} 
              /> */}
              <DomainSelector2 
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