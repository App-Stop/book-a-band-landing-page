import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ReelPlayer from "../../components/ReelPlayer";
import ScrollAnimations from "../../components/ScrollAnimations";
import {
  appStoreUrl,
  playStoreUrl,
  reelCopy,
  siteUrl,
  storeLinks,
} from "../../components/site-content";
import { detectPlatform, getReel } from "../../lib/reels";

export async function generateMetadata({
  params,
}: PageProps<"/reels/[reelId]">): Promise<Metadata> {
  const { reelId } = await params;
  const result = await getReel(reelId);

  if (result.status !== "ok") {
    const failed = result.status === "error";
    return {
      title: `${failed ? reelCopy.errorTitle : reelCopy.unavailableTitle} — Book a Band`,
      description: failed
        ? reelCopy.errorDescription
        : reelCopy.unavailableDescription,
      robots: { index: false, follow: false },
    };
  }
  const { reel } = result;

  const title = `${reel.bandName}'s reel on Book A Band`;
  const description = reel.caption || reelCopy.defaultCaption;
  const url = `${siteUrl}/reels/${reel.id}/`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "video.other",
      images: reel.thumbnail ? [{ url: reel.thumbnail }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: reel.thumbnail ? [reel.thumbnail] : undefined,
    },
  };
}

const compact = (n: number) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(n);

export default async function ReelPage({
  params,
}: PageProps<"/reels/[reelId]">) {
  const { reelId } = await params;
  const [result, headerList] = await Promise.all([getReel(reelId), headers()]);
  const reel = result.status === "ok" ? result.reel : null;
  const platform = detectPlatform(headerList.get("user-agent"));

  const stores = [
    { ...storeLinks[0], href: appStoreUrl, platform: "ios" },
    { ...storeLinks[1], href: playStoreUrl, platform: "android" },
  ].filter((s) => platform === "desktop" || s.platform === platform);

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#0c0b1a]">
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 size-[520px] rounded-full bg-[#a240ff]/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-[40%] size-[520px] rounded-full bg-[#ff42dc]/20 blur-[140px]"
      />

      <Navbar />

      <section className="page-x relative mx-auto flex w-full max-w-[1100px] flex-col items-center gap-10 pb-20 pt-28 lg:flex-row lg:gap-20 lg:pt-36">
        <div className="relative aspect-[5/8] w-full max-w-[340px] shrink-0 overflow-hidden rounded-[32px] border border-white/20 bg-[#18132d] shadow-[0_30px_80px_rgba(162,64,255,0.35)]">
          {reel?.video ? (
            <ReelPlayer
              src={reel.video}
              poster={reel.thumbnail ?? undefined}
            />
          ) : reel?.thumbnail ? (
            <Image
              src={reel.thumbnail}
              alt={`${reel.bandName} reel thumbnail`}
              fill
              sizes="340px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-white/60">
              Preview unavailable
            </div>
          )}
        </div>

        <div className="flex w-full flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          {reel ? (
            <>
              <div className="flex items-center gap-3">
                {reel.bandPicture && (
                  <Image
                    src={reel.bandPicture}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 rounded-full border border-white/30 object-cover"
                  />
                )}
                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest text-white/50">
                    Reel on Book A Band
                  </p>
                  <h1 className="display text-[clamp(22px,3.4vw,38px)] leading-tight">
                    {reel.bandName}
                  </h1>
                </div>
              </div>

              <p className="max-w-[48ch] whitespace-pre-line text-lg text-white/85">
                {reel.caption || reelCopy.defaultCaption}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                {reel.genres.map((g) => (
                  <span
                    key={g}
                    className="glass rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {g}
                  </span>
                ))}
                <span className="text-sm text-white/60">
                  {compact(reel.views)} views · {compact(reel.likes)} likes
                </span>
              </div>
            </>
          ) : (
            <>
              <h1 className="display text-[clamp(24px,4vw,44px)] leading-tight">
                {result.status === "error"
                  ? reelCopy.errorTitle
                  : reelCopy.unavailableTitle}
              </h1>
              <p className="max-w-[48ch] text-white/80">
                {result.status === "error"
                  ? reelCopy.errorDescription
                  : reelCopy.unavailableDescription}
              </p>
            </>
          )}

          <div className="mt-2 flex flex-col items-center gap-3 lg:items-start">
            <p className="text-sm text-white/60">
              Get the app to discover and book live bands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              {stores.map(({ src, alt, href }) => (
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
                    className="h-[56px] w-[150px] object-contain sm:h-[60px] sm:w-[162px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollAnimations />
    </main>
  );
}
