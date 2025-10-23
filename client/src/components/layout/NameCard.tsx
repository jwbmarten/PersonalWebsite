import { JSX } from "react";

export default function NameCard(): JSX.Element {
    return (
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-4/5 aspect-[2/1] bg-emerald-900 rounded-xl shadow-lg items-center p-4">
          {/* Hello my name is section */}
          <div className="flex-[1] flex flex-col items-center justify-center">
            <h1 className="text-[min(5vw,40px)] font-bold text-white">HELLO</h1>
            <h2 className="text-[min(3vw,24px)] font-semibold text-white">my name is</h2>
          </div>
          {/* Name section */}
          <div className="flex-[2] w-full bg-white flex items-center justify-center border-4 border-black rounded-lg">
            <h1 className="text-[min(6vw,50px)] font-bold text-black font-mono">Jake Marten</h1>
          </div>
        </div>
      </div>
    );
  }
  