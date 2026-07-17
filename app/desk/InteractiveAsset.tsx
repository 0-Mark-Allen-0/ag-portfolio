"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  THEME_FADE_MS,
  type HoverEffect,
  type SceneItem,
  type ScreenOverlay,
} from "./sceneConfig";

// ============================================================
//  INTERACTIVE ASSET
// ============================================================
//  Renders a single scene item from config:
//    - sprite  : day + night layers stacked and crossfaded
//    - hitbox  : an invisible clickable region over the base
//  A sprite may also carry "powered on" layers (onDayImage /
//  onNightImage) and a `screen` video, both shown only while
//  `computerOn`. Items marked `requiresComputerOn` go inert — no
//  click, no hover — while the computer is off.
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

//  Renders one day/night layer as an <img>.
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

//  The looping video that plays inside the powered-on render's media
//  window. Positioned in % of the SPRITE box (not the scene) and
//  rendered inside the sprite wrapper, so the hover transform scales
//  the monitor and the video as one unit.
//
//  Muted + playsInline are what let `autoPlay` survive browser
//  autoplay policies; the video is silent by design.
function ScreenLayer({
  screen,
  playing,
  fade,
}: {
  screen: ScreenOverlay;
  playing: boolean;
  fade: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  //  Stay mounted while the computer is off (so the fade has something
  //  to animate) but pause, so a hidden screen costs no decoding.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) {
      void v.play().catch(() => {
        /* autoplay may reject until a user gesture — harmless here */
      });
    } else {
      v.pause();
    }
  }, [playing]);

  return (
    <video
      ref={ref}
      src={screen.src}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="pointer-events-none absolute block select-none object-cover"
      style={{
        left: `${screen.left}%`,
        top: `${screen.top}%`,
        width: `${screen.width}%`,
        height: `${screen.height}%`,
        opacity: playing ? 1 : 0,
        transition: fade,
      }}
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
  computerOn,
  onActivate,
}: {
  item: SceneItem;
  isNight: boolean;
  calibrate: boolean;
  computerOn: boolean;
  onActivate: () => void;
}) {
  const reduce = useReducedMotion() ?? false;

  //  A `requiresComputerOn` item is inert while the computer is off:
  //  not clickable, and no hover animation to imply that it is.
  const powered = !item.requiresComputerOn || computerOn;
  const interactive = !!item.action && powered;
  const effect = powered ? item.hover ?? "none" : "none";
  const animated = effect !== "none" && !reduce;
  const fade = `opacity ${THEME_FADE_MS}ms ease`;

  const posStyle: CSSProperties = {
    left: `${item.left}%`,
    top: `${item.top}%`,
    width: `${item.width}%`,
    height: item.height !== undefined ? `${item.height}%` : undefined,
    zIndex: item.zIndex,
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
        {/* Powered-on render, covering the dark monitor while on. */}
        {item.onDayImage && (
          <MediaLayer
            src={item.onDayImage}
            opacity={computerOn && !isNight ? 1 : 0}
            fade={fade}
          />
        )}
        {item.onNightImage && (
          <MediaLayer
            src={item.onNightImage}
            opacity={computerOn && isNight ? 1 : 0}
            fade={fade}
          />
        )}
        {/* Video sits above the on render, inside its media window. */}
        {item.screen && (
          <ScreenLayer screen={item.screen} playing={computerOn} fade={fade} />
        )}
        {/* Hover tooltip — a small bubble above the sprite. Revealed via
            the wrapper's `group` :hover, so it works even under
            prefers-reduced-motion (no framer transform involved). */}
        {item.tooltip && (
          <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-sky-100 px-3 py-1.5 font-patrick text-base leading-none text-black opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
            {item.tooltip}
          </span>
        )}
        {calibrate && <CalibrateLabel item={item} />}
      </>
    );

    const animStyle: CSSProperties = {
      ...posStyle,
      transformOrigin: originFor(effect),
    };

    //  Clickable sprite.
    if (interactive) {
      return (
        <motion.button
          type="button"
          aria-label={item.label}
          onClick={onActivate}
          className={`group absolute block cursor-pointer border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80 ${outline}`}
          style={animStyle}
          variants={hoverVariants(effect, reduce)}
          transition={SPRING}
          {...motionState}
        >
          {sprite}
        </motion.button>
      );
    }

    //  Non-clickable sprite — either purely decorative, or an item
    //  whose computer is currently off. Still animates on hover if it
    //  has an effect.
    return (
      <motion.div
        aria-hidden
        className={`group absolute leading-none ${animated ? "" : "pointer-events-none"} ${outline}`}
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
      style={posStyle}
    >
      {calibrate && <CalibrateLabel item={item} />}
    </button>
  );
}
