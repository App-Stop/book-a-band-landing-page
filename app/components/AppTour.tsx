"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Icon from "./Icon";
import { appTourItems } from "./site-content";

/* Figma node 40:513 — the active row (and its phone) advances every 10s. */
const ROTATE_MS = 10_000;

export default function AppTour() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setActive((index) => (index + 1) % appTourItems.length),
      ROTATE_MS,
    );

    return () => clearTimeout(timer);
  }, [active]);

  const current = appTourItems[active];

  return (
    <section id="features" className="relative w-full overflow-hidden bg-[#0f0b21] border-t border-white/10 py-16 lg:pb-[117px] lg:pt-[112px]">
      {/* Figma: purple bloom on the right edge behind the phone */}
      <div className="pointer-events-none absolute right-[-12%] top-[20%] h-[1000px] w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(120,20,200,0.55),transparent_68%)]" />

      <div className="@container relative mx-auto w-full max-w-[1920px]">
        <div className="relative grid grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:block lg:px-0">
          <div className="min-w-0 lg:ml-[7.29%] lg:w-[42.14%]">
            <h2 data-reveal="up" className="display relative text-[clamp(22px,3.334vw,64px)] uppercase leading-[1.25] lg:leading-[1.22]">
              <span className="block whitespace-nowrap">Explore the app</span>
              <span className="block whitespace-nowrap">That brings</span>
              {/* Figma: glow artwork is exported @2x — 858 × 430 at (165, -49) */}
              <span className="pointer-events-none absolute left-[0.41em] top-[-0.9em] z-10 h-[7.17em] w-[14.3em] lg:left-[1.28cqw] lg:top-[-3.18cqw] lg:h-[22.4cqw] lg:w-[44.69cqw]">
                <Image
                  src="/live-music-home.png"
                  alt="Live music home"
                  fill
                  sizes="(max-width: 1024px) 90vw, 860px"
                  className="object-fill mix-blend-screen"
                />
              </span>
            </h2>

            <p data-reveal="up" className="mt-6 max-w-[809px] text-base leading-[1.5] text-white lg:mt-[77px] lg:text-[max(16px,1.04cqw)]">
              Take an interactive tour through real app screens. Discover how
              Book a Band transforms event planning from chaotic phone calls
              into effortless instant bookings.
            </p>

            <ul data-stagger="left" className="mt-8 lg:mt-[19px]">
              {appTourItems.map((item, index) => {
                const isActive = index === active;

                return (
                  <li key={item.title} className="relative">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex w-full items-center gap-4 py-5 pr-3 text-left transition-colors duration-500 lg:gap-[1.1cqw] lg:pb-[22px] lg:pt-[39px] lg:pr-0 ${
                        isActive
                          ? "bg-[radial-gradient(ellipse_75%_100%_at_15%_100%,rgba(150,0,175,0.75),rgba(90,0,120,0.35)_50%,transparent_100%)]"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`grid size-12 shrink-0 place-items-center rounded-[14px] transition-colors duration-500 lg:size-[3.125cqw] lg:rounded-[0.83cqw] ${
                          isActive
                            ? "bg-gradient-to-br from-[#5e00a8] to-[#a800ab] text-white shadow-[0_8px_24px_rgba(168,0,171,0.35)]"
                            : "border border-white/[0.06] bg-[#151129] text-white"
                        }`}
                      >
                        <Icon name={item.icon} className="size-6 lg:size-[1.45cqw]" />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-lg font-semibold leading-tight text-white lg:text-[max(18px,1.25cqw)] lg:leading-[1.25]">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-sm leading-[1.4] text-white/80 lg:text-[max(14px,0.83cqw)] lg:leading-[22px]">
                          {item.body}
                        </span>
                      </span>
                    </button>

                    <span className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-[#252431]">
                      {isActive && (
                        <span
                          key={active}
                          className="animate-tour-progress block h-full w-full bg-[#d3d3d6]"
                        />
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Figma: phone + scan chip artwork is 545 × 873 at (1217, 1546) */}
          <div data-reveal="right" data-parallax="0.06" className="relative mx-auto aspect-[1090/1746] w-full max-w-[320px] sm:max-w-[380px] lg:absolute lg:left-[63.39%] lg:top-[-6px] lg:mx-0 lg:w-[28.39%] lg:max-w-none">
            {appTourItems.map((item, index) => (
              <Image
                key={item.image}
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 1024px) 70vw, 545px"
                priority={index === 0}
                className={`object-contain object-center transition-opacity duration-700 ${
                  index === active ? "z-10 opacity-100" : "z-0 opacity-0"
                }`}
              />
            ))}
            <span className="sr-only">{current.imageAlt}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
