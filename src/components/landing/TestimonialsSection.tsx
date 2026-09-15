"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { assets } from "@/lib/assets";

const testimonials = [
  {
    quote:
      '"We needed a high-energy Cumbia and Mariachi group for our daughter\'s Quinceañera in Austin. Book a Band matched us with Mariachi Sol y Luna in under five minutes. The package pricing was crystal clear, zero haggling, and they tore the house down. Our guests are still talking about the trumpet solos!"',
    name: "Maria Rodriguez",
    role: "Private Event Host • Austin, TX",
  },
  {
    quote:
      '"I was looking for a jazz ensemble for my wedding reception in New Orleans. Book a Band connected us with the Jazz All-Stars in no time. Their professionalism was unmatched, and the music created the perfect atmosphere for our big day!"',
    name: "John Smith",
    role: "Wedding Planner • New Orleans, LA",
  },
  {
    quote:
      '"I was looking for a jazz ensemble for my wedding reception in New Orleans. Book a Band connected us with the Jazz All-Stars in no time. Their professionalism was unmatched, and the music created the perfect atmosphere for our big day!"',
    name: "Emily Johnson",
    role: "Corporate Event Organizer • San Francisco, CA",
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black px-5 py-20 md:py-[120px]">
      <div className="pointer-events-none absolute right-[10%] top-0 size-[502px] rounded-full bg-[#ff1fad]/18 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[10%] left-[10%] size-[540px] rounded-full bg-[#7c3aed]/18 blur-[120px]" />

      <div className="relative mx-auto max-w-[1077px] text-center">
        <h2 className="text-[clamp(28px,4vw,48px)] font-black uppercase leading-none text-white">
          Loved by event hosts & touring musicians
        </h2>
        <p className="mt-5 text-[16px] leading-[26px] tracking-[0.4px] text-white md:text-[20px] md:leading-[30px]">
          Real experiences from organizers and artists across Texas, California,
          and beyond.
        </p>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-[1700px] items-center justify-center gap-4">
        <div className="hidden w-[515px] shrink-0 scale-95 opacity-50 lg:block">
          <TestimonialCard
            quote={testimonials[(index + 2) % 3].quote}
            name={testimonials[(index + 2) % 3].name}
            role={testimonials[(index + 2) % 3].role}
            compact
          />
        </div>
        <div className="w-full max-w-[644px]">
          <TestimonialCard
            quote={active.quote}
            name={active.name}
            role={active.role}
          />
        </div>
        <div className="hidden w-[515px] shrink-0 scale-95 opacity-50 lg:block">
          <TestimonialCard
            quote={testimonials[(index + 1) % 3].quote}
            name={testimonials[(index + 1) % 3].name}
            role={testimonials[(index + 1) % 3].role}
            compact
          />
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-10">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => setIndex((i) => (i + 2) % 3)}
          className="flex size-[42px] items-center justify-center rounded-full border border-white/60 bg-[#131122] transition-colors duration-200 hover:bg-white/10"
        >
          <ChevronLeft className="size-[26px] text-white" />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => setIndex((i) => (i + 1) % 3)}
          className="flex size-[42px] items-center justify-center rounded-full border border-white/60 bg-[#131122] transition-colors duration-200 hover:bg-white/10"
        >
          <ChevronRight className="size-[26px] text-white" />
        </button>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  compact = false,
}: {
  quote: string;
  name: string;
  role: string;
  compact?: boolean;
}) {
  return (
    <article
      className={`flex flex-col justify-end gap-4 rounded-[20px] border border-white/60 bg-[rgba(24,19,45,0.2)] shadow-[0_20px_120px_#07001b] backdrop-blur-[15px] ${
        compact ? "p-6" : "p-[30px]"
      }`}
    >
      <p
        className={`text-white ${
          compact ? "text-[14px] leading-5" : "text-[20px] leading-[26px]"
        }`}
      >
        {quote}
      </p>
      <div className="flex items-center gap-5">
        <div className="flex min-w-0 flex-1 items-center gap-3.5">
          <img
            src={assets.avatar}
            alt={name}
            className={`shrink-0 rounded-full border-2 border-white/10 object-cover ${
              compact ? "size-[37px]" : "size-[46px]"
            }`}
          />
          <div>
            <p
              className={`font-medium text-white ${
                compact ? "text-[13px]" : "text-[16px]"
              }`}
            >
              {name}
            </p>
            <p
              className={`text-white/60 ${
                compact ? "text-[10px]" : "text-[12px]"
              }`}
            >
              {role}
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 text-white" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={compact ? "text-[13px]" : "text-[16px]"}>
              ★
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
