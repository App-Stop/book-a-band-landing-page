import Image from "next/image";

import Icon from "./Icon";
import { appFeatures, storeLinks } from "./site-content";

/*
 * Figma: this block is a 1920 × 3174 artboard. Each row is placed with
 * percentages of that frame (x / 1920, y / 3174) on lg+, and stacks below.
 */
const layout = [
  {
    text: "lg:left-[7.55%] lg:top-[9.23%]",
    gap: "lg:gap-[1.2cqw]",
    indent: "lg:ml-[4.15cqw]",
    image: "lg:left-[47.34%] lg:top-[3.78%] lg:w-[45.31%]",
  },
  {
    text: "lg:left-[42.19%] lg:top-[40.08%]",
    gap: "lg:gap-[1.6cqw]",
    indent: "lg:ml-[4.55cqw]",
    image: "lg:left-[11.77%] lg:top-[35.92%] lg:w-[20.13%]",
  },
  {
    text: "lg:left-[7.03%] lg:top-[73.38%]",
    gap: "lg:gap-[1.66cqw]",
    indent: "lg:ml-[4.6cqw]",
    image: "lg:left-[64.43%] lg:top-[67.96%] lg:w-[20.13%]",
  },
] as const;

export default function AppFeatures() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0c0b1a] border-t border-white/10 py-16 lg:py-0">
      {/* Figma: violet blooms behind each phone */}
      <div className="pointer-events-none absolute right-[-10%] top-[2%] h-[1100px] w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(110,20,190,0.42),transparent_66%)]" />
      <div className="pointer-events-none absolute left-[-14%] top-[32%] h-[1100px] w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(110,20,190,0.4),transparent_66%)]" />
      <div className="pointer-events-none absolute right-[-10%] top-[66%] h-[1100px] w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(90,20,170,0.4),transparent_66%)]" />

      <div className="@container relative mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-5 sm:px-8 lg:block lg:aspect-[1920/3174] lg:gap-0 lg:px-0">
        {appFeatures.map((feature, index) => (
          <div
            key={feature.title.join(" ")}
            className="flex flex-col gap-10 lg:contents"
          >
            <div
              data-reveal={feature.reversed ? "right" : "left"}
              className={`min-w-0 lg:absolute lg:w-[48%] ${layout[index].text} ${
                feature.reversed ? "lg:pl-0" : ""
              }`}
            >
              <h2 className={`display flex items-start gap-3.5 text-[clamp(22px,3.334vw,64px)] uppercase leading-[1.25] lg:leading-[1.22] ${layout[index].gap}`}>
                <Icon
                  name={feature.icon}
                  className="mt-[0.16em] size-[0.7em] shrink-0 text-white lg:size-[2.9cqw]"
                />
                <span>
                  {feature.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </h2>

              <p className={`mt-4 max-w-[810px] text-base leading-6 text-white lg:mt-[1.5cqw] lg:max-w-[42.3cqw] lg:text-[max(16px,1.04cqw)] lg:leading-[1.5] ${layout[index].indent}`}>
                {feature.body}
              </p>

              <div className={`mt-6 flex items-center gap-5 lg:mt-[3.1cqw] lg:gap-[2.08cqw] ${layout[index].indent}`}>
                <Image
                  src="/qr.png"
                  alt="Scan to download the Book a Band app"
                  width={148}
                  height={148}
                  className="size-[110px] rounded-[14px] object-cover lg:size-[7.69cqw] lg:rounded-[0.92cqw]"
                />

                <div className="flex flex-col gap-3 lg:gap-[1.25cqw]">
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
                        className="h-[50px] w-[134px] object-contain lg:h-[3.15cqw] lg:w-[8.44cqw]"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-reveal={feature.reversed ? "left" : "right"}
              data-parallax="0.05"
              className={`relative mx-auto w-full max-w-[440px] lg:absolute lg:mx-0 lg:max-w-none ${layout[index].image} ${
                feature.imageWidth > 700 ? "max-w-[720px]" : ""
              }`}
            >
              <Image
                src={feature.image}
                alt={feature.imageAlt}
                width={feature.imageWidth}
                height={feature.imageHeight}
                sizes="(max-width: 1024px) 80vw, 870px"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
