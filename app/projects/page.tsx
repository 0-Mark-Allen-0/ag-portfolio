import { PROJECTS } from "../components/projectsData";
import RecommendationCard from "../components/RecommendationCard";

export default function ProjectsPage() {
  return (
    <main className={`font-inter min-h-screen w-full bg-white text-ink py-12 md:py-20 px-4 md:px-8`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-ink mb-8 font-semibold">
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
