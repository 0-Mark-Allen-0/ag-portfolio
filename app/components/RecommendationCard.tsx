import Link from "next/link";
import { Open_Sans } from "next/font/google";
import { ProjectData } from "./PolaroidCard";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RecommendationCard({ project }: { project: ProjectData }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={`${openSans.className} group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg text-ink">{project.title}</h3>
      </div>
    </Link>
  );
}
