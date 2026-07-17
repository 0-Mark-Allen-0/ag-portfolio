"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FUTURE_PROJECTS,
  FutureProject,
  FutureProjectBlock,
} from "./futureProjectsData";

function Block({ block }: { block: FutureProjectBlock }) {
  if (block.type === "list") {
    return (
      <ul className="list-disc pl-5 space-y-1.5 text-ink/80 leading-relaxed">
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p className="text-ink/80 leading-relaxed">{block.text}</p>;
}

function FutureProjectModal({
  project,
  onClose,
}: {
  project: FutureProject | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="future-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4"
          style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
        >
          <motion.div
            key="future-modal-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="font-inter relative flex w-[min(92vw,640px)] max-h-[85vh] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-ink shadow-2xl"
          >
            <style>{`
              .future-modal-scroll { -ms-overflow-style: none; scrollbar-width: none; }
              .future-modal-scroll::-webkit-scrollbar { display: none; }
            `}</style>
            <div className="future-modal-scroll overflow-y-auto p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-4 pr-8">
                {project.title}
              </h2>
              <div className="space-y-4 text-base">
                {project.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function FutureProjectsPage() {
  const [selected, setSelected] = useState<FutureProject | null>(null);

  return (
    <main className="font-inter min-h-screen w-full bg-white text-ink py-12 md:py-20 px-4 md:px-8 relative">
      <a
        href="/desk"
        className="absolute top-4 left-4 md:top-6 md:left-8 z-50 text-sm font-medium text-ink/70 hover:text-ink transition-colors border-b-2"
      >
        Go to Desk
      </a>

      <div className="max-w-6xl mx-auto">
        <header className="mb-8 mt-6 md:mt-2">
          <h1 className="text-3xl md:text-4xl text-ink font-semibold">
            Future Projects
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Ideas I haven’t built yet, but fully intend to. Tap a card to read more.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FUTURE_PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className="group block text-left bg-white rounded-xl border border-gray-200 p-5 cursor-pointer"
            >
              <h2 className="text-lg font-medium text-ink group-hover:text-ink">
                {project.title}
              </h2>
            </button>
          ))}
        </div>
      </div>

      <FutureProjectModal project={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
