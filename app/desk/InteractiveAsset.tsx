"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { THEME_FADE_MS, type HoverEffect, type SceneItem } from "./sceneConfig";

// ============================================================
//  INTERACTIVE ASSET
// ============================================================
//  Renders a single scene item from config:
//    - sprite  : day + night layers stacked and crossfaded
//    - hitbox  : an invisible clickable region over the base
//  The `visible` prop fades an item in/out (used by the monitor-b
//  power overlay) and disables its clicks while hidden.
//
//  Hover feel (all disabled under prefers-reduced-motion):
//    - "lift"   : object rises straight up (vertical only).
//    - "scale"  : object grows to SCALE_TO.
//    - "rotate" : object pivots from its top and tips right
//                 (used by the hanging ID card).
//    - "none"   : no hover animation.
// ============================================================

// ============================================================
//  ANIMATION TUNING — edit these to change the feel
// ============================================================
//  Spring controls the "physical" bounce/speed of every hover.
//  Higher stiffness = snappier; higher damping = less bounce.
const SPRING = { type: "spring", stiffness: 260, damping: 20, mass: 0.6 } as const;

const LIFT_Y = -11; //  px the "lift" items rise on hover (more negative = higher)
const SCALE_TO = 1.03; //  the "scale" items grow to this (1.05 = 105%)
const ROTATE_DEG = -4; //  degrees the ID card tips right on hover (+ = clockwise)

//  Per-effect hover variants.
function hoverVariants(effect: HoverEffect, reduce: boolean): Variants {
  if (reduce || effect === "none") return { rest: {}, hover: {}, tap: {} };

  if (effect === "scale") {
    return {
      rest: { scale: 1 },
      hover: { scale: SCALE_TO },
      tap: { scale: 1 + (SCALE_TO - 1) * 0.5 },
    };
  }

  if (effect === "rotate") {
    return {
      rest: { rotate: 0 },
      hover: { rotate: ROTATE_DEG },
      tap: { rotate: ROTATE_DEG * 0.5 },
    };
  }

  //  "lift" — vertical only, no scale.
  return {
    rest: { y: 0 },
    hover: { y: LIFT_Y },
    tap: { y: LIFT_Y * 0.4 },
  };
}

//  Anchor point each effect animates around.
function originFor(effect: HoverEffect): string {
  if (effect === "rotate") return "top center"; // pivot from the hanger
  if (effect === "lift") return "bottom center"; // hinge off the surface
  return "center"; // scale grows evenly
}

//  Renders one day/night layer as an <img>, or as a looping muted
//  <video> when the source is a .webm/.mp4 (e.g. the monitor-b screen).
//  `flow` = true means the layer sits in normal flow and defines the
//  wrapper's height; the other layer is absolutely stacked on top.
function MediaLayer({
  src,
  flow = false,
  opacity,
  fade,
}: {
  src?: string;
  flow?: boolean;
  opacity: number;
  fade: string;
}) {
  const className = flow
    ? "block h-auto w-full select-none align-top"
    : "absolute inset-0 block h-full w-full select-none";
  const style: CSSProperties = { opacity, transition: fade };

  if (src && /\.(webm|mp4)$/i.test(src)) {
    return (
      <video
        src={src}
        className={className}
        style={style}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        //  Belt-and-braces seamless loop in case a browser stalls the
        //  native `loop` at the boundary.
        onEnded={(e) => {
          const v = e.currentTarget;
          v.currentTime = 0;
          void v.play();
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      draggable={false}
      className={className}
      style={style}
    />
  );
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
  const animated = effect !== "none" && !reduce;
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

  const motionState = {
    initial: "rest",
    animate: "rest",
    whileHover: "hover",
    whileFocus: "hover",
    whileTap: "tap",
  } as const;

  // ── Sprite (has images/video) ────────────────────────────
  if (item.kind === "sprite") {
    const sprite = (
      <>
        {/* Day layer is in normal flow — it defines the box height. */}
        <MediaLayer src={item.dayImage} flow opacity={isNight ? 0 : 1} fade={fade} />
        {/* Night layer overlays it. */}
        <MediaLayer src={item.nightImage} opacity={isNight ? 1 : 0} fade={fade} />
        {calibrate && <CalibrateLabel item={item} />}
      </>
    );

    const animStyle: CSSProperties = {
      ...posStyle,
      ...visStyle,
      transformOrigin: originFor(effect),
    };

    //  Clickable sprite.
    if (interactive) {
      return (
        <motion.button
          type="button"
          aria-label={item.label}
          onClick={onActivate}
          className={`absolute block cursor-pointer border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80 ${outline}`}
          style={animStyle}
          variants={hoverVariants(effect, reduce)}
          transition={SPRING}
          {...motionState}
        >
          {sprite}
        </motion.button>
      );
    }

    //  Decorative sprite (e.g. static monitor). Still animates on hover
    //  if it has an effect, but is not clickable.
    return (
      <motion.div
        aria-hidden
        className={`absolute leading-none ${animated ? "" : "pointer-events-none"} ${outline}`}
        style={animStyle}
        variants={hoverVariants(effect, reduce)}
        transition={SPRING}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        {sprite}
      </motion.div>
    );
  }

  // ── Hitbox (invisible clickable region, no hover visual) ──
  return (
    <button
      type="button"
      aria-label={item.label}
      onClick={onActivate}
      className={`absolute cursor-pointer bg-transparent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80 ${outline}`}
      style={{ ...posStyle, ...visStyle }}
    >
      {calibrate && <CalibrateLabel item={item} />}
    </button>
  );
}
