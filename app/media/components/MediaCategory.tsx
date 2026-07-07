import React from 'react';
import { MediaCategory as MediaCategoryType } from '../types';
import MediaCard from './MediaCard';

interface MediaCategoryProps {
  category: MediaCategoryType;
}

export default function MediaCategory({ category }: MediaCategoryProps) {
  // Determine volume number based on category index or ID
  const volumeNumber = {
    'games': '01',
    'movies': '02',
    'series': '03'
  }[category.id] || '01';

  return (
    <div className="bg-[#fdfdfd] border-b-4 border-r-4 border-ink/10 shadow-[20px_20px_60px_rgba(0,0,0,0.05)] p-8 md:p-12 mb-20 relative rounded-sm group/cat">
      <div className={`absolute -top-3 -left-3 w-16 h-8 bg-pastel-blue/60 -rotate-45 shadow-sm hidden md:block`} />
      <div className={`absolute -top-3 -right-3 w-16 h-8 bg-pastel-blue/60 rotate-45 shadow-sm hidden md:block`} />

      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-4">
        <h2 className="text-4xl md:text-5xl font-display text-ink decoration-pastel-pink decoration-4 underline underline-offset-8">
          {category.title}
        </h2>
        <span className="font-body text-ink/40 text-lg md:text-xl font-medium uppercase tracking-[0.2em]">
          Volume {volumeNumber}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-16 gap-x-8 md:gap-x-12">
        {category.media.map((item, idx) => (
          <div
            key={item.id}
            className="transition-transform duration-500 hover:z-30"
            style={{
              transform: `translateY(${idx % 2 === 0 ? '15px' : '-15px'})`
            }}
          >
            <MediaCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
