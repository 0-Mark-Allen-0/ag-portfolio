import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import PolaroidCard, { ProjectData } from './PolaroidCard';
import ExpandedPolaroid from './ExpandedPolaroid';
import { PROJECTS } from "./projectsData";

interface ProjectGridProps {
  selectedDomains: string[];
}

export default function ProjectGrid({ selectedDomains }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = useMemo(() => {
    let filtered = PROJECTS;
    if (selectedDomains.length > 0) {
      filtered = PROJECTS.filter(project =>
        project.tags.some(tag => selectedDomains.includes(tag))
      );
    }
    return filtered.sort((a, b) => a.importance - b.importance);
  }, [selectedDomains]);

  const [stack, setStack] = useState<ProjectData[]>(filteredProjects);

  useEffect(() => {
    setStack(filteredProjects);
  }, [filteredProjects]);

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

  const visibleMobileStack = stack.slice(0, 3);
  const topDesktopProjects = filteredProjects.slice(0, 3);

  return (
    <>
      <div className="  flex flex-col items-center justify-start w-full relative z-10">

        <h2 className="w-full max-w-5xl px-4 text-left text-xl md:text-4xl font-bold md:mb-8">
            Here's how I can help you
        </h2>

        <div className="relative w-full max-w-5xl px-4 flex items-center justify-center">

          {/* DESKTOP */}
          <motion.div className="hidden md:grid grid-cols-3 gap-8 w-full">
            {topDesktopProjects.map(project => (
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
                    key={`mobile-${project.id}-${index}`} // ✅ FIXED KEY
                    project={project}
                    onClick={(p) => isTop && setSelectedProject(p)}
                    isDraggable={isTop}
                    isStacked
                    onDragEnd={isTop ? handleDragEnd : undefined}
                    zIndex={3 - index}
                    initial={{ scale: 0.8, y: 40 }}
                    animate={{
                      x: 0, // ✅ RESET POSITION

                      scale: 1 - index * 0.05,
                      y: index * 20,
                    }}
                    exit={{

                      scale: 0.5,
                      x: 0, // ✅ ENSURE RESET
                      transition: { duration: 0.2 },
                    }}
                  />
                );
              })}
            </AnimatePresence>
          </div>

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