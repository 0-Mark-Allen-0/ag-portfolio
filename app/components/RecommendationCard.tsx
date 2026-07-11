import Link from "next/link";
import { ProjectData } from "./PolaroidCard";

const TYPE_BADGE_STYLES: Record<string, string> = {
  "Game-Related": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "CG Video": "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Graphic Design": "bg-amber-50 text-amber-700 border border-amber-200",
  "CG Image": "bg-sky-50 text-sky-700 border border-sky-200",
  "Editing": "bg-zinc-100 text-zinc-700 border border-zinc-300",
};

export default function RecommendationCard({ project }: { project: ProjectData }) {
  const badgeStyle = project.type ? TYPE_BADGE_STYLES[project.type] : undefined;

  return (
    <Link
      href={`/projects/${project.id}`}
      className={`font-inter group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        {badgeStyle && (
          <span
            className={`inline-block mb-2 px-2.5 py-0.5 rounded-md text-xs font-medium ${badgeStyle}`}
          >
            {project.type}
          </span>
        )}
        <h3 className="text-lg font-medium text-ink">{project.title}</h3>
      </div>
    </Link>
  );
}
