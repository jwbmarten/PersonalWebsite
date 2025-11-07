import { CSSProperties, useEffect, useRef, useState } from "react";

type Props = {
  text?: string | null;
  className?: string;
  /** Approximate pixels per second for the scrolling portion. */
  speed?: number;
};

/**
 * Renders a single-line label that only scrolls when it overflows.
 * The animation holds at the start, scrolls to reveal the end, holds, then returns.
 */
export default function TextMarquee({ text = "", className = "", speed = 60 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    const measure = () => {
      const c = containerRef.current; const t = textRef.current;
      if (!c || !t) return;
      const extra = Math.max(0, t.scrollWidth - c.clientWidth);
      setDelta(extra);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (textRef.current) ro.observe(textRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [text]);

  // Portion of the keyframes spent moving is ~70% (15% hold at each end)
  const moveFraction = 0.7;
  const travelTime = delta / Math.max(1, speed); // seconds
  const duration = travelTime / moveFraction || 0; // total anim duration

  const style: CSSProperties | undefined = delta > 0
    ? ({ ["--delta" as any]: `${delta}px`, animationDuration: `${Math.max(2, duration)}s` } as CSSProperties)
    : undefined;

  return (
    <div ref={containerRef} className={`marquee ${className}`}>
      <div ref={textRef} className={delta > 0 ? 'marquee__inner' : ''} style={style}>
        {text || '—'}
      </div>
    </div>
  );
}
