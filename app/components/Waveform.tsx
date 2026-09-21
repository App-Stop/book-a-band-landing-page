"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

/* Same 12 bars as /public/waveform.svg (x, y1, y2 in a 68 × 26 box). They are
   drawn inline so a travelling sine wave can move each bar's length: the crest
   rolls left to right while the bars keep the Figma silhouette at rest. */
const BARS = [
  [1, 11.5, 14.5],
  [7, 8.5, 17.5],
  [13, 4, 22],
  [19, 10, 16],
  [25, 7, 19],
  [31, 1, 25],
  [37, 7, 19],
  [43, 10, 16],
  [49, 12, 14],
  [55, 10, 16],
  [61, 2.5, 23.5],
  [67, 7, 19],
] as const;

const CENTER = 13;
const MAX_HALF = 12;
const SPEED = 4.2; // radians per second
const PHASE = 0.62; // radians between neighbouring bars

export default function Waveform({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lines = Array.from(svg.querySelectorAll("line"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let running = false;

    const update = () => {
      const t = gsap.ticker.time * SPEED;

      lines.forEach((line, index) => {
        const [, y1, y2] = BARS[index];
        const base = (y2 - y1) / 2;
        const crest = 0.5 + 0.5 * Math.sin(t - index * PHASE);
        const half = Math.min(MAX_HALF, base * (0.35 + 0.65 * crest) + 2.2 * crest);

        line.setAttribute("y1", String(CENTER - half));
        line.setAttribute("y2", String(CENTER + half));
      });
    };

    const start = () => {
      if (running || reduceMotion.matches) return;
      running = true;
      gsap.ticker.add(update);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      gsap.ticker.remove(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    observer.observe(svg);

    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className={className}
      viewBox="0 0 68 26"
      preserveAspectRatio="none"
      overflow="visible"
      fill="none"
    >
      {BARS.map(([x, y1, y2]) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1={y1}
          y2={y2}
          stroke="#00C9C6"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
