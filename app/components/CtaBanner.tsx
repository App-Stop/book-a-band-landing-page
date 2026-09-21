import Image from "next/image";

import ScriptAccent from "./ScriptAccent";
import { storeLinks } from "./site-content";

/*
 * Figma banner: 1640 × 711 at (140, 9842). On lg+ children are placed with
 * percentages of the banner (x / 1640, y / 711); type is sized against the
 * 1920 frame via container units.
 */
export default function CtaBanner() {
  return (
    <section className="@container w-full pb-4 lg:pb-0">
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-0">
        <div className="relative mx-auto flex w-full flex-col gap-8 overflow-hidden rounded-[32px] p-6 sm:p-8 lg:ml-[7.29%] lg:block lg:aspect-[1640/711] lg:w-[85.42%] lg:gap-0 lg:rounded-[5.2cqw] lg:p-0">
          <Image
            src="/band-stage.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1640px"
            className="object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(50,10,74,0.92)_0%,rgba(58,12,92,0.82)_55%,rgba(66,16,104,0.72)_100%)]" />

          <h2 className="display relative text-[clamp(22px,3.125vw,60px)] uppercase leading-[1.3] lg:absolute lg:left-[6.16%] lg:top-[13.92%]">
            Ready to bring
            <span className="block whitespace-nowrap">live music to your</span>
          </h2>

          <ScriptAccent className="relative text-[clamp(30px,7.45vw,143px)] lg:absolute lg:left-[39.02%] lg:top-[27.5%]">
            next event?
          </ScriptAccent>

          <p className="relative max-w-[780px] text-base leading-6 text-white lg:absolute lg:left-[6.16%] lg:top-[46.55%] lg:text-[max(16px,1.04cqw)] lg:leading-[1.5]">
            Download Book a Band on iOS and Android. Find your sound, match with
            vetted local talent, and make memories that last a lifetime.
          </p>

          <div className="relative flex items-center gap-5 lg:absolute lg:left-[6.16%] lg:top-[63.43%] lg:gap-[2.08cqw]">
            <Image
              src="/qr.png"
              alt="Scan to download the Book a Band app"
              width={148}
              height={148}
              className="size-[104px] rounded-[14px] object-cover lg:size-[8.54cqw] lg:rounded-[1cqw]"
            />

            <div className="flex flex-col gap-3 lg:gap-[1.3cqw]">
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
                    className="h-[46px] w-[124px] object-contain lg:h-[3.44cqw] lg:w-[9.32cqw]"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Figma: same phone artwork as the hero, cropped by the banner */}
          <div className="relative mx-auto aspect-[1191/1708] w-full max-w-[300px] lg:absolute lg:left-[64.02%] lg:top-[-3.4%] lg:mx-0 lg:w-[32.68%] lg:max-w-none">
            <Image
              src="/phones.png"
              alt="Book a Band app running on two iPhones"
              fill
              sizes="(max-width: 1024px) 80vw, 540px"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
