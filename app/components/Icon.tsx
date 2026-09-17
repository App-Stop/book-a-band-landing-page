type IconName =
  | "equalizer"
  | "badge"
  | "notes"
  | "pin"
  | "calendar"
  | "play"
  | "chat"
  | "broadcast"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "close"
  | "star"
  | "instagram"
  | "x"
  | "tiktok"
  | "youtube";

const paths: Record<IconName, React.ReactNode> = {
  equalizer: (
    <>
      <path d="M7 14V10M10 17V7M13 15V9M16 12.5v-1" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9.5" r="3.5" />
      <path d="M6.5 19c1-2.6 3-4 5.5-4s4.5 1.4 5.5 4" />
    </>
  ),
  notes: (
    <>
      <circle cx="8" cy="16.5" r="2.5" />
      <path d="M10.5 16.5V6l7-2v9.5" />
      <circle cx="15" cy="13.5" r="2.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="4.5" y="6" width="15" height="14" rx="3" />
      <path d="M8.5 4v4M15.5 4v4M4.5 11h15M12 14v4M10 16h4" />
    </>
  ),
  play: (
    <>
      <path d="M9 6.5 18.5 12 9 17.5V6.5Z" />
    </>
  ),
  chat: (
    <>
      <path d="M20 12.5c0 4-3.6 7-8 7-1 0-2-.2-2.9-.5L5 20.5l1.2-3.4A6.6 6.6 0 0 1 4 12.5c0-4 3.6-7 8-7s8 3 8 7Z" />
    </>
  ),
  broadcast: (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 19.1a10 10 0 0 0 0-14.2" />
    </>
  ),
  "chevron-down": (
    <>
      <path d="m6 10 6 5.5L18 10" />
    </>
  ),
  "chevron-left": (
    <>
      <path d="m14 7-5 5 5 5" />
    </>
  ),
  "chevron-right": (
    <>
      <path d="m10 7 5 5-5 5" />
    </>
  ),
  close: (
    <>
      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
    </>
  ),
  star: (
    <>
      <path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.9-5.2 2.9 1-5.9L3.5 9.8l5.9-.8L12 3.6Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.8 7.4h.01" />
    </>
  ),
  x: (
    <>
      <path d="M5 5l14 14M19 5 5 19" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 4.5v10a3.6 3.6 0 1 1-3.6-3.6" />
      <path d="M14 6.4c.7 1.6 2.1 2.6 4 2.7" />
    </>
  ),
  youtube: (
    <>
      <rect x="3.5" y="6.5" width="17" height="11" rx="3.5" />
      <path d="m11 10 3.5 2-3.5 2v-4Z" />
    </>
  ),
};

const filled: IconName[] = ["star", "play"];

export default function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const isFilled = filled.includes(name);

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };
