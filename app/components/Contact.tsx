import Image from "next/image";

import ContactForm from "./ContactForm";
import Icon from "./Icon";
import ScriptAccent from "./ScriptAccent";
import { contactChannels, socialLinks } from "./site-content";

/* One accent per card — the three named brand tokens from globals.css. */
const cardAccents = [
  { hex: "var(--cyan)", soft: "rgba(0,201,198,0.16)" },
  { hex: "var(--purple)", soft: "rgba(162,64,255,0.16)" },
  { hex: "var(--pink)", soft: "rgba(255,66,220,0.16)" },
] as const;

export default function Contact() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0c0b1a] pb-16 pt-[120px] sm:pt-[140px] lg:pb-[140px] lg:pt-[200px] short:pb-[80px] short:pt-[140px]">
      {/* Figma-style violet bloom, same palette as the rest of the site. The
          matching right-side bloom now lives only behind the guitarist next
          to the form, instead of a second one washing the whole section. */}
      <div className="pointer-events-none absolute left-[-10%] top-[-8%] h-[900px] w-[1100px] bg-[radial-gradient(ellipse_at_center,rgba(80,40,220,0.55),transparent_66%)]" />

      {/* Same guitarist silhouette AiMatch flanks its heading with, kept here
          for aesthetic continuity between the two sections. Its pair (Vector
          2) now sits behind the transparent form instead — see below. */}
      <Image
        src="/Vector.png"
        alt=""
        width={466}
        height={755}
        aria-hidden
        data-reveal="fade"
        data-parallax="0.1"
        className="pointer-events-none absolute left-[-8%] top-[4vw] hidden w-[22vw] max-w-[420px] select-none opacity-50 sm:block lg:left-[1%] lg:top-[1vw]"
      />

      <div className="@container relative mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-0">
        <div className="mx-auto max-w-[760px] text-center">
          <h1 data-reveal="up" className="display text-[clamp(34px,7vw,64px)] uppercase leading-[1.15]">
            Get in touch
          </h1>
          <ScriptAccent className="mt-1 flex justify-center text-[clamp(40px,6vw,96px)]">
            always in tune
          </ScriptAccent>
          <p data-reveal="up" className="mx-auto mt-6 max-w-[560px] text-base leading-[1.5] text-white/80">
            Questions about booking, joining as a band, or just want to say
            hi? Pick whichever works for you — a real person reads every
            message.
          </p>
        </div>

        {/* Boxes on the left, form on the right at lg+, stretched to the same
            height as each other; stacks (boxes first, then the form) below
            that. */}
        <div className="mx-auto mt-14 grid w-full max-w-[1180px] grid-cols-1 gap-8 lg:mt-[88px] lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-10">
          <ul data-stagger="up" className="flex flex-col gap-5 lg:h-full lg:justify-between">
            {contactChannels.map((channel, index) => {
              const accent = cardAccents[index];

              return (
                <li
                  key={channel.title}
                  className="flex items-start gap-4 rounded-[20px] bg-[#23213c] p-5 text-left shadow-[0px_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: accent.soft, color: accent.hex }}
                  >
                    <Icon name={channel.icon} className="size-5" />
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-white">
                      {channel.title}
                    </h2>
                    <p className="mt-1 text-sm leading-[1.5] text-white/75">
                      {channel.body}
                    </p>

                    {channel.actionHref ? (
                      <a
                        href={channel.actionHref}
                        className="mt-2 inline-block text-sm font-semibold underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:decoration-current"
                        style={{ color: accent.hex }}
                      >
                        {channel.actionLabel}
                      </a>
                    ) : (
                      <ul className="mt-2.5 flex items-center gap-4">
                        {socialLinks.map(({ name, label }) => (
                          <li key={label}>
                            <a
                              href="#social"
                              aria-label={label}
                              className="block text-white/80 transition-colors duration-200 hover:text-white"
                            >
                              <Icon name={name} className="size-5" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="relative lg:h-full">
            {/* Glow blob + guitarist silhouette spilling past the form's
                right edge, feet grounded at its bottom edge instead of
                floating mid-panel — both anchored to the same box so the
                blob glows directly behind the figure instead of beside it. */}
            <div className="pointer-events-none absolute -right-[10%] bottom-0 z-0 h-[92%] w-[68%]">
              <div className="absolute left-1/2 top-1/2 h-[78%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,66,220,0.5),rgba(150,40,240,0.25)_45%,transparent_72%)] blur-[70px]" />
              <Image
                src="/Vector 2.png"
                alt=""
                width={384}
                height={672}
                aria-hidden
                data-reveal="fade"
                className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto max-w-none select-none object-contain object-bottom opacity-20"
              />
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
