"use client";

import { useEffect, useState } from "react";

// ============================================================
//  useRandomPortrait — the ONE place portrait selection lives.
// ============================================================
//  Given a portrait pool and a changing `key` (the artwork id),
//  returns a single portrait chosen at random. The pick is
//  re-rolled only when the selection changes, so re-renders don't
//  reshuffle the face mid-view. Keeping this isolated means the
//  "pick a random portrait" rule is never duplicated.
//
//  The roll lives in an effect on purpose: choosing a random
//  face is a side effect keyed to external selection state, not a
//  value derivable during render. First paint is deterministic
//  (index 0) to keep SSR and the client's initial render in sync.
// ============================================================

function pick(pool: string[]): string {
  if (pool.length === 0) return "";
  return pool[Math.floor(Math.random() * pool.length)];
}

export function useRandomPortrait(pool: string[], key: string): string {
  const [portrait, setPortrait] = useState(pool[0] ?? "");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: re-roll a random portrait whenever the selected artwork changes.
    setPortrait(pick(pool));
  }, [pool, key]);

  return portrait;
}
