"use client";

import { useEffect, useState } from "react";

/**
 * useMediaQuery — subscribe to a CSS media query from React.
 *
 * SSR-safe: returns `false` until the client has mounted so the server
 * and first client render agree (avoids hydration mismatch). Callers that
 * need a desktop/mobile split should treat the first paint as "mobile"
 * and let it upgrade on mount.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
