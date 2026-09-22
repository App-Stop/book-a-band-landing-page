"use client";

import { useEffect, useRef, useState } from "react";

import Icon from "./Icon";

const START_VIEWS = 1000;
const RAMP_TARGET = 39000;
const RAMP_DURATION_MS = 1600;
const SETTLED_VIEWS = 42000;

function formatViews(value: number) {
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function ViewsPill({ className = "" }: { className?: string }) {
  const [views, setViews] = useState(START_VIEWS);
  const viewsRef = useRef(START_VIEWS);

  useEffect(() => {
    let rafId: number;
    let timeoutId: number;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      viewsRef.current = SETTLED_VIEWS;
      timeoutId = window.setTimeout(() => setViews(SETTLED_VIEWS), 0);
      return () => window.clearTimeout(timeoutId);
    }

    const start = performance.now();

    // Phase 1: quick eased ramp up to ~39k, like a counter catching up to a
    // live number rather than ticking through it one-by-one.
    const ramp = (now: number) => {
      const t = Math.min(1, (now - start) / RAMP_DURATION_MS);
      const value = Math.round(START_VIEWS + (RAMP_TARGET - START_VIEWS) * easeOutCubic(t));
      viewsRef.current = value;
      setViews(value);
      if (t < 1) {
        rafId = requestAnimationFrame(ramp);
      } else {
        timeoutId = window.setTimeout(trickle, 1500 + Math.random() * 2000);
      }
    };

    // Phase 2: bigger, uneven ticks that keep drifting upward indefinitely
    // (39k -> 42k -> beyond) so it reads as a real, still-climbing view count.
    const trickle = () => {
      viewsRef.current += Math.floor(Math.random() * 130) + 20;
      setViews(viewsRef.current);
      timeoutId = window.setTimeout(trickle, 1500 + Math.random() * 2500);
    };

    rafId = requestAnimationFrame(ramp);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`glass flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold tabular-nums text-white sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-sm ${className}`}
    >
      <Icon name="eye" className="size-3.5 text-white/85 sm:size-4" />
      {formatViews(views)}
    </div>
  );
}
