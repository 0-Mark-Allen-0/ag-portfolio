import React from 'react';

interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export default function SplitLayout({ leftContent, rightContent }: SplitLayoutProps) {
  return (
    <div className="relative z-20 grid min-h-screen grid-cols-1 lg:grid-cols-10">
      
      {/* LEFT PANEL (70%) - Changed from col-span-6 to col-span-7 */}
      <div 
        className="col-span-1 lg:col-span-7 flex flex-col pt-[var(--header-space)] pl-[calc(var(--margin-line-pos)+2rem)] pr-8 pb-12"
      >
        {leftContent}
      </div>
      
      {/* RIGHT PANEL (30%) - Changed from col-span-4 to col-span-3 */}
      <div 
        className="col-span-1 lg:col-span-3 flex flex-col relative pt-[var(--header-space)] px-8 pb-12"
      >
        {rightContent}
      </div>

    </div>
  );
}