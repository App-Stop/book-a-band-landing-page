import { assets } from "@/lib/assets";

const features = [
  {
    title: "Find your Sound & AI Match",
    body: 'Browse local talent "Featured tonight", check out acts trending in your county, or trigger instant AI band matching.',
    icon: assets.iconAi,
    active: true,
  },
  {
    title: "Band Profiles & Transparent Packages",
    body: 'View full bios, genre tags (Cumbia, Sierreño, Mariachi, Rock), package rates like "Mega Buster $653/hr", and check availability.',
    icon: assets.iconDollar,
  },
  {
    title: "Tailored Genres & Add-on Services",
    body: "Select your event type, music vibes, and book complete services like Videography, Photography, Bartenders, and Sound Rentals.",
    icon: assets.iconMusic,
  },
  {
    title: "Geo-Radius & Local Venue Setup",
    body: "Specify your exact town, venue radius, and coordinates so organizers match with musicians nearby.",
    icon: assets.iconLocation,
  },
];

export function ExploreSection() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-20 md:px-[140px] md:py-28">
      <div className="pointer-events-none absolute right-0 top-0 size-[586px] rounded-full bg-[#ff1fad]/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[20%] size-[478px] rounded-full bg-[#7c3aed]/25 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1640px] items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-[60px]">
          <div>
            <h2 className="relative max-w-[810px]">
              <span className="block text-[clamp(36px,5vw,64px)] font-black uppercase leading-none text-white">
                Explore The App That Brings
              </span>
              <span className="neon-script relative z-10 -mt-2 mr-6 block text-[clamp(56px,8vw,128px)] leading-none text-white md:-mt-6 md:mr-12">
                Live music home
              </span>
            </h2>
            <p className="mt-4 max-w-[810px] text-[16px] leading-[26px] tracking-[0.4px] text-white md:text-[20px] md:leading-[30px]">
              Take an interactive tour through real app screens. Discover how
              Book a Band transforms event planning from chaotic phone calls
              into effortless instant bookings.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {features.map((feature) => (
              <div key={feature.title} className="border-b border-white/10 pb-5">
                <div className="flex items-center gap-5">
                  <div
                    className={`flex size-[60px] shrink-0 items-center justify-center rounded-[20px] border border-white/10 ${
                      feature.active
                        ? "bg-gradient-to-b from-[#3a00a6] to-[#ce00af]"
                        : "glass-pill"
                    }`}
                  >
                    <img
                      src={feature.icon}
                      alt=""
                      className="size-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-white md:text-[24px]">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-[22px] text-white/80 md:text-[16px]">
                      {feature.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[450px] lg:max-w-none">
          <div className="pointer-events-none absolute inset-x-10 inset-y-20 rounded-full bg-[#ff42dc]/30 blur-[80px]" />
          <img
            src={assets.explorePhone}
            alt="Book a Band app matches screen"
            className="relative z-10 mx-auto h-auto w-full max-w-[420px] object-contain drop-shadow-[0_40px_80px_rgba(255,66,220,0.25)]"
          />
          <div className="absolute bottom-8 right-0 z-20 flex items-center gap-2.5 rounded-[20px] border border-white/10 bg-[rgba(45,13,56,0.6)] p-2.5 backdrop-blur-[10px] md:right-4">
            <p className="w-[89px] text-center text-[14px] font-medium leading-4 text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
              Scan to Download!
            </p>
            <div className="relative size-[71px] overflow-hidden rounded-[10px]">
              <img src={assets.qr} alt="" className="size-full object-cover" />
              <div className="absolute inset-[3.6%]">
                <img
                  src={assets.qrPattern}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute left-1/2 top-1/2 size-[25px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1">
                <img
                  src={assets.logoMark}
                  alt=""
                  className="size-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
