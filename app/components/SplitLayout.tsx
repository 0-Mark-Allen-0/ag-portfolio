import React from 'react';

interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export default function SplitLayout({ leftContent, rightContent }: SplitLayoutProps) {
  return (
    <div className="split-paper">
      <div className="relative z-10 grid grid-cols-1 grid-rows-[minmax(0,1fr)_auto] lg:grid-cols-10 lg:grid-rows-1 h-full min-h-full items-stretch">
        
        {/* LEFT PANEL */}
        <div 
          className="
            col-span-1 lg:col-span-7 
            flex flex-col 
            justify-start
            h-full
            pt-6 lg:pt-8
            pl-6 lg:pl-[calc(var(--margin-line-pos)+2rem)]
            pr-6 lg:pr-8
            pb-6
          "
        >
          <div className="w-full h-full max-w-sm lg:max-w-[var(--right-panel-width)]">
            {leftContent}
          </div>
        </div>
        
        {/* RIGHT PANEL */}
        <div 
          className="
            col-span-1 lg:col-span-3
            flex items-center justify-center lg:justify-start
            h-full
            py-6 lg:py-8
            px-6 lg:px-6
          "
        >
          <div className="w-full max-w-sm">
            {rightContent}
          </div>
        </div>

      </div>
    </div>
  );
}