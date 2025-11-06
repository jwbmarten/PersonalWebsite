import type { JSX } from "react";
import ProjectCard from "../layout/ProjectCard";
import projects from "../../data/projects";

export default function ProjectsSection(): JSX.Element {
  return (
    <div>
      <div className="w-full flex flex-col lg:flex-row items-center">
        {projects.map((p) => (
          <div key={p.id} className="w-full flex justify-center max-w-[1400px] py-6 lg:py-10 rounded-lg  gap-6 ">
            <div className="flex justify-center w-full max-w-[1400px] px-6">
              <ProjectCard
                projectImg={p.img}
                text={
                  (
                    <div className="flex flex-col h-full">
                      <h3 className="text-3xl font-arvo text-[#fdd262] mb-2 text-center">{p.title}</h3>
                      <p className="text-sm text-white lg:text-base flex-grow">{p.description}</p>

                      {p.links && p.links.length > 0 && (
                        <div className="mt-auto flex justify-center gap-3">
                          {p.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block rounded bg-[#fdd262] text-black px-3 py-1 text-sm font-medium"
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="text-xl text-white text-center">
        To see all projects, click{" "}
        <a href="/projects" className="text-[#fdd262]">
          here
        </a>
      </div>
    </div>

    
  );
}
