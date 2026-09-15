import { assets } from "@/lib/assets";

type StoreButtonsProps = {
  qrSize?: number;
  className?: string;
  /** side-by-side store badges (Figma 5:2386) vs stacked next to QR */
  layout?: "hero" | "row";
};

export function StoreButtons({
  qrSize = 148,
  className = "",
  layout = "hero",
}: StoreButtonsProps) {
  const badges = (
    <div
      className={
        layout === "row"
          ? "flex shrink-0 flex-row items-center gap-4"
          : "flex shrink-0 flex-col gap-6"
      }
    >
      <a
        href="#"
        className="flex h-[60px] w-[162px] shrink-0 items-center justify-center gap-[10px] whitespace-nowrap rounded-[13px] border border-black bg-white px-3 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src={assets.appleIcon}
          alt=""
          className="h-[31px] w-[26px] shrink-0"
          width={26}
          height={31}
        />
        <span className="flex min-w-0 flex-col whitespace-nowrap text-black">
          <span className="whitespace-nowrap text-[11.5px] leading-[11.5px]">
            Download on the
          </span>
          <span className="whitespace-nowrap text-[23px] font-medium leading-none tracking-tight">
            App Store
          </span>
        </span>
      </a>
      <a
        href="#"
        className="flex h-[60px] w-[162px] shrink-0 items-center justify-center gap-[9px] whitespace-nowrap rounded-[13px] border border-black bg-white px-3 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src={assets.googlePlayIcon}
          alt=""
          className="h-[31px] w-[27px] shrink-0"
          width={27}
          height={31}
        />
        <span className="flex min-w-0 flex-col whitespace-nowrap text-black">
          <span className="whitespace-nowrap text-[11.5px] uppercase leading-none">
            Get it on
          </span>
          <span className="whitespace-nowrap text-[20px] font-medium leading-none tracking-tight">
            Google Play
          </span>
        </span>
      </a>
    </div>
  );

  if (layout === "row") {
    return <div className={className}>{badges}</div>;
  }

  return (
    <div className={`flex shrink-0 items-center gap-8 ${className}`}>
      <div
        className="relative shrink-0 overflow-hidden rounded-[18px] bg-white p-1.5"
        style={{ width: qrSize, height: qrSize }}
      >
        <img
          src={assets.qrPattern}
          alt="Download QR code"
          className="size-full object-cover"
        />
        <div className="absolute left-1/2 top-1/2 flex size-[35%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm">
          <img
            src={assets.navLogo}
            alt="Book a Band"
            className="h-[55%] w-[65%] object-contain"
          />
        </div>
      </div>
      {badges}
    </div>
  );
}
