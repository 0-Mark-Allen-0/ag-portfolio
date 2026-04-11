import React from "react";

interface SmartDateHeaderProps {
  dayName: string; // full day name, e.g. "Monday"
  dayNum: number;
  month: string; // full month name, e.g. "January"
  title?: string;
}

export default function SmartDateHeader({ dayName, dayNum, month, title }: SmartDateHeaderProps) {
  // Convert to 3-letter abbreviations
  const shortDay = dayName.slice(0, 3);
  const shortMonth = month.slice(0, 3);

  return (
    <div className="notebook-header-space relative w-full">
      {/* Red margin line */}
      <div
        className="absolute top-0 bottom-0 w-[2px]"
        style={{ left: "var(--margin-line-pos)", backgroundColor: "rgba(240,160,160,0.3)" }}
      />

      {/* Notebook title (right of margin line) */}
      {title && (
        <div
          className="absolute top-0 bottom-0 flex items-center"
          style={{ left: "calc(var(--margin-line-pos) + 1.25rem)", right: "11rem" }}
        >
          <h1
            className="truncate"
            style={{
              fontFamily: "Architects Daughter, cursive",
              fontSize: "clamp(1.1rem, 2.6vw, 3rem)",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
        </div>
      )}

      {/* Date content */}
      <div
        // Pinned to the right edge, centering vertically 
        className="absolute top-0 bottom-0 right-0 flex flex-col justify-center gap-1 items-end text-right"
        style={{ 
          // Tune this 2rem value up or down slightly if your notebook-header-space is exceptionally tall or short
          paddingRight: "2.5rem" 
        }}
      >
        {/* Row 1: Day number + short day name */}
        <div className="flex items-baseline gap-3">
          <span
            style={{
              fontFamily: "Georgia, Cambria, serif",
              fontSize: "clamp(1rem, 3vw, 1.8rem)",
              fontWeight: 700,
              color: "black",
              lineHeight: 1,
            }}
          >
            {dayNum}
          </span>
          <span
            style={{
              fontFamily: "Georgia, Cambria, serif",
              fontSize: "clamp(1rem, 3vw, 1.8rem)",
              fontWeight: 700,
              color: "black",
              lineHeight: 1,
            }}
          >
            {shortDay}
          </span>
        </div>

        {/* Row 2: short month */}
        <div className="flex items-baseline gap-2">
          <span
            style={{
              fontFamily: "Georgia, Cambria, serif",
              fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
              fontWeight: 400,
              color: "#4b5563",
              lineHeight: 1.2,
            }}
          >
            {shortMonth}
          </span>
        </div>
      </div>
    </div>
  );
}