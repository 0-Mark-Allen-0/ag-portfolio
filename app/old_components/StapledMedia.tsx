// components/StapledMedia.tsx
import React from "react";
import Image from "next/image";

interface StapledMediaProps {
  src: string;
  alt: string;
  type?: "image" | "video";
}

export const StapledMedia: React.FC<StapledMediaProps> = ({
  src,
  alt,
  type = "image",
}) => {
  return (
    <div
      className="relative w-full bg-white/50 shadow-sm rotate-1 transform transition-transform hover:rotate-0 duration-300"
      style={{ padding: "var(--half-unit)" }}
    >
      {/* The Staples */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-4 bg-gray-400 rounded-sm shadow-inner z-20 opacity-80" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-600 rounded-sm z-20" />
      {/* The Media Content */}
      <div className="relative w-full aspect-video overflow-hidden border border-gray-300 bg-gray-100">
        {type === "image" ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover filter sepia-[.2] contrast-90"
          />
        ) : (
          <iframe
            src={src}
            title={alt}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};