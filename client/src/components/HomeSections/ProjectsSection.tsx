import type { JSX } from "react";
import ProjectCard from "../layout/ProjectCard";
import projects from "../../data/projects";
import GithubIcon from "../../assets/github-mark-white.svg";

export default function ProjectsSection(): JSX.Element {
  const featured = projects.filter(p => p.featured);

  return (
    <div className="w-full mx-auto max-w-[1200px] px-6 flex flex-col gap-8 mt-6">
      {featured.map((p) => (
        <ProjectCard
          key={p.id}
          projectImg={p.img}
          title={p.title}
          description={p.description}
          tags={p.tags || []}
          links={p.links || []}
          icon="/icons/star_shine.svg"
          badge="Featured Project"
          badgeColor="#bb4957"
        />
      ))}

      <div className="flex justify-center mt-12">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white border-2 border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          <img src={GithubIcon} alt="GitHub" className="w-6 h-6" />
          View all projects on GitHub
        </a>
      </div>
    </div>
  );
}
