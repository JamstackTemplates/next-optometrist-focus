/** Corneal topographer Placido-disc concentric rings (6–8% opacity) for hero and page heads. */
export function PlacidoRings({
  className = '',
  cx = 760,
  cy = 240,
  opacity = 0.08,
}: {
  className?: string;
  cx?: number;
  cy?: number;
  /** Ring opacity: 6–8% on paper, higher on saturated bands. */
  opacity?: number;
}) {
  const radii = [48, 86, 128, 174, 224, 278, 336, 398, 464, 534, 608];
  return (
    <svg
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      className={`decorative-art pointer-events-none select-none ${className}`}
    >
      <g stroke="currentColor" strokeWidth={1} opacity={opacity}>
        {radii.map(r => (
          <circle key={r} cx={cx} cy={cy} r={r} />
        ))}
        {/* Faint optical axis crosshairs */}
        <line x1={cx - 640} y1={cy} x2={cx + 640} y2={cy} strokeDasharray="3 6" />
        <line x1={cx} y1={cy - 420} x2={cx} y2={cy + 420} strokeDasharray="3 6" />
      </g>
    </svg>
  );
}
