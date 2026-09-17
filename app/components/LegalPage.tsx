import Image from "next/image";
import Link from "next/link";

import Footer from "./Footer";

export function LegalGap({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[3px] bg-[#fff3cd] px-1.5 py-px text-[#222]">
      {children}
    </span>
  );
}

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-[#05010f] text-white">
      <header className="page-x mx-auto flex w-full max-w-[1920px] items-center justify-between gap-4 py-5">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Book a Band"
            width={38}
            height={32}
            className="h-8 w-[38px] object-contain"
          />
        </Link>

        <div className="flex items-center gap-4 text-sm text-white/70">
          <Link href="/terms" className="transition-opacity hover:text-white">
            Terms
          </Link>
          <Link href="/privacy" className="transition-opacity hover:text-white">
            Privacy
          </Link>
          <a
            href="#get-app"
            className="rounded-full border border-white/10 bg-gradient-to-b from-[#0300a6] to-[#ce00af] px-4 py-2 text-xs font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Get the App
          </a>
        </div>
      </header>

      <article className="page-x mx-auto w-full max-w-[1400px] pb-16 pt-6 lg:pb-24 lg:pt-10">
        <h1 className="text-[clamp(28px,4vw,40px)] font-extrabold leading-tight tracking-[0.02em]">
          {title}
        </h1>
        {children}
      </article>

      <Footer />
    </div>
  );
}
