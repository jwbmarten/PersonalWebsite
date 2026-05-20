import { JSX } from "react";

interface ProjectCardProps {
  projectImg: string;
  title: string;
  description: string;
  tags: string[];
  links?: { label: string; href: string }[];
  icon?: string;
  badge?: string;
  badgeColor?: string;
}

export default function ProjectCard({
  projectImg,
  title,
  description,
  tags,
  links,
  icon,
  badge = "Featured Project",
  badgeColor = "#bb4957",
}: ProjectCardProps): JSX.Element {
  return (
    <div className="p-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
      <div className="flex flex-col lg:flex-row gap-8 lg:items-center items-stretch">
        {/* Left: Project Info */}
        <div className="flex-1 flex flex-col">
          {/* Badge with Icon */}
          {icon && (
            <div className="flex items-center gap-2 mb-4">
              <img src={icon} alt="Featured" className="w-5 h-5 " />
              <span className="text-sm uppercase tracking-widest font-mono" style={{ color: badgeColor }}>
                {badge}
              </span>
            </div>
          )}

          <h3 className="text-3xl lg:text-4xl font-spartan font-bold text-white mb-4">
            {title}
          </h3>

          <p className="text-base text-gray-300 leading-relaxed mb-6">
            {description}
          </p>

          {/* Tech Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono text-gray-300 bg-white/5 border border-white/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Links */}
          {links && links.length > 0 && (
            <div className="flex gap-4 mt-auto">
              {links.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={idx === 0 
                    ? "px-4 py-2 text-sm font-mono text-[#bb4957] border border-[#bb4957]/30 rounded hover:bg-[#bb4957]/10 transition"
                    : "px-4 py-2 text-sm font-mono text-gray-300 border border-gray-500/30 rounded hover:bg-gray-500/10 transition"
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right: Project Image */}
        <div className="flex-shrink-0 w-full lg:w-96">
          <img
            src={projectImg}
            alt={title}
            className="w-full h-auto rounded-lg object-cover backdrop-blur-md shadow-lg  border-1 border-black"
          />
        </div>
      </div>
    </div>
  );
}