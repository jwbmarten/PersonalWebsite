import { JSX, ReactNode } from "react";
import { motion } from "motion/react";



interface ProjectCardProps {
    projectImg: string;
    text: ReactNode;
  }

  

export default function ProjectCard({projectImg, text}: ProjectCardProps): JSX.Element {
  return (

    <div className="flex flex-col items-center">
      {/* Row 1: Photo and Text */}
      <div className="flex flex-col-reverse lg:flex-row items-center w-full lg:w-2/3 rounded-lg p-10 shadow-xl text-white gap-6 lg:gap-10">
        {/* Row 1: Text */}
        <div className="flex-1">{text}</div>

        {/* Row 1: Photo */}
        <motion.img
          className="h-70 lg:h-70 rounded-lg border-3 border-[#29211F] shrink-0"
          src={projectImg}
        />
      </div>
    </div>

  );
}