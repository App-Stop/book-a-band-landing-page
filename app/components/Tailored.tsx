import Image from "next/image";

import ScriptAccent from "./ScriptAccent";
import { tailoredCards } from "./site-content";

export default function Tailored() {
  return (
    <section
      id="for-artists"
      className="relative w-full overflow-hidden bg-[#0a0320] py-16 lg:py-[90px]"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[700px] w-[1300px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(140,40,210,0.32),transparent_70%)]" />

      <div className="page-x relative mx-auto w-full max-w-[1920px]">
        <h2 className="mx-auto max-w-[980px] text-center text-[clamp(28px,2.9vw,56px)] font-extrabold uppercase leading-[1.05] tracking-[0.04em]">
          Tailored
          <span className="mt-[0.08em] flex flex-wrap items-end justify-center gap-x-4 sm:flex-nowrap">
            <span className="whitespace-nowrap">experiences for</span>
            <ScriptAccent className="mb-[0.1em] text-[0.68em] tracking-normal">
              hosts &amp; performers
            </ScriptAccent>
          </span>
        </h2>

        <div className="mx-auto mt-[clamp(56px,5vw,96px)] w-full max-w-[1640px] rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md lg:p-[30px]">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
            {tailoredCards.map((card) => (
              <li
                key={card.title}
                className="overflow-hidden rounded-[18px] bg-[#160a30] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[1067/972] w-full">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-4 lg:p-5">
                  <h3 className="text-base font-semibold lg:text-lg">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[19px] text-white/60 lg:text-sm lg:leading-5">
                    {card.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-5 lg:mt-[30px] lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <p className="max-w-[540px] text-[13px] leading-[19px] text-white/70 lg:text-sm lg:leading-5">
              Whether you are curating entertainment for hundreds of wedding
              guests or a touring band booking your weekend gigs, Book a Band
              puts you in command.
            </p>

            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a
                href="#get-app"
                className="rounded-full bg-gradient-to-r from-[#0072ff] to-[#00c6ff] px-5 py-2.5 text-xs font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] lg:text-sm"
              >
                Browse verified bands
              </a>
              <a
                href="#for-artists"
                className="rounded-full bg-gradient-to-r from-[#8b2bff] to-[#c400ff] px-5 py-2.5 text-xs font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] lg:text-sm"
              >
                Sign up as a performer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
