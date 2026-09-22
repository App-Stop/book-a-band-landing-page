import Image from "next/image";

import Icon from "./Icon";
import ViewsPill from "./ViewsPill";
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
    // Left/width place the phone horizontally. Row 3 below uses a real
    // top+bottom band to flex-center the phone in it; rows 1-2 only ever
    // had a valid `bottom`, so — since that already renders the layout
    // we want — they're intentionally bottom-anchored (shrink-to-fit
    // height, no `top`) rather than centered in a band. Kept as-is.
    imageBox: "lg:left-[62%] lg:w-[21%]",
    imageBand: "lg:bottom-[75.3%]",
  },
  {
    text: "lg:left-[50.19%] lg:top-[40.08%]",
    gap: "lg:gap-[1.6cqw]",
    indent: "lg:ml-[4.55cqw]",
    imageBox: "lg:left-[14.5%] lg:w-[16%]",
    imageBand: "lg:bottom-[41.3%]",
  },
  {
    text: "lg:left-[7.03%] lg:top-[73.38%]",
    gap: "lg:gap-[1.66cqw]",
    indent: "lg:ml-[4.6cqw]",
    imageBox: "lg:left-[66.5%] lg:w-[16%]",
    imageBand: "lg:top-[60.7%] lg:bottom-0",
  },
] as const;

/* Hearts cascading off the feed phone's right edge. Positions/sizes are
   percentages of the phone image, measured directly off the Figma
   reference (node 43:940) so the curve matches the design exactly. */
const likeBubbles = [
  { src: "/like_1.png", size: 167, cls: "right-[-15%] top-[26%] w-[22%]" },
  { src: "/like_2.png", size: 149, cls: "right-[-19%] top-[42%] w-[18%]" },
  { src: "/like_3.png", size: 55, cls: "right-[-3%] top-[49%] w-[14%]" },
  { src: "/like_4.png", size: 113, cls: "right-[-12%] top-[61%] w-[14%]" },
] as const;

/* Message previews fanned out as a stacked card deck over the messages
   phone's screen — widest/furthest-back card on top, narrowing and
   indenting rightward going down. Measured directly off the Figma
   reference (node 37:929) so the stack matches the design exactly. */
const messageBubbles = [
  { src: "/message_1.png", w: 476, h: 92, cls: "left-[-16%] top-[18%] w-[132%]" },
  { src: "/message_2.png", w: 429, h: 83, cls: "left-[-9%] top-[33%] w-[119%]" },
  { src: "/message_3.png", w: 381, h: 74, cls: "left-[-3%] top-[46%] w-[105%]" },
  { src: "/message_4.png", w: 334, h: 65, cls: "left-[4%] top-[58%] w-[92%]" },
  { src: "/message_5.png", w: 334, h: 65, cls: "left-[4%] top-[69%] w-[92%]" },
] as const;

function FloatingBubble({
  src,
  width,
  height,
  className,
  delay,
  float = true,
}: {
  src: string;
  width: number;
  height: number;
  className: string;
  delay: number;
  float?: boolean;
}) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className={float ? "animate-bubble-float" : ""} style={{ animationDelay: `${delay}s` }}>
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          className="h-auto w-full drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
        />
      </div>
    </div>
  );
}

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
              className={`min-w-0 text-center lg:absolute lg:w-[48%] lg:text-left ${layout[index].text} ${
                feature.reversed ? "lg:pl-0" : ""
              }`}
            >
              <h2 className={`display flex items-start justify-center gap-3.5 text-[clamp(22px,3.334vw,64px)] uppercase leading-[1.25] lg:justify-start lg:leading-[1.22] ${layout[index].gap}`}>
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

              <p className={`mx-auto mt-4 max-w-[810px] lg:mx-0 text-base leading-6 text-white lg:mt-[1.5cqw] lg:max-w-[42.3cqw] lg:text-[max(16px,1.04cqw)] lg:leading-[1.5] ${layout[index].indent}`}>
                {feature.body}
              </p>

              <div className={`mt-6 flex items-center justify-center gap-5 lg:justify-start lg:mt-[3.1cqw] lg:gap-[2.08cqw] ${layout[index].indent}`}>
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

            {/* Outer wrapper marks out this row's horizontal slot and
                vertical third of the artboard, then flex-centers the phone
                inside it — kept off the phone's own box so the scroll
                parallax transform never fights a static centering one. */}
            <div
              className={`contents lg:absolute lg:mx-0 lg:flex lg:items-center ${layout[index].imageBox} ${layout[index].imageBand}`}
            >
              <div
                data-reveal={feature.reversed ? "left" : "right"}
                data-parallax="0.05"
                className={`relative mx-auto w-full max-w-[160px] sm:max-w-[210px] lg:mx-0 lg:max-w-none lg:translate-x-0 ${
                  index === 0 ? "-translate-x-[9.5%]" : ""
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

                {index === 0 && (
                  <>
                    <div data-reveal="up" className="absolute left-[22%] top-[5%]">
                      <ViewsPill />
                    </div>
                    <div data-stagger="right">
                      {likeBubbles.map((bubble, i) => (
                        <FloatingBubble
                          key={bubble.src}
                          src={bubble.src}
                          width={bubble.size}
                          height={bubble.size}
                          className={bubble.cls}
                          delay={i * 0.35}
                        />
                      ))}
                    </div>
                  </>
                )}

                {index === 1 && (
                  <div data-stagger="bubble">
                    {messageBubbles.map((bubble, i) => (
                      <FloatingBubble
                        key={bubble.src}
                        src={bubble.src}
                        width={bubble.w}
                        height={bubble.h}
                        className={bubble.cls}
                        delay={i * 0.3}
                        float={false}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
