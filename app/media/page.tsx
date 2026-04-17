"use client";

import React from 'react';
import NotebookPage from '../components/NotebookPage';
import MediaCategory from './components/MediaCategory';
import { MEDIA_CATEGORIES } from './mediaData';
import { motion } from 'framer-motion';

export default function MediaPage() {
  return (
    <main className="min-h-screen w-full bg-body-bg md:py-12 md:px-12 flex items-center justify-center">
      <NotebookPage
        title="My Favourite Media"
        dayName="Friday"
        dayNum={17}
        month="April"
        className="max-w-7xl mx-auto shadow-2xl relative"
      >
        <div className="pt-32 md:pt-40 pl-8 md:pl-[calc(var(--margin-line-pos)+3rem)] pr-6 md:pr-12 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xl md:text-2xl text-ink/80 mb-12 max-w-3xl leading-relaxed">
              Beyond design and code, I find immense inspiration in storytelling and world-building across different mediums.
              These are the titles that have moved me, challenged my perspectives, or simply provided an unforgettable experience.
            </p>
          </motion.div>

          <div className="space-y-32">
            {MEDIA_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <MediaCategory category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </NotebookPage>
    </main>
  );
}
