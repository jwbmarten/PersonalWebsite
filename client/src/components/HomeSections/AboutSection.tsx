import { JSX } from "react";
import PersonalPic from "../../assets/personalPic.jpeg"
import TechStackCard from "./TechStackCard";

export default function AboutSection(): JSX.Element {

      return (

    <div className="w-full py-12">
      {/* Mobile: Single card wrapper */}
      <div className="lg:hidden w-full">
        <div className="p-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
          <div className="flex flex-col gap-2">
            {/* Left Column: Text */}
            <div>
              <h2 className="text-3xl font-spartan font-bold text-white mb-3" style={{ textShadow: "0 3px 8px rgba(0,0,0,0.75)" }}>
                Hi, I'm <span className="text-[#fdd262]" style={{ textShadow: "0 3px 8px rgba(0,0,0,0.75)" }}>Jake</span>.
              </h2>

              <p className="text-sm text-gray-300 mb-6">
                Software Engineer · Lifelong Learner · Problem Solver
              </p>

              <p className="text-md text-gray-300 leading-relaxed mb-6">
                I'm a Master of Computer Science and Information technology student at the University of Pennsylvania with a passion for bridging the gap between technology and creativity.
              </p>

              <p className="text-md text-gray-300 leading-relaxed mb-6">
                Previously, I spent six years as a Geoscientist integrating quantitative data to develop new exploration concepts and leading teams on exploration projects.
              </p>

              <p className="text-md text-gray-300 leading-relaxed mb-6">
                I enjoy breaking complex things into simple, useful products and I'm always excited to learn new technologies.
              </p>
            </div>

            {/* Right Column Content (mobile) */}
            <div className="md:flex md:flex-row md:justify-center md:gap-6 lg:gap-0">
              {/* Profile Image */}
              <div className="mb-6 flex justify-center">
                <img
                  className="h-48 w-48 rounded-full object-cover border-1 border-black/20 shadow-md shadow-black/30"
                  src={PersonalPic}
                  alt="Jake Marten"
                />
              </div>

              {/* Education and Work - Centered Container */}
              <div className="flex justify-center">
                <div>
                  {/* Education */}
                  <div className="flex gap-3 mb-6 items-start">
                    <img src="/icons/school.svg" alt="Education" className="w-8 h-8 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold text-sm pt-1">M.S. in Computer Science</p>
                      <p className="text-gray-400 text-xs">University of Pennsylvania</p>
                      <p className="text-white font-semibold text-sm pt-3">M.S. in Geoscience</p>
                      <p className="text-gray-400 text-xs">Penn State University</p>
                      <p className="text-white font-semibold text-sm pt-3">B.S. in Geoscience</p>
                      <p className="text-gray-400 text-xs">Penn State University</p>
                    </div>
                  </div>

                  {/* Work */}
                  <div className="flex gap-3 mb-6 items-start">
                    <img src="/icons/work.svg" alt="Location" className="w-8 h-8 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold text-sm pt-1">ExxonMobil Exploration Company</p>
                    <p className="text-gray-400 text-xs">Global New Opportunity Generation</p>
                    <p className="text-gray-400 text-xs">West Africa New Opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Card (mobile) */}
            <div className="pt-4">
              <TechStackCard />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Two column layout without outer card */}
      <div className="hidden lg:flex w-full flex-row gap-16 px-4 md:px-6 lg:px-0 items-center">
        {/* Left Column: Text + Tech Stack */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-spartan font-bold text-white mb-3">
              Hi, I'm <span className="text-[#fdd262]">Jake</span>.
            </h2>

            <p className="text-md text-gray-300 mb-6">
              Software Engineer · Lifelong Learner · Problem Solver
            </p>

            <p className="text-lg text-white leading-relaxed mb-6">
              I'm a Master of Computer Science student at the University of Pennsylvania with a passion for bridging the gap between technology and creativity.
            </p>

            <p className="text-lg text-white leading-relaxed mb-6">
              Previously, I spent six years as a Geoscientist integrating quantitative data to develop new exploration concepts and leading teams on exploration projects.
            </p>

            <p className="text-lg text-white leading-relaxed mb-6">
              I enjoy breaking complex things into simple, useful products and I'm always excited to learn new technologies.
            </p>
          </div>
          
          {/* Tech Stack Card in left column */}
          <div className="flex justify-center">
          <div className="mt-2 w-7/8">
            <TechStackCard />
          </div>
          </div>
        </div>

        {/* Right Column: Card only on desktop */}
        <div className="flex-shrink-0 w-80">
          <div className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
            {/* Profile Image */}
            <div className="mb-6 flex justify-center">
              <img
                className="h-48 w-48 rounded-full object-cover border-1 border-black/20 shadow-md shadow-black/30"
                src={PersonalPic}
                alt="Jake Marten"
              />
            </div>

            <div>
            {/* Education */}
            <div className="flex gap-3 mb-6 items-start">
              <img src="/icons/school.svg" alt="Education" className="w-8 h-8 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm pt-1">M.S. in Computer Science</p>
                <p className="text-gray-400 text-xs">University of Pennsylvania</p>
                <p className="text-white font-semibold text-sm pt-3">M.S. in Geoscience</p>
                <p className="text-gray-400 text-xs">Penn State University</p>
                <p className="text-white font-semibold text-sm pt-3">B.S. in Geoscience</p>
                <p className="text-gray-400 text-xs">Penn State University</p>
              </div>
            </div>

            {/* Work */}
            <div className="flex gap-3 mb-6 items-start">
              <img src="/icons/work.svg" alt="Location" className="w-8 h-8 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm pt-1">ExxonMobil Exploration Company</p>
                <p className="text-gray-400 text-xs">Global New Opportunity Generation</p>
                <p className="text-gray-400 text-xs">West Africa New Opportunities</p>
              </div>
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

