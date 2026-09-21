"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import Icon from "./Icon";
import { storeLinks } from "./site-content";

const GetAppContext = createContext<{
  open: () => void;
  close: () => void;
} | null>(null);

export function useGetApp() {
  const value = useContext(GetAppContext);
  if (!value) {
    throw new Error("useGetApp must be used inside GetAppProvider");
  }
  return value;
}

export function GetAppProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href="#get-app"]');
      if (!link) return;
      event.preventDefault();
      show();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [show]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, hide]);

  return (
    <GetAppContext.Provider value={{ open: show, close: hide }}>
      {children}
      <GetAppModal open={open} onClose={hide} />
    </GetAppContext.Provider>
  );
}

function GetAppModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
        onClick={onClose}
      />

      {/* Figma node 40:12397 — 900 × 776 popup */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="get-app-title"
        className="relative z-10 w-full max-w-[900px] overflow-hidden rounded-[20px] text-white shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            sizes="900px"
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-[rgba(40,0,72,0.78)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(122,40,214,0.4),transparent_70%)]" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-white/45 text-white transition-colors duration-200 hover:bg-white/10 sm:right-5 sm:top-5"
        >
          <Icon name="close" className="size-5" />
        </button>

        <div className="relative z-10 px-5 pb-5 pt-10 sm:px-10 sm:pb-6 sm:pt-11 lg:px-[48px] lg:pt-12">
          <h2
            id="get-app-title"
            className="display text-center text-[clamp(22px,4vw,40px)] uppercase leading-none"
          >
            Scan to download
          </h2>
          <p className="mx-auto mt-2.5 max-w-[540px] text-center text-[13px] leading-5 text-white/80 sm:text-sm">
            Point your smartphone camera at the QR to download Book a Band
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:mt-7 sm:flex-row sm:items-end sm:gap-5 lg:gap-8">
            <div className="flex flex-col items-center">
              <Image
                src="/qr.png"
                alt="Scan to download the Book a Band app"
                width={296}
                height={296}
                priority
                className="size-[200px] rounded-[20px] bg-white object-cover sm:size-[240px] lg:size-[268px]"
              />

              <div className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-3.5">
                {storeLinks.map(({ src, alt, href }) => (
                  <a
                    key={alt}
                    href={href}
                    className="transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={162}
                      height={60}
                      className="h-[40px] w-[108px] object-contain sm:h-[44px] sm:w-[118px]"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative h-[300px] w-[150px] shrink-0 overflow-hidden sm:h-[390px] sm:w-[195px] lg:h-[420px] lg:w-[210px]">
              <Image
                src="/phones.png"
                alt="Book a Band app on iPhone"
                fill
                sizes="210px"
                className="scale-[1.45] object-cover object-[40%_42%] drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
