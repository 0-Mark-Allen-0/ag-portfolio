"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { THEME_FADE_MS, type HoverEffect, type SceneItem } from "./sceneConfig";

// ============================================================
//  INTERACTIVE ASSET
// ============================================================
//  Renders a single scene item from config:
//    - sprite  : day + night images stacked and crossfaded
//    - hitbox  : an invisible clickable region over the base
//  Decorative sprites (no `action`) let clicks pass through. The
//  `visible` prop fades an item in/out (used by the monitor-b power
//  overlay) and disables its clicks while hidden, without unmounting.
//
//  Hover feel (all disabled under prefers-reduced-motion):
//    - "lift"  : object rises + scales slightly (for pick-up-able
//                things: headset, phone, ID card, resume, journal).
//    - "glow"  : object radiates light around its silhouette (for
//                fixed things: posters, whiteboard, shelves, monitor).
//    - hitbox "glow": a soft halo radiates from the region's edges,
//                so the baked-in object (lamp, power button, speaker)
//                appears to glow — with no visible rectangle.
// ============================================================

//  Physical, springy feel for lift (200–600ms range).
const SPRING = { type: "spring", stiffness: 260, damping: 20, mass: 0.6 } as const;
const GLOW_TWEEN = { duration: 0.3, ease: "easeOut" } as const;

// ============================================================
//  GLOW TUNING — edit these to change glow intensity
// ============================================================
//  Faint golden glow around FIXED sprites (whiteboard, posters,
//  shelves, monitor). It is two stacked drop-shadows: a tight inner
//  one and a wider outer one. The last number in each rgba(...) is
//  the strength (0 = invisible, 1 = maximum). Raise them to make the
//  glow stronger, lower them to make it fainter. The px value is how
//  far each layer spreads.
const SPRITE_GLOW_OFF =
  "drop-shadow(0 0 0 rgba(255,240,205,0)) drop-shadow(0 0 0 rgba(255,214,150,0))";
const SPRITE_GLOW_ON =
  "drop-shadow(0 0 5px rgba(255,240,205,0.20)) drop-shadow(0 0 12px rgba(255,214,150,0.11))";

//  Soft glow behind the speaker / power-button hitboxes.
const HITBOX_GLOW_BLUR = 34; // px — how far the glow spreads outward
const HITBOX_GLOW_SPREAD = 0; // px — extra size before the blur starts
const HITBOX_GLOW_ALPHA = 0.4; // 0–1 — brightness at full hover

//  Transform/filter variants for image sprites.
function spriteVariants(effect: HoverEffect, reduce: boolean): Variants {
  if (reduce || effect === "none") {
    return { rest: {}, hover: {}, tap: {} };
  }

  if (effect === "glow") {
    //  Alpha-aware drop-shadow follows the object's silhouette, so a
    //  transparent PNG glows around its actual edges (no box).
    return {
      rest: { filter: SPRITE_GLOW_OFF },
      hover: { filter: SPRITE_GLOW_ON },
      tap: { filter: SPRITE_GLOW_ON },
    };
  }

  if (effect === "scale") {
    return { rest: { scale: 1 }, hover: { scale: 1.05 }, tap: { scale: 0.98 } };
  }

  //  "lift" — no shadow (removed per request), just rise + scale.
  return {
    rest: { y: 0, scale: 1 },
    hover: { y: -6, scale: 1.03 },
    tap: { y: -2, scale: 1.0 },
  };
}

//  Glow colour (RGB triplet) per hitbox.
function glowRgb(id: string): string {
  if (id === "speaker") return "120, 210, 230"; // cyan
  return "150, 190, 255"; // cool (power button + default)
}

function CalibrateLabel({ item }: { item: SceneItem }) {
  return (
    <span className="pointer-events-none absolute left-0 top-0 z-10 -translate-y-full whitespace-nowrap bg-fuchsia-600 px-1.5 py-0.5 text-[11px] font-semibold leading-tight text-white">
      {item.id}{" "}
      <span className="font-normal opacity-80">
        L{item.left} T{item.top} W{item.width} H
        {item.height ?? "auto"}
      </span>
    </span>
  );
}

export default function InteractiveAsset({
  item,
  isNight,
  calibrate,
  visible = true,
  onActivate,
}: {
  item: SceneItem;
  isNight: boolean;
  calibrate: boolean;
  visible?: boolean;
  onActivate: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const interactive = !!item.action;
  const effect = item.hover ?? "none";
  const fade = `opacity ${THEME_FADE_MS}ms ease`;

  const posStyle: CSSProperties = {
    left: `${item.left}%`,
    top: `${item.top}%`,
    width: `${item.width}%`,
    height: item.height !== undefined ? `${item.height}%` : undefined,
    zIndex: item.zIndex,
  };

  //  Fade + click-gating driven by `visible`.
  const visStyle: CSSProperties = {
    opacity: visible ? 1 : 0,
    transition: fade,
    pointerEvents: visible ? undefined : "none",
  };

  const outline = calibrate ? "outline outline-2 outline-fuchsia-500" : "";

  //  Shared Framer Motion props for interactive elements.
  const motionState = {
    initial: "rest",
    animate: "rest",
    whileHover: "hover",
    whileFocus: "hover",
    whileTap: "tap",
  } as const;

  // ── Sprite (has images) ──────────────────────────────────
  if (item.kind === "sprite") {
    const sprite = (
      <>
        {/* Day image is in normal flow — it defines the box height. */}
        <img
          src={item.dayImage}
          alt=""
          draggable={false}
          className="block h-auto w-full select-none align-top"
          style={{ opacity: isNight ? 0 : 1, transition: fade }}
        />
        {/* Night image overlays it. */}
        <img
          src={item.nightImage}
          alt=""
          draggable={false}
          className="absolute inset-0 block h-full w-full select-none"
          style={{ opacity: isNight ? 1 : 0, transition: fade }}
        />
        {calibrate && <CalibrateLabel item={item} />}
      </>
    );

    if (interactive) {
      return (
        <motion.button
          type="button"
          aria-label={item.label}
          onClick={onActivate}
          className={`absolute block cursor-pointer border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80 ${outline}`}
          style={{
            ...posStyle,
            ...visStyle,
            transformOrigin: effect === "lift" ? "bottom center" : "center",
          }}
          variants={spriteVariants(effect, reduce)}
          transition={effect === "glow" ? GLOW_TWEEN : SPRING}
          {...motionState}
        >
          {sprite}
        </motion.button>
      );
    }

    //  Decorative sprite (e.g. static monitor). `visible` fades it.
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute leading-none ${outline}`}
        style={{ ...posStyle, ...visStyle }}
      >
        {sprite}
      </div>
    );
  }

  // ── Hitbox (invisible clickable region) ──────────────────
  return (
    <motion.button
      type="button"
      aria-label={item.label}
      onClick={onActivate}
      className={`absolute cursor-pointer bg-transparent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80 ${outline}`}
      style={{ ...posStyle, ...visStyle }}
      {...motionState}
    >
      {effect === "glow" && !reduce && !calibrate && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg"
          //  Soft rounded-rectangle halo (no fill, no hard border) that
          //  radiates outward from the region's edges.
          style={{
            boxShadow: `0 0 ${HITBOX_GLOW_BLUR}px ${HITBOX_GLOW_SPREAD}px rgba(${glowRgb(
              item.id
            )}, ${HITBOX_GLOW_ALPHA})`,
          }}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={GLOW_TWEEN}
        />
      )}
      {calibrate && <CalibrateLabel item={item} />}
    </motion.button>
  );
}
