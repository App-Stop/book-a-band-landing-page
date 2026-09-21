export default function IntroStatement() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#0c0b1a] py-14 lg:pb-[91px] lg:pt-[189px]"
    >
      {/* Figma: soft purple haze behind the statement */}
      <div className="pointer-events-none absolute left-1/2 top-[8%] h-[520px] w-[1400px] max-w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(84,24,150,0.5),transparent_68%)]" />

      <div className="page-x relative mx-auto w-full max-w-[1920px]">
        <p className="mx-auto max-w-[1308px] text-[clamp(20px,2.05vw,39px)] font-normal leading-[1.26] text-white lg:text-left">
          Whether you are curating entertainment for hundreds of wedding guests
          or a touring band booking your weekend gigs,{" "}
          <span className="bg-gradient-to-r from-[#ff42dc] to-[#a240ff] bg-clip-text font-semibold text-transparent">
            Book a Band
          </span>{" "}
          puts you in command.
        </p>
      </div>
    </section>
  );
}
