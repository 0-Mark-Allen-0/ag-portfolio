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
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
      />

      {/* Card Container */}
      <div className="relative w-full max-w-[450px] pointer-events-auto px-4 z-10">
        <motion.div
          className="w-full bg-[#fdfdfc] p-6 border border-gray-200 rounded-sm relative overflow-hidden"
        >

          {/* Polaroid Image (STRUCTURAL, not background) */}
          <motion.img 
            src={project.imageUrl}
            alt={project.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            style={{ scaleX: -1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full aspect-square object-cover bg-gray-200 mb-20 mt-2 pointer-events-none"
          />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-0 right-0 z-30 text-gray-500 hover:text-black transition-colors rounded-full p-1"
          >
            <X size={24} />
          </button>

          {/* OVERLAY CONTENT (this is the key change) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-10">

            {/* Description */}
            <motion.p 
              className="text-lg text-gray-800 leading-relaxed mb-8"
            >
              {project.description}
            </motion.p>

            {/* Button */}
            <motion.div className="flex justify-center">
              <Link 
                href={project.link}
                className="group relative inline-block text-2xl font-bold text-black pb-1"
              >
                View Full Project
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </Link>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}