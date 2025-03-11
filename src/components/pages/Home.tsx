import React, { useRef } from "react";
import type { JSX, ReactNode } from "react";
import { motion, useScroll } from "motion/react";
import ProfilePic from "../../assets/terribleProfPic.png";
import BannerImg from "../../assets/movingBannerInterests.gif"; // your 1920x300 asset

interface SectionWithProgressProps {
  header: ReactNode;
  children: ReactNode;
}

function SectionWithProgress({ header, children }: SectionWithProgressProps): JSX.Element {
  // Use a ref for the section element; its type is HTMLElement (or HTMLDivElement/HTMLSectionElement)
  const ref = useRef<HTMLElement | null>(null);

  // The useScroll hook calculates progress for the target element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  return (
    <section ref={ref} className="relative min-h-screen py-10">
      {/* Sticky header with progress indicator */}
      <div className="sticky top-0 left-0 flex items-center p-4 bg-white bg-opacity-50 backdrop-blur-sm z-10">
        <div>{header}</div>
        <motion.svg width="50" height="50" viewBox="0 0 100 100" className="ml-2">
          {/* Background circle */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#ccc" strokeWidth="5" />
          {/* Animated progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#4ff0b7"
            strokeWidth="5"
            strokeDasharray="1"
            style={{ pathLength: scrollYProgress }}
          />
        </motion.svg>
      </div>

      {/* Section content */}
      <div className="px-8">{children}</div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <div>
      {/* Section 1: Hero */}
        <div className="flex flex-row items-center justify-center h-full border-4 border-indigo-500">
          <div className='min-w-1/2 border-4 border-white'>
            <motion.img
              src={ProfilePic}
              alt="Hero Pic"
              className="w-2/3 h-2/3 rounded-full object-cover mx-auto border-4 border-purple-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
            />
          </div>
          <div>
          <h1 className="text-4xl text-white font-bold">Welcome to my website!</h1>
          <h3 className="mt-4 text-lg text-[rgb(87,111,114)] border-4 border-sky-500">
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled 
          and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot 
          foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail 
          in their duty through weakness of will, which is the same as saying through shrinking from toil 
          and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our 
          power of choice is untrammelled and when nothing prevents our being able to do what we like 
          best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and 
          owing to the claims of duty or the obligations of business it will frequently occur that 
          pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in 
          these matters to this principle of selection: he rejects pleasures to secure other greater 
          pleasures, or else he endures pains to avoid worse pains."
          </h3>
          </div>

        </div>
        {/* Banner image with gradient overlays */}
        <div className="relative w-full overflow-hidden mt-8">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent to-[rgb(87,111,114)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-transparent to-[rgb(87,111,114)]" />
          <img
            src={BannerImg}
            alt="Banner"
            className="mx-auto h-auto max-w-[1000px] relative"
          />
        </div>
      

      {/* Section 2: About */}
      <SectionWithProgress
        header={<h2 className="text-3xl font-semibold">About Me</h2>}
      >
        <p className="text-[rgb(87,111,114)]">
          I’m a current student at the University of Pennsylvania pursuing a
          Masters in Computer Science.
        </p>
      </SectionWithProgress>

      {/* Section 3: My Work */}
      <SectionWithProgress
        header={<h2 className="text-3xl font-semibold">My Work</h2>}
      >
        <p className="text-[rgb(87,111,114)]">
          Here is a showcase of my projects and experiences in the field.
        </p>
      </SectionWithProgress>

      {/* Section 4: Contact */}
      <SectionWithProgress
        header={<h2 className="text-3xl font-semibold">Contact</h2>}
      >
        <p className="text-[rgb(87,111,114)]">
          Get in touch: email@example.com
        </p>
      </SectionWithProgress>
    </div>
  );
}