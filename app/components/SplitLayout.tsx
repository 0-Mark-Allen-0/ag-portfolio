import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export default function SplitLayout({ leftContent, rightContent }: SplitLayoutProps) {
  return (
    <div className="w-full h-[100dvh] p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center bg-body-bg">

      {/* Whiteboard Frame */}
      <div
        className="
          w-full h-full max-w-[1400px]
          p-[8px] sm:p-[12px]
          rounded-[1.5rem] md:rounded-[2rem]
          bg-slate-500/80
          shadow-[0_35px_60px_-10px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.2)]
          ring-8 ring-slate-400
        "
      >
        {/* Whiteboard Surface */}
        <div
          className="
            w-full h-full 
            bg-page rounded-xl md:rounded-[1.25rem]
            shadow-[inset_0_3px_20px_rgba(0,0,0,0.08),0_0_0_2px_rgba(255,255,255,0.7)]
            overflow-hidden
            flex flex-col
          "
        >

          {/* Main Content Grid */}
          <div
            className="
              flex-1
              grid grid-cols-1 lg:grid-cols-10
            "
          >
            {/* ── LEFT PANEL ── */}
            <div
              className="
                col-span-1 lg:col-span-7
                flex flex-col justify-start
                h-full overflow-y-auto
                p-6 sm:p-8 lg:p-12
              "
            >
              <div className="w-full h-full max-w-3xl">
                {leftContent}
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div
              className="
                col-span-1 lg:col-span-3
                flex items-center justify-center lg:justify-start
                h-full overflow-y-auto
                p-6 sm:p-8 lg:p-12
              "
            >
              <div className="w-full max-w-sm">
                {rightContent}
              </div>
            </div>
          </div>

          {/* Bottom Link INSIDE whiteboard */}
          <div className="mt-auto flex justify-center pb-4 sm:pb-6">
            <Link
              href="/desk"
              className="flex flex-col items-center gap-1 text-ink text-sm sm:text-base font-semibold text-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
            >
              <span>Hey, wanna explore more? Click here!</span>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}