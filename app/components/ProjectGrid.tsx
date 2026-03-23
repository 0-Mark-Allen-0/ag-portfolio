import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PolaroidCard, { ProjectData } from './PolaroidCard';
import ExpandedPolaroid from './ExpandedPolaroid';

// DUMMY DATA: Added a few more to test the pagination properly
const PROJECTS: ProjectData[] = [
  { id: "alpha", title: "Project Alpha", rotation: "-rotate-2", description: "Interactive fluid dynamics.", link: "/alpha", tags: ["Simulations", "Web Development"], importance: 1 },
  { id: "beta", title: "Project Beta", rotation: "rotate-3", description: "Brand identity rollout.", link: "/beta", tags: ["Graphic Design", "Marketing"], importance: 1 },
  { id: "gamma", title: "Project Gamma", rotation: "-rotate-1", description: "3D browser environment.", link: "/gamma", tags: ["Simulations", "Game Design"], importance: 2 },
  { id: "delta", title: "Project Delta", rotation: "rotate-2", description: "E-commerce platform redesign.", link: "/delta", tags: ["Web Development", "Marketing"], importance: 2 },
  { id: "epsilon", title: "Project Epsilon", rotation: "-rotate-3", description: "Indie game prototype.", link: "/epsilon", tags: ["Game Design"], importance: 3 },
  { id: "zeta", title: "Project Zeta", rotation: "rotate-1", description: "SEO optimization campaign.", link: "/zeta", tags: ["Marketing"], importance: 3 },
  { id: "eta", title: "Project Eta", rotation: "-rotate-2", description: "Logo pack and typography.", link: "/eta", tags: ["Graphic Design"], importance: 2 },
];

interface ProjectGridProps {
  selectedDomains: string[];
}

// Framer Motion variants for the page turning effect
const pageTurnVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    rotateY: 0,
    transition: {
      x: { type: "spring", stiffness: 600, damping: 40 },
      opacity: { duration: 0.15 },
      rotateY: { duration: 0.2 }
    }
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 150 : -150,
      opacity: 0,
      rotateY: direction < 0 ? 15 : -15,
      transition: {
        x: { type: "spring", stiffness: 600, damping: 40 },
        opacity: { duration: 0.15 }
      }
    };
  }
};

export default function ProjectGrid({ selectedDomains }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  
  // Track current page and the direction of the turn (1 for next, -1 for prev)
  const [[page, direction], setPage] = useState([0, 0]);

  // Reset to the first page whenever the user changes their domain filters
  useEffect(() => {
    setPage([0, 0]);
  }, [selectedDomains]);

  // 1. FILTER & SORT LOGIC
  const filteredProjects = useMemo(() => {
    let filtered = PROJECTS;
    if (selectedDomains.length > 0) {
      filtered = PROJECTS.filter(project => 
        project.tags.some(tag => selectedDomains.includes(tag))
      );
    }
    return filtered.sort((a, b) => a.importance - b.importance);
  }, [selectedDomains]);

  // 2. PAGINATION CALCULATIONS
  const PROJECTS_PER_PAGE = 3;
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    page * PROJECTS_PER_PAGE, 
    (page + 1) * PROJECTS_PER_PAGE
  );

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="flex flex-col h-full items-center justify-center w-full relative z-10">
        
        {/* The Grid Container - Fixed height to prevent layout jumps during page turns */}
        <div className="relative w-full max-w-5xl px-4 min-h-[400px] flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={pageTurnVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center absolute"
              style={{ perspective: "1000px" }}
            >
              {paginatedProjects.map((project) => (
                <PolaroidCard 
                  key={project.id} 
                  project={project} 
                  onClick={(p) => setSelectedProject(p)} 
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls - Handwritten style */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex items-center gap-8 text-2xl text-gray-500 select-none"
          >
            <button
              onClick={() => paginate(-1)}
              disabled={page === 0}
              className={`transition-colors duration-200 ${page === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-black cursor-pointer'}`}
            >
              ←
            </button>
            
            <span className="text-xl text-gray-400 border-b-2 border-gray-300 pb-1">
              {page + 1} / {totalPages}
            </span>

            <button
              onClick={() => paginate(1)}
              disabled={page === totalPages - 1}
              className={`transition-colors duration-200 ${page === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-black cursor-pointer'}`}
            >
              →
            </button>
          </motion.div>
        )}
      </div>

      {/* =========================================
          MODAL: EXPANDED POLAROID (Direct view, no flip)
          ========================================= */}
      <AnimatePresence>
        {selectedProject && (
          <ExpandedPolaroid 
            key="expanded-polaroid"
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}