import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PolaroidCard, { ProjectData } from './PolaroidCard';
import ExpandedPolaroid from './ExpandedPolaroid';

const PROJECTS: ProjectData[] = [
  { 
    id: "aquaflow", 
    title: "AquaFlow Dynamics", 
    rotation: "-rotate-2", 
    description: "An interactive web simulation exploring fluid dynamics and particle physics in real-time.", 
    link: "/projects/aquaflow", 
    tags: ["Simulations", "Web Development"], 
    importance: 1,
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop"
  },
  { 
    id: "lumina", 
    title: "Lumina Coffee Co.", 
    rotation: "rotate-3", 
    description: "A complete brand identity and marketing rollout for a local sustainable coffee roaster.", 
    link: "/projects/lumina", 
    tags: ["Graphic Design", "Marketing"], 
    importance: 1,
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop"
  },
  { 
    id: "neon-grid", 
    title: "Neon Grid VR", 
    rotation: "-rotate-1", 
    description: "A beautifully crafted 3D cyberpunk environment rendered entirely within the browser using WebGL.", 
    link: "/projects/neon-grid", 
    tags: ["Simulations", "Game Design"], 
    importance: 2,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop"
  },
  { 
    id: "thread-co", 
    title: "Thread & Co. Web", 
    rotation: "rotate-2", 
    description: "A high-conversion e-commerce platform redesign focused on seamless user experience.", 
    link: "/projects/thread-co", 
    tags: ["Web Development", "Marketing"], 
    importance: 2,
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600&auto=format&fit=crop"
  },
  { 
    id: "echoes", 
    title: "Echoes of the Void", 
    rotation: "-rotate-3", 
    description: "An atmospheric indie game prototype focusing on environmental storytelling and puzzle mechanics.", 
    link: "/projects/echoes", 
    tags: ["Game Design"], 
    importance: 3,
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop"
  },
  { 
    id: "growth-metrics", 
    title: "GrowthMetrics", 
    rotation: "rotate-1", 
    description: "A comprehensive SEO optimization campaign resulting in a 300% increase in organic traffic.", 
    link: "/projects/growth-metrics", 
    tags: ["Marketing"], 
    importance: 3,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
  },
  { 
    id: "aura-type", 
    title: "Aura Typeface", 
    rotation: "-rotate-2", 
    description: "A custom modular logo pack and typography suite designed for a modern tech startup.", 
    link: "/projects/aura-type", 
    tags: ["Graphic Design"], 
    importance: 2,
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop"
  },
];

interface ProjectGridProps {
  selectedDomains: string[];
}

export default function ProjectGrid({ selectedDomains }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

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

  // 2. LIMIT TO MAX 3 PROJECTS
  const topProjects = filteredProjects.slice(0, 3);

  return (
    <>
      <div className="flex flex-col h-full items-center justify-center w-full relative z-10">
        
        <div className="relative w-full max-w-5xl px-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center"
          >
            {topProjects.map((project) => (
              <PolaroidCard 
                key={project.id} 
                project={project} 
                onClick={(p) => setSelectedProject(p)} 
              />
            ))}
          </motion.div>
        </div>

      </div>

      {/* =========================================
          MODAL: EXPANDED POLAROID 
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