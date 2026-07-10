import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Link from 'next/link';
import { ProjectData } from './PolaroidCard';

interface ExpandedPolaroidProps {
  project: ProjectData;
  onClose: () => void;
}

export default function ExpandedPolaroid({ project, onClose }: ExpandedPolaroidProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Prevent scrolling on the body while the modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">

      {/* Backdrop - No animations, instant render */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
      />

      {/* Card Container - No animations, instant render */}
      <div className="relative w-full max-w-[450px] pointer-events-auto px-4 z-10">
        <div className="w-full bg-[#fdfdfc] p-6 border border-gray-200 rounded-sm relative overflow-hidden">

          {/* Polaroid Image */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full aspect-square object-cover bg-gray-200 mb-20 mt-2 pointer-events-none -scale-x-100 opacity-[0.08]"
          />

          {/* Close Button */}
          {/* <button
            onClick={onClose}
            className="absolute top-0 right-0 z-30 text-gray-500 hover:text-black transition-colors rounded-full p-1"
          >
            <X size={24} />
          </button> */}

          {/* OVERLAY CONTENT */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-10">

            {/* Synopsis */}
            <p className="text-xl text-ink leading-relaxed mb-8 font-['Patrick_Hand']">
              {project.synopsis}
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <Link
                href={`/projects/${project.id}`}
                className="group relative inline-block text-3xl font-bold text-ink pb-1 font-['Patrick_Hand']"
              >
                View Full Project
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}