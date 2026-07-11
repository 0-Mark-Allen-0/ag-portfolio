import { Open_Sans } from "next/font/google";
import { PROJECTS } from "../components/projectsData";
import RecommendationCard from "../components/RecommendationCard";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function ProjectsPage() {
  return (
    <main className={`${openSans.className} min-h-screen w-full bg-white text-ink py-12 md:py-20 px-4 md:px-8`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-ink mb-8">
          All My Projects
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PROJECTS.map((project) => (
            <RecommendationCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
