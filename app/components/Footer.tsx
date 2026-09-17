import Link from "next/link";

import Icon, { type IconName } from "./Icon";
import { footerLinks, legalLinks } from "./site-content";

const socials: { name: IconName; label: string }[] = [
  { name: "instagram", label: "Instagram" },
  { name: "x", label: "X" },
  { name: "tiktok", label: "TikTok" },
  { name: "youtube", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#05010f] pb-8 pt-6 lg:pb-10">
      <div className="page-x mx-auto w-full max-w-[1920px]">
        <p className="overflow-hidden text-center text-[clamp(32px,7.2vw,150px)] font-extrabold uppercase leading-none tracking-[0.01em] text-[#2c1256] sm:whitespace-nowrap">
          Book a Band
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs text-white/80 lg:mt-10 lg:gap-x-[clamp(40px,7vw,130px)] lg:text-sm">
          {footerLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="transition-opacity duration-200 hover:opacity-70"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col items-center gap-5 border-t border-white/[0.06] pt-5 text-[11px] text-white/45 lg:mt-8 lg:grid lg:grid-cols-3 lg:items-center lg:text-xs">
          <p className="lg:justify-self-start">
            © 2026 Book a Band Inc. All rights reserved.
          </p>

          <ul className="flex items-center gap-4 lg:justify-self-center">
            {socials.map(({ name, label }) => (
              <li key={label}>
                <a
                  href="#social"
                  aria-label={label}
                  className="block text-white/50 transition-colors duration-200 hover:text-white"
                >
                  <Icon name={name} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>

          <p className="flex items-center gap-2 lg:justify-self-end">
            {legalLinks.map(({ label, href }, index) => (
              <span key={label} className="flex items-center gap-2">
                {index > 0 && <span className="text-white/25">|</span>}
                <Link
                  href={href}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
