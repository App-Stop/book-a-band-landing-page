"use client";

import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { assets } from "@/lib/assets";

const links = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "AI Match", href: "#ai-match" },
  { label: "For Artists", href: "#for-artists" },
] as const;

/** Dual-B mark matching Figma Nav Bar 5:2426 */
function NavLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={assets.navLogo}
      alt="Book a Band"
      className={className}
      width={38}
      height={32}
    />
  );
}

/**
 * Figma Nav Bar 5:2426 — 713×69 at Landing x:604 y:30
 * https://www.figma.com/design/Jimqly7l8IdOUUODZS7S0v/Untitled?node-id=5-2426
 */
export function NavbarDesktop() {
  return (
    <nav
      className="absolute left-[604px] top-[30px] z-50 h-[69px] w-[713px]"
      aria-label="Primary"
    >
      <div
        className="flex h-full w-full items-center rounded-full border border-transparent pl-[26px] pr-[14px]"
        style={{
          background:
            "linear-gradient(rgba(24,19,45,0.75), rgba(24,19,45,0.75)) padding-box, linear-gradient(90deg, #00c9c6 0%, #7c3aed 50%, #ff1fad 100%) border-box",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <Link
          href="/"
          className="flex h-8 w-[42px] shrink-0 items-center"
          aria-label="Book a Band home"
        >
          <NavLogo className="h-[30px] w-[36px] object-contain" />
        </Link>

        <div className="ml-[36px] flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-[14px] font-normal leading-[17px] text-white transition-opacity duration-200 hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-[10px]">
          <button
            type="button"
            className="flex h-[37px] w-[67px] items-center justify-center gap-1.5 rounded-full border border-white/20 bg-transparent transition-colors duration-200 hover:bg-white/5"
            aria-label="Language EN"
          >
            <Globe className="size-5 text-white" strokeWidth={1.5} />
            <span className="text-[14px] leading-[17px] text-white">EN</span>
          </button>

          <a
            href="#download"
            className="flex h-[41px] w-[121px] items-center justify-center rounded-full bg-gradient-to-b from-[#ce00af] to-[#7a00c4] text-[14px] font-semibold leading-[17px] text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-all duration-200 hover:brightness-110"
          >
            Get the App
          </a>
        </div>
      </div>
    </nav>
  );
}

export function NavbarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50 px-4 pt-4">
      <div
        className="mx-auto flex h-[56px] max-w-lg items-center justify-between rounded-full border border-transparent px-4"
        style={{
          background:
            "linear-gradient(rgba(24,19,45,0.85), rgba(24,19,45,0.85)) padding-box, linear-gradient(90deg, #00c9c6 0%, #7c3aed 48%, #ff1fad 100%) border-box",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <Link href="/" aria-label="Book a Band home">
          <NavLogo className="h-7 w-[34px] object-contain" />
        </Link>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full text-white"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-lg rounded-[24px] border border-white/15 bg-[rgba(24,19,45,0.92)] p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-xl px-3 py-2.5 text-[15px] text-white hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-1 flex items-center gap-3 border-t border-white/10 pt-3">
              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-full border border-white/20 px-3 text-[14px] text-white"
              >
                <Globe className="size-4" />
                EN
              </button>
              <a
                href="#download"
                className="flex h-10 flex-1 items-center justify-center rounded-full bg-gradient-to-b from-[#ce00af] to-[#7a00c4] text-[14px] font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Get the App
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
