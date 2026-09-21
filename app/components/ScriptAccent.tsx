/** Figma neon handwriting that overlaps the last line of a heading. */
export default function ScriptAccent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      data-reveal="neon"
      className={`neon-script z-10 whitespace-nowrap normal-case leading-none tracking-normal ${className}`}
    >
      {children}
    </span>
  );
}
