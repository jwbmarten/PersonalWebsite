// Helper to load p5 and Vanta.TRUNK only once and return a cached promise.
// This avoids race conditions where multiple components try to load the scripts
// simultaneously or initialize Vanta before the dependency (p5) is ready.

const P5_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js';
const VANTA_SRC = 'https://cdn.jsdelivr.net/gh/tengbao/vanta@latest/dist/vanta.trunk.min.js';

declare global {
  interface Window {
    __vantaPromise?: Promise<any>;
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export function loadVanta(): Promise<any> {
  if ((window as any).__vantaPromise) return (window as any).__vantaPromise;

  (window as any).__vantaPromise = (async () => {
    // Ensure p5 is present first
    if (!(window as any).p5) {
      await loadScript(P5_SRC);
    }

    // Then ensure VANTA.TRUNK is available
    if (!(window as any).VANTA || !(window as any).VANTA.TRUNK) {
      await loadScript(VANTA_SRC);
    }

    return (window as any).VANTA;
  })();

  return (window as any).__vantaPromise;
}

export default loadVanta;
