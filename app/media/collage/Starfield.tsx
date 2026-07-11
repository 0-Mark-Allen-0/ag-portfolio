"use client";

import React, { useMemo } from "react";

/** Deterministic PRNG so star positions match on server + client (no hydration drift). */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Sparse, extremely subtle starfield used only by the Series page. Ambient
 * texture — not a "space website". Positions are generated once from a fixed
 * seed so they are stable across renders.
 */
export default function Starfield({ color }: { color: string }) {
  const stars = useMemo(() => {
    const rnd = mulberry32(20260711);
    return Array.from({ length: 70 }, () => ({
      left: rnd() * 100,
      top: rnd() * 100,
      size: rnd() < 0.82 ? 1 : 2,
      opacity: 0.1 + rnd() * 0.35,
    }));
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            backgroundColor: color,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
