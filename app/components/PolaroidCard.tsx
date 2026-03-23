import React from 'react';
import { motion } from 'framer-motion';

export interface ProjectData {
  id: string;
  title: string;
  rotation: string;
  description: string;
  link: string;
  tags: string[];          // NEW: Array of domains this project belongs to
  importance: 1 | 2 | 3;   // NEW: 1 is highest priority
}

interface PolaroidCardProps {
  project: ProjectData;
  onClick: (project: ProjectData) => void;
}

export default function PolaroidCard({ project, onClick }: PolaroidCardProps) {
  return (
    <motion.div 
      layoutId={`polaroid-container-${project.id}`}
      onClick={() => onClick(project)}
      whileHover={{ scale: 1.05, rotate: 0 }}
      className={`bg-white p-4 pb-8 shadow-xl border border-gray-200 rounded-sm flex flex-col transform ${project.rotation} cursor-pointer w-full max-w-[280px] mx-auto origin-center`}
    >
      <motion.div 
        layoutId={`polaroid-image-${project.id}`}
        className="w-full aspect-square bg-gray-200 mb-4 border border-gray-100 shadow-inner" 
      />
      <motion.h3 
        layoutId={`polaroid-title-${project.id}`}
        className="text-2xl text-center text-black font-bold mt-2"
      >
        {project.title}
      </motion.h3>
    </motion.div>
  );
}