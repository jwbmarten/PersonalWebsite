import { JSX } from "react";
import {motion} from "motion/react"
import NameCard from "../layout/NameCard";
import ProgrammingLogos from "../layout/ProgrammingLogos";


export default function HeroSection(): JSX.Element {
  return (
    <header className="w-full min-h-screen flex items-center justify-center">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-spartan text-[#fdd262] font-[700] leading-tight text-center">JAKE</h1>
        <h1 className="mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-spartan text-[#fdd262] font-[700] leading-tight text-center">MARTEN</h1>
        <p className="text-white sm:text-center xs:text-center w-11/12 sm:w-3/4 md:w-2/3">Hi, welcome to my personal website! This site is self-hosted on a Raspberry Pi 4b, read more about it here! </p>

        {/* Lower banner */}
        <div className="mt-8 flex flex-row justify-center bg-[#D3DDDC] h-14 sm:h-16 w-11/12 sm:w-3/4 md:w-2/3 items-center rounded">
          <div className="flex w-full justify-between px-4 text-sm sm:text-base font-spartan text-black font-[500]">
            <span>REVISED EDITION No. 12</span>
            <span>RM-TS/254</span>
          </div>
        </div>
      </div>
    </header>
  );
}
