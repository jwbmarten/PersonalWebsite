import { JSX, useEffect, useRef } from "react";
import ServerStatusCard from "../analytics/ServerStatusCard";
import MusicRecCard from "../layout/MusicRecCard";


export default function HeroSection(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const vantaRef = useRef<any>(null);
  

  useEffect(() => {
  // Guard conditions
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

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
  if (cancelled) return;
  if (prefersReduced) return;

        if (!(window as any).p5) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js');
        }
        if (!(window as any).VANTA || !(window as any).VANTA.TRUNK) {
          await loadScript('https://cdn.jsdelivr.net/gh/tengbao/vanta@latest/dist/vanta.trunk.min.js');
        }

        if (cancelled) return;

        // Wait for the hero container to have a stable layout on mobile/first-load.
        // On some devices the initial layout measurements are 0 or smaller than
        // the Vanta minWidth/minHeight, causing init to skip. Retry a few times
        // with rAF/timeouts before initializing.
        const waitForLayout = async (attempts = 8, delayMs = 120) => {
          for (let i = 0; i < attempts; i++) {
            if (cancelled) return false;
            const el = containerRef.current;
            if (el) {
              const r = el.getBoundingClientRect();
              if (r.width >= 50 && r.height >= 50) return true;
            }
            // Wait for next animation frame + a short timeout to allow fonts/layout
            await new Promise<void>(res => requestAnimationFrame(() => setTimeout(res, delayMs)));
          }
          return !!(containerRef.current && containerRef.current.getBoundingClientRect().width > 0);
        };

        const ready = await waitForLayout();
        if ((window as any).VANTA && containerRef.current && !(vantaRef.current) && ready) {
          vantaRef.current = (window as any).VANTA.TRUNK({
            el: containerRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            // lower min sizes so mobile doesn't skip init
            minHeight: 50.0,
            minWidth: 50.0,
            scale: 0.85,
            scaleMobile: 0.7,
            spacing: 3,
          });
        }
      } catch (err) {
        // loading or init failed; ensure cleanup
        try {
          if (vantaRef.current && typeof vantaRef.current.destroy === 'function') {
            vantaRef.current.destroy();
            vantaRef.current = null;
          }
        } catch (e) {
          // ignore
        }
      }
    }

    const destroyVanta = () => {
      try {
        if (vantaRef.current && typeof vantaRef.current.destroy === 'function') {
          vantaRef.current.destroy();
          vantaRef.current = null;
        }
      } catch (e) {
        // ignore
      }
    };

    // Use IntersectionObserver: only init when hero is visible, destroy when not.
    if (containerRef.current && typeof IntersectionObserver !== 'undefined') {
      const onIntersect: IntersectionObserverCallback = (entries) => {
        for (const entry of entries) {
          if (entry.target !== containerRef.current) continue;
          if (entry.isIntersecting) initVanta(); else destroyVanta();
        }
      };
      observer = new IntersectionObserver(onIntersect, { root: null, threshold: 0.05 });
      observer.observe(containerRef.current);
    } else {
      // fallback: initialize immediately (subject to guards)
      initVanta();
    }

    const onResize = () => {
      // On resize, ensure Vanta is initialized if the hero is visible and settings allow.
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const visible = rect.height > 0 && rect.width > 0 && rect.top < window.innerHeight && rect.bottom > 0;
      if (visible) initVanta();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      if (observer && containerRef.current) observer.unobserve(containerRef.current);
      if (observer) observer.disconnect();
      destroyVanta();
    };
  }, []);

 
  

  return (
    <header ref={containerRef} className="w-full min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 flex flex-col items-center justify-center z-10">
        <h1 className="text-7xl lg:text-9xl font-spartan text-[#fdd262] font-[700] leading-tight text-center">JAKE</h1>
        <h1 className="mt-2 text-7xl  lg:text-9xl font-spartan text-[#fdd262] font-[700] leading-tight text-center">MARTEN</h1>
        <p className="text-white sm:text-center xs:text-center w-11/12 sm:w-3/4 md:w-2/3">Hi, welcome to my personal website! This site is self-hosted on a Raspberry Pi, read more about it here! </p>

        {/* Lower banner */}
<div className="mt-12 flex flex-col justify-center h-auto w-auto items-center ">
    <ServerStatusCard />

  <div className=" flex flex-col w-full justify-between items-center p-2 text-xs font-mono text-white font-[500] rounded-xl backdrop-blur-xs shadow-lg ring-2 ring-black ">
    <h6>Randomized Music Rec</h6>
    {/* Insert the MusicRecCard so the randomized recommendation is visible here */}
    <div className="w-full flex justify-center mt-3">
      <MusicRecCard />
    </div>

  </div>
</div>
      </div>
    </header>
  );
}
