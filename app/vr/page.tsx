"use client";

import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment as DreiEnvironment,
  Html,
  useProgress,
  PerspectiveCamera,
} from "@react-three/drei";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 1. Data Structure
type EnvironmentData = {
  id: string;
  name: string;
  url: string;
};

// 2. Realistic Examples using CDN paths (as requested)
// Note: These are placeholder URLs per instructions. In a real environment, 
// they should point to valid .glb/.gltf files served with CORS enabled.
const environments: EnvironmentData[] = [
  {
    id: "cyberpunk-plaza",
    name: "Cyberpunk Plaza",
    url: "https://res.cloudinary.com/drxjblwds/image/upload/v1777293604/Room_sample_frwgvy.glb",
  },
  {
    id: "minimalist-gallery",
    name: "Minimalist Gallery",
    url: "https://cdn.example.com/models/minimalist_gallery.glb",
  },
  {
    id: "nature-reserve",
    name: "Nature Reserve",
    url: "https://cdn.example.com/models/nature_reserve.glb",
  },
];

// Helper to pre-load the models if you want them cached (optional)
// environments.forEach((env) => useGLTF.preload(env.url));

// 3. 3D Model Component wrapped in Suspense
const Model = ({ url }: { url: string }) => {
  // To avoid Next.js crashing on these fake CDN urls during the placeholder state,
  // we catch the error gracefully if the url is fake.
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  } catch (error) {
    // Graceful fallback for placeholder URLs so the UI still renders
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" wireframe />
      </mesh>
    );
  }
};

// 4. Custom HTML Overlay Loader
const Loader = () => {
  const { progress, active, item } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-black/60 rounded-2xl backdrop-blur-xl border border-white/20 text-white shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="relative flex items-center justify-center w-16 h-16 mb-4">
          <div className="absolute w-full h-full border-4 border-white/10 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-t-emerald-400 rounded-full animate-spin"></div>
        </div>
        <p className="text-xl font-semibold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
          LOADING
        </p>
        <p className="text-sm text-slate-300 font-mono">
          {progress.toFixed(0)}%
        </p>
        <p className="text-xs text-slate-500 mt-2 max-w-[200px] text-center truncate">
          {active ? `Fetching: ${item}` : "Preparing environment..."}
        </p>
      </div>
    </Html>
  );
};

export default function VRPortfolioPage() {
  const [activeEnv, setActiveEnv] = useState<EnvironmentData>(environments[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-950 font-sans text-slate-50">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          {/* Custom Perspective Camera configured for a fixed look-around panoramic view */}
          <PerspectiveCamera makeDefault position={[0, 1.5, 0.01]} fov={75} />

          {/* Lighting & Environment */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <DreiEnvironment preset="city" />

          {/* Suspense boundary for model loading */}
          <Suspense fallback={<Loader />}>
            <Model url={activeEnv.url} key={activeEnv.id} />
          </Suspense>

          {/* 
            OrbitControls configured as a fixed pivot point. 
            Target is at [0, 1.5, 0] while camera is at [0, 1.5, 0.01].
            rotateSpeed is negative to invert the drag direction, 
            providing a natural "FPS look around" experience. 
          */}
          <OrbitControls
            target={[0, 1.5, 0]}
            enableZoom={false}
            enablePan={false}
            rotateSpeed={-0.6}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* 2D UI Overlay (Unified Cohesive Panel) */}
      <div className="absolute top-0 left-0 bottom-0 z-10 p-6 flex items-center pointer-events-none">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={clsx(
            "pointer-events-auto bg-white border border-zinc-200 shadow-2xl relative overflow-hidden flex flex-col",
            isCollapsed
              ? "w-14 h-14 rounded-2xl cursor-pointer hover:bg-zinc-50 transition-colors"
              : "w-80 rounded-3xl p-8"
          )}
          onClick={() => isCollapsed && setIsCollapsed(false)}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isCollapsed ? (
              <motion.div
                key="collapsedIcon"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex items-center justify-center text-zinc-600"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="expandedContent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col w-full h-full"
              >
                {/* Close Button Inside Sidebar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(true);
                  }}
                  className="absolute top-6 right-6 p-2 z-20 rounded-xl bg-zinc-50 border border-transparent hover:border-zinc-200 hover:bg-zinc-100 transition-all text-zinc-400 hover:text-zinc-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="mb-8 pr-8">
                  <h1 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">
                    VR Hub
                  </h1>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                    Explore a 360&deg; environment. <br /> Choose a destination below to teleport!
                  </p>
                </div>

                {/* Environments List */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                    Select Environment
                  </span>
                  {environments.map((env) => (
                    <button
                      key={env.id}
                      onClick={() => setActiveEnv(env)}
                      className={clsx(
                        "relative flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 border text-sm font-semibold focus:outline-none",
                        activeEnv.id === env.id
                          ? "bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-200"
                          : "bg-white border-zinc-100 hover:border-zinc-300 text-zinc-600 hover:bg-zinc-50"
                      )}
                    >
                      {env.name}
                      {activeEnv.id === env.id && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute right-3 w-1.5 h-1.5 rounded-full bg-emerald-400"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
