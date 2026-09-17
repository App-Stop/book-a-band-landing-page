import Image from "next/image";

import Icon from "./Icon";
import { appFeatures, storeLinks } from "./site-content";

export default function AppFeatures() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0320] py-16 lg:py-[90px]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[1100px] w-[1400px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(126,34,206,0.28),transparent_70%)]" />

      <div className="page-x relative mx-auto flex w-full max-w-[1920px] flex-col gap-16 lg:gap-[80px]">
        {appFeatures.map((feature) => (
          <div
            key={feature.title.join(" ")}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-x-[40px]"
          >
            <div className={feature.reversed ? "lg:order-2 lg:pl-[4%] lg:pt-8" : "lg:pr-[4%] lg:pt-8"}>
              <h2 className="flex items-start gap-3.5 text-[clamp(26px,2.5vw,48px)] font-extrabold uppercase leading-[1.08] tracking-[0.04em] lg:gap-5">
                <Icon
                  name={feature.icon}
                  className="mt-[0.18em] size-[0.62em] shrink-0 text-white"
                />
                <span>
                  {feature.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </h2>

              <p className="mt-4 max-w-[480px] text-sm leading-[22px] text-white/70 lg:mt-5 lg:text-base lg:leading-[26px]">
                {feature.body}
              </p>

              <div className="mt-6 flex items-center gap-5 lg:mt-8 lg:gap-6">
                <Image
                  src="/qr.png"
                  alt="Scan to download the Book a Band app"
                  width={148}
                  height={148}
                  className="size-[92px] rounded-[12px] object-cover lg:size-[110px] lg:rounded-[14px]"
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
                        className="h-[42px] w-[112px] object-contain lg:h-[50px] lg:w-[134px]"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`relative mx-auto w-full ${
                feature.reversed ? "lg:order-1" : ""
              }`}
              style={{
                maxWidth: `${feature.imageWidth > 700 ? 720 : 440}px`,
              }}
            >
              <Image
                src={feature.image}
                alt={feature.imageAlt}
                width={feature.imageWidth}
                height={feature.imageHeight}
                sizes="(max-width: 1024px) 80vw, 720px"
                className={`h-auto w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)] ${
                  feature.imageWidth > 700 ? "origin-center scale-[1.12]" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
