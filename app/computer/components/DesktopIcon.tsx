"use client";

import { cn } from "@/app/lib/cn";

// ============================================================
//  DESKTOP ICON — reusable, behaviour-agnostic.
// ============================================================
//  Holds an image + label and fires a callback. It carries no
//  routing or app-open logic; the desktop wires that per icon.
//  Activates on double-click (mouse) OR Enter/Space (keyboard),
//  matching real desktop affordances while staying accessible.
// ============================================================

export interface DesktopIconProps {
  label: string;
  icon: string;
  onOpen: () => void;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export default function DesktopIcon({
  label,
  icon,
  onOpen,
  selected,
  onSelect,
  className,
}: DesktopIconProps) {
  return (
    <button
      type="button"
      data-selected={selected ? "true" : "false"}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={cn(
        "w95-icon group flex w-20 flex-col items-center gap-1 bg-transparent p-1 focus:outline-none",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        aria-hidden
        draggable={false}
        className="h-10 w-10 object-contain [image-rendering:pixelated]"
      />
      <span className="w95-icon-label px-1 text-center text-xs leading-tight">
        {label}
      </span>
    </button>
  );
}
