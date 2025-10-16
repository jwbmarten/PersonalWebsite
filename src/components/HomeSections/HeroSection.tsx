import React, { JSX, useEffect, useRef } from "react";
import {motion} from "motion/react"
import NameCard from "../layout/NameCard";
import ProgrammingLogos from "../layout/ProgrammingLogos";


export default function HeroSection(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });

    async function initVanta() {
      try {
        if (!(window as any).p5) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js');
        }
        if (!(window as any).VANTA || !(window as any).VANTA.TRUNK) {
          await loadScript('https://cdn.jsdelivr.net/gh/tengbao/vanta@latest/dist/vanta.trunk.min.js');
        }

        if (cancelled) return;

        if ((window as any).VANTA && containerRef.current && !(vantaRef.current)) {
          vantaRef.current = (window as any).VANTA.TRUNK({
            el: containerRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
          });
        }
      } catch (err) {
        // loading failed, ignore
      }
    }

    initVanta();

    return () => {
      cancelled = true;
      try {
        if (vantaRef.current && typeof vantaRef.current.destroy === 'function') {
          vantaRef.current.destroy();
          vantaRef.current = null;
        }
      } catch (e) {
        // ignore
      }
    };
  }, []);

  return (
    <header ref={containerRef} className="w-full min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 flex flex-col items-center justify-center z-10">
        <h1 className="text-7xl lg:text-9xl font-spartan text-[#fdd262] font-[700] leading-tight text-center">JAKE</h1>
        <h1 className="mt-2 text-7xl  lg:text-9xl font-spartan text-[#fdd262] font-[700] leading-tight text-center">MARTEN</h1>
        <p className="text-white sm:text-center xs:text-center w-11/12 sm:w-3/4 md:w-2/3">Hi, welcome to my personal website! This site is self-hosted on a Raspberry Pi 4b, read more about it here! </p>

        {/* Lower banner */}
        <div className="mt-8 flex flex-row justify-center bg-[#D3DDDC] h-14 sm:h-16 w-11/12 sm:w-3/4 md:w-2/3 items-center rounded z-10">
          <div className="flex w-full justify-between px-4 text-sm sm:text-base font-spartan text-black font-[500]">
            <span>Frontend Server Status: "OK", Uptime: 12 days 4 hours</span>
            <span>RM-TS/254</span>
          </div>
        </div>
      </div>
    </header>
  );
}
