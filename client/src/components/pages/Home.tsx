import type { JSX, ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import HeroSection from "../HomeSections/HeroSection";
import AboutSection from "../HomeSections/AboutSection";
import ProjectsSection from "../HomeSections/ProjectsSection";
import NavBar from "../layout/NavBar";
import PostsSection from "../HomeSections/PostsSection";

// Import your header images:
import contactHeaderImg from "../../assets/Contact.png";

// Centralized header class for all SectionWithProgress text headers
const SECTION_HEADER_CLASS = "text-5xl lg:text-7xl font-spartan text-[#fdd262] text-shadow-lg font-[700] bg-[#222426]";

interface SectionWithProgressProps {
  header?: ReactNode | string;
  icon?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

function SectionWithProgress({ header, icon, title, subtitle, children }: SectionWithProgressProps): JSX.Element {
  // Each section gets its own ref.
  const ref = useRef<HTMLElement | null>(null);

  // Calculate scroll progress for the section (not used currently but kept for future animation hooks)
  useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  return (
    <section ref={ref} className="relative py-10 mx-auto max-w-[1200px]">
      {/* Header for this section */}
      <div className="top-0 flex items-center justify-center z-10">
        {/* New layout with icon, title, and subtitle */}
        {icon && title ? (
          <div className="w-full px-4">
            <div className="flex items-start gap-4 mb-4">
              {/* Icon with border */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src={icon} alt={title} className="w-12 h-12" />
                </div>
              </div>
              
              {/* Title and subtitle */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-spartan text-white font-bold">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-base text-gray-400 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            
            {/* Divider */}
            <div className="mt-4 flex">
              <div className="w-full h-px bg-white/20" />
            </div>
          </div>
        ) : (
          // Original layout for backward compatibility (e.g., Contact section with image)
          <div className="w-full flex justify-center lg:justify-start">
            <div className="w-full px-4 text-center">
              {typeof header === 'string' ? (
                <h1 className={SECTION_HEADER_CLASS}>{header}</h1>
              ) : (
                header
              )}

              <div className="mt-4 flex justify-center">
                <div className="w-full max-w-[1400px] h-px bg-white/20" />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Section content */}
      <div className="lg:px-8">{children}</div>
    </section>
  );
}

export default function Home(): JSX.Element {
  // Ref for the HeroSection to track its scroll progress.
  const heroRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the HeroSection.
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  // Map hero scroll progress to NavBar opacity.
  // In this example, as heroScroll moves from 0 to 0.75, opacity goes from 1 to 0.8,
  // and by 0.85 the opacity is 0.
  const navOpacity = useTransform(heroScroll, [0, 0.75, 0.85], [1, 0.8, 0]);

  return (
    // Add top padding so fixed navbar does not overlap page content.
    // Uses CSS custom properties (--navbar-height-mobile, --navbar-height-lg) defined in index.css
    // so padding automatically adjusts if navbar size changes.
    <div className='w-full' style={{
      paddingTop: 'calc(var(--navbar-height-mobile) + var(--navbar-top-offset))',
    }}>
      {/* NavBar is wrapped in a motion.div that is fixed to the top (removed from flow) */}
      <motion.div style={{ opacity: navOpacity }} className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <NavBar />
      </motion.div>

      <div ref={heroRef}>
        <HeroSection />
      </div>

      {/* About Section (no banner header) */}
      <div className="w-full relative py-10 mx-auto max-w-[1200px] px-6">
        <AboutSection />
      </div>

      {/* Other sections: headers with icons and subtitles */}
      <SectionWithProgress 
        icon="/icons/terminal.svg"
        title="Projects"
        subtitle="A selection of things I've built."
      >
        <ProjectsSection/>
      </SectionWithProgress>

      <SectionWithProgress 
        icon="/icons/posts.svg"
        title="Latest Posts"
        subtitle="My latest thoughts and writings."
      >
        <PostsSection />
      </SectionWithProgress>

      <SectionWithProgress
        header={<img src={contactHeaderImg} alt="Contact" className="h-16 mx-auto" />}
      >
        <p className="text-[rgb(87,111,114)]">
          Get in touch: email@example.com
        </p>
      </SectionWithProgress>
    </div>
  );
}
