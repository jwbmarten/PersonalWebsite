import { JSX } from "react";

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

const techItems: TechItem[] = [
  { name: "Java", icon: "/icons/tech_icons/java.svg", color: "#f89820" },
  { name: "Python", icon: "/icons/tech_icons/python.svg", color: "#3776ab" },  
  { name: "TypeScript", icon: "/icons/tech_icons/TS_logo.svg", color: "#f89820"},
  { name: "React", icon: "/icons/tech_icons/react.svg", color: "#f89820"},
  { name: "PostgreSQL", icon: "/icons/tech_icons/postgresql.svg", color: "#336791" },  
  { name: "AWS", icon: "/icons/tech_icons/aws.svg", color: "#ff9900" },
  { name: "Docker", icon: "/icons/tech_icons/docker.svg", color: "#2496ed" },
  { name: "Linux", icon: "/icons/tech_icons/linux.svg", color: "#fcc624" },
];

export default function TechStackCard(): JSX.Element {
  return (
    <div>
      <div className="p-2 pb-4 rounded-xl bg-gradient-to-br from-black/4 to-black/2 lg:from-white/10 lg:to-white/5 backdrop-blur-md shadow-lg border border-black lg:ring-1 lg:ring-white/20 lg:border-white/10">
        {/* Header with icon and title */}
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="flex items-center justify-center gap-2 ">
            <div className="p-2 rounded-lg">
              <img src="/icons/tech.svg" alt="Tech Stack" className="w-8 h-8" />
            </div>
            <h3 className="text-[#5bb25b] font-unica text-2xl pt-1">TECH I USE</h3>
          </div>
          <div className="w-7/8 h-1 r-4 bg-[#5bb25b]/40 rounded-full"></div>
        </div>

        {/* Tech grid - responsive layout */}
        <div className="flex flex-wrap justify-center gap-3">
          {techItems.map((tech) => (
            <div
              key={tech.name}
              className="
                w-[45%]         
                sm:w-[140px]    
                flex flex-col lg:flex-row
                lg:items-center lg:gap-2
                items-center justify-center
                px-3 py-3
                rounded-xl
                bg-black/9
                border border-white/10
                shadow-black/50 shadow-md
              "
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-10 h-10 flex-shrink-0 lg:w-8 lg:h-8"
              />

              <span
                className="
                  text-sm lg:text-md
                  text-gray-300
                  font-mono
                  text-center
                  lg:text-left
                  mt-2 lg:mt-0
                "
                style={{ textShadow: "0 3px 8px rgba(0,0,0,0.75)" }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
