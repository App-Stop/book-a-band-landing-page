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

      {/* Figma node 30:417 — 900px-wide popup */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="get-app-title"
        className="relative z-10 flex max-h-[95vh] w-full max-w-[900px] flex-col items-center gap-8 overflow-hidden rounded-[32px] bg-[#23213c] px-5 pb-8 pt-8 text-white shadow-[0px_4px_160px_rgba(0,0,0,0.6)] sm:gap-10 sm:rounded-[40px] sm:px-8 sm:pb-10 sm:pt-9 lg:gap-[clamp(16px,5vh,60px)] lg:rounded-[50px] lg:px-[30px] lg:pb-[clamp(16px,7vh,80px)] lg:pt-[clamp(16px,3.5vh,30px)]"
      >
        {/* Figma: two blurred colour blobs (#001EFF left, #D000FF right) */}
        <div className="pointer-events-none absolute -left-[20%] -top-[10%] h-[70%] w-[65%] rounded-full bg-[#001EFF] opacity-25 blur-[70px] sm:blur-[90px] lg:blur-[110px]" />
        <div className="pointer-events-none absolute -right-[15%] bottom-[-15%] h-[75%] w-[65%] rounded-full bg-[#D000FF] opacity-25 blur-[70px] sm:blur-[90px] lg:blur-[110px]" />

        {/* Figma: guitarist silhouette blended into the background */}
        <Image
          src="/Vector 2.png"
          alt=""
          width={384}
          height={672}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[115%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-60 mix-blend-color-dodge"
        />

        <div className="relative z-10 flex w-full flex-col items-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/60 bg-[rgba(24,19,45,0.2)] shadow-[0_27px_60px_rgba(0,0,0,0.06)] backdrop-blur-[15px] transition-colors duration-200 hover:bg-white/10 sm:size-11 lg:size-[clamp(36px,6vh,50px)]"
          >
            <Icon name="close" className="size-4 sm:size-5" />
          </button>

          <div className="flex w-full flex-col items-center gap-2 text-center sm:gap-3 lg:gap-[clamp(8px,1.5vh,16px)]">
            <h2
              id="get-app-title"
              className="display text-[clamp(20px,min(4.5vw,5.5vh),48px)] uppercase leading-none"
            >
              Scan to download
            </h2>
            <p className="mx-auto max-w-[540px] text-[15px] leading-6 tracking-[0.4px] text-white text-shadow-[0px_0px_30px_rgba(0,0,0,0.8)] sm:text-base lg:text-[clamp(14px,2vh,20px)] lg:leading-[clamp(20px,3vh,30px)]">
              Point your smartphone camera at the QR to download Book a Band
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-row items-center justify-center gap-4 sm:gap-12 lg:gap-[clamp(24px,6vh,100px)]">
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-[clamp(12px,4vh,40px)]">
            <Image
              src="/qr.png"
              alt="Scan to download the Book a Band app"
              width={342}
              height={342}
              priority
              className="size-[150px] rounded-[22px] bg-white object-cover sm:size-[240px] sm:rounded-[34px] lg:size-[clamp(120px,24vh,342px)] lg:rounded-[clamp(18px,3.5vh,50px)]"
            />

            <div className="flex items-center gap-2 sm:gap-4 lg:gap-[clamp(8px,2vh,24px)]">
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
                    className="h-[26px] w-[71px] object-contain sm:h-[46px] sm:w-[125px] lg:h-[clamp(26px,5vh,60px)] lg:w-[clamp(71px,13.6vh,163px)]"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* app-discover.png has a lot of glow padding baked around the phone
              itself (the modal's own blobs already supply that atmosphere),
              so crop tight to just the bezel via a scaled background-image
              instead of rendering the full padded asset at a bigger size.
              lg: sizing is vh-clamped (not a fixed size or a `short:` cutoff)
              so it shrinks continuously with the viewport instead of ever
              forcing the modal to scroll. */}
          <div
            aria-hidden="true"
            className="w-[90px] shrink-0 overflow-hidden rounded-[10%] bg-[length:181.75%_auto] bg-center bg-no-repeat sm:w-[150px] lg:w-[clamp(90px,17vh,210px)]"
            style={{
              backgroundImage: "url('/app-discover.png')",
              aspectRatio: "526 / 1090",
            }}
          />
          <span className="sr-only">Book a Band app on iPhone</span>
        </div>
      </div>
    </div>
  );
}
