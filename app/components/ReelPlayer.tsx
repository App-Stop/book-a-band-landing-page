"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";

type NetworkInformation = { saveData?: boolean };

const subscribe = () => () => {};
function canAutoplay() {
  const saveData = (navigator as Navigator & { connection?: NetworkInformation })
    .connection?.saveData;
  return window.matchMedia("(pointer: fine)").matches && !saveData;
}

// Reels can be tens of MB. The poster paints immediately and the video is only
// fetched once it is wanted: automatically (muted) on desktop with a normal
// connection, or on tap everywhere else so phones don't pull the file by default.
export default function ReelPlayer({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tapped, setTapped] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  // false on the server, so phones never render a <video> into the HTML.
  const autoplay = useSyncExternalStore(subscribe, canAutoplay, () => false);
  const started = tapped || autoplay;

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

  return (
    <>
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          sizes="340px"
          className="object-cover"
          priority
        />
      )}

      {failed ? (
        <p className="absolute inset-0 flex items-center justify-center bg-black/60 p-6 text-center text-sm text-white/80">
          This video couldn&apos;t be played. Get the app to watch it there.
        </p>
      ) : started ? (
        <>
          <video
            ref={ref}
            src={src}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
            controls
            onWaiting={() => setLoading(true)}
            onPlaying={() => setLoading(false)}
            onCanPlay={() => setLoading(false)}
            onError={() => setFailed(true)}
            controlsList="nodownload noplaybackrate"
            className="absolute inset-0 size-full object-cover"
          />
          {loading && (
            <span
              aria-label="Loading video"
              className="pointer-events-none absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-4 border-white/30 border-t-white"
            />
          )}
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
