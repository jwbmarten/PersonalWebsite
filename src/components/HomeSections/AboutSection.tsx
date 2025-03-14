import { JSX } from "react";
import {motion} from "motion/react"
import NameCard from "../layout/NameCard";
import ProgrammingLogos from "../layout/ProgrammingLogos";

import PersonalPic from "../../assets/personalPic.jpg"
import Timeline from "../../assets/timelineBlackText.png"



export default function AboutSection(): JSX.Element {
  return (

    <div className="flex flex-col items-center justify-between relative min-h-screen w-full py-10">
        {/* Row 1: Photo and Text*/}
        <div className="flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-between w-full md:w-full lg:w-2/3 bg-[#899DA4] rounded-lg p-10 border-4 border-[#446455] shadow-xl">
          {/* Row 1: Text*/}
          <p className="w-full lg:w-7/8 font-arvo text-black lg:pr-8 lg:text-lg py-10">
            Hello, I’m Jake! I am a Master of Computer Science student at the University of Pennsylvania, with a passion for bridging the gap between technology and creativity.
            <br /><br />
            I previously spent six years as a Geoscientist integrating quantitative data to come up with new exploration concepts, and had the privilege to serve as team lead on an exploration project I had originated.
            <br /><br />
            One of my greatest pleasures is breaking complex things into simplified products where they can be more easily understood and used by others.
            <br /><br />
            In my free time I like to tackle projects that require me to pick up new languages and technologies and hope to never stop learning.
          </p>
          {/* Row 1: Photo*/}
          <motion.img 
            className="h-70 lg:h-100 rounded-full border-3 border-[#29211F]"
            src={PersonalPic}
            alt="Jake Marten"
            shadow-xl
            // whileHover={{ scale: 1.2 }}
          />
        </div>

      {/* Row 2: timeline and languages */}
      <div className="flex flex-col md:flex-col lg:flex-row justify-between w-full lg:w-2/3 py-10 ">

        {/* Row 2: SKILLS*/}
        <div className='w-full lg:w-1/2'>
          <ProgrammingLogos />
        </div>

        {/* Row 2: TIMELINE*/}
        <div className='flex flex-col items-center py-10 lg:py-0'>
          <h1 className='font-arvo text-3xl text-[#FDD262] pb-5 '>TIMELINE</h1>
            <motion.img 
              className="px-4 h-70 lg:h-100"
              src={Timeline}
              alt="Timeline"
              shadow-xl
              // whileHover={{ scale: 1.2 }}
            />
        </div>

      </div>
    </div>
  );
}
