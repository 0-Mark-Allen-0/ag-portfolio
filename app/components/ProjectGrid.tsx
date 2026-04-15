import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PolaroidCard, { ProjectData } from './PolaroidCard';
import ExpandedPolaroid from './ExpandedPolaroid';
import { PROJECTS, NEED_TAGS, CONTEXT_TAGS, PLATFORM_TAGS } from "./projectsData";

interface ProjectGridProps {
  selectedDomains: string[];
}

export default function ProjectGrid({ selectedDomains }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProjects = useMemo(() => {
    let filtered = PROJECTS;
    
    if (selectedDomains.length > 0) {
      const selectedNeeds = selectedDomains.filter(tag => NEED_TAGS.includes(tag));
      const selectedContexts = selectedDomains.filter(tag => CONTEXT_TAGS.includes(tag));
      const selectedPlatforms = selectedDomains.filter(tag => PLATFORM_TAGS.includes(tag));

      filtered = PROJECTS.filter(project => {
        const matchesNeed = selectedNeeds.length === 0 || 
                            selectedNeeds.some(tag => project.tags.includes(tag));
                            
        const matchesContext = selectedContexts.length === 0 || 
                               selectedContexts.some(tag => project.tags.includes(tag));
                               
        const matchesPlatform = selectedPlatforms.length === 0 || 
                                selectedPlatforms.some(tag => project.tags.includes(tag));

        return matchesNeed && matchesContext && matchesPlatform;
      });
    }
    
    return filtered.sort((a, b) => a.importance - b.importance);
  }, [selectedDomains]);

  const totalPages = Math.ceil(filteredProjects.length / 3);

  // ✅ Reset page when filters change
  useEffect(() => {
    setStack(filteredProjects);
  }, [filteredProjects]);

  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(
      currentPage * 3,
      currentPage * 3 + 3
    );
  }, [filteredProjects, currentPage]);

  // ---------------- MOBILE STACK ----------------
  const [stack, setStack] = useState<ProjectData[]>(filteredProjects);

  useEffect(() => {
    setStack(paginatedProjects);
  }, [paginatedProjects]);

  const SWIPE_THRESHOLD = 80;

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      setStack(prev => {
        const newStack = [...prev];
        const first = newStack.shift();
        if (first) newStack.push(first);
        return newStack;
      });
    }
  };

  const visibleMobileStack = stack;

  // ---------------- NAVIGATION ----------------
  const goNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start w-full relative z-10 mt-8 md:mt-0">

        <h2 className="w-full max-w-5xl px-4 text-left text-xl md:text-4xl font-bold font-display md:mb-8">
          Here's how I can help you
        </h2>

        <div className="relative w-full max-w-5xl px-4 flex flex-col items-center">

          {/* DESKTOP GRID */}
          <motion.div className="hidden md:grid grid-cols-3 gap-8 w-full">
            {paginatedProjects.map(project => (
              <PolaroidCard
                key={`desktop-${project.id}`}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </motion.div>

          {/* MOBILE STACK */}
          <div className="flex md:hidden relative w-full h-[420px] items-center justify-center mt-4">
            <AnimatePresence mode="popLayout">
              {visibleMobileStack.map((project, index) => {
                const isTop = index === 0;

                return (
                  <PolaroidCard
                    key={`mobile-${project.id}-${index}`}
                    project={project}
                    onClick={(p) => isTop && setSelectedProject(p)}
                    isDraggable={isTop}
                    isStacked
                    onDragEnd={isTop ? handleDragEnd : undefined}
                    zIndex={3 - index}
                    initial={{ scale: 0.8, y: 40 }}
                    animate={{
                      x: 0,
                      scale: 1 - index * 0.05,
                      y: index * 20,
                    }}
                    exit={{
                      scale: 0.5,
                      x: 0,
                      transition: { duration: 0.2 },
                    }}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {/* NAVIGATION (Desktop + Mobile) */}
          {totalPages > 1 && (
            <div className="hidden md:flex items-center justify-between w-full mt-6 max-w-5xl px-4">

              {/* LEFT */}
              {currentPage > 0 ? (
                <button
                  onClick={goPrev}
                  className="p-2 opacity-80 hover:opacity-100"
                >
                  <ArrowLeft size={22} />
                </button>
              ) : (
                <div />
              )}

              {/* RIGHT */}
              {currentPage < totalPages - 1 ? (
                <button
                  onClick={goNext}
                  className="p-2 opacity-80 hover:opacity-100 ml-auto"
                >
                  <ArrowRight size={22} />
                </button>
              ) : (
                <div />
              )}

            </div>
          )}

        </div>
      </div>

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