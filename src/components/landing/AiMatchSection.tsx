"use client";

import { useEffect, useRef, useState } from "react";
import { assets } from "@/lib/assets";

const occasions = [
  "Wedding reception",
  "Birthday & fiesta",
  "Outdoor festivel",
  "Corporate gala",
];

const vibes = [
  "Mariachi & Cumbia",
  "High-energy Rock",
  "Smooth Jazz & Soul",
  "Top 40 Latin Pop",
];

const bands = [
  {
    image: assets.band1,
    name: "ORCA Band",
    desc: "Authentic 7-piece ensemble bringing festive serenades, brass brilliance, and high-spirited traditional Mexican live energy.",
    tags: ["Mariachi", "Cumbia", "Sierreño"],
    location: "Austin",
    price: "$653.00",
  },
  {
    image: assets.band2,
    name: "Andalusia Rhythms",
    desc: "Passionate performers delivering fiery guitar, heartfelt singing, and vibrant dance that captures the essence of Spanish culture.",
    tags: ["Flamenco", "Bulería", "Cante Jondo"],
    location: "Seville",
    price: "$750.00",
  },
  {
    image: assets.band3,
    name: "Rio de Janeiro Beat",
    desc: "High-energy samba and bossa nova collective built for festivals, rooftops, and unforgettable dance floors.",
    tags: ["Samba", "Bossa Nova", "Sambalanço"],
    location: "Rio de Janeiro",
    price: "$580.00",
  },
  {
    image: assets.band4,
    name: "Neon Pulse Collective",
    desc: "Modern Latin-pop powerhouse blending Top 40 hits with live brass and DJ-ready transitions for any crowd.",
    tags: ["Latin Pop", "Top 40", "Dance"],
    location: "Los Angeles",
    price: "$720.00",
  },
];

const ARTBOARD_W = 1920;
const ARTBOARD_H = 1250;

