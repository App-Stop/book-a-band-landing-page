import { cache } from "react";

export type Reel = {
  id: string;
  thumbnail: string | null;
  video: string | null;
  // Adaptive stream; only set when the backend reports it as ready.
  hlsUrl: string | null;
  // Display size after rotation, used to reserve the right aspect ratio.
  width: number | null;
  height: number | null;
  genres: string[];
  likes: number;
  views: number;
  caption: string;
  bandName: string;
  bandPicture: string | null;
};

// HLS is live on staging first. Set BOOKABAND_API_URL=https://api.bookabandapp.com
// to read production reels instead.
const API_BASE =
  process.env.BOOKABAND_API_URL ?? "https://api.bookabandapp.com";

// Media URLs end up in HTML, so only plain https URLs are accepted.
function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

const positive = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;

export type ReelResult =
  | { status: "ok"; reel: Reel }
  | { status: "gone" } // bad id, deleted, or 4xx: the reel will not come back
  | { status: "error" }; // timeout / network / 5xx: try again later

// Staging has shown 3s+ responses at times; a false "error" is worse than
// a slightly longer wait, but crawlers will not wait much longer than this.
const FETCH_TIMEOUT_MS = 6000;

// Public, no-auth read. A failure to reach the API is reported as "error",
// not "gone", so an outage is not shown to visitors as a deleted reel.
// Wrapped in cache() so generateMetadata and the page share one API call per
// request (a fetch with an abort signal is not deduplicated by Next itself).
export const getReel = cache(async function getReel(
  id: string,
): Promise<ReelResult> {
  if (!/^[a-f0-9]{24}$/i.test(id)) return { status: "gone" };

  try {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (res.status >= 500) return { status: "error" };
    if (!res.ok) return { status: "gone" };

    const json = await res.json();
    const post = json?.data?.post;
    if (!post || post.isDeleted) return { status: "gone" };

    return {
      status: "ok",
      reel: {
        id: post._id,
        thumbnail: safeUrl(post.thumbnail) ?? safeUrl(post.thumbnailWebp),
        video: safeUrl(post.video),
        // Use HLS only when the backend says it is ready; anything else
        // (queued, processing, failed, legacy null) plays the MP4.
        hlsUrl: post.hlsStatus === "ready" ? safeUrl(post.hlsUrl) : null,
        width: positive(post.width),
        height: positive(post.height),
        genres: Array.isArray(post.bandGenres) ? post.bandGenres : [],
        likes: post.likeCount ?? 0,
        views: post.views ?? 0,
        caption: (post.caption ?? "").trim(),
        bandName: post.band?.fullName ?? "A band",
        bandPicture: safeUrl(post.band?.profilePicture),
      },
    };
  } catch {
    return { status: "error" };
  }
});

export type Platform = "ios" | "android" | "desktop";

export function detectPlatform(userAgent: string | null): Platform {
  const ua = userAgent ?? "";
  if (/android/i.test(ua)) return "android";
  // iPadOS 13+ Safari reports a Macintosh UA; touch detection isn't available
  // server-side, so it falls back to desktop (both store links are shown).
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "desktop";
}
