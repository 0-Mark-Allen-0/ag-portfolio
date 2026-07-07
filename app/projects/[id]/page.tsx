"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, FolderGit2, ExternalLink } from "lucide-react";
import { PROJECTS } from "../../components/projectsData";
import { ProjectData } from "../../components/PolaroidCard";

type MediaItem = { type: "image" | "video"; url: string; poster?: string };

function getMedia(project: ProjectData): MediaItem[] {
  if (project.media && project.media.length > 0) return project.media;
  return [{ type: "image", url: project.imageUrl }];
}

function linkLabel(url: string): { label: string; Icon: typeof FolderGit2 } {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    if (hostname.includes("github.com")) {
      return { label: "GitHub", Icon: FolderGit2 };
    }
    return { label: "Visit Live", Icon: ExternalLink };
  } catch {
    return { label: "Visit Live", Icon: ExternalLink };
  }
}

function scoreProject(base: ProjectData, candidate: ProjectData): number {
  const matchingTags = candidate.tags.filter((t) => base.tags.includes(t)).length;
  const importanceBonus = candidate.importance === base.importance ? 2 : 0;
  return matchingTags + importanceBonus;
}

function Carousel({ media }: { media: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (isHovered || lightboxOpen || media.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, lightboxOpen, media.length]);

  const current = media[index];

  return (
    <>
      <div
        className="relative w-full aspect-[4/3] md:aspect-square bg-gray-100 overflow-hidden rounded-2xl cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setLightboxOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {current.type === "video" ? (
              <video
                src={current.url}
                poster={current.poster}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={current.url}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {media.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {media.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          media={media}
          startIndex={index}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

function Lightbox({
  media,
  startIndex,
  onClose,
}: {
  media: MediaItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const goPrev = () => setIndex((prev) => (prev - 1 + media.length) % media.length);
  const goNext = () => setIndex((prev) => (prev + 1) % media.length);

  const current = media[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-20"
      >
        <X size={32} />
      </button>

      {media.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors z-20"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      <div
        className="max-w-5xl w-full max-h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {current.type === "video" ? (
          <video
            src={current.url}
            poster={current.poster}
            controls
            autoPlay
            className="max-w-full max-h-[85vh] rounded-lg"
          />
        ) : (
          <img
            src={current.url}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        )}
      </div>

      {media.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors z-20"
        >
          <ChevronRight size={40} />
        </button>
      )}
    </motion.div>
  );
}

function RecommendationCard({ project }: { project: ProjectData }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-ink">{project.title}</h3>
      </div>
    </Link>
  );
}

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const project = useMemo(
    () => PROJECTS.find((p) => p.id === id),
    [id]
  );

  const recommendations = useMemo(() => {
    if (!project) return [];
    return PROJECTS.filter((p) => p.id !== project.id)
      .map((p) => ({ project: p, score: scoreProject(project, p) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((entry) => entry.project);
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-white text-ink">
        <p className="font-body text-xl">Project not found.</p>
      </main>
    );
  }

  const media = getMedia(project);

  return (
    <main className="min-h-screen w-full bg-white text-ink py-12 md:py-20 px-4 md:px-8">
      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Carousel */}
          <div className="p-4 md:p-6 flex items-center">
            <Carousel media={media} />
          </div>

          {/* Right: Metadata */}
          <div className="p-6 md:p-10 flex flex-col">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-4">
              {project.title}
            </h1>
            <p className="font-body text-lg leading-relaxed text-ink/80 whitespace-pre-line flex-1">
              {project.description}
            </p>

            {project.links && project.links.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
                {project.links.map((url, i) => {
                  const { label, Icon } = linkLabel(url);
                  return (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      <Icon size={16} />
                      {label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">
            Similar Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map((p) => (
              <RecommendationCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
