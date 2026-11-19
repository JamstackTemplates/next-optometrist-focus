/** Section divider of seven trial lenses in descending diameters with minus-red / plus-ink tabs. */
export function LensRingRule({ className = '', idPrefix = 'lrr' }: { className?: string; idPrefix?: string }) {
  const lenses = [
    { x: 96, r: 34, power: '-0.50', minus: true },
    { x: 256, r: 30, power: '+1.25', minus: false },
    { x: 406, r: 27, power: '-1.75', minus: true },
    { x: 548, r: 24, power: '+2.00', minus: false },
    { x: 682, r: 21, power: '-0.75', minus: true },
    { x: 808, r: 18, power: '+0.50', minus: false },
    { x: 924, r: 15, power: '-0.25', minus: true },
  ];
  const gradId = `${idPrefix}-sheen`;

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1020 112"
        className="decorative-art mx-auto block h-auto w-full max-w-[78rem]"
        fill="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B54D6" />
            <stop offset="100%" stopColor="#1F8A68" />
          </linearGradient>
        </defs>
        {/* Fine calibration baseline */}
        <line x1="16" y1="54" x2="1004" y2="54" stroke="var(--line)" strokeWidth="1" />
        {lenses.map(lens => (
          <g key={lens.power} transform={`translate(${lens.x}, 54)`}>
            {/* Coloured trial-lens tab handle */}
            <rect
              x={-11}
              y={-lens.r - 14}
              width="22"
              height="11"
              rx="2"
              fill={lens.minus ? 'var(--minus-red)' : 'var(--ink)'}
            />
            <line
              x1="0"
              y1={-lens.r - 3}
              x2="0"
              y2={-lens.r}
              stroke="var(--steel)"
              strokeWidth="2"
            />
            {/* Outer steel rim */}
            <circle
              cx="0"
              cy="0"
              r={lens.r}
              fill="var(--surface)"
              stroke="var(--steel)"
              strokeWidth="2"
            />
            {/* Inner aperture */}
            <circle
              cx="0"
              cy="0"
              r={lens.r - 5}
              fill="var(--paper)"
              stroke="var(--line)"
              strokeWidth="1"
            />
            {/* AR-coating sheen arc */}
            <path
              d={`M ${-(lens.r - 8) * 0.72} ${-(lens.r - 8) * 0.45} A ${lens.r - 8} ${lens.r - 8} 0 0 1 ${(lens.r - 8) * 0.48} ${-(lens.r - 8) * 0.72}`}
              stroke={`url(#${gradId})`}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Tiny axis marks */}
            <line x1={-lens.r} y1="0" x2={-lens.r + 4} y2="0" stroke="var(--minus-red)" strokeWidth="1.5" />
            <line x1={lens.r - 4} y1="0" x2={lens.r} y2="0" stroke="var(--minus-red)" strokeWidth="1.5" />
            {/* Mono diopter power */}
            <text
              x="0"
              y={lens.r + 17}
              textAnchor="middle"
              fill="var(--muted)"
              fontFamily="var(--font-mono)"
              fontSize="10.5"
              fontWeight="600"
            >
              {lens.power}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
