"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Wifi, Battery, Signal } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Team = {
  id: string;
  name: string;
  avatar: string;
  responsibilities: string[]
};

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Design Club",
    avatar: "🎨",
    responsibilities: [
      "Designed the new branding system across all platforms.",
      "Created lo-fi and hi-fi wireframes for the mobile app.",
      "Organized design thinking workshops for cross-functional teams.",
    ]
  },
  {
    id: "2",
    name: "Frontend Team",
    avatar: "💻",
    responsibilities: [
      "Migrated the legacy codebase to Next.js with App Router.",
      "Implemented Framer Motion animations for smoother view transitions.",
      "Improved performance scores, achieving a 98 on Lighthouse.",
    ]
  },
  {
    id: "3",
    name: "Marketing Committee",
    avatar: "📈",
    responsibilities: [
      "Managed the social media content calendar, increasing reach by 30%.",
      "Spearheaded the Fall campaign strategy from concept to execution.",
      "Analyzed user engagement metrics to refine our target demographic.",
    ]
  },
  {
    id: "4",
    name: "Hackathon Squad",
    avatar: "🚀",
    responsibilities: [
      "Prototyped an AI-powered study tool within 48 hours.",
      "Integrated OpenAI API for real-time natural language processing.",
      "Won 2nd place overall in the Best EdTech Hack category.",
    ]
  }
];

export default function PhonePage() {
  const [currentTime, setCurrentTime] = useState("");
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes: string | number = now.getMinutes();
      hours = hours % 12 || 12; // 12-hour format
      minutes = minutes < 10 ? "0" + minutes : minutes;
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectTeam = (id: string) => {
    setIsSyncing(true);
    setActiveTeamId(id);
    // Mimic exactly 1.5 seconds loading
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  const handleBack = () => {
    setActiveTeamId(null);
  };

  const activeTeam = mockTeams.find(t => t.id === activeTeamId);

  // Framer motion variants to mimic iOS sliding navigation
  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 35 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 35 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Hide scrollbars class wrapper
  return (
    <div className={`phone-app flex min-h-screen items-center justify-center bg-zinc-900 p-4 selection:bg-blue-200 ${inter.className}`}>
      {/* Phone Wrapper */}
      <div className="relative h-[700px] w-[350px] overflow-hidden rounded-[3rem] border-[14px] border-black bg-white shadow-2xl ring-1 ring-white/10">

        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 z-50 h-[28px] w-[110px] -translate-x-1/2 rounded-b-[1.2rem] bg-black shadow-[0_0_1px_rgba(255,255,255,0.1)]">
          <div className="absolute top-2 right-4 h-2.5 w-2.5 rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]" />
        </div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-40 flex h-14 items-center justify-between px-6 pt-1.5 text-[0.8rem] font-semibold tracking-tight text-black">
          <span className="w-12 text-center">{currentTime}</span>
          <div className="flex items-center justify-end space-x-1.5 w-16">
            <Signal size={14} className="fill-black" strokeWidth={2.5} />
            <Wifi size={14} strokeWidth={2.5} />
            <Battery size={16} className="fill-black" strokeWidth={2} />
          </div>
        </div>

        {/* Content Area */}
        <div className="h-full w-full overflow-hidden">
          <style dangerouslySetInnerHTML={{
            __html: `
            .phone-app h1, .phone-app h2, .phone-app h3, .phone-app h4, .phone-app h5, .phone-app h6 {
              font-family: inherit;
            }
            .no-scrollbars::-webkit-scrollbar { display: none; }
            .no-scrollbars { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />

          {/* AnimatePresence for view transitions */}
          <AnimatePresence initial={false} mode="wait" custom={activeTeamId ? 1 : -1}>
            {!activeTeamId ? (

              /* INBOX VIEW */
              <motion.div
                key="inbox"
                custom={-1}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="no-scrollbars flex h-full flex-col overflow-y-auto px-4 pb-8 pt-16"
              >
                <div className="mb-4 mt-2 px-2">
                  <h1 className="text-3xl font-bold tracking-tight text-black">Messages</h1>
                </div>
                <div className="flex flex-col gap-1">
                  {mockTeams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => handleSelectTeam(team.id)}
                      className="group flex w-full items-center space-x-4 rounded-2xl p-2.5 text-left transition-colors hover:bg-zinc-100 active:bg-zinc-200"
                    >
                      <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-zinc-100/80 text-[26px] shadow-sm ring-1 ring-zinc-200/50">
                        {team.avatar}
                      </div>
                      <div className="flex-1 overflow-hidden border-b border-zinc-100 pb-3 pt-1 group-last:border-0">
                        <div className="flex items-center justify-between">
                          <h2 className="truncate font-semibold text-zinc-900">{team.name}</h2>
                          <span className="shrink-0 text-xs font-medium text-zinc-400">Tue</span>
                        </div>
                        <p className="truncate pr-2 text-[15px] leading-snug text-zinc-500">
                          {team.responsibilities[0]}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

            ) : (

              /* CHAT VIEW */
              <motion.div
                key="chat"
                custom={1}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex h-full flex-col pt-14"
              >
                {/* Chat Header */}
                <div className="flex h-14 shrink-0 items-center border-b border-zinc-100/80 bg-white/80 px-2 backdrop-blur-md">
                  <button
                    onClick={handleBack}
                    className="flex w-20 items-center justify-start text-[#007AFF] hover:opacity-80 disabled:opacity-50"
                    disabled={isSyncing}
                  >
                    <ChevronLeft size={28} strokeWidth={2.5} className="-ml-2" />
                    <span className="text-[17px]">Back</span>
                  </button>

                  <div className="flex flex-1 flex-col items-center justify-center -ml-6">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs shadow-sm ring-1 ring-zinc-200">
                      {activeTeam?.avatar}
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-900 leading-tight block mt-0.5">{activeTeam?.name}</span>
                  </div>

                  <div className="w-14" /> {/* Spacer for centering */}
                </div>

                {/* Chat Scroll Area */}
                <div className="no-scrollbars flex flex-1 flex-col space-y-4 overflow-y-auto bg-zinc-50/50 p-4 pb-12">
                  {isSyncing ? (
                    <div className="flex h-full flex-col items-center justify-center space-y-4 text-zinc-400">
                      <div className="h-7 w-7 animate-[spin_1s_linear_infinite] rounded-full border-[3px] border-zinc-200 border-t-[#007AFF]" />
                      <p className="text-[13px] font-medium tracking-wide">Syncing chats...</p>
                    </div>
                  ) : (
                    activeTeam?.responsibilities.map((resp, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: (idx * 0.15) + 0.1,
                          duration: 0.4,
                          type: "spring" as const,
                          stiffness: 400,
                          damping: 30
                        }}
                        className="self-end max-w-[80%] rounded-[1.25rem] rounded-tr-[0.25rem] bg-[#007AFF] px-4 py-2.5 text-white shadow-sm"
                      >
                        <p className="text-[15px] leading-[1.35] tracking-[-0.01em]">{resp}</p>
                      </motion.div>
                    ))
                  )}
                  {/* Fake Timestamp at bottom to ground the layout */}
                  {!isSyncing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (activeTeam?.responsibilities.length || 0) * 0.15 + 0.4 }}
                      className="mt-6 flex justify-center pb-4 text-[10px] font-medium text-zinc-400"
                    >
                      Read • {currentTime}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
