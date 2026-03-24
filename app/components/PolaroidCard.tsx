import React from 'react';
import { motion, PanInfo } from 'framer-motion';

export interface ProjectData {
  id: string;
  title: string;
  rotation: string;
  description: string;
  link: string;
  tags: string[];
  importance: 1 | 2 | 3;
  imageUrl: string;
}

interface PolaroidCardProps {
  project: ProjectData;
  onClick: (project: ProjectData) => void;
  isDraggable?: boolean;
  isStacked?: boolean;
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  animate?: any;
  initial?: any;
  exit?: any;
  zIndex?: number;
}

export default function PolaroidCard({
  project,
  onClick,
  isDraggable = false,
  isStacked = false,
  onDragEnd,
  animate,
  initial,
  exit,
  zIndex
}: PolaroidCardProps) {

  return (
    <motion.div
      layout
      onClick={() => onClick(project)}
      drag={isDraggable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      dragSnapToOrigin
      onDragEnd={onDragEnd}
      initial={initial}
      animate={animate}
      exit={exit}
      style={{ zIndex }}
      whileHover={!isDraggable ? { scale: 1.05, rotate: 0 } : {}}
      whileTap={isDraggable ? { cursor: "grabbing" } : {}}
      className={`bg-white p-4 pb-8 border border-gray-200 flex flex-col 
        w-full max-w-[280px] aspect-[3/4]
        overflow-hidden   /* prevents content from expanding card */
        transform ${project.rotation} mx-auto origin-center 
        shadow-[0_2px_4px_rgba(0,0,0,0.4),0_6px_8px_rgba(0,0,0,0.35)] 
        transition-shadow duration-200 
        hover:shadow-[0_4px_8px_rgba(0,0,0,0.25),0_8px_12px_rgba(0,0,0,0.15)]
        ${isStacked ? 'absolute' : 'relative'}
        ${isDraggable ? 'cursor-grab' : 'cursor-pointer'}
      `}
    >
      
      {/* Image section (fixed square) */}
      <motion.img
        src={project.imageUrl}
        alt={project.title}
        className="w-full aspect-square object-cover mb-4 border border-gray-100 shadow-inner bg-gray-200 pointer-events-none"
      />

      {/* Title container with fixed behavior */}
      <div className="w-full flex justify-center px-2">
        <h3
          className="
            text-xl md:text-xl 
            text-center text-black font-bold 
            leading-snug
            pointer-events-none
            line-clamp-2 lg:line-clamp-3
            flex items-center justify-center
          "
        >
          {project.title}
        </h3>
      </div>

    </motion.div>
  );
}