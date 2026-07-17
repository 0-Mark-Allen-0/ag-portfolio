"use client";

/**
 * TimelineSection — the scrollable life-story timeline.
 *
 * Responsibilities split into:
 *   useActiveSection  → scroll tracking logic
 *   TimelineNav       → desktop sidebar + mobile bottom bar rendering
 *   MindStateSection  → individual era wrappers (header + side rail)
 *   TimelineRow       → individual story rows (text / notes / split)
 *   StickyNote        → individual image / project cards
 *   TimelineSection   → orchestrates all of the above (this file)
 *
 * Story content is data-driven and lives in app/data/journalTimeline.ts.
 */

import React from "react";
import { useActiveSection, type TimelineEntry } from "../../hooks/useActiveSection";
import TimelineNav from "./TimelineNav";
import { MindStateSection } from "./MindStateSection";
import TimelineRow, { isSplitRow } from "./TimelineRow";
import { NOTEBOOK_CSS } from "../../context/NotebookContext";
import { ERAS } from "../../data/journalTimeline";

/* ------------------------------------------------------------------ */
/* Nav data — derived from the story eras (single source of truth)     */
/* ------------------------------------------------------------------ */

const SECTIONS: TimelineEntry[] = ERAS.map((era) => ({
  id: era.id,
  label: era.navLabel,
  stage: era.stage,
}));

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function TimelineSection() {
  const { activeId, isVisible } = useActiveSection(SECTIONS);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* Running counter so split rows alternate their sides across the whole page. */
  let splitCount = 0;

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-800 font-architect leading-tight">
            Life story
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed font-patrick">
            How I got here — one chapter at a time.
          </p>
        </div>

        {ERAS.map((era) => (
          <MindStateSection
            key={era.id}
            id={era.id}
            stage={era.stage}
            subtitle={era.subtitle}
            description={era.description}
            stateLabel={era.stateLabel}
            tone={era.tone}
          >
            {era.rows.map((row, i) => {
              const flip = isSplitRow(row) ? splitCount++ % 2 === 1 : false;
              return <TimelineRow key={i} row={row} flip={flip} />;
            })}
          </MindStateSection>
        ))}

        {/* Bottom spacer for mobile (clears the bottom nav bar) */}
        <div className="h-20 md:hidden" />
      </div>
    </section>
  );
}
