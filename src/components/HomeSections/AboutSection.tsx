import { JSX } from "react";
import {motion} from "motion/react"
import NameCard from "../layout/NameCard";
import ProgrammingLogos from "../layout/ProgrammingLogos";

import PersonalPic from "../../assets/personalPic.jpg"
import Timeline from "../../assets/timelineBlackText.png"



export default function AboutSection(): JSX.Element {
  return (

    <div className="flex flex-col items-center relative py-6 mx-auto">
        {/* Row 1: Photo and Text*/}
        <div className="flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-between w-full md:w-full lg:w-5/6 bg-black rounded-lg p-6 gap-6 shadow-xl">
          {/* Row 1: Text*/}
          <p className="w-full lg:w-7/12 font-arvo text-white lg:pr-8 lg:text-lg py-4">
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
            className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 rounded-full border-4 border-[#29211F] shadow-xl"
            src={PersonalPic}
            alt="Jake Marten"
            shadow-xl
            // whileHover={{ scale: 1.2 }}
          />
        </div>

    </div>
  );
}
