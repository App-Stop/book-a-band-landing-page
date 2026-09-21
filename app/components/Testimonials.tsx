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
    <section className="relative w-full overflow-hidden border-b border-white/[0.06] py-16 lg:pb-[121px] lg:pt-[120px]">
      {/* Figma: violet bloom on the right, blue bloom on the left */}
      <div className="pointer-events-none absolute right-[-8%] top-[25%] h-[700px] w-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(120,20,190,0.4),transparent_66%)]" />
      <div className="pointer-events-none absolute left-[-6%] top-[30%] h-[700px] w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(20,50,140,0.42),transparent_66%)]" />

      <div className="@container relative">
        <div className="page-x mx-auto w-full max-w-[1920px]">
          <h2 className="display mx-auto text-center text-[clamp(20px,2.344vw,45px)] uppercase leading-[1.29]">
            <span className="block sm:whitespace-nowrap">
              Loved by event hosts &amp;
            </span>
            <span className="block sm:whitespace-nowrap">touring musicians</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[900px] text-center text-base leading-[30px] text-white lg:mt-5 lg:text-[max(16px,1.04cqw)]">
            Real experiences from organizers and artists across Texas,
            California, and beyond.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-[1920px] items-center justify-center gap-4 px-4 lg:mt-[59px] lg:gap-[4.1cqw] lg:px-0">
          {window.map(({ index, offset }) => {
            const item = testimonials[index];
            const isActive = offset === 0;

            return (
              <article
                key={`${item.name}-${offset}`}
                aria-hidden={!isActive}
                className={`shrink-0 text-[#14121c] transition-all duration-500 ${
                  isActive
                    ? "w-[min(646px,88vw)] rounded-[24px] bg-[#e7e7eb] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.35)] lg:w-[33.65cqw] lg:p-[1.6cqw]"
                    : `hidden rounded-[24px] p-5 lg:block lg:w-[26.93cqw] lg:p-[1.25cqw] ${
                        offset < 0
                          ? "bg-[linear-gradient(90deg,#5c5c65,#e7e8ec_85%)]"
                          : "bg-[linear-gradient(270deg,#575762,#e7e8ec_85%)]"
                      }`
                }`}
              >
                <p
                  className={`text-sm leading-[22px] ${
                    isActive
                      ? "lg:text-[max(15px,1.01cqw)] lg:leading-[26px]"
                      : "lg:text-[max(12px,0.73cqw)] lg:leading-[20px]"
                  }`}
                >
                  {item.quote}
                </p>

                <div className={`mt-5 flex items-center justify-between gap-4 ${isActive ? "lg:mt-[1.04cqw]" : "lg:mt-[0.83cqw]"}`}>
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#a240ff] to-[#ff42dc] text-xs font-bold text-white lg:size-[2.4cqw]">
                      {item.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-[#975af4] lg:text-[max(13px,0.83cqw)]">
                        {item.name}
                      </span>
                      <span className="block text-[11px] text-[#5c5866] lg:text-[max(11px,0.68cqw)]">
                        {item.role}
                      </span>
                    </span>
                  </div>

                  <div className="flex shrink-0 gap-1 text-[#f96c00] lg:gap-[0.4cqw]">
                    {Array.from({ length: item.rating }).map((_, star) => (
                      <Icon
                        key={star}
                        name="star"
                        className={
                          isActive
                            ? "size-4 lg:size-[1.25cqw]"
                            : "size-3.5 lg:size-[0.95cqw]"
                        }
                      />
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-[38px] lg:mt-[56px]">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous testimonial"
            className="grid size-11 place-items-center rounded-full border border-white/20 bg-[#131122] transition-colors duration-200 hover:bg-white/15"
          >
            <Icon name="chevron-left" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next testimonial"
            className="grid size-11 place-items-center rounded-full border border-white/20 bg-[#131122] transition-colors duration-200 hover:bg-white/15"
          >
            <Icon name="chevron-right" className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
