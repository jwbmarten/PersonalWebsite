import { JSX } from "react";
import ServerStatusCard from "../analytics/ServerStatusCard";
import ServerPingCard from "../analytics/ServerPingCard";
import MusicRecCard from "../layout/MusicRecCard";
import { Link } from "react-router-dom";
import GHLogo from "../../assets/github-mark-black.svg"

export default function HeroSection(): JSX.Element {
  return (
    <>
      <header className="w-full relative flex items-center justify-center overflow-hidden py-18">
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
              This website is being self-hosted from a Raspberry Pi, view live metrics <Link to="/status" className="text-[#fdd262]">here</Link>.
            </p>
            </span>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center w-full lg:w-1/3 max-w-[28rem] md:max-w-[44rem] gap-6">
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

              <h2 className="text-4xl lg:text-5xl font-spartan font-bold text-white mb-4" style={{ textShadow: "0 3px 8px rgba(0,0,0,0.75)" }}>AskSauron</h2>

              <h3 className="text-xl lg:text-2xl font-spartan text-[#fdd262]/90 mb-4" style={{ textShadow: "0 3px 8px rgba(0,0,0,0.75)" }}>
                Distributed Processing System and Search Engine
              </h3>

              <p className="text-base text-gray-300 leading-relaxed mb-6">
                A distributed search engine built with Java and deployed on AWS EC2. Features a web crawler, inverted index, ranked retrieval, and a resilient multi-node architecture.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Java', 'AWS', 'Distributed Systems', 'PostgreSQL', 'Docker'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono text-gray-300 bg-white/5 border border-white/10 rounded-full shadow-sm shadow-black/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

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
            </div>

            {/* Right: Project Image */}
            <div className="flex flex-shrink-0 w-full lg:w-96 justify-center items-center">
              <img
                src="/featured_proj/AskSauronSearch2.png"
                alt="AskSauron Search Engine"
                className="w-full h-auto rounded-lg object-cover backdrop-blur-md shadow-black shadow-md max-w-150"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}