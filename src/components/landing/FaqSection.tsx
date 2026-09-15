"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How does band booking and payment protection work?",
    a: "When you find an act or match through AI, you inspect transparent hourly packages (e.g. $653/hr) and live calendar availability. Once booked, your payment is held in secure escrow and released to the performers only after the show concludes successfully.",
  },
  {
    q: "Is Book a Band natively bilingual in English and Spanish?",
    a: "Yes. The full host and performer experience is available in English and Spanish, including AI matching, chat, contracts, and support.",
  },
  {
    q: "How do touring musicians and bands sign up to get gigs?",
    a: "Create a performer profile, verify your identity, upload packages and live recordings, then start receiving AI-matched requests in your touring radius.",
  },
  {
    q: "Can I bundle sound equipment, stage lighting, or photographers?",
    a: "Absolutely. Add production services like sound rentals, lighting, videography, photography, and staffing into one escrow-backed booking.",
  },
  {
    q: "What happens if an event schedule or venue location changes?",
    a: "You can request changes in-app. The band reviews updates, and escrow terms adjust automatically before funds are released.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-black px-5 py-20 md:px-[300px] md:py-24">
      <div className="pointer-events-none absolute left-[-5%] top-0 size-[480px] rounded-full bg-[#7c3aed]/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-5%] size-[420px] rounded-full bg-[#ff1fad]/12 blur-[120px]" />
      <div className="relative mx-auto flex max-w-[1314px] flex-col gap-12 lg:flex-row lg:gap-20">
        <div className="flex max-w-[581px] flex-col items-start gap-5">
          <h2 className="text-[clamp(36px,5vw,48px)] font-black text-white">FAQs</h2>
          <p className="text-[16px] leading-[22px] tracking-[0.32px] text-white">
            Everything you need to know about booking live musicians, listing your
            band, payment protection, and platform compatibility.
          </p>
          <button
            type="button"
            className="rounded-full border border-[#008da6] px-5 py-3 text-[16px] font-medium text-cyan transition-all duration-200 hover:bg-cyan/10"
          >
            Ask a questions
          </button>
        </div>

        <div className="flex w-full max-w-[653px] flex-col gap-[30px]">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-b border-white/10 pb-5">
                <button
                  type="button"
                  className="flex w-full items-start gap-5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-semibold text-white">{faq.q}</p>
                    {isOpen && (
                      <p className="mt-1.5 text-[16px] leading-5 text-white/80">
                        {faq.a}
                      </p>
                    )}
                  </div>
                  {isOpen ? (
                    <ChevronUp className="mt-0.5 size-5 shrink-0 text-white" />
                  ) : (
                    <ChevronDown className="mt-0.5 size-5 shrink-0 text-white" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
