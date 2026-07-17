// components/timeline/MindStateSection.tsx
import React from "react";
import { SectionHeader } from "./SectionHeader";
import { NOTEBOOK_CSS } from "../../context/NotebookContext";

interface MindStateSectionProps {
  id: string;
  /** Badge above the title (e.g. "Chapter 1"). */
  stage: string;
  /** Era title (e.g. "2019–2020"). */
  subtitle: string;
  /** Italic one-liner under the title. */
  description: string;
  /** Single-word growth marker in the decorative side rail. */
  stateLabel?: string;
  /** Italic tone line in the decorative side rail. */
  tone?: string;
  children: React.ReactNode;
}

export const MindStateSection: React.FC<MindStateSectionProps> = ({
  id,
  stage,
  subtitle,
  description,
  stateLabel,
  tone,
  children,
}) => {
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
      {(stateLabel || tone) && (
        <div className="absolute right-4 md:right-6 xl:right-12 top-24 hidden lg:block opacity-85 pointer-events-none text-right max-w-[220px]">
          <div className="text-xs font-patrick uppercase tracking-widest text-gray-400 mb-2">
            State
          </div>
          {stateLabel && (
            <div className="text-3xl text-gray-600 font-architect mb-3">
              {stateLabel}
            </div>
          )}
          {tone && (
            <div className="text-base italic text-gray-400 font-patrick leading-relaxed">
              {tone}
            </div>
          )}
        </div>
      )}

      <div className="max-w-4xl xl:max-w-5xl mx-auto">
        <SectionHeader stage={stage} subtitle={subtitle} description={description} />
        <div className="flex flex-col gap-14 md:gap-20">{children}</div>
      </div>
    </section>
  );
};
