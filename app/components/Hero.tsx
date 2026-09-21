import Image from "next/image";

import StatsGrid from "./StatsGrid";
import Waveform from "./Waveform";
import { storeLinks } from "./site-content";

/*
 * Figma frame is 1920 × 986. On lg+ every block is placed as a percentage of
 * that artboard (x / 1920, y / 986) and type is sized in container units, so
 * the composition scales as one piece. Below lg it falls back to a stack.
 */
export default function Hero() {
  return (
    <section id="home" className="relative w-full text-white">
      {/* Background: concert photo + Figma purple lift (screen) */}
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden rounded-b-[40px] bg-black sm:rounded-b-[60px] lg:rounded-b-[100px]">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[rgb(20,0,28)] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent lg:hidden" />
      </div>

      <div className="@container relative z-10 mx-auto flex w-full max-w-[1920px] flex-col gap-6 lg:max-w-[min(1920px,calc(100svh*1.68))] px-5 pb-10 pt-[88px] sm:px-8 sm:pt-[104px] lg:block lg:aspect-[1920/986] lg:gap-0 lg:p-0">
        {/* Figma: badge x800 y237 */}
        <p data-hero="badge" className="glass relative z-20 w-fit rounded-[100px] px-3.5 py-2 text-xs font-semibold tracking-[0.32px] text-[#00c9c6] sm:text-sm lg:absolute lg:left-[41.67%] lg:top-[24.04%] lg:px-[0.73cqw] lg:py-[0.52cqw] lg:text-[max(14px,0.83cqw)] lg:leading-[22px]">
          LIVE MUSIC ON DEMAND
        </p>

        {/* "Sound" is an image locked to YOUR — em units keep it in sync
            with the fluid heading size at every breakpoint. */}
        <h1 data-hero="title" className="display relative pb-[2.2em] pt-[0.6em] text-[clamp(34px,10vw,60px)] leading-none lg:p-0 sm:whitespace-nowrap lg:absolute lg:left-[7.29%] lg:top-[28.6%] lg:text-[6cqw]">
          <span className="block sm:inline">FIND</span>{" "}
          <span className="relative inline-block lg:static">
            YOUR
            <span data-hero="sound" className="pointer-events-none absolute left-[-5%] top-[-82%] z-10 h-[3.875em] w-[6.35em] lg:left-[17.2cqw] lg:top-[-7.25cqw] lg:h-[25.78cqw] lg:w-[40.96cqw]">
              <Image
                src="/sound.png"
                alt="Sound"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 45vw"
                className="object-contain object-left mix-blend-screen lg:object-fill"
              />
            </span>
          </span>
        </h1>

        <p data-hero="copy" className="max-w-[441px] text-base leading-[26px] tracking-[0.4px] lg:max-w-[24cqw] lg:tracking-[0.3px] [text-shadow:0px_0px_30px_rgba(0,0,0,0.8)] sm:text-lg lg:absolute lg:left-[7.29%] lg:top-[41.9%] lg:text-[max(16px,1.04cqw)] lg:leading-[1.5]">
          Welcome to the official home of{" "}
          <span className="font-semibold">Book a Band</span> — new platform for
          your favorite bands!
        </p>

        <div
          id="get-app"
          data-hero="cta"
          className="flex flex-wrap items-center gap-6 lg:absolute lg:left-[7.29%] lg:top-[57.3%] lg:gap-[2.08cqw] lg:flex-nowrap"
        >
          <Image
            src="/qr.png"
            alt="Scan to download the Book a Band app"
            width={148}
            height={148}
            priority
            className="size-[120px] rounded-[14px] object-cover sm:size-[147.6px] sm:rounded-[17.712px] lg:size-[7.69cqw] lg:rounded-[0.92cqw]"
          />

          <div className="flex flex-col gap-4 lg:gap-[1.25cqw]">
            {storeLinks.map(({ src, alt, href }) => (
              <a
                key={alt}
                href={href}
                className="transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={162}
                  height={60}
                  className="h-[52px] w-[140px] object-contain sm:h-[60.48px] sm:w-[162px] lg:h-[3.15cqw] lg:w-[8.44cqw]"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Figma: pill x767 y627 (387 × 61) */}
        <div data-hero="pill" className="glass flex w-fit max-w-full items-center gap-2.5 rounded-[100px] py-1.5 pl-1.5 pr-3 sm:gap-3.5 sm:py-2 sm:pl-2 sm:pr-3.5 lg:absolute lg:left-[39.95%] lg:top-[63.64%] lg:gap-[0.6cqw] lg:py-[0.42cqw] lg:pl-[0.42cqw] lg:pr-[0.78cqw]">
          <Image
            src="/play.svg"
            alt="Play"
            width={44}
            height={44}
            className="size-9 sm:size-11 lg:size-[2.29cqw]"
          />
          <Waveform className="hidden h-5 w-[54px] min-[380px]:block sm:h-6 sm:w-[66px] lg:h-[1.25cqw] lg:w-[3.5cqw]" />
          <p className="min-w-0 whitespace-nowrap text-[13px] leading-normal min-[380px]:text-sm sm:text-base lg:text-[max(11px,0.83cqw)]">
            <span className="opacity-80">Playing Band:</span>{" "}
            <span className="font-semibold">Live Stage Vibe</span>
          </p>
        </div>

        {/* Figma: visible phones span x1252 → 1712, y180 → 795 */}
        <div data-hero="phones" className="relative mx-auto aspect-[1191/1708] w-full max-w-[300px] sm:max-w-[380px] lg:absolute lg:left-[58.8%] lg:top-[5.9%] lg:mx-0 lg:w-[31.15%] lg:max-w-none">
          <Image
            src="/phones.png"
            alt="Book a Band app running on two iPhones"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 600px"
            className="object-contain object-center"
          />
        </div>

        {/* Figma: cards straddle the hero's bottom edge (y917 → 1055) */}
        <div className="lg:absolute lg:left-[7.27%] lg:top-[92.95%] lg:w-[85.5%]">
          <StatsGrid />
        </div>
      </div>
    </section>
  );
}
