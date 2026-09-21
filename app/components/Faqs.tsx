"use client";

import { useState } from "react";

import Icon from "./Icon";
import { faqs } from "./site-content";

export default function Faqs() {
  const [open, setOpen] = useState(0);

  return (
    <section id="contact" className="w-full bg-[#0c0b1a] border-t border-white/10 py-16 lg:pb-[103px] lg:pt-[181px]">
      <div className="page-x mx-auto w-full max-w-[1920px]">
        <div className="mx-auto grid w-full max-w-[1314px] grid-cols-1 gap-10 lg:grid-cols-[546px_minmax(0,653px)] lg:justify-between lg:gap-0">
          <div data-reveal="left" className="lg:pt-[5px]">
            <h2 className="display text-[clamp(26px,2.5vw,48px)] leading-[1.21]">
              FAQs
            </h2>
            <p className="mt-5 max-w-[546px] text-base leading-[22px] text-white">
              Everything you need to know about booking live musicians, listing
              your band, payment protection, and platform compatibility.
            </p>
            <a
              href="#contact"
              className="mt-[22px] inline-block rounded-full border border-[var(--cyan)] px-5 py-[10px] text-base leading-[21px] text-[var(--cyan)] transition-colors duration-200 hover:bg-[var(--cyan)]/10"
            >
              Ask a questions
            </a>
          </div>

          <ul data-stagger="up" className="lg:-mt-[19px]">
            {faqs.map((faq, index) => {
              const isOpen = index === open;

              return (
                <li key={faq.question} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-[24.5px] text-left"
                  >
                    <span className="text-base font-semibold leading-5">
                      {faq.question}
                    </span>
                    <Icon
                      name="chevron-down"
                      className={`size-5 shrink-0 text-white transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "-mt-[19px] grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="overflow-hidden pr-6 text-base leading-5 text-white/85">
                      <span className="block pb-[24px]">{faq.answer}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
