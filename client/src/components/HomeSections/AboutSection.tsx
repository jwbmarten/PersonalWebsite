import { JSX } from "react";
import PersonalPic from "../../assets/personalPic.jpg"



export default function AboutSection(): JSX.Element {
  return (

    <div className="flex flex-col items-center relative py-6 mx-auto">
        {/* Row 1: Photo and Text*/}
        <div className="flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-between w-full md:w-full lg:w-5/6">
          {/* Row 1: Text*/}
          <p className="w-full lg:w-8/12 text-white lg:pr-8 lg:text-lg py-4 px-4">
            Hello, I’m Jake! I'm a Master's student studying Computer Science student at the University of Pennsylvania who loves building things from the ground up.
            <br /><br />
            I enjoy creating full-stack web projects, tinkering with backend infrastructure, and self-hosting just to see how it all fits together.
            <br /><br />
            One of my favorite parts of building software is the magic of breaking complex systems into simple, useful products that anyone can enjoy.
            <br /><br />
            Outside of tech, I’m a big fan of cycling, movies, and Penn State football.
          </p>
          {/* Row 1: Photo*/}
          <img
            className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 rounded-full border-2 border-black shadow-xl"
            src={PersonalPic}
            alt="Jake Marten"
          />
        </div>

    </div>
  );
}
