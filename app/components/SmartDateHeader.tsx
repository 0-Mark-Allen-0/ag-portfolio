/**
 * SmartDateHeader — the visual content of the notebook header band.
 *
 * Previously this component applied .notebook-header-space itself
 * (position: absolute, full width, fixed height).  That ownership
 * has moved to NotebookPage, which renders .notebook-header-space as
 * the container and places SmartDateHeader inside it.
 *
 * This component is now pure content:
 *   - fills its parent with h-full w-full
 *   - positions the title and date stamp via absolute within that parent
 *   - does NOT render a margin line (NotebookPage draws the full-height one)
 */

"use client";

import React, { useEffect, useState } from "react";
import { NOTEBOOK_CSS } from "../context/NotebookContext";

interface SmartDateHeaderProps {
  dayName?: string; // full day name, e.g. "Monday" — overrides today
  dayNum?: number;  // overrides today
  month?: string;   // full month name, e.g. "January" — overrides today
  title?: string;
}

export default function SmartDateHeader({ dayName, dayNum, month, title }: SmartDateHeaderProps) {
  /*
   * Dynamic "today". Computed after mount (not during render) so the
   * server-rendered markup and the first client render agree — reading
   * `new Date()` during render would produce a hydration mismatch whenever
   * the server and client differ in timezone or straddle midnight.
   * Any explicitly-passed prop still wins over the derived value.
   */
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const resolvedDayName =
    dayName ?? today?.toLocaleDateString("en-US", { weekday: "long" }) ?? "";
  const resolvedMonth =
    month ?? today?.toLocaleDateString("en-US", { month: "long" }) ?? "";
  const resolvedDayNum = dayNum ?? today?.getDate();

  const shortDay = resolvedDayName.slice(0, 3);
  const shortMonth = resolvedMonth.slice(0, 3);

  return (
    /*
     * position:relative so our absolute children are contained here.
     * h-full fills the .notebook-header-space parent given to us by NotebookPage.
     * pointer-events-none lets the margin line below sit above on its z-index.
     */
    <div className="relative w-full h-full pointer-events-none">

      {/* Notebook title — right of the margin line */}
      {title && (
        <div
          className="absolute top-0 bottom-0 flex items-center pointer-events-auto"
          style={{
            left: `calc(${NOTEBOOK_CSS.marginLine} + 1.25rem)`,
            right: "11rem",
          }}
        >
          <h1 className="truncate font-serif font-bold text-gray-900 text-[clamp(1.1rem,2.6vw,3rem)] leading-[1.1]">
            {title}
          </h1>
        </div>
      )}

      {/* Date stamp — pinned to the right edge, vertically centred */}
      <div className="absolute top-0 bottom-0 right-0 flex flex-col justify-center items-end gap-1 pr-10 pointer-events-auto">

        {/* Row 1: day number + short day name */}
        <div className="flex items-baseline gap-3">
          <span className="font-serif font-bold text-black text-[clamp(1rem,3vw,1.8rem)] leading-none">
            {resolvedDayNum}
          </span>
          <span className="font-serif font-bold text-black text-[clamp(1rem,3vw,1.8rem)] leading-none">
            {shortDay}
          </span>
        </div>

        {/* Row 2: short month */}
        <span className="font-serif text-gray-500 text-[clamp(1rem,2.5vw,1.6rem)] leading-[1.2]">
          {shortMonth}
        </span>

      </div>
    </div>
  );
}