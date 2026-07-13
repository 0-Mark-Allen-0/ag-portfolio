"use client";

import { useId, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/app/lib/cn";

// ============================================================
//  WINDOW — the single reusable Win95 window chrome.
// ============================================================
//  One implementation, driven entirely by props. It knows nothing
//  about projects, dialogs, or routes — callers compose it.
//
//  Layout modes:
//    floating (desktop) — absolutely positioned, optionally
//      draggable within `dragConstraints`, sized in px.
//    stacked (mobile)   — normal flow, full-width, never draggable.
// ============================================================

/** Floating window placement. Values may be px numbers OR CSS strings
 *  (e.g. "40%"), so positions scale with the desktop and are easy to
 *  tweak from the layout config. */
export interface WindowFrame {
  left: number | string;
  top: number | string;
  width: number | string;
  /** Omit for content-sized height (used by the confirm dialog). */
  height?: number | string;
}

export interface WindowProps {
  title: string;
  children: ReactNode;
  /** floating = absolute + draggable; stacked = in-flow card. */
  layout?: "floating" | "stacked";
  /** Floating-only: top-left corner + size within the desktop. */
  frame?: WindowFrame;
  draggable?: boolean;
  /** Constrains dragging (usually the desktop surface ref). */
  dragConstraints?: React.RefObject<HTMLElement | null>;
  /** Renders a titlebar [X]; omit for a window with no close box. */
  onClose?: () => void;
  /** Extra titlebar controls, left of the close box. */
  controls?: ReactNode;
  /** Raised so a just-focused window sits above its siblings. */
  zIndex?: number;
  onFocus?: () => void;
  className?: string;
  contentClassName?: string;
  /** Accessible name for the region; defaults to `title`. */
  ariaLabel?: string;
}

export default function Window({
  title,
  children,
  layout = "floating",
  frame,
  draggable = false,
  dragConstraints,
  onClose,
  controls,
  zIndex,
  onFocus,
  className,
  contentClassName,
  ariaLabel,
}: WindowProps) {
  const reduceMotion = useReducedMotion();
  const dragControlsAvailable =
    layout === "floating" && draggable && !reduceMotion;
  const titleId = useId();

  const floating = layout === "floating";

  return (
    <motion.section
      aria-labelledby={titleId}
      aria-label={ariaLabel}
      onPointerDownCapture={onFocus}
      // Boot-in: subtle scale + fade, eased. Honoured only when motion is allowed.
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      drag={dragControlsAvailable}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      dragElastic={0}
      style={
        floating
          ? {
              position: "absolute",
              left: frame?.left,
              top: frame?.top,
              width: frame?.width,
              height: frame?.height,
              zIndex,
            }
          : undefined
      }
      className={cn(
        "w95-raised flex flex-col p-[3px] select-none",
        floating ? "" : "w-full",
        className,
      )}
    >
      {/* Titlebar */}
      <header
        className={cn(
          "w95-titlebar flex items-center justify-between px-1.5 py-0.5 text-sm",
          dragControlsAvailable && "cursor-grab active:cursor-grabbing",
        )}
      >
        <h2 id={titleId} className="truncate pr-2 leading-tight">
          {title}
        </h2>
        <div className="flex items-center gap-0.5">
          {controls}
          {onClose && (
            <button
              type="button"
              aria-label={`Close ${title}`}
              onClick={onClose}
              className="w95-btn grid h-4 w-4 place-items-center text-[11px] font-bold leading-none text-black"
            >
              <span aria-hidden>×</span>
            </button>
          )}
        </div>
      </header>

      {/* Body */}
      <div className={cn("min-h-0 flex-1", contentClassName)}>{children}</div>
    </motion.section>
  );
}
