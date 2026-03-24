import React from 'react';
import { motion } from 'framer-motion';

export default function HeroHeader() {
  return (
    <motion.div
      className="flex h-full items-center justify-center w-full"
    >
      <h1 className="text-6xl md:text-8xl font-bold text-center leading-tight">
        What can I do<br />for you?
      </h1>
    </motion.div>
  );
}