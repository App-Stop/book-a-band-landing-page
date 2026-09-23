import Link from "next/link";

import Icon from "./Icon";
import { footerLinks, legalLinks, socialLinks } from "./site-content";

export default function Footer() {
  return (
    <footer className="@container w-full bg-[#090814] border-t border-white/10 pb-8 pt-6 lg:pb-[47px] lg:pt-[4px]">
      <div className="page-x mx-auto w-full max-w-[1920px]">
        <p data-reveal="up" className="display text-center text-[clamp(28px,9.48vw,182px)] uppercase leading-none text-[#2c1e48] sm:whitespace-nowrap">
          Book a Band
        </p>

        <ul data-stagger="up" className="mt-6 grid grid-cols-2 items-center gap-y-3 text-center text-sm text-white sm:grid-cols-3 lg:mt-[60px] lg:grid-cols-5 lg:text-[max(14px,1.04cqw)]">
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

        <div data-reveal="fade" className="mt-6 flex flex-col items-center gap-5 border-t border-white/[0.08] pt-5 text-xs text-white/50 lg:mt-[62px] lg:flex lg:flex-row lg:items-center lg:justify-between lg:pt-[42px] lg:text-[max(12px,0.73cqw)]">
          <p>
            © 2026 Book a Band Inc. All rights reserved.
          </p>

          <ul className="flex items-center gap-4 lg:gap-[2.6cqw]">
            {socialLinks.map(({ name, label }) => (
              <li key={label}>
                <a
                  href="#social"
                  aria-label={label}
                  className="block text-white/80 transition-colors duration-200 hover:text-white"
                >
                  <Icon name={name} className="size-[18px] lg:size-[1.2cqw]" />
                </a>
              </li>
            ))}
          </ul>

          <p className="flex items-center gap-2">
            {legalLinks.map(({ label, href }, index) => (
              <span key={label} className="flex items-center gap-2">
                {index > 0 && <span className="text-white/30">|</span>}
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
