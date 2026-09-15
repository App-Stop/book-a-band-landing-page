import { assets } from "@/lib/assets";
import { StoreButtons } from "./StoreButtons";

/**
 * Figma 5:1483 — Swipe, Watch & Book (1920 × 780)
 * https://www.figma.com/design/Jimqly7l8IdOUUODZS7S0v/Untitled?node-id=5-1483
 * Visual: Group 6898 (phone + Book Band + avatar orbs + 4.6)
 */
export function SwipeSection() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-20 md:px-[200px] md:py-28">
      {/* Figma purple / magenta radial behind phone */}
      <div className="pointer-events-none absolute right-[-4%] top-1/2 size-[640px] -translate-y-1/2 rounded-full bg-[#ce00af]/35 blur-[140px]" />
      <div className="pointer-events-none absolute right-[8%] top-[20%] size-[420px] rounded-full bg-[#7a00c4]/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[22%] size-[360px] rounded-full bg-[#a855f7]/25 blur-[100px]" />

      <div className="relative mx-auto grid max-w-[1520px] items-center gap-12 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-[48px] xl:gap-[72px]">
        <div className="flex flex-col gap-10 md:gap-[48px]">
          <div className="flex flex-col gap-6 md:gap-[28px]">
            <h2 className="flex items-start gap-[14px] text-[clamp(36px,4.2vw,64px)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white">
              <span
                className="mt-[6px] inline-flex shrink-0 items-center justify-center md:mt-2"
                aria-hidden
              >
                <svg
                  width="42"
                  height="48"
                  viewBox="0 0 48 51"
                  fill="none"
                  className="h-[42px] w-[36px] md:h-[51px] md:w-[48px]"
                >
                  <path d="M8 4L42 25.5L8 47V4Z" fill="white" />
                </svg>
              </span>
              <span>
                <span className="block text-nowrap">Swipe, Watch</span>
                <span className="block">&amp; Book</span>
              </span>
            </h2>
            <p className="max-w-[520px] text-[16px] leading-[26px] tracking-[0.4px] text-white md:text-[20px] md:leading-[30px]">
              Scroll through short clips of live performances, hear bands in
              action, and book your favorite act for any event — all without
              leaving the feed.
            </p>
          </div>
          <StoreButtons qrSize={148} />
        </div>

        <div className="relative mx-auto w-full max-w-[680px] justify-self-end lg:mx-0 lg:max-w-[720px]">
          <div className="pointer-events-none absolute left-[45%] top-[50%] size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff1fad]/40 blur-[100px]" />
          <img
            src={assets.swipeVisual}
            alt="Book a Band swipe feed — Book Band CTA and live reels"
            className="relative z-10 mx-auto h-auto w-full object-contain"
            width={1024}
            height={1010}
          />
        </div>
      </div>
    </section>
  );
}
