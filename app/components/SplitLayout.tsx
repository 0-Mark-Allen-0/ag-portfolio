import React from 'react';

interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export default function SplitLayout({ leftContent, rightContent }: SplitLayoutProps) {
  return (
    <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-10">
      
      {/* LEFT PANEL */}
      <div 
        className="
          col-span-1 lg:col-span-7 
          flex flex-col 
          justify-start   
          pt-[calc(var(--header-space)+4rem)]
          pl-[calc(var(--margin-line-pos)+2rem)] 
          pr-8 pb-12
        "
      >
        {leftContent}
      </div>
      
      {/* RIGHT PANEL */}
      <div 
        className="
          fixed bottom-4 left-[calc(var(--margin-line-pos)+1rem)] right-4 
          z-30
          flex justify-center pointer-events-none 
          
          lg:pointer-events-auto lg:static lg:col-span-3 
          lg:flex lg:flex-col lg:justify-start 
          lg:pt-[calc(var(--header-space)+4rem)]
          lg:px-8 lg:pb-12
          lg:bottom-auto lg:left-auto lg:right-auto lg:z-auto
        "
      >
        <div className="pointer-events-auto w-full max-w-sm">
          {rightContent}
        </div>
      </div>

    </div>
  );
}