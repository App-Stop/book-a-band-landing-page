"use client";

import { useEffect, useRef, useState } from "react";
import { assets } from "@/lib/assets";
import { NavbarDesktop, NavbarMobile } from "./Navbar";
import { StoreButtons } from "./StoreButtons";

const stats = [
  { value: "5,000+", label: "Verified Live Bands", to: "#a240ff" },
  { value: "50+", label: "Musical Genres & Styles", to: "#407fff" },
  { value: "12,500+", label: "Successful Gigs Booked", to: "#ff4099" },
  { value: "4.9 ★", label: "Average Host & Fan Rating", to: "#ff6f40" },
];

const WAVEFORM = [
  { h: 3, c: "#ff42dc" },
  { h: 9, c: "#ff6ad5" },
  { h: 18, c: "#ce00af" },
  { h: 6, c: "#a855f7" },
  { h: 12, c: "#ff1fad" },
  { h: 24, c: "#ff42dc" },
  { h: 12, c: "#ce00af" },
  { h: 6, c: "#a855f7" },
  { h: 2, c: "#ff6ad5" },
  { h: 6, c: "#ff1fad" },
  { h: 21, c: "#ce00af" },
  { h: 12, c: "#ff42dc" },
];

const ARTBOARD_W = 1920;
const ARTBOARD_H = 1093;

/**
 * Pixel layout from Figma Landing (5:345)
 * Hero BG 1920×1025; stats at y=956; QR/player centered.
 */
export function HeroSection() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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
            <div className="absolute left-0 top-0 h-[1025px] w-[1920px] overflow-hidden rounded-b-[100px]">
              <img
                src={assets.heroBg}
                alt=""
                className="absolute left-0 top-[0.12%] h-[119.93%] w-full max-w-none object-cover"
                width={1920}
                height={1025}
              />
              <div className="absolute inset-0 bg-[rgba(51,0,79,0.4)] mix-blend-multiply" />
            </div>

            <NavbarDesktop />

            <div className="absolute left-[1139px] top-[257px] flex h-[38px] w-[229px] items-center justify-center rounded-full border border-[#00c9c6] bg-[rgba(0,0,0,0.35)] px-[14px] shadow-[0_0_18px_rgba(0,201,198,0.45)] backdrop-blur-md">
              <span className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-[0.06em] text-white">
                LIVE MUSIC ON DEMAND
              </span>
            </div>

            <div className="absolute left-[485px] top-[280px] h-[280px] w-[951px]">
              <p className="absolute left-0 top-[7px] w-full text-center text-[128px] font-black uppercase leading-none text-white">
                FIND YOUR
              </p>
              <p className="neon-script-hero absolute left-[470px] top-[22px] z-10 whitespace-nowrap text-[240px] leading-none text-white">
                Sound
              </p>
              {/* Figma: full welcome copy sits under FIND YOUR (left of Sound) */}
              <p className="absolute left-0 top-[168px] z-20 w-[520px] text-[20px] leading-[30px] tracking-[0.4px] text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                Welcome to the official home of{" "}
                <span className="font-semibold">Book a Band</span> — new platform
                for your favorite bands!
              </p>
            </div>

            <div className="absolute left-[785px] top-[585px]">
              <StoreButtons />
            </div>

            <div className="absolute left-[768px] top-[799px] flex h-[60px] w-[420px] items-center gap-[14px] rounded-[80px] border border-white/10 bg-[rgba(24,19,45,0.8)] py-2 pl-2 pr-7 backdrop-blur-[15px]">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3a00a6] to-[#ce00af]">
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden>
                  <path d="M2 1.5L13 8L2 14.5V1.5Z" fill="white" />
                </svg>
              </div>
              <div className="flex h-6 shrink-0 items-end gap-[6px]" aria-hidden>
                {WAVEFORM.map((bar, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full"
                    style={{ height: bar.h, backgroundColor: bar.c }}
                  />
                ))}
              </div>
              <p className="min-w-0 flex-1 whitespace-nowrap pr-2 text-[16px] leading-[19px] text-white">
                <span className="opacity-80">Playing Band:</span>{" "}
                <span className="font-medium">Live Stage Vibe</span>
              </p>
            </div>

            <div className="absolute left-[140px] top-[956px] flex w-[1640px] gap-[30px]">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex h-[137px] w-[387.5px] flex-col items-center justify-center gap-[14px] rounded-[20px] border border-[rgba(255,255,255,0.6)] bg-[rgba(24,19,45,0.2)] p-[30px] text-center backdrop-blur-[15px]"
                >
                  <p
                    className="bg-clip-text text-[36px] font-bold leading-none text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, #ffffff, ${stat.to})`,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[16px] leading-none text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative lg:hidden">
        <NavbarMobile />
        <div className="relative min-h-[720px] overflow-hidden rounded-b-[48px]">
          <img
            src={assets.heroBg}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(51,0,79,0.4)] mix-blend-multiply" />
          <div className="relative z-10 flex min-h-[720px] flex-col px-5 pb-10 pt-24">
            <div className="mb-4 self-end rounded-full border border-[#00c9c6] bg-black/35 px-3.5 py-2 shadow-[0_0_14px_rgba(0,201,198,0.35)] backdrop-blur-md">
              <span className="text-[12px] font-medium tracking-[0.06em] text-white">
                LIVE MUSIC ON DEMAND
              </span>
            </div>
            <div>
              <h1 className="text-[48px] font-black uppercase leading-none text-white">
                FIND YOUR
              </h1>
              <p className="neon-script-hero -mt-4 text-[80px] leading-none text-white">
                Sound
              </p>
              <p className="mt-4 max-w-[441px] text-[16px] leading-[26px] text-white">
                Welcome to the official home of{" "}
                <span className="font-semibold">Book a Band</span> — new platform
                for your favorite bands!
              </p>
            </div>
            <div className="mt-auto flex flex-col items-center gap-6 pt-10">
              <StoreButtons qrSize={120} />
              <div className="flex w-full max-w-[420px] items-center gap-3 rounded-[80px] border border-white/10 bg-[rgba(24,19,45,0.8)] py-2 pl-2 pr-6 backdrop-blur-[15px]">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3a00a6] to-[#ce00af]">
                  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden>
                    <path d="M2 1.5L13 8L2 14.5V1.5Z" fill="white" />
                  </svg>
                </div>
                <div className="flex h-6 shrink-0 items-end gap-[6px]" aria-hidden>
                  {WAVEFORM.slice(0, 8).map((bar, i) => (
                    <span
                      key={i}
                      className="w-[2px] rounded-full"
                      style={{ height: bar.h, backgroundColor: bar.c }}
                    />
                  ))}
                </div>
                <p className="min-w-0 flex-1 text-[14px] text-white">
                  <span className="opacity-80">Playing Band:</span> Live Stage Vibe
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 -mt-8 grid grid-cols-2 gap-3 px-5 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-2 rounded-[20px] border border-white/60 bg-[rgba(24,19,45,0.2)] p-5 text-center backdrop-blur-[15px]"
            >
              <p
                className="bg-clip-text text-[24px] font-bold text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to bottom, #ffffff, ${stat.to})`,
                }}
              >
                {stat.value}
              </p>
              <p className="text-[12px] text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
