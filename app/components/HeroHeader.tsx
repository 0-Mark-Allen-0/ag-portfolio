import React from 'react';
import { motion } from 'framer-motion';

export default function HeroHeader() {
  return (
    <motion.div
      className="
        flex w-full 
        items-start justify-center   // ✅ TOP align instead of center
      "
    >
      <h1 className="text-6xl md:text-8xl font-bold text-center leading-tight">
        What can I do<br />for you?
      </h1>
    </motion.div>
  );
}