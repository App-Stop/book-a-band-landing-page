import Image from "next/image";

import ScriptAccent from "./ScriptAccent";
import { tailoredCards } from "./site-content";

/* Per-card top glow sampled from the Figma frame. */
const glows = [
  "radial-gradient(ellipse 90% 45% at 50% 0%, rgba(74,24,170,0.6), transparent 100%)",
  "radial-gradient(ellipse 90% 45% at 50% 0%, rgba(30,120,150,0.6), transparent 100%)",
  "radial-gradient(ellipse 90% 45% at 50% 0%, rgba(130,16,96,0.6), transparent 100%)",
];

export default function Tailored() {
  return (
    <section
      id="for-artists"
      className="relative w-full overflow-hidden py-16 lg:pb-[99px] lg:pt-[223px]"
    >
      {/* Figma: broad violet bloom centred behind the heading */}
      <div className="pointer-events-none absolute left-1/2 top-[6%] h-[900px] w-[1500px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(110,20,170,0.5),transparent_66%)]" />

      <div className="@container relative mx-auto w-full max-w-[1920px]">
        <div className="relative px-5 sm:px-8 lg:px-0">
          <h2 className="display text-center text-[clamp(22px,3.125vw,60px)] uppercase leading-[1.3] lg:pr-[15.4%]">
            Tailored
            <span className="block">experiences for</span>
          </h2>
          {/* Figma: script overlaps the end of the heading, x904 */}
          <ScriptAccent className="mt-2 flex justify-center text-[clamp(30px,5.42vw,104px)] lg:absolute lg:left-[47.6%] lg:top-[6.2cqw] lg:mt-0 lg:block">
            hosts &amp; performers
          </ScriptAccent>

          <ul className="mx-auto mt-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-[125px] lg:ml-[7.29%] lg:w-[85.42%] lg:grid-cols-3 lg:gap-[19px]">
            {tailoredCards.map((card, index) => (
              <li
                key={card.title}
                className="overflow-hidden rounded-[32px] border border-transparent transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: `${glows[index]} padding-box, linear-gradient(#141028,#141028) padding-box, linear-gradient(180deg,#883989,rgba(255,255,255,0.06) 60%) border-box`,
                }}
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

                <div className="px-5 pb-6 lg:px-[29px] lg:pb-[30px]">
                  <h3 className="text-lg font-semibold lg:text-[23.7px] lg:leading-[30px]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-5 text-white/80 lg:mt-[6px] lg:text-[15.5px] lg:leading-[22px]">
                    {card.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-5 px-0 lg:ml-[7.29%] lg:mt-[40px] lg:w-[85.42%] lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <p className="max-w-[830px] text-base leading-6 text-white lg:text-[20.4px] lg:leading-[30px]">
              Whether you are curating entertainment for hundreds of wedding
              guests or a touring band booking your weekend gigs, Book a Band
              puts you in command.
            </p>

            <div className="flex flex-wrap gap-5 lg:shrink-0">
              <a
                href="#get-app"
                className="rounded-full bg-gradient-to-b from-[#0072ff] to-[#00a3d9] px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] lg:px-7 lg:py-[18px] lg:text-base lg:leading-6"
              >
                Browse verified bands
              </a>
              <a
                href="#for-artists"
                className="rounded-full bg-gradient-to-b from-[#5a00b8] to-[#a300a8] px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] lg:px-7 lg:py-[18px] lg:text-base lg:leading-6"
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
