import Image from "next/image";

import ScriptAccent from "./ScriptAccent";
import { storeLinks } from "./site-content";

export default function CtaBanner() {
  return (
    <section className="w-full bg-[#05010f] pb-4 lg:pb-6">
      <div className="page-x mx-auto w-full max-w-[1920px]">
        <div className="relative mx-auto w-full max-w-[1640px] overflow-hidden rounded-[24px]">
          <Image
            src="/band-stage.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1640px"
            className="object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(38,8,66,0.94)_0%,rgba(60,12,104,0.78)_45%,rgba(90,20,140,0.55)_100%)]" />

          <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,380px)] lg:gap-8 lg:p-[60px]">
            <div>
              <h2 className="text-[clamp(22px,2.15vw,42px)] font-extrabold uppercase leading-[1.05] tracking-[0.02em]">
                Ready to bring
                <span className="relative mt-[0.08em] inline-block whitespace-nowrap">
                  live music to your
                  <ScriptAccent className="absolute left-full top-[0.02em] ml-[0.18em] text-[0.7em] tracking-normal">
                    next event?
                  </ScriptAccent>
                </span>
              </h2>

              <p className="mt-[clamp(28px,3vw,54px)] max-w-[470px] text-[13px] leading-[19px] text-white/80 lg:text-sm lg:leading-[21px]">
                Download Book a Band on iOS and Android. Find your sound, match
                with vetted local talent, and make memories that last a
                lifetime.
              </p>

              <div className="mt-6 flex items-center gap-5 lg:gap-6">
                <Image
                  src="/qr.png"
                  alt="Scan to download the Book a Band app"
                  width={148}
                  height={148}
                  className="size-[86px] rounded-[12px] object-cover lg:size-[104px] lg:rounded-[14px]"
                />

                <div className="flex flex-col gap-3 lg:gap-4">
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
                        className="h-[40px] w-[108px] object-contain lg:h-[46px] lg:w-[124px]"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Figma: the phone pair is cropped by the banner's bottom edge. */}
            <div className="relative mx-auto h-[300px] w-full max-w-[380px] lg:h-[420px] lg:max-w-[420px]">
              <Image
                src="/app-profile-tilt.png"
                alt=""
                width={601}
                height={988}
                sizes="320px"
                className="absolute -right-4 top-6 h-auto w-[58%] rotate-[8deg] object-contain opacity-95 lg:top-10"
              />
              <Image
                src="/app-discover.png"
                alt="Book a Band discover screen"
                width={956}
                height={1424}
                sizes="380px"
                className="absolute left-0 top-0 h-auto w-[72%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
