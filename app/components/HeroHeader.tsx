import React from 'react';
import { motion } from 'framer-motion';

export default function HeroHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex h-full items-center justify-center w-full"
    >
      <h1 className="text-6xl md:text-8xl font-bold text-center leading-tight">
        What can I do<br />for you?
      </h1>
    </motion.div>
  );
}