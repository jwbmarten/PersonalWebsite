import React, { useRef } from "react";
import type { JSX, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import HeroSection from "../HomeSections/HeroSection";
import AboutSection from "../HomeSections/AboutSection";
import NavBar from "../layout/NavBar";

// Import your header images:
import aboutHeaderImg from "../../assets/AboutMe.png";
import workHeaderImg from "../../assets/Projects.png";
import contactHeaderImg from "../../assets/Contact.png";

interface SectionWithProgressProps {
  header: ReactNode;
  children: ReactNode;
}

function SectionWithProgress({ header, children }: SectionWithProgressProps): JSX.Element {
  // Each section gets its own ref.
  const ref = useRef<HTMLElement | null>(null);

  // Calculate scroll progress for the section.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  return (
    <section ref={ref} className="relative min-h-screen py-10">
      {/* Sticky header for this section */}
      <div className="sticky top-0 flex items-center justify-center  z-10">
        {/* Header is rendered here; using an image that's centered */}
        <div className='w-full border-b-4 border-[#D3DDDC]'>{header}</div>
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
    <div>
      {/* NavBar is wrapped in a motion.div that is sticky with an offset */}
      <motion.div style={{ opacity: navOpacity }} className="sticky top-10 z-50">
        <NavBar />
      </motion.div>

      {/* HeroSection with a ref for scroll tracking */}
      <div ref={heroRef}>
        <HeroSection />
      </div>

      {/* Other sections: headers are now images, centered and without background color */}
      <SectionWithProgress
        header={<h1 className="text-4xl lg:text-8xl font-spartan text-[#fdd262] font-[700] bg-[#798E87]">About Me</h1>}
      >
        <AboutSection/>
      </SectionWithProgress>

      <SectionWithProgress
        header={<img src={workHeaderImg} alt="My Work" className="h-16 mx-auto" />}
      >
        <p className="text-[rgb(87,111,114)]">
          Here is a showcase of my projects and experiences in the field.
        </p>
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
