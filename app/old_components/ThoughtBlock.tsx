import React from "react";
import Image from "next/image";

interface ThoughtBlockProps {
  title?: string;
  note?: string;
  media?: {
    src: string;
    type: "image" | "video";
    caption?: string;
  };
  state: "unclear" | "constrained" | "demonstrated" | "repeated";
  align?: "left" | "center" | "right";
}

export const ThoughtBlock: React.FC<ThoughtBlockProps> = ({
  title,
  note,
  media,
  state,
  align = "left",
}) => {
  // Handwriting style varies by state
  // All line-heights use grid-unit for vertical rhythm
  const getHandwritingStyle = () => {
    switch (state) {
      case "unclear":
        return "text-gray-600 italic text-lg md:text-xl";
      case "constrained":
        return "text-gray-800 font-bold text-xl md:text-2xl tracking-tight";
      case "demonstrated":
        return "text-gray-700 text-lg md:text-xl";
      case "repeated":
        return "text-gray-500 text-base md:text-lg opacity-70";
      default:
        return "";
    }
  };

  return (
    /*
     * Vertical Rhythm:
     *   mb = 2 grid-units (5rem) — clear separation between blocks
     */
    <div
      className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start"}`}
      style={{ marginBottom: "calc(var(--grid-unit) * 2)" }}
    >
      {/* The Title — sits on the grid */}
      {title && (
        <h3
          className={`${state === "unclear" ? "text-2xl md:text-3xl text-gray-700 rotate-[-1deg]" : "text-3xl md:text-4xl text-gray-900"}`}
          style={{
            marginBottom: "var(--grid-unit)",
            lineHeight: "calc(var(--grid-unit) * 2)",
            marginTop: 0,
          }}
        >
          {title}
        </h3>
      )}

      {/* The Media - Clean, no effects, looks pasted in */}
      {media && (
        <div
          className={`
          relative overflow-hidden bg-gray-100 border border-gray-200
          ${state === "unclear" ? "rotate-1 opacity-90 grayscale-[20%]" : ""}
          ${state === "demonstrated" ? "shadow-sm" : ""}
          ${align === "center" ? "w-full max-w-2xl" : "w-full max-w-lg"}
        `}
          style={{ marginBottom: "var(--grid-unit)" }}
        >
          <div className="relative aspect-video w-full">
            {media.type === "image" ? (
              <Image
                src={media.src}
                alt={title || "Notebook entry"}
                fill
                className="object-cover"
              />
            ) : (
              <iframe
                src={media.src}
                className="w-full h-full"
                allowFullScreen
              />
            )}
          </div>
          {media.caption && (
            <div
              className="p-2 text-center text-sm text-gray-400 font-sans bg-white border-t border-gray-100"
              style={{ lineHeight: "var(--grid-unit)" }}
            >
              {media.caption}
            </div>
          )}
        </div>
      )}

      {/* The Handwritten Note */}
      {note && (
        <div
          className={`max-w-2xl ${getHandwritingStyle()}`}
          style={{ lineHeight: "var(--grid-unit)" }}
        >
          {note}
        </div>
      )}
    </div>
  );
};