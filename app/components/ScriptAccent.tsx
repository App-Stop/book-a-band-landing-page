/** Figma neon handwriting that sits beside — not on top of — a heading line. */
export default function ScriptAccent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`neon-script inline-block shrink-0 whitespace-nowrap normal-case leading-none ${className}`}
    >
      {children}
    </span>
  );
}
