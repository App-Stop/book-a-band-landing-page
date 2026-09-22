"use client";

import { useState } from "react";

import Icon from "./Icon";
import { testimonials } from "./site-content";

const total = testimonials.length;

/* Signed distance from `active`, wrapped to the shortest direction around
   the cycle (e.g. -1/0/1 for a 3-item set) — lets every testimonial keep a
   stable React key while just its role (prev/active/next) changes, so the
   width/position swap animates instead of popping. */
function offsetFrom(index: number, active: number) {
  let delta = index - active;
  if (delta > total / 2) delta -= total;
  if (delta < -total / 2) delta += total;
  return delta;
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const move = (step: number) =>
    setActive((index) => (index + step + total) % total);

  return (
    <section className="relative w-full overflow-hidden bg-[#0f0b21] border-t border-white/10 py-16 lg:pb-[121px] lg:pt-[118px] short:pb-[56px] short:pt-[96px]">
      {/* Figma: violet bloom on the right, blue bloom on the left */}
      <div className="pointer-events-none absolute right-[-8%] top-[25%] h-[700px] w-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(120,20,190,0.4),transparent_66%)]" />
      <div className="pointer-events-none absolute left-[-6%] top-[30%] h-[700px] w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(20,50,140,0.42),transparent_66%)]" />

      <div className="@container relative">
        <div className="page-x mx-auto w-full max-w-[1920px]">
          <h2 data-reveal="up" className="display mx-auto text-center text-[clamp(20px,2.5vw,48px)] uppercase leading-[1.21]">
            <span className="block sm:whitespace-nowrap">
              Loved by event hosts &amp;
            </span>
            <span className="block sm:whitespace-nowrap">touring musicians</span>
          </h2>
          <p data-reveal="up" className="mx-auto mt-4 max-w-[900px] text-center text-base leading-[30px] text-white lg:mt-5 lg:text-[max(16px,1.04cqw)]">
            Real experiences from organizers and artists across Texas,
            California, and beyond.
          </p>
        </div>

        <div data-reveal="scale" className="mx-auto mt-10 flex max-w-[1920px] items-center justify-center gap-0 overflow-hidden px-4 lg:mt-[59px] short:mt-[28px] lg:gap-[4.1cqw] lg:px-0">
          {testimonials
            .map((item, index) => ({ item, offset: offsetFrom(index, active) }))
            .sort((a, b) => a.offset - b.offset)
            .map(({ item, offset }) => {
              const isActive = offset === 0;

              return (
                <article
                  key={item.name}
                  aria-hidden={!isActive}
                  className={`shrink-0 overflow-hidden text-[#14121c] transition-all duration-500 ease-out ${
                    isActive
                      ? "w-[min(646px,88vw)] translate-x-0 rounded-[24px] bg-[#e7e7eb] p-5 opacity-100 shadow-[0_30px_60px_rgba(0,0,0,0.35)] lg:w-[33.65cqw] lg:p-[1.6cqw]"
                      : `pointer-events-none h-0 w-0 rounded-[24px] p-0 opacity-0 lg:h-auto lg:w-[26.93cqw] lg:p-[1.25cqw] lg:opacity-100 ${
                          offset < 0
                            ? "-translate-x-2 bg-[linear-gradient(90deg,#5c5c65,#e7e8ec_85%)]"
                            : "translate-x-2 bg-[linear-gradient(270deg,#575762,#e7e8ec_85%)]"
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

        <div data-reveal="up" className="mt-8 flex items-center justify-center gap-[38px] lg:mt-[56px] short:mt-[26px]">
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
