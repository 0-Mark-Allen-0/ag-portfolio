"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// ============================================================
//  DIALOGUE BOX — RPG text panel.
// ============================================================
//  Shows the selected artwork's title + line. Animates whenever
//  the text changes (keyed on `id`): a small fade + slide, in the
//  spirit of a dialogue advancing.
// ============================================================

export interface DialogueBoxProps {
  id: string;
  title: string;
  text: string;
}

export default function DialogueBox({ id, title, text }: DialogueBoxProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <p className="text-xl uppercase tracking-wide text-[#f4933b] sm:text-2xl">
            {title}
          </p>
          <p className="mt-1 text-lg leading-snug text-orange-50 sm:text-2xl">
            {text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
