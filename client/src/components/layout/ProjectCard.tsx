import { motion } from "motion/react";
import { JSX } from "react";
import GHLogo from "../../assets/github-mark-black.svg"

interface ProjectCardProps {
  projectImg: string;
  title: string;
  subtitle: string;
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
  subtitle,
  description,
  tags,
  links,
  icon,
  badge = "Featured Project",
  badgeColor = "#bb4957",
}: ProjectCardProps): JSX.Element {

    const fadeInVariants = {
      hidden: { opacity: 0 },
      visible: { 
      opacity: 1, 
      transition: { duration: 1.8, delay: 0.1 } 
      },
    };

  return (
    <motion.nav 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true}}
      variants={fadeInVariants}
      >
    <div className="p-8 rounded-xl bg-gradient-to-br from-white/9 to-white/4 backdrop-blur-md shadow-black shadow-lg ring-1 ring-white/20 border border-white/20">
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

          <h3 className="md:flex md:justify-center lg:justify-start text-4xl lg:text-5xl font-spartan font-bold text-stone-100 mb-1" style={{ textShadow: "0 3px 8px rgba(0,0,0,0.75)" }}>
            {title}
          </h3>

          <h3
            className="md:flex md:justify-center lg:justify-start text-xl md:text-2xl font-spartan text-[#fdd262]/90 mb-4"
            style={{ textShadow: "0 3px 8px rgba(0,0,0,0.75)" }}
          >
            {subtitle}
          </h3>

          {/* Mobile + tablet image */}
          <div className=" flex items-center justify-center lg:hidden mb-6">
            <img
              src={projectImg}
              alt={title}
              className="
                w-full
                max-w-150
                h-auto
                rounded-lg
                object-cover
                backdrop-blur-lg
                shadow-black/30
                shadow-md
                border
                border-black
              "
            />
          </div>

          <p className="text-base text-gray-300 leading-relaxed mb-6">
            {description}
          </p>

          {/* Tech Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono text-gray-300 bg-white/5 border border-white/10 rounded-full shadow-sm shadow-black/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Links */}
          {links && links.length > 0 && (
              <div className="flex gap-4">
                <a
                  href="#"
                  className="
                    inline-flex items-center gap-2
                    px-3 py-1
                    text-sm font-mono text-black
                    font-roboto font-semibold
                    rounded-xl
                    bg-[#fdd262]
                    shadow-sm shadow-black
                    inset-shadow-xs inset-shadow-white/30
                    hover:bg-[#fdd262]/80
                    transition
                  "
                >
                  <img
                    src={GHLogo}
                    alt=""
                    className="w-5 h-5"
                  />
                  <span>GitHub ↗</span>
                </a>
              </div>
          )}
        </div>

      {/* Desktop image only */}
      <div className="hidden lg:flex flex-shrink-0 w-full lg:w-96 justify-center items-center">
        <img
          src={projectImg}
          alt={title}
          className="w-full h-auto rounded-lg object-cover backdrop-blur-lg shadow-black/30 shadow-md border border-black max-w-150"
        />
      </div>
      </div>
    </div></motion.nav>
  );
}