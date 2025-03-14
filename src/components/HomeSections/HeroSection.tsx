import { JSX } from "react";
import {motion} from "motion/react"
import NameCard from "../layout/NameCard";
import ProgrammingLogos from "../layout/ProgrammingLogos";


export default function HeroSection(): JSX.Element {
    return (
      <div className="flex flex-col justify-center relative h-screen -mt-25 lg:-mt-30 bg-[#446455]">
        <div className=" flex flex-col items-center justify-center relative ">
          <h1 className="text-7xl md:text-7xl lg:text-9xl font-spartan text-[#fdd262] font-[700] pt-25 pb-5">JAKE</h1>
          <h1 className="text-7xl md:text-7xl lg:text-9xl font-spartan text-[#fdd262] font-[700] pt-5 pb-25">MARTEN</h1>

          {/* Row 1: Lower Banner*/}
          <div className='flex flex-row justify-evenly bg-[#D3DDDC] h-20 w-full items-center mb-10'>
            <h1 className='text-sm lg:text-xl font-spartan text-black font-[500]'>REVISED EDITION No. 12</h1>
            
            <h1 className='text-sm lg:text-xl font-spartan text-black font-[500]'>RM-TS/254</h1>
          </div>
        </div>
      </div>
    );
  }
  