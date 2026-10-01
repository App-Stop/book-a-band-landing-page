export type Reel = {
  id: string;
  thumbnail: string | null;
  video: string | null;
  genres: string[];
  likes: number;
  views: number;
  caption: string;
  bandName: string;
  bandPicture: string | null;
};

const API_BASE =
  process.env.BOOKABAND_API_URL ?? "https://api.staging.bookabandapp.com";

// Public, no-auth read. Returns null for anything that isn't a live reel
// (bad id, deleted, network/API failure) so callers render the fallback page.
export async function getReel(id: string): Promise<Reel | null> {
  if (!/^[a-f0-9]{24}$/i.test(id)) return null;

  try {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const post = json?.data?.post;
    if (!post || post.isDeleted) return null;

    return {
      id: post._id,
      thumbnail: post.thumbnail ?? null,
      video: post.video ?? null,
      genres: Array.isArray(post.bandGenres) ? post.bandGenres : [],
      likes: post.likeCount ?? 0,
      views: post.views ?? 0,
      caption: (post.caption ?? "").trim(),
      bandName: post.band?.fullName ?? "A band",
      bandPicture: post.band?.profilePicture ?? null,
    };
  } catch {
    return null;
  }
}

export type Platform = "ios" | "android" | "desktop";

export function detectPlatform(userAgent: string | null): Platform {
  const ua = userAgent ?? "";
  if (/android/i.test(ua)) return "android";
  // iPadOS 13+ Safari reports a Macintosh UA; touch detection isn't available
  // server-side, so it falls back to desktop (both store links are shown).
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "desktop";
}