/** Figma node 5:886 — exact spacing + infinite looping band slider */
export function AiMatchSection() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [occasion, setOccasion] = useState(occasions[0]);
  const [vibe, setVibe] = useState(vibes[0]);
  const loop = [...bands, ...bands];

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / ARTBOARD_W);
    });
    ro.observe(el);
    setScale(el.clientWidth / ARTBOARD_W);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative mx-auto hidden w-full max-w-[1920px] lg:block" ref={shellRef}>
        <div style={{ height: ARTBOARD_H * scale }} className="relative w-full">
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: ARTBOARD_W,
              height: ARTBOARD_H,
              transform: `scale(${scale})`,
            }}
          >
            <img
              src={assets.glowGuitarL}
              alt=""
              className="pointer-events-none absolute left-[72px] top-[47px] h-[760px] w-[466px] mix-blend-color-dodge"
              width={466}
              height={760}
            />
            <img
              src={assets.glowGuitarR}
              alt=""
              className="pointer-events-none absolute left-[1302px] top-[38px] size-[740px] -scale-y-100 rotate-180 mix-blend-color-dodge"
              width={740}
              height={740}
            />
            <div className="pointer-events-none absolute left-[191px] top-0 size-[478px] rounded-full bg-[#ff1fad]/20 blur-[140px]" />
            <div className="pointer-events-none absolute left-[1341px] top-[291px] size-[586px] rounded-full bg-[#7c3aed]/25 blur-[140px]" />

            <div className="absolute left-[514px] top-[94px] h-[239px] w-[893px]">
              <h2 className="absolute left-0 top-0 w-[670px] text-center text-[64px] font-black uppercase leading-none text-white">
                Let{" "}
                <span className="bg-gradient-to-r from-[#ff1fad] from-[24%] to-[#00e5ff] to-[51%] bg-clip-text text-transparent">
                  AI
                </span>{" "}
                Pick The
                <br />
                Best Bands
              </h2>
              <p className="neon-script absolute left-[378px] top-[125px] whitespace-nowrap text-[128px] leading-none text-white">
                For your events
              </p>
            </div>

            <div className="absolute left-[306px] top-[373px] flex w-[1308px] gap-[14px] rounded-[20px] border border-[rgba(255,109,240,0.6)] bg-[rgba(24,19,45,0.2)] px-[30px] pb-[100px] pt-[30px] backdrop-blur-[15px]">
              <div className="flex w-[617px] flex-col gap-4">
                <img
                  src={assets.iconCalendar}
                  alt=""
                  className="size-[60px]"
                  width={60}
                  height={60}
                />
                <div className="flex flex-col gap-4">
                  <p className="text-[24px] font-semibold leading-none text-white">
                    1. Choose event occasion
                  </p>
                  <div className="flex flex-wrap content-center gap-[10px]">
                    {occasions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setOccasion(item)}
                        className={`flex h-[38px] items-center justify-center rounded-full px-[14px] py-2 text-[16px] leading-[22px] tracking-[0.32px] transition-all duration-200 ${
                          occasion === item
                            ? "border border-[#00c9c6] bg-[rgba(24,19,45,0.8)] font-semibold text-[#00c9c6]"
                            : "border border-white/10 bg-[rgba(24,19,45,0.8)] font-normal text-white/80"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex w-[617px] flex-col gap-4">
                <img
                  src={assets.iconMusicPink}
                  alt=""
                  className="size-[60px]"
                  width={60}
                  height={60}
                />
                <div className="flex flex-col gap-4">
                  <p className="text-[24px] font-semibold leading-none text-white">
                    2. Pick musical vibe
                  </p>
                  <div className="flex flex-wrap content-center gap-[10px]">
                    {vibes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setVibe(item)}
                        className={`flex h-[38px] items-center justify-center rounded-full px-[14px] py-2 text-[16px] leading-[22px] tracking-[0.32px] transition-all duration-200 ${
                          vibe === item
                            ? "border border-[#ff1fad] bg-[rgba(24,19,45,0.8)] font-semibold text-[#ff1fad]"
                            : "border border-white/10 bg-[rgba(24,19,45,0.8)] font-normal text-white/80"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Auto infinite slider — Figma y:650, card 800×600, gap 10 */}
            <div className="absolute left-0 top-[650px] h-[600px] w-[1920px] overflow-hidden">
              <div className="band-marquee flex w-max gap-[10px] will-change-transform">
                {loop.map((band, i) => (
                  <BandCard key={`${band.name}-${i}`} band={band} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-14 sm:py-16 lg:hidden">
        <div className="relative mx-auto mb-8 max-w-[893px] text-center sm:mb-10">
          <h2 className="text-[clamp(28px,8vw,36px)] font-black uppercase leading-none text-white">
            Let{" "}
            <span className="bg-gradient-to-r from-[#ff1fad] to-[#00e5ff] bg-clip-text text-transparent">
              AI
            </span>{" "}
            Pick The Best Bands
          </h2>
          <p className="neon-script mt-2 text-[clamp(40px,14vw,64px)] leading-none text-white">
            For your events
          </p>
        </div>
        <div className="mb-8 rounded-[20px] border border-[rgba(255,109,240,0.6)] bg-[rgba(24,19,45,0.2)] p-5 backdrop-blur-[15px]">
          <p className="mb-3 text-[18px] font-semibold text-white">
            1. Choose event occasion
          </p>
          <div className="mb-6 flex flex-wrap gap-2.5">
            {occasions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setOccasion(item)}
                className={`rounded-full px-3.5 py-2.5 text-[14px] ${
                  occasion === item
                    ? "border border-[#00c9c6] font-semibold text-[#00c9c6]"
                    : "border border-white/10 text-white/80"
                } bg-[rgba(24,19,45,0.8)]`}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="mb-3 text-[18px] font-semibold text-white">
            2. Pick musical vibe
          </p>
          <div className="flex flex-wrap gap-2.5">
            {vibes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setVibe(item)}
                className={`rounded-full px-3.5 py-2.5 text-[14px] ${
                  vibe === item
                    ? "border border-[#ff1fad] font-semibold text-[#ff1fad]"
                    : "border border-white/10 text-white/80"
                } bg-[rgba(24,19,45,0.8)]`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="band-marquee flex w-max gap-[10px]">
            {loop.map((band, i) => (
              <BandCard key={`m-${band.name}-${i}`} band={band} mobile />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BandCard({
  band,
  mobile = false,
}: {
  band: (typeof bands)[number];
  mobile?: boolean;
}) {
  return (
    <article
      className={`relative flex shrink-0 flex-col items-end justify-between overflow-hidden rounded-[20px] ${
        mobile ? "h-[400px] w-[min(320px,85vw)]" : "h-[600px] w-[800px]"
      }`}
    >
      <img
        src={band.image}
        alt={band.name}
        className="absolute inset-0 size-full rounded-[20px] object-cover"
        width={mobile ? 320 : 800}
        height={mobile ? 400 : 600}
      />
      <div
        className={`relative z-10 flex w-full items-start justify-between gap-2 p-4 sm:items-center sm:p-5 ${
          mobile ? "min-h-[72px]" : "h-[84px]"
        }`}
      >
        <div className="flex min-w-0 flex-wrap gap-1.5 sm:gap-[10px]">
          {band.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[30px] border border-white/10 bg-[rgba(24,19,45,0.8)] px-2.5 py-1.5 text-[12px] leading-[18px] text-white backdrop-blur-[15px] sm:px-3 sm:py-2 sm:text-[14px] sm:leading-[22px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-gradient-to-b from-[#0300a6] to-[#ce00af] py-2 pl-2 pr-3 text-[12px] font-semibold text-white sm:py-2.5 sm:pr-3.5 sm:text-[14px]">
          <img
            src={assets.iconMatched}
            alt=""
            className="size-4 sm:size-5"
            width={20}
            height={20}
          />
          Matched
        </span>
      </div>
      <div
        className={`relative z-10 flex w-full bg-gradient-to-b from-transparent to-black/60 backdrop-blur-[8px] ${
          mobile
            ? "flex-col gap-4 px-4 pb-4 pt-10"
            : "items-center justify-center gap-[60px] px-[30px] pb-[30px] pt-[60px]"
        }`}
      >
        <div className="min-w-0 flex-1 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          <h4
            className={`font-semibold text-white ${
              mobile ? "text-[20px]" : "whitespace-nowrap text-[24px]"
            }`}
          >
            {band.name}
          </h4>
          <p
            className={`mt-1.5 text-white ${
              mobile
                ? "line-clamp-3 text-[13px] leading-[20px]"
                : "text-[14px] leading-[22px]"
            }`}
          >
            {band.desc}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5 text-white/80">
            <img
              src={assets.iconPin}
              alt=""
              className="size-5"
              width={20}
              height={20}
            />
            <span className="text-[14px] leading-[22px]">{band.location}</span>
          </div>
        </div>
        <div
          className={`shrink-0 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] ${
            mobile ? "flex w-full items-center justify-between gap-3" : ""
          }`}
        >
          <div className={`flex text-white ${mobile ? "flex-row items-baseline gap-1" : "flex-col items-end"}`}>
            <p className={`font-semibold leading-none ${mobile ? "text-[20px]" : "text-[24px]"}`}>
              {band.price}
            </p>
            <p className={`leading-[22px] ${mobile ? "text-[14px]" : "text-[16px]"}`}>/hr</p>
          </div>
          <button
            type="button"
            className={`rounded-full border border-white/10 bg-gradient-to-b from-[#0300a6] to-[#ce00af] text-white transition-all duration-200 hover:brightness-110 ${
              mobile
                ? "px-4 py-2.5 text-[14px] font-semibold"
                : "mt-2.5 px-5 py-3 text-[16px] font-semibold"
            }`}
          >
            Book in the App
          </button>
        </div>
      </div>
    </article>
  );
}
