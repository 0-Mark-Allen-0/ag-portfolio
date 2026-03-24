import React from 'react';
import { motion } from 'framer-motion';

export interface ProjectData {
  id: string;
  title: string;
  rotation: string;
  description: string;
  link: string;
  tags: string[];          
  importance: 1 | 2 | 3;  
  imageUrl: string;        // NEW: Image property
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
      className={`bg-white p-4 pb-8 border border-gray-200 flex flex-col transform ${project.rotation} cursor-pointer w-full max-w-[280px] mx-auto origin-center shadow-[0_8px_10px_rgba(0,0,0,0.25),0_10px_20px_rgba(0,0,0,0.15)] transition-shadow duration-300 hover:shadow-[0_15px_20px_rgba(0,0,0,0.3),0_20px_30px_rgba(0,0,0,0.2)]`}
    >
      {/* Changed to motion.img with object-cover so images fit perfectly in the square */}
      <motion.img 
        layoutId={`polaroid-image-${project.id}`}
        src={project.imageUrl}
        alt={project.title}
        className="w-full aspect-square object-cover mb-4 border border-gray-100 shadow-inner bg-gray-200" 
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