import { JSX } from "react";
import {motion} from "motion/react"
import NameCard from "./NameCard";
import ProgrammingLogos from "./LanguageLogos";

import PersonalPic from "../../assets/personalPic.jpg"
import Timeline from "../../assets/timeline.png"



export default function AboutSection(): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-between relative h-screen w-full">
      {/* Left column */}
      <div className="w-2/3 border-4 border-white">
        {/* Photo and Text */}
        <div className="flex flex-row-reverse border-4 border-yellow-300">
          <p className="w-1/2 text-white border-4 border-blue-400">
            Hello, I’m Jake! I am a Master of Computer Science student at the University of Pennsylvania, with a passion for bridging the gap between technology and creativity.
            <br /><br />
            I previously spent six years as a Geoscientist integrating quantitative data to come up with new exploration concepts, and had the privilege to serve as team lead on an exploration project I had originated.
            <br /><br />
            One of my greatest pleasures is breaking complex things into simplified products where they can be more easily understood and used by others.
            <br /><br />
            In my free time I like to tackle projects that require me to pick up new languages and technologies and hope to never stop learning.
          </p>
          <motion.img 
            className="px-4 w-1/2"
            src={PersonalPic}
            alt="Jake Marten"
            shadow-xl
            // whileHover={{ scale: 1.2 }}
          />
        </div>
        <div className="mt-4 h-40">
          <ProgrammingLogos />
        </div>
      </div>
      {/* Right column */}
      <div className="w-1/3 h-[50vh] flex flex-col justify-center">
        <motion.img 
          className="px-4 w-full"
          src={Timeline}
          alt="Timeline"
          shadow-xl
          // whileHover={{ scale: 1.2 }}
        />
      </div>
    </div>
  );
}
