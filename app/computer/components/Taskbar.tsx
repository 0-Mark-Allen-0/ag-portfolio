"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/lib/cn";

// ============================================================
//  TASKBAR — Start button, active task, and a live clock.
// ============================================================
//  Start toggles a tiny menu whose only item ("Return to Desk")
//  fires a callback — the desktop owns what that does.
// ============================================================

export interface TaskbarProps {
  activeTask: string;
  onReturnToDesk: () => void;
}

function useClock(): string {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Taskbar({ activeTask, onReturnToDesk }: TaskbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const clock = useClock();

  return (
    <div className="w95-raised absolute inset-x-0 bottom-0 z-[1000] flex h-9 items-center gap-1 px-1">
      {/* Start */}
      <div className="relative">
        <button
          type="button"
          data-pressed={menuOpen}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="w95-btn flex h-7 items-center gap-1 px-2 text-sm font-bold text-black"
        >
          <span
            aria-hidden
            className="grid h-4 w-4 place-items-center bg-[#000080] text-[10px] text-white"
          >
            ▘
          </span>
          Start
        </button>

        {menuOpen && (
          <>
            {/* click-away layer */}
            <div
              className="fixed inset-0 z-[1000]"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <div
              role="menu"
              className="w95-raised absolute bottom-8 left-0 z-[1001] w-44 p-0.5"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onReturnToDesk();
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white focus:outline-none"
              >
                Return to Desk…
              </button>
            </div>
          </>
        )}
      </div>

      {/* Active task — fixed, narrow width (not full-width) */}
      <div className="w95-raised flex h-7 w-40 min-w-0 items-center px-2">
        <span className={cn("truncate text-sm text-black")} title={activeTask}>
          {activeTask}
        </span>
      </div>

      {/* Spacer pushes the clock tray to the far right */}
      <div className="flex-1" />

      {/* Clock tray */}
      <div className="w95-sunken hidden h-7 items-center px-3 text-sm text-black sm:flex">
        <time>{clock}</time>
      </div>
    </div>
  );
}
