"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type NetworkInformation = { saveData?: boolean };

const subscribe = () => () => {};
function canAutoplay() {
  const saveData = (navigator as Navigator & { connection?: NetworkInformation })
    .connection?.saveData;
  return window.matchMedia("(pointer: fine)").matches && !saveData;
}

// iOS browsers and desktop Safari play HLS natively. Other browsers (Chrome
// reports "maybe" for HLS even where native playback is unreliable) use hls.js.
function prefersNativeHls() {
  const ua = navigator.userAgent;
  const apple =
    /iPhone|iPad|iPod/.test(ua) ||
    (/Safari/.test(ua) && !/Chrome|Chromium|Edg|Android/.test(ua));
  return apple && !!document.createElement("video").canPlayType("application/vnd.apple.mpegurl");
}

// Reels can be tens of MB. The poster paints immediately and nothing is
// fetched until the video is wanted: automatically (muted) on desktop with a
// normal connection, or on tap everywhere else so phones don't pull it by default.
//
// Source order: HLS when the backend says it is ready (native in Safari,
// hls.js elsewhere), otherwise — or if HLS fails — the MP4.
export default function ReelPlayer({
  src,
  hlsUrl,
  poster,
  fit = "cover",
}: {
  src: string | null;
  hlsUrl?: string | null;
  poster?: string;
  fit?: "cover" | "contain";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const usingMp4 = useRef(false);
  const [tapped, setTapped] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  // false on the server, so phones never render a <video> into the HTML.
  const autoplay = useSyncExternalStore(subscribe, canAutoplay, () => false);
  const started = tapped || autoplay;
  const objectFit = fit === "contain" ? "object-contain" : "object-cover";

  const fallbackToMp4 = useCallback(() => {
    const video = ref.current;
    if (!video || !src) {
      setFailed(true);
      return;
    }
    usingMp4.current = true;
    video.src = src;
    video.load();
    void video.play().catch(() => {});
  }, [src]);

  useEffect(() => {
    if (!started) return;
    const video = ref.current;
    if (!video) return;
    usingMp4.current = false;

    if (!hlsUrl) {
      if (src) fallbackToMp4();
      return;
    }

    // A native error is handled by the element's onError below.
    const playNative = () => {
      video.src = hlsUrl;
      video.load();
    };
    if (prefersNativeHls()) {
      playNative();
      return;
    }

    // Chrome, Firefox and Edge go through hls.js (Media Source Extensions).
    // Imported on demand so the library only loads when it is needed.
    let cancelled = false;
    let hls: { destroy: () => void } | undefined;
    import("hls.js")
      .then(({ default: Hls }) => {
        if (cancelled) return;
        if (!Hls.isSupported()) {
          // No Media Source Extensions: native HLS if there is any, else MP4.
          if (video.canPlayType("application/vnd.apple.mpegurl")) playNative();
          else fallbackToMp4();
          return;
        }
        const instance = new Hls({
          enableWorker: true,
          // The player is small; don't download resolutions it can't show.
          capLevelToPlayerSize: true,
        });
        hls = instance;
        instance.on(Hls.Events.MANIFEST_PARSED, () => {
          void video.play().catch(() => {});
        });
        instance.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal) return;
          instance.destroy();
          hls = undefined;
          fallbackToMp4();
        });
        instance.loadSource(hlsUrl);
        instance.attachMedia(video);
      })
      .catch(() => {
        if (!cancelled) fallbackToMp4();
      });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [started, hlsUrl, src, fallbackToMp4]);

  // A tap is a user gesture, so it may start with sound.
  const startWithSound = () => {
    setMuted(false);
    setTapped(true);
  };

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) void video.play();
  };

  // First failure on native HLS retries with the MP4; a failure on the MP4
  // itself means neither source works.
  const onVideoError = () => {
    if (usingMp4.current) setFailed(true);
    else fallbackToMp4();
  };

  return (
    <>
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          sizes={fit === "contain" ? "560px" : "340px"}
          className={objectFit}
          priority
        />
      )}

      {failed ? (
        <p
          role="alert"
          className="absolute inset-0 flex items-center justify-center bg-black/60 p-6 text-center text-sm text-white/80"
        >
          This video is temporarily unavailable. Try again later, or get the app
          to watch it there.
        </p>
      ) : started ? (
        <>
          <video
            ref={ref}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            controls
            onError={onVideoError}
            controlsList="nodownload noplaybackrate"
            className={`absolute inset-0 size-full ${objectFit}`}
          />
          <button
            type="button"
            onClick={toggleSound}
            className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/80"
          >
            {muted ? "Tap for sound" : "Mute"}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={startWithSound}
          aria-label="Play reel"
          className="absolute inset-0 flex items-center justify-center bg-black/20"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
            <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </>
  );
}
