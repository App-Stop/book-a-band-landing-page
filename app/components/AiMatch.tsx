import Image from "next/image";

import Icon from "./Icon";
import ScriptAccent from "./ScriptAccent";
import { aiMatchSteps, matchedBands } from "./site-content";

export default function AiMatch() {
  return (
    <section
      id="ai-match"
      className="relative w-full overflow-hidden bg-[#0a0320] py-16 lg:py-[90px]"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,40,200,0.35),transparent_70%)]" />

      <div className="relative">
        <div className="page-x mx-auto w-full max-w-[1920px]">
          <h2 className="mx-auto max-w-[980px] text-center text-[clamp(28px,2.9vw,56px)] font-extrabold uppercase leading-[1.05] tracking-[0.04em]">
            Let{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#f472d0] bg-clip-text text-transparent">
              AI
            </span>{" "}
            pick the
            <span className="mt-[0.08em] flex flex-wrap items-end justify-center gap-x-4 sm:flex-nowrap">
              <span className="whitespace-nowrap">best bands</span>
              <ScriptAccent className="mb-[0.1em] text-[0.7em] tracking-normal">
                For your events
              </ScriptAccent>
            </span>
          </h2>

          {/* Figma: 1330px glass panel with the two match steps */}
          <div className="mx-auto mt-[clamp(56px,5vw,96px)] grid w-full max-w-[1330px] grid-cols-1 gap-8 rounded-[20px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:grid-cols-2 lg:gap-[60px] lg:p-[30px]">
            {aiMatchSteps.map((step, stepIndex) => (
              <div key={step.label}>
                <span
                  className="grid size-9 place-items-center rounded-lg"
                  style={{
                    color: step.accent,
                    backgroundColor: `${step.accent}1f`,
                  }}
                >
                  <Icon name={step.icon} className="size-5" />
                </span>

                <p className="mt-3.5 text-sm font-semibold lg:text-base">
                  {step.label}
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {step.options.map((option, optionIndex) => {
                    const isActive = optionIndex === 0;

                    return (
                      <li key={option}>
                        <button
                          type="button"
                          className="rounded-full border px-3 py-1.5 text-[11px] leading-none transition-colors duration-200 lg:text-xs"
                          style={
                            isActive
                              ? {
                                  borderColor: step.accent,
                                  color: step.accent,
                                  backgroundColor: `${step.accent}1a`,
                                }
                              : {
                                  borderColor: "rgba(255,255,255,0.16)",
                                  color: "rgba(255,255,255,0.7)",
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

        {/* Matched bands run edge to edge, exactly as in Figma. */}
        <ul className="mt-[clamp(32px,3vw,54px)] flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {matchedBands.map((band) => (
            <li
              key={band.name}
              className="relative aspect-[800/633] w-[86vw] shrink-0 snap-start overflow-hidden sm:w-[60vw] lg:w-[41.6vw]"
            >
              <Image
                src={band.image}
                alt={`${band.name} performing live`}
                fill
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 60vw, 42vw"
                className="object-cover"
                style={{ objectPosition: band.imagePosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3.5 lg:p-5">
                <ul className="flex flex-wrap gap-1.5">
                  {band.genres.map((genre) => (
                    <li
                      key={genre}
                      className="rounded-md bg-black/55 px-2 py-1 text-[10px] uppercase leading-none tracking-wide backdrop-blur-sm lg:text-[11px]"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>

                <span className="flex shrink-0 items-center gap-1 rounded-md bg-gradient-to-r from-[#a240ff] to-[#ff42dc] px-2.5 py-1 text-[10px] font-semibold uppercase leading-none lg:text-[11px]">
                  Matched
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3.5 lg:p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-bold lg:text-xl">
                    {band.name}
                  </h3>
                  <p className="shrink-0 text-right text-sm font-bold lg:text-lg">
                    {band.price}
                    <span className="block text-[10px] font-normal text-white/60 lg:text-xs">
                      /hr
                    </span>
                  </p>
                </div>

                <p className="mt-1.5 max-w-[62%] text-[11px] leading-[16px] text-white/70 lg:text-[13px] lg:leading-[19px]">
                  {band.blurb}
                </p>

                <div className="mt-2.5 flex items-end justify-between gap-4 lg:mt-4">
                  <p className="flex items-center gap-1 text-[11px] text-white/70 lg:text-xs">
                    <Icon name="pin" className="size-3.5" />
                    {band.location}
                  </p>

                  <a
                    href="#get-app"
                    className="rounded-full bg-gradient-to-r from-[#8b2bff] to-[#c400ff] px-3.5 py-2 text-[11px] font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] lg:px-5 lg:py-2.5 lg:text-xs"
                  >
                    Book in the App
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
