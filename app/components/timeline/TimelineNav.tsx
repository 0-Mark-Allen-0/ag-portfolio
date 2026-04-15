"use client";

/**
 * TimelineNav — the navigation chrome for the timeline section.
 *
 * Extracted from LegacyContinuation.tsx.
 * Renders two independent navs that are shown/hidden via CSS:
 *   • Desktop: a fixed left sidebar of vertical tabs
 *   • Mobile:  a fixed bottom bar of horizontal tabs
 *
 * Both are hidden until isVisible becomes true (controlled by the
 * IntersectionObserver in useActiveSection).
 */

import React from "react";
import { cn } from "../../lib/cn";
import { TabDivider } from "./TabDivider";
import type { TimelineEntry } from "../../hooks/useActiveSection";

interface TimelineNavProps {
  sections:       TimelineEntry[];
  activeId:       string;
  isVisible:      boolean;
  onSectionClick: (id: string) => void;
}

export default function TimelineNav({
  sections,
  activeId,
  isVisible,
  onSectionClick,
}: TimelineNavProps) {
  return (
    <>
      {/* ── Desktop: fixed left sidebar ── */}
      <nav
        className={cn(
          "fixed left-0 top-0 h-full z-50",
          isVisible ? "hidden md:block" : "hidden"
        )}
        aria-label="Timeline navigation"
      >
        {sections.map((s, idx) => (
          <TabDivider
            key={s.id}
            index={idx}
            label={s.label}
            stage={s.stage}
            isActive={activeId === s.id}
            onClick={() => onSectionClick(s.id)}
          />
        ))}
      </nav>

      {/* ── Mobile: fixed bottom bar ── */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "md:hidden isolate overflow-hidden",
          "bg-page border-t border-gray-200",
          "shadow-[0_-4px_20px_rgba(0,0,0,0.05)]",
          isVisible ? "flex" : "hidden"
        )}
        aria-label="Timeline navigation"
      >
        {sections.map((s, idx) => (
          <TabDivider
            key={s.id}
            index={idx}
            label={s.label}
            stage={s.stage}
            isActive={activeId === s.id}
            onClick={() => onSectionClick(s.id)}
          />
        ))}
      </nav>
    </>
  );
}
