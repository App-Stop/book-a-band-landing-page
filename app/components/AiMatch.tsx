import Image from "next/image";

import Icon from "./Icon";
import ScriptAccent from "./ScriptAccent";
import MatchedBands from "./MatchedBands";
import { aiMatchSteps } from "./site-content";

export default function AiMatch() {
  return (
    <section
      id="ai-match"
      className="relative w-full overflow-hidden bg-[#0c0b1a] border-t border-white/10 py-16 lg:pb-0 lg:pt-[123px] short:pt-[88px]"
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
        data-reveal="fade"
        data-parallax="0.1"
        className="pointer-events-none absolute left-[-6%] top-[10vw] hidden w-[24.3vw] max-w-[466px] select-none sm:block lg:left-[3.8%] lg:top-[3.1vw]"
      />
      <Image
        src="/Vector 2.png"
        alt=""
        width={384}
        height={672}
        aria-hidden
        data-reveal="fade"
        data-parallax="0.16"
        className="pointer-events-none absolute right-[-4%] top-[14vw] hidden w-[20vw] max-w-[384px] select-none sm:block lg:right-[2.9%] lg:top-[7.3vw]"
      />

      <div className="@container relative mx-auto w-full max-w-[1920px]">
        <div className="relative px-5 sm:px-8 lg:px-0">
          <h2 data-reveal="up" className="display text-center text-[clamp(22px,3.334vw,64px)] uppercase leading-[1.25] lg:leading-[1.22] lg:pr-[11.56%]">
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
          <div data-reveal="up" className="relative mx-auto mt-10 grid w-full max-w-[1308px] grid-cols-1 gap-8 rounded-[30px] border border-[#662e69]/70 bg-[linear-gradient(135deg,rgba(45,15,125,0.32),rgba(20,10,40,0.05)_45%,rgba(95,15,105,0.28))] p-6 pb-24 backdrop-blur-md sm:grid-cols-2 lg:mt-[121px] lg:gap-[10px] lg:p-[30px] lg:pb-[90px] short:mt-[64px] short:pb-[64px]">
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
        <MatchedBands />
      </div>
    </section>
  );
}
