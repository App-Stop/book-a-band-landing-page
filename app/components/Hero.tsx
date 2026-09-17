import Image from "next/image";

import Navbar from "./Navbar";
import StatsGrid from "./StatsGrid";
import { storeLinks } from "./site-content";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden rounded-b-[40px] bg-black text-white sm:rounded-b-[60px] lg:rounded-b-[100px]"
    >
      {/* Background: concert photo + Figma purple multiply overlay */}
      <div className="absolute inset-0 -z-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[rgba(51,0,79,0.4)] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 lg:from-black/20 lg:to-black/40" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col px-5 sm:px-8 lg:px-10 xl:px-[clamp(40px,7.29vw,140px)]">
        <Navbar />

        {/* Hero grid: copy column + phone mockups */}
        <div className="grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-start lg:gap-8 lg:py-[60px]">
          <div className="flex flex-col gap-6 lg:gap-1 lg:pt-[clamp(20px,3.6vw,70px)]">
            {/* Figma: badge sits at 69% of the copy column, just above the headline */}
            <p className="glass relative z-20 w-fit rounded-[100px] px-3.5 py-2 text-xs font-semibold tracking-[0.32px] text-[#00c9c6] sm:text-sm lg:-mb-4 lg:ml-[45%] lg:text-base lg:leading-[22px] xl:ml-[65%]">
              LIVE MUSIC ON DEMAND
            </p>

            {/* "Sound" is an image locked to YOUR — em units keep it in sync
                with the fluid heading size at every breakpoint. */}
            {/* Figma overlaps the Sound glow with the badge and the subtitle,
                so the heading keeps almost no vertical padding on desktop. */}
            <h1 className="relative pb-[0.35em] pt-[0.35em] font-[family-name:var(--font-display)] text-[clamp(38px,4.7vw,90px)] font-black leading-none sm:whitespace-nowrap lg:pb-[0.65em] lg:pr-[61px] lg:pt-0 lg:text-center">
              <span className="block sm:inline">FIND</span>{" "}
              <span className="relative inline-block">
                YOUR
                <span className="pointer-events-none absolute left-[-5%] top-[-82%] z-10 h-[3.875em] w-[6.35em]">
                  <Image
                    src="/sound.png"
                    alt="Sound"
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 45vw"
                    className="object-contain object-left mix-blend-screen"
                  />
                </span>
              </span>
            </h1>

            <p className="max-w-[441px] text-base leading-[26px] tracking-[0.4px] [text-shadow:0px_0px_30px_rgba(0,0,0,0.8)] sm:text-lg lg:text-[20px] lg:leading-[30px]">
              Welcome to the official home of{" "}
              <span className="font-semibold">Book a Band</span> — new platform
              for your favorite bands!
            </p>

            {/* Figma: headline block ends at 514, QR row starts at 565 */}
            <div className="flex flex-col gap-6 lg:mt-[92px]">
              <div
                id="get-app"
                className="flex flex-wrap items-center gap-6 lg:gap-10"
              >
                <Image
                  src="/qr.png"
                  alt="Scan to download the Book a Band app"
                  width={148}
                  height={148}
                  priority
                  className="size-[120px] rounded-[14px] object-cover sm:size-[147.6px] sm:rounded-[17.712px]"
                />

                <div className="flex flex-col gap-4 lg:gap-6">
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
                        className="h-[52px] w-[140px] object-contain sm:h-[60.48px] sm:w-[162px]"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Figma: pill sits right of the store buttons, at 40% of the frame */}
              <div className="glass flex w-fit shrink-0 items-center gap-2.5 rounded-[100px] py-1.5 pl-1.5 pr-3 sm:gap-3.5 sm:py-2 sm:pl-2 sm:pr-3.5 lg:-mt-12 lg:ml-[45%] xl:-mt-[110px] xl:ml-[62%]">
                <Image
                  src="/play.svg"
                  alt="Play"
                  width={44}
                  height={44}
                  className="size-9 sm:size-11"
                />
                <Image
                  src="/waveform.svg"
                  alt=""
                  width={66}
                  height={24}
                  className="h-5 w-[54px] sm:h-6 sm:w-[66px]"
                />
                <p className="whitespace-nowrap text-sm leading-normal sm:text-base">
                  <span className="opacity-80">Playing Band:</span>{" "}
                  <span className="font-semibold">Live Stage Vibe</span>
                </p>
              </div>
            </div>
          </div>

          {/* Figma: phone group is 475px wide (x 1248→1723 on a 1920 frame) */}
          <div className="relative mx-auto aspect-[864/1239] w-full max-w-[300px] sm:max-w-[380px] lg:mr-0 lg:ml-auto lg:max-w-[clamp(300px,24.7vw,475px)]">
            <Image
              src="/phones.png"
              alt="Book a Band app running on two iPhones"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 475px"
              className="object-contain object-center drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>

        <div className="pb-10 lg:pb-16">
          <StatsGrid />
        </div>
      </div>
    </section>
  );
}
