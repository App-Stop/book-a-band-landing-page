import Image from "next/image";

import Icon from "./Icon";
import ScriptAccent from "./ScriptAccent";
import { aiMatchSteps, matchedBands } from "./site-content";

export default function AiMatch() {
  return (
    <section
      id="ai-match"
      className="relative w-full overflow-hidden bg-[#0c0b1a] border-t border-white/10 py-16 lg:pb-0 lg:pt-[123px]"
    >
      {/* Figma: violet bloom behind the heading, deeper glow to the left */}
      <div className="pointer-events-none absolute left-[-10%] top-[10%] h-[900px] w-[1100px] bg-[radial-gradient(ellipse_at_center,rgba(80,40,220,0.6),transparent_66%)]" />
      <div className="pointer-events-none absolute right-[-15%] top-[45%] h-[800px] w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(120,20,190,0.4),transparent_66%)]" />

      {/* Pink glow behind the left guitarist, purple behind the right */}
      <div className="pointer-events-none absolute left-[-14%] top-[4vw] hidden h-[42vw] w-[42vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,66,220,0.55),rgba(214,40,190,0.25)_40%,transparent_70%)] blur-[60px] sm:block lg:left-[-6%]" />
      <div className="pointer-events-none absolute right-[-16%] top-[8vw] hidden h-[38vw] w-[38vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(150,40,240,0.55),rgba(120,20,190,0.28)_40%,transparent_70%)] blur-[60px] sm:block lg:right-[-8%]" />

      {/* Figma: two guitarist silhouettes flank the heading */}
      <Image
        src="/Vector.png"
        alt=""
        width={466}
        height={755}
        aria-hidden
        className="pointer-events-none absolute left-[-6%] top-[10vw] hidden w-[24.3vw] max-w-[466px] select-none sm:block lg:left-[3.8%] lg:top-[3.1vw]"
      />
      <Image
        src="/Vector 2.png"
        alt=""
        width={384}
        height={672}
        aria-hidden
        className="pointer-events-none absolute right-[-4%] top-[14vw] hidden w-[20vw] max-w-[384px] select-none sm:block lg:right-[2.9%] lg:top-[7.3vw]"
      />

      <div className="@container relative mx-auto w-full max-w-[1920px]">
        <div className="relative px-5 sm:px-8 lg:px-0">
          <h2 className="display text-center text-[clamp(22px,3.334vw,64px)] uppercase leading-[1.25] lg:leading-[1.22] lg:pr-[11.56%]">
            Let{" "}
            <span className="bg-gradient-to-r from-[#8b3dff] to-[#f472d0] bg-clip-text text-transparent">
              AI
            </span>{" "}
            pick the
            <span className="block">best bands</span>
          </h2>
          {/* Figma: script sits under "BANDS", x880 y2760 */}
          <ScriptAccent className="mt-2 flex justify-center text-[clamp(46px,6.667vw,128px)] lg:absolute lg:left-[46.1%] lg:top-[6.2cqw] lg:mt-0 lg:block">
            For your events
          </ScriptAccent>

          {/* Figma: 1308px panel, tucked under the band cards */}
          <div className="relative mx-auto mt-10 grid w-full max-w-[1308px] grid-cols-1 gap-8 rounded-[30px] border border-[#662e69]/70 bg-[linear-gradient(135deg,rgba(45,15,125,0.32),rgba(20,10,40,0.05)_45%,rgba(95,15,105,0.28))] p-6 pb-24 backdrop-blur-md sm:grid-cols-2 lg:mt-[121px] lg:gap-[10px] lg:p-[30px] lg:pb-[90px]">
            {aiMatchSteps.map((step, stepIndex) => (
              <div key={step.label}>
                <span
                  className="grid size-[60px] place-items-center"
                  style={{ color: step.accent }}
                >
                  <Icon name={step.icon} className="size-[72px]" />
                </span>

                <p className="mt-4 text-xl font-semibold lg:text-2xl lg:leading-[30px]">
                  {step.label}
                </p>

                <ul className="mt-[15px] flex flex-wrap gap-[9px]">
                  {step.options.map((option, optionIndex) => {
                    const isActive = optionIndex === 0;

                    return (
                      <li key={option}>
                        <button
                          type="button"
                          className="rounded-full border px-4 py-2 text-sm leading-[21px] transition-colors duration-200 lg:py-[9px] lg:text-base"
                          style={
                            isActive
                              ? {
                                  borderColor: step.accent,
                                  color: step.accent,
                                  backgroundColor: `${step.accent}1a`,
                                  fontWeight: 600,
                                }
                              : {
                                  borderColor: "rgba(255,255,255,0.1)",
                                  backgroundColor: "#16112b",
                                  color: "rgba(255,255,255,0.9)",
                                }
                          }
                        >
                          {option}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {stepIndex === 0 && (
                  <span className="sr-only">
                    Selected: {step.options[0]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Matched bands run edge to edge, exactly as in Figma (800 × 600). */}
        <ul className="relative z-10 mt-8 flex snap-x snap-mandatory gap-[0.52%] overflow-x-auto pb-2 [scrollbar-width:none] lg:-mt-[57px] lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {matchedBands.map((band) => (
            <li
              key={band.name}
              className="relative aspect-[800/600] w-[86%] shrink-0 snap-start overflow-hidden rounded-[30px] sm:w-[60%] lg:w-[41.667%]"
            >
              <Image
                src={band.image}
                alt={`${band.name} performing live`}
                fill
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 60vw, 42vw"
                className="object-cover"
                style={{ objectPosition: band.imagePosition }}
              />
              <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/55 to-transparent" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3.5 lg:p-[2.6%]">
                <ul className="flex flex-wrap gap-2">
                  {band.genres.map((genre) => (
                    <li
                      key={genre}
                      className="rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs leading-[21px] backdrop-blur-md lg:px-3 lg:py-[9px] lg:text-sm"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>

                <span className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#1400a6] to-[#6b00aa] px-3 py-1.5 text-xs font-semibold leading-[21px] lg:px-5 lg:py-2 lg:text-base">
                  Matched
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3.5 lg:p-[3.75%] lg:pb-[4.5%]">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold lg:text-2xl lg:leading-[30px]">
                      {band.name}
                    </h3>

                    <p className="mt-1.5 max-w-[520px] text-xs leading-[18px] text-white/80 lg:mt-1 lg:text-sm lg:leading-[22px]">
                      {band.blurb}
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-white/80 lg:mt-[7px] lg:text-sm">
                      <Icon name="pin" className="size-4 lg:size-5" />
                      {band.location}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end">
                    <p className="text-sm font-semibold lg:text-2xl lg:leading-[30px]">
                      {band.price}
                    </p>
                    <p className="text-[10px] text-white/80 lg:text-base">/hr</p>
                    <a
                      href="#get-app"
                      className="mt-2 rounded-full bg-gradient-to-b from-[#0300a6] to-[#ce00af] px-3.5 py-2 text-xs font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] lg:mt-[10px] lg:px-5 lg:py-[10.5px] lg:text-base lg:leading-6"
                    >
                      Book in the App
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
