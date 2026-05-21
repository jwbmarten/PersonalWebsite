import { JSX } from "react";
import ServerStatusCard from "../analytics/ServerStatusCard";
import ServerPingCard from "../analytics/ServerPingCard";
import MusicRecCard from "../layout/MusicRecCard";

export default function HeroSection(): JSX.Element {
  return (
    <>
      <header className="w-full relative flex items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 " />

        <div className="absolute top-24 left-10 h-64 w-64 rounded-full " />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full " />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="flex flex-col items-center lg:items-start justify-center w-full lg:w-1/2">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#fdd262] font-mono">
              Software Developer
            </p>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-spartan text-[#fdd262] font-bold leading-none text-center lg:text-left">
              JAKE
            </h1>

            <h1 className="mt-2 text-6xl md:text-8xl lg:text-9xl font-spartan text-[#fdd262] font-bold leading-none text-center lg:text-left">
              MARTEN
            </h1>

            <p className="mt-6 text-center lg:text-left text-white/80 text-base md:text-lg">
              Hi, welcome to my personal website. I&apos;m a software developer building full-stack apps, backend systems, and self-hosted projects.
            </p>
            <span>
              <p className="mt-6 text-center lg:text-left text-white/80 text-base md:text-lg">
              This website is being self-hosted from a Raspberry Pi, view live metrics <a href='/status' className='text-[#fdd262]'>here</a>.
            </p>
            </span>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center w-full lg:w-1/3 md:max-w-2xl gap-6">
            {/* Server Status and Ping Cards - Horizontal on medium, vertical on large */}
            <div className="w-full flex flex-col md:flex-row lg:flex-col gap-4 justify-center items-center">
              <ServerStatusCard />
              <ServerPingCard />
            </div>
            
            {/* Music Rec Card - Below, Centered */}
            <div className="w-full md:w-1/2 lg:w-full flex justify-center">
              <MusicRecCard />
            </div>
          </div>
        </div>
      </header>

      {/* Featured Project Card */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-12 -mt-2">
        <div className="p-8 rounded-xl bg-gradient-to-br from-white/9 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Project Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/icons/star_shine.svg" alt="Featured" className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest font-mono text-[#bb4957]">Featured Project</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-spartan font-bold text-white mb-4">
                AskSauron Distributed Search Engine
              </h3>

              <p className="text-base text-gray-300 leading-relaxed mb-6">
                A distributed search engine built with Java and deployed on AWS EC2. Features a web crawler, inverted index, ranked retrieval, and a resilient multi-node architecture.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Java', 'AWS', 'Distributed Systems', 'PostgreSQL', 'Docker'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono text-gray-300 bg-white/5 border border-white/10 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a href="#" className="px-4 py-2 text-sm font-mono text-[#bb4957] border border-[#bb4957]/30 rounded hover:bg-[#bb4957]/10 transition">
                  View Project →
                </a>
                <a href="#" className="px-4 py-2 text-sm font-mono text-gray-300 border border-gray-500/30 rounded hover:bg-gray-500/10 transition">
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* Right: Project Image */}
            <div className="flex-shrink-0 w-full lg:w-96">
              <img
                src="/featured_proj/AskSauronSearch.png"
                alt="AskSauron Search Engine"
                className="w-full h-auto rounded-lg object-cover backdrop-blur-md shadow-lg  border-1 border-black"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}