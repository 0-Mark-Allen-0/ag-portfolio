import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { ProjectData } from './PolaroidCard';

interface ExpandedPolaroidProps {
  project: ProjectData;
  onClose: () => void;
}

export default function ExpandedPolaroid({ project, onClose }: ExpandedPolaroidProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      
      {/* 2. Backdrop Blur - Darkened */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
      />

      {/* Expanded Card Container */}
      <div className="relative w-full max-w-[450px] pointer-events-auto px-4 z-10">
        <motion.div
          // layoutId={`polaroid-container-${project.id}`}
          // 1 & 5. Removed shadow-2xl and the inline background grain style
          className="w-full bg-[#fdfdfc] p-6 border border-gray-200 rounded-sm flex flex-col relative"
        >

          {/* 6. Image - Reverse Bleed-Through Effect */}
          <motion.img 
            // layoutId={`polaroid-image-${project.id}`}
            src={project.imageUrl}
            alt={project.title}
            initial={{ opacity: 0.1 }} 
            animate={{opacity: 0.10 }}
            style={{ scaleX: -1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full aspect-[4/3] object-cover bg-gray-200 mb-6 mt-2 pointer-events-none" 
          />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-0 right-0 z-20 text-gray-500 hover:text-black transition-colors rounded-full p-1"
          >
            <X size={24} />
          </button>
          
          {/* 3. Title removed to reserve space exclusively for the description */}

          {/* Description */}
          <motion.p 
            className="text-xl text-gray-700 leading-relaxed mb-8 flex-grow text-center mt-2"
          >
            {project.description}
          </motion.p>

          {/* 4. Action Button - Redesigned with animated underline */}
          <motion.div
            className="flex justify-center"
          >
            <Link 
              href={project.link}
              className="group relative inline-block text-2xl font-bold text-black pb-1"
            >
              View Full Project
              {/* Animated Underline */}
              <span className="absolute left-0 bottom-0 w-full h-[3px] bg-black scale-x-0 group-hover:scale-x-100 origin-left rounded-full" />
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}