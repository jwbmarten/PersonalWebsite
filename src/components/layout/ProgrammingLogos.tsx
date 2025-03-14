import React, { JSX } from "react";
import CLogo from "../../assets/icons8-c-programming.svg";
import JavaLogo from "../../assets/icons8-java.svg";
import PythonLogo from "../../assets/icons8-python-100.svg";
import TSLogo from "../../assets/icons8-typescript.svg";
import ReactLogo from "../../assets/icons8-react.svg";
import PostgreSQL from "../../assets/icons8-postgresql.svg";

interface IconProps {
  name: string;
  logoImage: string;
}

function Icon ({name, logoImage}: IconProps): JSX.Element {
    return (
      <div className=" flex flex-col  bg-[#D3DDDC] rounded-lg p-auto mx-auto shadow-lg w-auto lg:w-30 justify-center items-center ">
        <img src={logoImage} alt="Java" />
        <p className='font-spartan font-[900] text-sm lg:text-lg' >{name}</p>
      </div>
    )
}

export default function ProgrammingLogos(): JSX.Element {
  return (
    <div className='flex flex-col items-center w-full '>
      <h1 className='font-arvo text-3xl text-[#FDD262] pb-5 h-auto w-auto'>SKILLS</h1>
    
      <div className="grid grid-cols-3 gap-4 justify-items-center items-center">
        {/* Java */}
          <Icon name='JAVA' logoImage={JavaLogo}/>
        {/* Python */}
        <Icon name='PYTHON' logoImage={PythonLogo}/>
        {/* C */}
        <Icon name='C' logoImage={CLogo}/>
        {/* TypeScript */}
        <Icon name='TYPE SCRIPT' logoImage={TSLogo}/>
        {/* PostgreSQL */}
        <Icon name='PostgreSQL' logoImage={PostgreSQL}/>
        {/* React */}
        <Icon name='React' logoImage={ReactLogo}/>
      </div>
      </div>
  );
}
