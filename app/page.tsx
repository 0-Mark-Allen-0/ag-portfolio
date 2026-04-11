"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import SplitLayout from "./components/SplitLayout";
import HeroHeader from "./components/HeroHeader";
import ProjectGrid from "./components/ProjectGrid";
import SmartDateHeader from "./components/SmartDateHeader";
import DomainSelector2 from "./components/DomainSelector2";
import LegacyContinuation from "./components/LegacyContinuation";

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
      pt-[var(--browser-inset-top)]
      px-[var(--browser-inset-x)]
      pb-0 
      bg-[var(--body-bg)]
    ">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-40"
        style={{
          left: "calc(var(--page-inset-x) - 1.2rem)",
          top: "calc(var(--page-inset-top) + var(--header-space) + 3rem)",
        }}
      >
        <Image
          src="/paper-clip.png"
          alt=""
          width={240}
          height={240}
          className="h-auto w-[96px] sm:w-[96px] md:w-[132px] select-none drop-shadow-[0_8px_10px_rgba(0,0,0,0.3)] rotate-180"
          priority
        />
      </div>

      <main className="notebook-page flex-grow w-full overflow-hidden relative">
        <SmartDateHeader
          dayName={dayName}
          dayNum={dayNum}
          month={month}
          title="Title"
        />
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

        <div className="relative z-0 pt-[calc(100dvh+2rem)]">
          <LegacyContinuation />
        </div>
      </main>
    </div>
  );
}