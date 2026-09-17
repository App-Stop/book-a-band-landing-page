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
    <section
      id="features"
      className="relative w-full overflow-hidden bg-[#0b031c] py-16 lg:py-[80px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(122,40,214,0.55),transparent_58%)]" />

      <div className="page-x relative mx-auto grid w-full max-w-[1920px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-[60px]">
        <div className="min-w-0">
          <h2 className="overflow-visible text-[clamp(26px,2.85vw,52px)] font-extrabold uppercase leading-[0.95] tracking-[0.02em]">
            <span className="block whitespace-nowrap">Explore the app</span>
            {/* Glow PNG is 1716×859 — box is oversized like Sound so the script
                sits beside THAT BRINGS instead of a tiny far-right scribble. */}
            <span className="relative mt-[0.08em] inline-block whitespace-nowrap">
              That brings
              <span className="pointer-events-none absolute left-[82%] top-[-1.28em] z-10 h-[3.55em] w-[7.15em]">
                <Image
                  src="/live-music-home.png"
                  alt="Live music home"
                  fill
                  sizes="(max-width: 1024px) 70vw, 420px"
                  className="object-contain object-center mix-blend-screen"
                />
              </span>
            </span>
          </h2>

          <p className="mt-6 max-w-[560px] text-sm leading-[22px] text-white/70 lg:mt-7 lg:text-[15px] lg:leading-[24px]">
            Take an interactive tour through real app screens. Discover how Book
            a Band transforms event planning from chaotic phone calls into
            effortless instant bookings.
          </p>

          <ul className="mt-8 max-w-[720px] lg:mt-10">
            {appTourItems.map((item, index) => {
              const isActive = index === active;

              return (
                <li key={item.title} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex w-full items-start gap-3.5 py-4 pr-3 text-left transition-colors duration-500 lg:gap-4 lg:py-[18px] ${
                      isActive
                        ? "bg-[linear-gradient(90deg,rgba(162,64,255,0.42)_0%,rgba(162,64,255,0.12)_42%,transparent_100%)]"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-500 lg:size-9 ${
                        isActive
                          ? "bg-gradient-to-br from-[#a240ff] to-[#7c3aed] text-white"
                          : "bg-[#1a102e] text-white/55"
                      }`}
                    >
                      <Icon name={item.icon} className="size-4" />
                    </span>

                    <span className="min-w-0 pt-0.5">
                      <span
                        className={`block text-[15px] font-semibold leading-snug lg:text-base ${
                          isActive ? "text-[#c9a6ff]" : "text-white/90"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="mt-1 block max-w-[520px] text-[13px] leading-[19px] text-white/55 lg:text-[13.5px] lg:leading-5">
                        {item.body}
                      </span>
                    </span>
                  </button>

                  <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-white/[0.08]">
                    {isActive && (
                      <span
                        key={active}
                        className="animate-tour-progress block h-full w-full bg-gradient-to-r from-[#a240ff] via-[#ff42dc] to-transparent"
                      />
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Phone screenshot follows the active listing (Figma: ~410px). */}
        <div className="relative mx-auto aspect-[502/1024] w-full max-w-[280px] sm:max-w-[340px] lg:mx-0 lg:ml-auto lg:max-w-[410px]">
          {appTourItems.map((item, index) => (
            <Image
              key={item.image}
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 1024px) 70vw, 410px"
              priority={index === 0}
              className={`object-contain object-center drop-shadow-[0_40px_80px_rgba(80,0,160,0.45)] transition-opacity duration-700 ${
                index === active
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }`}
            />
          ))}
          <span className="sr-only">{current.imageAlt}</span>
        </div>
      </div>
    </section>
  );
}
