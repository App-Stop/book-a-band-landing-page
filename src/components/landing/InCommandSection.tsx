import { assets } from "@/lib/assets";
import { StoreButtons } from "./StoreButtons";

/**
 * Figma 5:2386 — exactly 1308 × 526
 * https://www.figma.com/design/Jimqly7l8IdOUUODZS7S0v/Untitled?node-id=5-2386
 */
export function InCommandSection() {
  return (
    <section className="relative overflow-hidden bg-black px-5 pb-16 pt-16 md:px-[140px] md:pb-24 md:pt-24">
      <div className="pointer-events-none absolute left-[12%] top-0 size-[560px] rounded-full bg-[#7c3aed]/22 blur-[130px]" />

      <div className="relative mx-auto h-auto w-full max-w-[1308px] overflow-hidden rounded-[40px] border border-white/10 bg-[rgba(24,19,45,0.55)] backdrop-blur-[20px] md:h-[526px]">
        <div className="grid h-full grid-cols-1 md:grid-cols-[520px_1fr]">
          <div className="relative flex h-[400px] items-end justify-center overflow-hidden pt-10 md:h-full md:pt-14">
            <div className="pointer-events-none absolute left-1/2 top-[18%] size-[320px] -translate-x-1/2 rounded-full bg-[#b56bff]/45 blur-[70px]" />

            <div className="relative z-10 mb-[-88px] h-[115%] w-[min(280px,70vw)] md:mb-[-110px] md:h-[118%] md:w-[360px]">
              <img
                src={assets.inCommandPhone}
                alt="Book a Band app — Find your sound"
                className="absolute inset-0 size-full object-contain object-bottom drop-shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
                width={654}
                height={1008}
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[130px] bg-gradient-to-t from-[rgba(24,19,45,0.98)] via-[rgba(24,19,45,0.55)] to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col justify-center gap-8 px-6 pb-10 pt-2 md:gap-[40px] md:px-[56px] md:pb-0 md:pr-[72px] md:pt-0">
            <p className="max-w-[620px] text-[22px] font-normal leading-[32px] tracking-[0.2px] text-white md:text-[36px] md:leading-[46px]">
              Whether you are curating entertainment for hundreds of wedding
              guests or a touring band booking your weekend gigs,{" "}
              <span className="font-bold">Book a Band</span> puts you in command.
            </p>
            <StoreButtons layout="row" />
          </div>
        </div>
      </div>
    </section>
  );
}
