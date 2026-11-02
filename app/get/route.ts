import { NextResponse, type NextRequest } from "next/server";

import { appStoreUrl, playStoreUrl } from "../components/site-content";
import { detectPlatform } from "../lib/reels";

// The QR codes point here, not at a store, so the printed/displayed code never
// has to change: phones go to their own store, everything else to the site.
export function GET(request: NextRequest) {
  const platform = detectPlatform(request.headers.get("user-agent"));
  const target =
    platform === "ios"
      ? appStoreUrl
      : platform === "android"
        ? playStoreUrl
        : new URL("/", request.url).toString();

  const response = NextResponse.redirect(target);
  // The answer depends on the device, so it must not be cached or shared.
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Vary", "User-Agent");
  return response;
}
