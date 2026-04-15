"use client";

/**
 * TimelineSection — the scrollable career timeline.
 *
 * Replaces LegacyContinuation.tsx.  Responsibilities split into:
 *   useActiveSection  → scroll tracking logic
 *   TimelineNav       → desktop sidebar + mobile bottom bar rendering
 *   MindStateSection  → individual era wrappers
 *   StickyNote        → individual project cards
 *   TimelineSection   → orchestrates all of the above (this file)
 *
 * The SECTIONS constant is the single source-of-truth for timeline data.
 * Future: move SECTIONS to app/data/timeline.ts when content grows.
 */

import React from "react";
import { useActiveSection, type TimelineEntry } from "../../hooks/useActiveSection";
import TimelineNav from "./TimelineNav";
import { MindStateSection } from "./MindStateSection";
import { StickyNote } from "./StickyNote";
import { NOTEBOOK_CSS } from "../../context/NotebookContext";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SECTIONS: TimelineEntry[] = [
  { id: "2018", label: "2018", stage: "Phase 1" },
  { id: "2018-20", label: "2018-20", stage: "Phase 2" },
  { id: "2021-22", label: "2021-22", stage: "Phase 3" },
  { id: "2023", label: "2023", stage: "Phase 4" },
  { id: "2024-25", label: "2024-25", stage: "Phase 5" },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function TimelineSection() {
  const { activeId, isVisible } = useActiveSection(SECTIONS);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full pb-20">
      {/* Navigation chrome — completely separate from the content */}
      <TimelineNav
        sections={SECTIONS}
        activeId={activeId}
        isVisible={isVisible}
        onSectionClick={scrollTo}
      />

      {/* ── Content ── */}
      <div className="relative mx-auto w-full max-w-[1380px]">

        {/* Section heading — mirrors the margin-line padding pattern and clears the header space */}
        <div
          className="pb-8 md:pb-10 pr-4 md:pr-6"
          style={{
            paddingTop: `calc(${NOTEBOOK_CSS.headerSpace} + 2.5rem)`,
            paddingLeft: `calc(${NOTEBOOK_CSS.marginLine} + 1.5rem)`,
          }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-800 font-display leading-tight">
            Execution in Ambiguity
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            I make ideas real, even when dropped into the unknown.
          </p>
        </div>

        {/* ── Phase 1: 2018 ── */}
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

        {/* ── Phase 2: 2018-20 ── */}
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

        {/* ── Phase 3: 2021-22 ── */}
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

        {/* ── Phase 4: 2023 ── */}
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

        {/* ── Phase 5: 2024-25 ── */}
        <MindStateSection state="master" id="2024-25">
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

        {/* Bottom spacer for mobile (clears the bottom nav bar) */}
        <div className="h-20 md:hidden" />
      </div>
    </section>
  );
}
