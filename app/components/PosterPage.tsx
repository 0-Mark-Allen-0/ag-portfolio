"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/cn";

export interface PosterPageTheme {
  bg: string;
  browserBg: string;
  surface: string;
  primary: string;
  secondary: string;
  highlight?: string;
  text: string;
  fontPrimary: string;
  fontSecondary: string;
  label: string;
}

interface PosterPageProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle?: string;
  theme: PosterPageTheme;
}

export default function PosterPage({
  children,
  className = "",
  title,
  subtitle,
  theme,
}: PosterPageProps) {
  return (
    /* Poster "sheet" — bounded card sitting on the body-bg layer */
    <div
      className={cn(
        "relative w-full min-h-[calc(100vh-4rem)] overflow-hidden",
        className
      )}
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: theme.fontSecondary,
        boxShadow:
          `0 0 0 1px ${theme.primary}18, 0 8px 24px rgba(0,0,0,0.45), 0 32px 80px rgba(0,0,0,0.35)`,
      }}
    >
      {/* Ambient glow blobs — clipped inside the poster */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
        style={{ backgroundColor: theme.primary }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
        style={{ backgroundColor: theme.secondary }}
      />

      {/* Header */}
      <header className="relative z-10 border-b" style={{ borderColor: `${theme.primary}22` }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1
              className="text-7xl font-black leading-none tracking-tight"
              style={{ fontFamily: theme.fontPrimary, color: theme.primary }}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className="mt-4 text-base md:text-lg max-w-2xl leading-relaxed opacity-70"
                style={{ color: theme.text }}
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </header>

      {/* Page content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {children}
      </main>
    </div>
  );
}
