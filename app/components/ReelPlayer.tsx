"use client";

import { useRef, useState } from "react";

// Autoplay is only allowed by browsers when muted, so it starts muted and the
// viewer taps the button to turn sound on.
export default function ReelPlayer({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) void video.play();
  };

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls
        controlsList="nodownload noplaybackrate"
        className="absolute inset-0 size-full bg-black object-cover"
      />
      <button
        type="button"
        onClick={toggleSound}
        className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/80"
      >
        {muted ? "Tap for sound" : "Mute"}
      </button>
    </>
  );
}
