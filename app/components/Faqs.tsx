"use client";

import { useState } from "react";

import Icon from "./Icon";
import { faqs } from "./site-content";

export default function Faqs() {
  const [open, setOpen] = useState(0);

  return (
    <section id="contact" className="w-full bg-[#05010f] py-16 lg:py-[90px]">
      <div className="page-x mx-auto w-full max-w-[1920px]">
        <div className="mx-auto grid w-full max-w-[1490px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-[60px]">
          <div>
            <h2 className="text-[clamp(28px,2.1vw,40px)] font-extrabold leading-tight tracking-[0.02em]">
              FAQs
            </h2>
            <p className="mt-3 max-w-[380px] text-[13px] leading-[19px] text-white/60 lg:text-sm lg:leading-5">
              Everything you need to know about booking live musicians, listing
              your band, payment protection, and platform compatibility.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-block rounded-full border border-[var(--cyan)] px-4 py-2 text-xs text-[var(--cyan)] transition-colors duration-200 hover:bg-[var(--cyan)]/10 lg:text-sm"
            >
              Ask a questions
            </a>
          </div>

          <ul>
            {faqs.map((faq, index) => {
              const isOpen = index === open;

              return (
                <li key={faq.question} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-4 text-left lg:py-5"
                  >
                    <span className="text-sm font-semibold lg:text-base">
                      {faq.question}
                    </span>
                    <Icon
                      name="chevron-down"
                      className={`size-5 shrink-0 text-white/70 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="overflow-hidden pb-4 text-[13px] leading-[19px] text-white/60 lg:text-sm lg:leading-[21px]">
                      {faq.answer}
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
