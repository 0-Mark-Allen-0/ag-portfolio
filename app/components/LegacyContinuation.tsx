"use client";

import React, { useEffect, useState } from "react";
import { MindStateSection } from "../old_components/MindStateSection";
import { StickyNote } from "../old_components/StickyNote";
import { TabDivider } from "../old_components/TabDivider";

const states = [
  { id: "2018", label: "2018", stage: "Phase 1" },
  { id: "2018-20", label: "2018-20", stage: "Phase 2" },
  { id: "2021-22", label: "2021-22", stage: "Phase 3" },
  { id: "2023", label: "2023", stage: "Phase 4" },
  { id: "2024-25", label: "2024-25", stage: "Phase 5" },
];

export default function LegacyContinuation() {
  const [activeState, setActiveState] = useState("2018");

  useEffect(() => {
    const handleScroll = () => {
      const sections = states.map((s) => document.getElementById(s.id));
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      sections.forEach((section, index) => {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveState(states[index].id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full pb-20 overflow-x-clip">
      <nav className="fixed left-0 top-0 h-full hidden md:block z-50">
        {states.map((s, idx) => (
          <TabDivider
            key={s.id}
            index={idx}
            label={s.label}
            stage={s.stage}
            isActive={activeState === s.id}
            onClick={() => scrollTo(s.id)}
          />
        ))}
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {states.map((s, idx) => (
          <TabDivider
            key={s.id}
            index={idx}
            label={s.label}
            stage={s.stage}
            isActive={activeState === s.id}
            onClick={() => scrollTo(s.id)}
          />
        ))}
      </nav>

      <div className="relative mx-auto w-full max-w-[1380px]">
        <div
          className="pt-8 pb-8 md:pt-10 md:pb-10"
          style={{
            paddingLeft: "calc(var(--margin-line-pos) + 2.75rem)",
            paddingRight: "1.5rem",
          }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-800 font-['Architects_Daughter'] leading-tight">
            Execution in Ambiguity
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            I make ideas real, even when dropped into the unknown.
          </p>
        </div>

        <MindStateSection state="curious" id="2018">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <StickyNote
              title="Game Development"
              description="Alfaleus - an eye-test device prototype built in Unity."
              mediaSrc="/alfaleus-sketch.jpg"
              color="yellow"
            />
            <StickyNote
              title="Web Design"
              description="Early portfolio experiments."
              mediaSrc="/web-design-early.jpg"
              color="pink"
            />
          </div>
        </MindStateSection>

        <MindStateSection state="focused" id="2018-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <StickyNote
              title="Systems Design"
              description="Warehouse simulation."
              mediaSrc="/warehouse.jpg"
              color="blue"
            />
            <StickyNote
              title="Mechanical Prototyping"
              description="Double wishbone suspension logic."
              mediaSrc="/suspension.jpg"
              color="green"
            />
          </div>
        </MindStateSection>

        <MindStateSection state="capable" id="2021-22">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <StickyNote
              title="Cinematic CG"
              description="Leo Highway sequence."
              mediaSrc="/leo-highway.jpg"
              color="yellow"
            />
            <StickyNote
              title="Interactive Media"
              description="Virtual OT visualization."
              mediaSrc="/virtual-ot.jpg"
              color="blue"
            />
          </div>
        </MindStateSection>

        <MindStateSection state="reliable" id="2023">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StickyNote
              title="Brand Study"
              description="Minimal identity system."
              mediaSrc="/brand1.jpg"
              color="pink"
            />
            <StickyNote
              title="Promo 2022"
              description="Motion language launch."
              mediaSrc="/promo.jpg"
              color="green"
            />
            <StickyNote
              title="DigiTwin"
              description="Infrastructure visualization."
              mediaSrc="/twin.jpg"
              color="yellow"
            />
          </div>
        </MindStateSection>

        <MindStateSection state="master" id="2024-25">
          <div className="text-center mt-20 pb-16 md:pb-24">
            <p className="text-gray-400 text-3xl font-['Architects_Daughter'] mb-6">
              -
            </p>
            <p className="text-gray-500 text-lg md:text-xl">contact@example.com</p>
          </div>
        </MindStateSection>

        <div className="h-20 md:hidden" />
      </div>
    </section>
  );
}
