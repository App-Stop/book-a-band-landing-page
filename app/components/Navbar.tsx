"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { navLinks } from "./site-content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu on Escape, outside tap, or when growing to desktop.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onResize);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4 lg:pt-[30px]">
      <div ref={wrapRef} className="relative w-full max-w-[712px]">
        <nav data-hero="nav" className="glass pointer-events-auto flex w-full items-center justify-between gap-3 rounded-[60px] py-2.5 pl-4 pr-2.5 sm:gap-6 sm:py-3.5 sm:pl-[26px] sm:pr-3.5 lg:gap-[40px] lg:py-[10px] lg:pl-[27px] lg:pr-4 lg:leading-none">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="flex shrink-0 items-center"
          >
            <Image
              src="/logo.png"
              alt="Book a Band"
              width={38}
              height={32}
              priority
              className="h-7 w-[33px] object-contain sm:h-8 sm:w-[38px]"
            />
          </a>

          <ul className="hidden items-center gap-4 text-sm leading-normal md:flex lg:gap-6 lg:text-base">
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
              className="glass hidden items-center gap-1.5 rounded-[20px] py-2 pl-2 pr-3.5 text-sm transition-opacity duration-200 hover:opacity-80 sm:flex lg:text-base"
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
              onClick={() => setOpen(false)}
              className="rounded-full bg-gradient-to-b from-[#0300a6] to-[#ce00af] px-4 py-2.5 text-xs font-semibold shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:px-5 sm:py-3 sm:text-sm lg:px-[18px] lg:py-[11px] lg:text-base"
            >
              Get the App
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="glass grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-200 hover:bg-white/10 md:hidden"
            >
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-white transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu: same glass panel as the bar, drops down beneath it */}
        <div
          id="mobile-menu"
          className={`glass absolute inset-x-0 top-full mt-2 origin-top overflow-hidden rounded-[28px] transition-all duration-300 md:hidden ${
            open
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-2 scale-95 opacity-0"
          }`}
          aria-hidden={!open}
          style={{ backgroundColor: "rgba(16, 11, 36, 0.97)" }}
        >
          <ul className="flex flex-col p-3">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-between rounded-[18px] px-4 py-3.5 text-base font-medium transition-colors duration-200 hover:bg-white/10 active:bg-white/15"
                >
                  {label}
                  <span className="text-[var(--pink)]" aria-hidden>
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-3 border-t border-white/15 p-3">
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              className="glass flex items-center gap-1.5 rounded-[20px] py-2 pl-2 pr-3.5 text-sm transition-opacity duration-200 hover:opacity-80"
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
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="rounded-full bg-gradient-to-b from-[#0300a6] to-[#ce00af] px-6 py-3 text-sm font-semibold transition-transform duration-200 active:scale-[0.98]"
            >
              Get the App
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
