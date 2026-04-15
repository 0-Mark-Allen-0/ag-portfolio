// components/timeline/MindStateSection.tsx
import React from "react";
import { SectionHeader } from "./SectionHeader";
import { NOTEBOOK_CSS } from "../../context/NotebookContext";

interface MindStateSectionProps {
  state: "curious" | "focused" | "capable" | "reliable" | "master";
  children: React.ReactNode;
  id: string;
}

const stateMetadata = {
  curious: {
    stage: "Stage 1",
    subtitle: "2018",
    description: "Raw exploration, many interests, no filter.",
    tone: "The beginning. Everything is interesting.",
  },
  focused: {
    stage: "Stage 2",
    subtitle: "2018–20",
    description: "Learning to choose, first constraints, discipline.",
    tone: "Decisions emerge from noise.",
  },
  capable: {
    stage: "Stage 3",
    subtitle: "2021-22",
    description: "Proven delivery, confident execution.",
    tone: "Ideas become legible to others.",
  },
  reliable: {
    stage: "Stage 4",
    subtitle: "2023",
    description: "Systematized success, trusted pattern.",
    tone: "This wasn't luck. This is how I work.",
  },
  master: {
    stage: "Stage 5",
    subtitle: "2024-25",
    description: "Refined expertise, intuitive understanding.",
    tone: "This is who I am.",
  },
};

export const MindStateSection: React.FC<MindStateSectionProps> = ({
  state,
  children,
  id,
}) => {
  const meta = stateMetadata[state];

  return (
    <section
      id={id}
      className="
        relative
        pr-4 md:px-10 xl:px-12
        py-14 md:py-20
        shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.04)]
        last:shadow-none
      "
      style={{
        /*
         * Left padding respects the margin line using the NOTEBOOK_CSS
         * constant — same pattern established in SplitLayout.tsx in Phase 2.
         */
        paddingLeft: `calc(${NOTEBOOK_CSS.marginLine} + 1.5rem)`,
      }}
    >
      {/* Decorative tone marker — visible only on large screens */}
      <div className="absolute right-0 top-24 hidden lg:block opacity-85 pointer-events-none text-right max-w-[220px]">
        <div className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-2">
          State
        </div>
        <div className="text-3xl text-gray-600 font-display mb-3">
          {state}
        </div>
        <div className="text-base italic text-gray-400 font-body leading-relaxed">
          {meta.tone}
        </div>
      </div>

      <div className="max-w-4xl xl:max-w-5xl mx-auto">
        <SectionHeader
          stage={meta.stage}
          subtitle={meta.subtitle}
          description={meta.description}
        />
        <div className="flex flex-col gap-10 md:gap-16">{children}</div>
      </div>
    </section>
  );
};
