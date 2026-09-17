import Image from "next/image";

import { navLinks } from "./site-content";

export default function Navbar() {
  return (
    <header className="relative z-30 flex justify-center pt-4 sm:pt-6 lg:pt-[30px]">
      <nav className="glass flex w-full max-w-[720px] items-center justify-between gap-3 rounded-[60px] py-2.5 pl-4 pr-2.5 sm:gap-6 sm:py-3.5 sm:pl-[26px] sm:pr-3.5 lg:gap-[60px]">
        <a href="#home" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Book a Band"
            width={38}
            height={32}
            priority
            className="h-7 w-[33px] object-contain sm:h-8 sm:w-[38px]"
          />
        </a>

        <ul className="hidden items-center gap-4 text-sm leading-normal md:flex lg:gap-6">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="transition-opacity duration-200 hover:opacity-70"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            className="glass hidden items-center gap-1.5 rounded-[20px] py-2 pl-2 pr-3.5 text-sm transition-opacity duration-200 hover:opacity-80 sm:flex"
          >
            <Image
              src="/globe.svg"
              alt=""
              width={20}
              height={21}
              className="h-[21px] w-5"
            />
            EN
          </button>

          <a
            href="#get-app"
            className="rounded-full border border-white/10 bg-gradient-to-b from-[#0300a6] to-[#ce00af] px-4 py-2.5 text-xs font-semibold shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:px-5 sm:py-3 sm:text-sm"
          >
            Get the App
          </a>
        </div>
      </nav>
    </header>
  );
}
