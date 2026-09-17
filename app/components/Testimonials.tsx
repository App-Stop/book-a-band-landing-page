"use client";

import { useState } from "react";

import Icon from "./Icon";
import { testimonials } from "./site-content";

const total = testimonials.length;

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const move = (step: number) =>
    setActive((index) => (index + step + total) % total);

  const window = [
    { index: (active - 1 + total) % total, offset: -1 },
    { index: active, offset: 0 },
    { index: (active + 1) % total, offset: 1 },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#080219] py-16 lg:py-[90px]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[1200px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(126,34,206,0.35),transparent_70%)]" />

      <div className="relative">
        <div className="page-x mx-auto w-full max-w-[1920px]">
          <h2 className="mx-auto text-center text-[clamp(24px,2.7vw,52px)] font-extrabold uppercase leading-[1.05] tracking-[0.02em]">
            <span className="block sm:whitespace-nowrap">
              Loved by event hosts &amp;
            </span>
            <span className="block sm:whitespace-nowrap">touring musicians</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[720px] text-center text-sm text-white/70 lg:text-base">
            Real experiences from organizers and artists across Texas,
            California, and beyond.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 px-4 lg:mt-[60px] lg:gap-6">
          {window.map(({ index, offset }) => {
            const item = testimonials[index];
            const isActive = offset === 0;

            return (
              <article
                key={`${item.name}-${offset}`}
                aria-hidden={!isActive}
                className={`shrink-0 rounded-[16px] bg-[#e9e9ef] p-5 text-[#14121c] transition-all duration-500 lg:p-6 ${
                  isActive
                    ? "w-[min(640px,88vw)] opacity-100 shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                    : "hidden w-[min(420px,26vw)] scale-95 opacity-40 lg:block"
                }`}
              >
                <p className="text-sm leading-[22px] lg:text-base lg:leading-[26px]">
                  {item.quote}
                </p>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#a240ff] to-[#ff42dc] text-xs font-bold text-white lg:size-10">
                      {item.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[#7c3aed]">
                        {item.name}
                      </span>
                      <span className="block text-[11px] text-[#5c5866] lg:text-xs">
                        {item.role}
                      </span>
                    </span>
                  </div>

                  <div className="flex shrink-0 gap-1 text-[#ff7a1a]">
                    {Array.from({ length: item.rating }).map((_, star) => (
                      <Icon key={star} name="star" className="size-4" />
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 lg:mt-10">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous testimonial"
            className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] transition-colors duration-200 hover:bg-white/15"
          >
            <Icon name="chevron-left" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next testimonial"
            className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] transition-colors duration-200 hover:bg-white/15"
          >
            <Icon name="chevron-right" className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
