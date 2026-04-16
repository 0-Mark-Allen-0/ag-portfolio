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
    url: "https://cdn.example.com/models/cyberpunk_plaza.glb",
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

      {/* 2D UI Overlay (Glassmorphism Sidebar) */}
      <div className="absolute top-0 left-0 bottom-0 z-10 w-80 p-6 flex flex-col justify-center pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-5 p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl transition-all duration-500">
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-cyan-300 to-emerald-400 mb-2">
              Virtual Hub
            </h1>
            <p className="text-sm text-slate-300 font-medium opacity-80 leading-relaxed">
              Drag the environment to look around in 360&deg;. Select a location
              below.
            </p>
          </div>

          {/* Environments List */}
          <div className="flex flex-col gap-3 mt-2">
            {environments.map((env) => (
              <button
                key={env.id}
                onClick={() => setActiveEnv(env)}
                className={clsx(
                  "relative overflow-hidden group text-left px-5 py-4 rounded-2xl transition-all duration-300 border focus:outline-none",
                  activeEnv.id === env.id
                    ? "bg-white/10 border-white/30 shadow-[0_4px_24px_-4px_rgba(52,211,153,0.2)] text-white scale-[1.02]"
                    : "bg-black/20 border-white/5 hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-white"
                )}
              >
                {/* Button Text */}
                <span className="relative z-10 font-bold tracking-wide">
                  {env.name}
                </span>

                {/* Active Indicator Glow */}
                {activeEnv.id === env.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-xl -z-10" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Live Connection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
