import { assets } from "@/lib/assets";
import { StoreButtons } from "./StoreButtons";

const links = ["About", "Features", "AI Match", "For Artists", "Contact"];
const socials = [
  { src: assets.instagram, label: "Instagram" },
  { src: assets.twitter, label: "Twitter" },
  { src: assets.facebook, label: "Facebook" },
  { src: assets.youtube, label: "YouTube" },
];

/**
 * Figma 5:1974 — Ready CTA + footer
 * Background: Frame 2085663495 (concert + hand holding phone)
 */
export function FooterSection() {
  return (
    <section className="overflow-hidden bg-black">
      <div className="mx-auto w-full max-w-[1920px] p-5 md:p-10 xl:p-[60px]">
        <div className="relative h-auto min-h-[560px] w-full overflow-hidden rounded-[40px] border border-white/10 md:h-[712px]">
          {/* Exact user/Figma CTA background (includes hand + phone) */}
          <img
            src={assets.footerBg}
            alt=""
            className="absolute inset-0 size-full object-cover object-center"
            width={1024}
            height={444}
          />
          {/* Soft left scrim so copy stays readable over smoke */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent md:from-black/55 md:via-black/20" />

          <div className="relative z-10 flex h-full flex-col justify-center gap-8 px-6 py-14 md:max-w-[720px] md:gap-10 md:px-[80px] md:py-0 lg:px-[100px]">
            <div className="flex flex-col gap-5 md:gap-6">
              <h2 className="relative">
                <span className="block text-6xl text-nowrap w-full font-black uppercase leading-[1.05] text-white">
                  Ready to bring <br /> live music to your
                </span>
                <span className="neon-script relative text-nowrap z-10 mt-1 block text-[clamp(56px,8vw,120px)] leading-[0.9] text-white md:ml-[62%]">
                  next event?
                </span>
              </h2>
              <p className="max-w-[560px] text-[16px] leading-[26px] tracking-[0.4px] text-white/95 md:text-[18px] md:leading-[28px]">
                Download Book a Band on iOS and Android. Find your sound, match
                with vetted local talent, and make memories that last a lifetime.
              </p>
            </div>
            <StoreButtons qrSize={148} />
          </div>
        </div>

        <p className="mt-10 text-center text-[clamp(48px,12vw,182px)] font-black uppercase leading-none text-[#a86aff] opacity-20">
          BOOK A BAND
        </p>
      </div>

      <footer className="mt-6 bg-[#0c0b1a] px-5 py-10 md:px-[140px]">
        <nav className="mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center text-[16px] text-white md:mb-16 md:justify-between md:text-[20px]">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="transition-opacity duration-200 hover:opacity-70 md:flex-1"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="mb-8 flex justify-center gap-[30px] md:hidden">
          {socials.map((social) => (
            <a
              key={social.label}
              href="#"
              aria-label={social.label}
              className="flex size-11 items-center justify-center rounded-[22px] transition-opacity duration-200 hover:opacity-70"
            >
              <img src={social.src} alt="" className="size-5" />
            </a>
          ))}
        </div>

        <div className="h-px w-full bg-gradient-to-r from-white/10 via-[#ff1fad] to-white/10 opacity-40" />

        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-[14px] text-white/60">
            © 2026 Book a Band Inc. All rights reserved.
          </p>
          <div className="hidden gap-[30px] md:flex">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex size-11 items-center justify-center rounded-[22px] transition-opacity duration-200 hover:opacity-70"
              >
                <img src={social.src} alt="" className="size-5" />
              </a>
            ))}
          </div>
          <p className="text-[14px] text-white/60">
            Terms & Conditions | Privacy Policy
          </p>
        </div>
      </footer>
    </section>
  );
}
