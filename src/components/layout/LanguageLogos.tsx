import React, { JSX } from "react";
import CLogo from "../../assets/icons8-c-programming.svg";
import JavaLogo from "../../assets/icons8-java.svg";
import PythonLogo from "../../assets/icons8-python-100.svg";
import TSLogo from "../../assets/icons8-typescript.svg";

export default function ProgrammingLogos(): JSX.Element {
  return (
    <div className="flex flex-wrap gap-4 justify-items-center items-center ">
      {/* Logo 1 */}
      <div className="bg-emerald-800 w-1/5 rounded-lg p-4">
        <img src={JavaLogo} alt="Java" className="mx-auto" />
      </div>
      {/* Logo 2 */}
      <div className="bg-emerald-800 w-1/5 rounded-lg p-4">
        <img src={PythonLogo} alt="Python" className="mx-auto" />
      </div>
      {/* Logo 3 */}
      <div className="bg-emerald-800 w-1/5 rounded-lg p-4">
        <img src={CLogo} alt="C" className="mx-auto" />
      </div>
      {/* Logo 4 */}
      <div className="bg-emerald-800 w-1/5 rounded-lg p-4">
        <img src={TSLogo} alt="TypeScript" className="mx-auto" />
      </div>
    </div>
  );
}
