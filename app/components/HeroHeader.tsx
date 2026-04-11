import React from 'react';
import { motion } from 'framer-motion';

export default function HeroHeader() {
  return (
    <motion.div
      className="
        flex w-full h-full
        items-center justify-center
      "
    >
      <h1 className="text-6xl md:text-8xl font-bold text-center leading-tight">
        How can <br /> I help  you?
      </h1>
    </motion.div>
  );
}