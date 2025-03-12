import { JSX } from "react";
import {motion} from "motion/react"
import NameCard from "./NameCard";
import ProgrammingLogos from "./LanguageLogos";


export default function HeroSection(): JSX.Element {
    return (
      <div className="flex flex-row items-center justify-center relative h-screen">
        {/* Left column */}
        <div className="min-w-2/5">
          <NameCard />
        </div>
        {/* Right column */}
        <div className="w-1/2 h-[50vh] flex flex-col justify-center ">
          <h1 className="text-4xl text-white font-bold m-0">
            Welcome to my website!
          </h1>
          {/* Wrap ProgrammingLogos in a container with a fixed height */}
          <div className="mt-4 h-40">
            <ProgrammingLogos />
          </div>
        </div>
      </div>
    );
  }
  