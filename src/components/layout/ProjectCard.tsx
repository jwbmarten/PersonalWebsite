import { JSX, ReactNode } from "react";
import { motion } from "motion/react";



interface ProjectCardProps {
    projectImg: string;
    text: ReactNode;
  }

  

export default function ProjectCard({projectImg, text}: ProjectCardProps): JSX.Element {
  return (

    <div className="flex flex-col items-center ">
        {/* Row 1: Photo and Text*/}
        <div className="flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-between w-full md:w-full lg:w-2/3 bg-[#FAEFD1] rounded-lg p-10 border-4 border-[#D8A499] shadow-xl">
          {/* Row 1: Text*/}
            {text}
          {/* Row 1: Photo*/}
          <motion.img 
            className="h-70 lg:h-70 rounded-lg border-3 border-[#29211F]"
            src={projectImg}
            shadow-xl
            // whileHover={{ scale: 1.2 }}
          />
        </div>
    </div>
  );
}