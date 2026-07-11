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
          relative
          w-full h-full max-w-[1400px]
          p-[8px] sm:p-[12px]
          rounded-[1.5rem] md:rounded-[2rem]
          bg-slate-500/80
          shadow-[0_35px_60px_-10px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.2)]
          
        "
      >
        {/* Corner brackets — thicker/darker border on the frame corners only */}
        <div className="pointer-events-none absolute inset-0 z-30">
          <span className="absolute top-0 left-0 w-10 h-10 border-t-[12px] border-l-[12px] border-slate-800 rounded-tl-[1.5rem] md:rounded-tl-[2rem]" />
          <span className="absolute top-0 right-0 w-10 h-10 border-t-[12px] border-r-[12px] border-slate-800 rounded-tr-[1.5rem] md:rounded-tr-[2rem]" />
          <span className="absolute bottom-0 left-0 w-10 h-10 border-b-[12px] border-l-[12px] border-slate-800 rounded-bl-[1.5rem] md:rounded-bl-[2rem]" />
          <span className="absolute bottom-0 right-0 w-10 h-10 border-b-[12px] border-r-[12px] border-slate-800 rounded-br-[1.5rem] md:rounded-br-[2rem]" />
        </div>

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
              flex-1 min-h-0
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
              <div className="w-full h-full max-w-3xl lg:mx-auto lg:flex lg:flex-col lg:justify-center">
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
          <div className="mt-auto shrink-0 flex justify-center pb-4 sm:pb-6">
            <Link
              href="/desk"
              className="flex flex-col items-center gap-1 text-ink text-sm sm:text-lg font-semibold text-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity focus:outline-none font-patrick"
            >
              <span>Hey, wanna explore more? Click here!</span>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}