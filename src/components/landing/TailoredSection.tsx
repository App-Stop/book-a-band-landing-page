import { assets } from "@/lib/assets";

const cards = [
  {
    title: "Transparent pricing & verified packages",
    body: "No more guessing or endless emails. Check verified hourly rates and performance tiers before requesting. Each quote includes specs, travel fees, and rehearsal guarantees.",
    image: assets.tailoredCardPricing,
  },
  {
    title: "Verified reviews & live recordings",
    body: "Explore live recordings from actual performances and dive into authentic reviews from wedding hosts, festival organizers, and corporate directors.",
    image: assets.tailoredCardReviews,
  },
  {
    title: "Complete production ecosystem",
    body: "Merge your live band with concert videographers, photographers, sound rentals, and staff all under one comprehensive escrow contract.",
    image: assets.tailoredCardEcosystem,
  },
] as const;

/**
 * Figma 5:756 — Tailored experiences for hosts & performers
 * https://www.figma.com/design/Jimqly7l8IdOUUODZS7S0v/Untitled?node-id=5-756
 */
export function TailoredSection() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-20 md:px-[140px] md:py-28">
      <div className="pointer-events-none absolute left-[10%] top-0 size-[690px] rounded-full bg-[#ff1fad]/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-[5%] size-[480px] rounded-full bg-[#7c3aed]/20 blur-[120px]" />

      <div className="relative mx-auto flex max-w-[1640px] flex-col items-center gap-10">
        <div className="relative mx-auto max-w-[1074px] pb-10 text-center md:pb-14">
          <h2 className="text-[clamp(36px,5vw,64px)] font-black uppercase leading-none text-white">
            <span className="block">Tailored</span>
            <span className="relative mt-1 inline-block">
              Experiences for
              {/* Figma 5:759 — script starts under “S” of EXPERIENCES */}
              <span className="neon-script absolute left-[52%] top-[35%] z-10 whitespace-nowrap text-left text-[clamp(40px,5vw,88px)] font-normal normal-case leading-none tracking-normal text-white md:left-[58%] md:top-[60%] ">
                hosts & performers
              </span>
            </span>
          </h2>
        </div>

        <div className="grid w-full gap-5 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="relative h-[500px] overflow-hidden rounded-[20px] border border-[rgba(255,109,240,0.55)] shadow-[0_27px_60px_rgba(0,0,0,0.06)] backdrop-blur-[15px] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="absolute inset-0">
                <img
                  src={card.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover object-center"
                />
              </div>

              <div className="relative z-20 flex h-full flex-col justify-end gap-1.5 p-[30px] text-white">
                <h3 className="text-[20px] font-semibold md:text-[24px]">{card.title}</h3>
                <p className="text-[14px] leading-[22px] text-white/80 md:text-[16px]">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <p className="max-w-[820px] text-[16px] leading-[26px] tracking-[0.4px] text-white md:text-[20px] md:leading-[30px]">
            Whether you are curating entertainment for hundreds of wedding guests
            or a touring band booking your weekend gigs, Book a Band puts you in
            command.
          </p>
          <div className="flex shrink-0 flex-row flex-wrap gap-5">
            <button
              type="button"
              className="rounded-full border border-white/10 bg-gradient-to-b from-[#00c9c6] to-[#006ace] px-[30px] py-5 text-[16px] font-semibold whitespace-nowrap text-white transition-all duration-200 hover:brightness-110"
            >
              Browse verified bands
            </button>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-gradient-to-b from-[#ce00af] to-[#7a00c4] px-[30px] py-5 text-[16px] font-semibold whitespace-nowrap text-white transition-all duration-200 hover:brightness-110"
            >
              Sign up as a performer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
