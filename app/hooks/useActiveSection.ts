import { useEffect, useState } from "react";

export interface TimelineEntry {
  id: string;
  label: string;
  stage: string;
}

export function useActiveSection(sections: TimelineEntry[]) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  /* ── Active section: track 45%-from-top intersection on scroll ── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (
          el &&
          el.offsetTop <= scrollPos &&
          el.offsetTop + el.offsetHeight > scrollPos
        ) {
          setActiveId(sections[i].id);
          break; // stop at the first match — sections don't overlap
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return { activeId, isVisible: true };
}
