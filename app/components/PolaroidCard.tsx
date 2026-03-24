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
      // layoutId={`polaroid-container-${project.id}`}
      onClick={() => onClick(project)}
      whileHover={{ scale: 1.05, rotate: 0 }}
      className={`bg-white p-4 pb-8 border border-gray-200 flex flex-col transform ${project.rotation} cursor-pointer w-full max-w-[280px] mx-auto origin-center 
                  shadow-[0_2px_4px_rgba(0,0,0,0.4),0_6px_8px_rgba(0,0,0,0.35)] 
                  transition-shadow duration-200 
                  hover:shadow-[0_3px_6px_rgba(0,0,0,0.45),0_8px_12px_rgba(0,0,0,0.4)]`
                }
      >
      {/* Changed to motion.img with object-cover so images fit perfectly in the square */}
      <motion.img 
        // layoutId={`polaroid-image-${project.id}`}
        src={project.imageUrl}
        alt={project.title}
        className="w-full aspect-square object-cover mb-4 border border-gray-100 shadow-inner bg-gray-200" 
      />
      
      <motion.h3 
        // layoutId={`polaroid-title-${project.id}`}
        className="text-2xl text-center text-black font-bold mt-2"
      >
        {project.title}
      </motion.h3>
    </motion.div>
  );
}