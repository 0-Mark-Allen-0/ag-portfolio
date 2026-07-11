"use client";

import { useState, useEffect } from "react";

// ============================================================
//  CONFIGURATION
// ============================================================

//  Day image — wall gradient (left → center → right)
const DAY_IMG = "/desk_2_day.png";
const DAY_LEFT = "#ada69c";
const DAY_MID = "#b1ada8";
const DAY_RIGHT = "#a29788";

//  Night image — wall gradient (left → center → right)
const NIGHT_IMG = "/desk_2_dark.png";
const NIGHT_LEFT = "#5f4c27";
const NIGHT_MID = "#35272c";
const NIGHT_RIGHT = "#1f1729";

//  Dark mode threshold
const DARK_HOUR = 17;
const DARK_MINUTE = 30;

// ============================================================
//  LABEL PILL — shared dimensions for hover labels
// ============================================================

const PILL_W = 110;
const PILL_H = 32;

// ============================================================
//  IMAGE MAP
// ============================================================

type AreaShape = "polygon" | "rect";

type Area = {
  href: string;
  label: string;
  shape: AreaShape;
  // polygon only
  points?: string;
  // rect only
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  // label center
  labelX: number;
  labelY: number;
};

const AREAS: Area[] = [
  {
    href: "/",
    label: "Whiteboard",
    shape: "polygon",
    points: "293,43 768,43 771,330 295,326",
    labelX: 532,
    labelY: 195,
  },
  {
    href: "/journal",
    label: "Journal",
    shape: "polygon",
    points: "-3,411 113,422 113,769 0,766",
    labelX: 55,
    labelY: 590,
  },
  {
    href: "/contact",
    label: "Contact",
    shape: "polygon",
    points: "1669,204 1673,546 1800,548 1795,207",
    labelX: 1735,
    labelY: 375,
  },
  {
    href: "/resume",
    label: "Resume",
    shape: "rect",
    x: 412,
    y: 524,
    width: 325,
    height: 180,
    labelX: 574,
    labelY: 614,
  },
  {
    href: "/vr",
    label: "VR",
    shape: "rect",
    x: 1364,
    y: 504,
    width: 171,
    height: 136,
    labelX: 1449,
    labelY: 572,
  },
  {
    href: "/phone",
    label: "Phone",
    shape: "polygon",
    points: "474,833 583,804 683,811 581,846",
    labelX: 579,
    labelY: 825,
  },
  {
    href: "/media",
    label: "Media",
    shape: "rect",
    x: 1370,
    y: 131,
    width: 211,
    height: 297,
    labelX: 1475,
    labelY: 280,
  },
];

// ============================================================
//  MOBILE NAV LIST — derived from AREAS, but VR is dropped and
//  Media is expanded into its three v2 sub-routes
// ============================================================

const MOBILE_LINKS: { href: string; label: string }[] = [
  ...AREAS.filter((a) => a.label !== "VR" && a.label !== "Media").map(
    ({ href, label }) => ({ href, label })
  ),
  { href: "/media/games_v2", label: "Games" },
  { href: "/media/movies_v2", label: "Movies" },
  { href: "/media/series_v2", label: "Series" },
];

// ============================================================
//  HELPERS
// ============================================================

function checkIsDark(): boolean {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  return h > DARK_HOUR || (h === DARK_HOUR && m >= DARK_MINUTE);
}

// ============================================================
//  COMPONENT
// ============================================================

export default function DeskPage() {

  // Single check on mount — no interval, no reactivity after load
  const [isDark] = useState<boolean>(() => checkIsDark());

  // Preload the inactive image in the background after mount
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = isDark ? DAY_IMG : NIGHT_IMG;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [isDark]);

  // ── Derived values ──────────────────────────────────────────
  const imageSrc = isDark ? NIGHT_IMG : DAY_IMG;
  const imageAlt = isDark ? "Workstation Desk — Night" : "Workstation Desk — Day";
  const gradLeft = isDark ? NIGHT_LEFT : DAY_LEFT;
  const gradMid = isDark ? NIGHT_MID : DAY_MID;
  const gradRight = isDark ? NIGHT_RIGHT : DAY_RIGHT;

  return (
    <>

      {/* ══════════════════════════════════════════════════════════
        MOBILE VIEW — clean vertical card list (small screens only)
        ══════════════════════════════════════════════════════════ */}
      <main className="flex md:hidden flex-col min-h-screen bg-white text-black p-6 justify-between font-inter">

        {/* Header */}
        <header className="pt-4">
          <h1 className="text-2xl font-semibold tracking-tight">Portfolio Navigator</h1>
          <p className="mt-1 text-sm text-black/50">Pick a destination to explore!</p>
        </header>

        {/* Vertical card list */}
        <nav className="flex flex-col gap-3 py-8">
          {MOBILE_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="w-full rounded-xl border border-black/15 px-5 py-4 text-lg font-medium transition-colors active:bg-black/5 hover:bg-black/5"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Footer tip */}
        <footer className="pb-4 text-center">
          <p className="font-patrick text-base text-black/60">
            Tip: open the website on desktop for the full experience!
          </p>
        </footer>
      </main>

      {/* ══════════════════════════════════════════════════════════
        DESKTOP VIEW — interactive desk image-map (md and up)
        ══════════════════════════════════════════════════════════ */}
      <main
        className="hidden md:flex min-h-[100dvh] w-full items-center justify-center"
        style={{
          background: `linear-gradient(to right, ${gradLeft}, ${gradMid} 50%, ${gradRight})`,
        }}
      >

        {/* ── Fixed-ratio container — max 1920 px, never upscales ── */}
        <div
          className="relative w-full max-w-[1920px]"
          style={{ aspectRatio: "1920 / 1080" }}
        >

          {/* ── Desk image ── */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full block"
          />

          {/* ── SVG overlay — coordinate space matches image pixels ── */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            {AREAS.map(({ href, label, shape, points, x, y, width, height, labelX, labelY }) => (
              <a href={href} key={label}>
                <g className="group cursor-pointer">

                  {/* Highlight shape */}
                  {shape === "polygon" ? (
                    <polygon
                      points={points}
                      className="fill-transparent group-hover:fill-white/20 transition-all duration-200"
                    />
                  ) : (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      className="fill-transparent group-hover:fill-white/20 transition-all duration-200"
                    />
                  )}

                  {/* Label pill — dark frosted backing for legibility */}
                  <rect
                    x={labelX - PILL_W / 2}
                    y={labelY - PILL_H / 2}
                    width={PILL_W}
                    height={PILL_H}
                    rx="6"
                    className="fill-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  />

                  {/* Label text */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white opacity-0 group-hover:opacity-100 transition-all duration-200 select-none"
                    style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "0.05em" }}
                  >
                    {label}
                  </text>

                </g>
              </a>
            ))}
          </svg>

        </div>
      </main>
    </>
  );
}