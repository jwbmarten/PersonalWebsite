import { JSX, ReactNode } from "react";
import { motion } from "motion/react";



interface ProjectCardProps {
    projectImg: string;
    text: ReactNode;
  }

  

export default function ProjectCard({projectImg, text}: ProjectCardProps): JSX.Element {
  return (

    <div className="flex flex-col items-center w-100">
      {/* Row 1: Photo and Text */}
          <div className="flex flex-col-reverse items-center h-140 rounded-lg p-6 bg-[rgb(35,39,47)] gap-6 text-white lg:gap-10 ring-1 ring-black shadow-xl">
        {/* Row 1: Text */}
        <div className="flex-1">{text}</div>

        {/* Row 1: Photo */}
        <motion.img
          className="h-56 lg:h-56 rounded-lg ring-1 ring-black shadow-xl shrink-0"
          src={projectImg}
        />
      </div>
    </div>

  );
}