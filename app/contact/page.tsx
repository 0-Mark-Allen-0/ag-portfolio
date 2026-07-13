"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

import { FiMail, FiPhone } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";

export default function ContactPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-1, 1], [15, -15]);
  const rotateY = useTransform(springX, [-1, 1], [-15, 15]);

  const glareX = useTransform(springX, [-1, 1], [0, 100]);
  const glareY = useTransform(springY, [-1, 1], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)`;

  const shadowX = useTransform(springX, [-1, 1], [-20, 20]);
  const shadowY = useTransform(springY, [-1, 1], [-20, 20]);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255,255,255,0.1)`;

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xPct = ((e.clientX - rect.left) / width) * 2 - 1;
    const yPct = ((e.clientY - rect.top) / height) * 2 - 1;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 font-sans p-6 overflow-hidden">
      <div style={{ perspective: 1200 }}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            boxShadow,
            transformStyle: "preserve-3d",
          }}
          className="relative w-80 sm:w-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden flex flex-col will-change-transform"
        >
          <motion.div
            style={{ background: glareBackground }}
            className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay"
          />

          <div className="absolute top-0 left-0 right-0 h-32 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-20 pointer-events-none z-0" />

          <div className="relative pt-4 pb-2 flex justify-center z-10">
            <div className="w-14 h-3 bg-slate-950 rounded-full shadow-inner border-b border-white/5 mx-auto" />
          </div>

          <div
            style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
            className="flex-1 flex flex-col px-8 py-5 z-10"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-28 h-28 mb-4">
                <div className="relative w-full h-full rounded-full border-2 border-slate-700 overflow-hidden bg-slate-800 shadow-xl">
                  <img
                    src="/images/assets/adharsh-picture.jpg"
                    alt="Profile Headshot"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-slate-100 tracking-wide mb-1">
                Adharsh Gajendran
              </h1>
              <div className="h-px w-1/2 bg-white/10 mt-5" />
            </div>

            <div className="flex flex-col gap-4 text-slate-300 w-full mb-6">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <FiPhone className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="font-mono text-sm">+91 74487 86432</span>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <FiMail className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="font-mono text-sm truncate">
                  adharsh@vifrtech.com
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <FiMail className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="font-mono text-sm truncate">
                  adharsh@cogniversetech.com
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <FiMail className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="font-mono text-sm truncate">
                  adharsh.gajendran1@gmail.com
                </span>
              </div>
            </div>

            <div className="flex-1" />
          </div>

          <div
            style={{ transform: "translateZ(10px)" }}
            className="relative z-10 mt-auto bg-slate-900/80 backdrop-blur border-t border-white/10 px-6 py-4 flex items-center justify-center gap-8"
          >
            <a href="https://www.linkedin.com/in/adharsh-g/" className="text-slate-400 hover:text-blue-400 hover:scale-110 transition-all">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/adharsh.gg/" className="text-slate-400 hover:text-rose-400 hover:scale-110 transition-all">
              <BsInstagram className="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com/@adharshgg" className="text-slate-400 hover:text-red-500 hover:scale-110 transition-all">
              <BsYoutube className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}