/** Tumbling-E optotype glyph drawn on a 5×5 Snellen grid, centred at (0,0). */
function TumblingE({
  x,
  y,
  size,
  rotate,
  color = 'var(--ink)',
}: {
  x: number;
  y: number;
  size: number;
  rotate: 0 | 90 | 180 | 270;
  color?: string;
}) {
  const half = size / 2;
  const bar = size / 5;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
      <path
        d={[
          `M ${-half} ${-half}`,
          `H ${half} V ${-half + bar} H ${-half + bar}`,
          `V ${-bar / 2} H ${half} V ${bar / 2} H ${-half + bar}`,
          `V ${half - bar} H ${half} V ${half} H ${-half} Z`,
        ].join(' ')}
        fill={color}
      />
    </g>
  );
}

/**
 * Curving path of tumbling Es (rotated 0/90/180/270°) shrinking from large to small.
 * Used as a compact teaser on Home and full milestone rail on Children.
 */
export function TumblingEPath({
  compact = false,
  className = '',
}: {
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    const steps: Array<{ x: number; y: number; size: number; rotate: 0 | 90 | 180 | 270; label?: string }> = [
      { x: 66, y: 118, size: 52, rotate: 0, label: '6 MO' },
      { x: 162, y: 80, size: 38, rotate: 90 },
      { x: 248, y: 108, size: 30, rotate: 180, label: 'AGE 3' },
      { x: 326, y: 74, size: 22, rotate: 270, label: 'AGE 5' },
      { x: 392, y: 92, size: 16, rotate: 0, label: '6–17' },
    ];
    return (
      <svg
        viewBox="0 0 440 184"
        fill="none"
        aria-hidden="true"
        className={`block h-auto w-full select-none ${className}`}
      >
        <path
          d="M 28 128 C 98 128, 124 72, 180 82 C 232 92, 266 116, 314 78 C 348 52, 378 96, 418 90"
          stroke="var(--steel)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        {steps.map((s, idx) => (
          <g key={idx}>
            <circle
              cx={s.x}
              cy={s.y}
              r={s.size * 0.78}
              fill="var(--surface)"
              stroke={idx === 0 ? 'var(--primary)' : 'var(--line)'}
              strokeWidth={idx === 0 ? 2 : 1.5}
            />
            <TumblingE
              x={s.x}
              y={s.y}
              size={s.size}
              rotate={s.rotate}
              color={idx === 0 ? 'var(--primary)' : 'var(--ink)'}
            />
            {s.label && (
              <text
                x={s.x}
                y={s.y + s.size * 0.78 + 16}
                textAnchor="middle"
                fill="var(--muted)"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fontWeight="600"
              >
                {s.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    );
  }

  // Full desktop horizontal tumbling-E ribbon spanning above the four milestones
  const nodes: Array<{ x: number; y: number; size: number; rotate: 0 | 90 | 180 | 270; accent?: boolean }> = [
    { x: 96, y: 66, size: 46, rotate: 0, accent: true },
    { x: 224, y: 42, size: 36, rotate: 90 },
    { x: 368, y: 74, size: 32, rotate: 180, accent: true },
    { x: 498, y: 44, size: 26, rotate: 270 },
    { x: 642, y: 70, size: 22, rotate: 0, accent: true },
    { x: 766, y: 46, size: 18, rotate: 90 },
    { x: 908, y: 66, size: 15, rotate: 180, accent: true },
  ];

  return (
    <svg
      viewBox="0 0 1000 120"
      fill="none"
      aria-hidden="true"
      className={`block h-auto w-full select-none ${className}`}
    >
      <path
        d="M 42 74 C 142 74, 178 36, 250 46 C 324 56, 356 86, 434 62 C 508 38, 560 80, 646 68 C 730 56, 804 40, 956 66"
        stroke="var(--steel)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />
      {nodes.map((n, idx) => (
        <g key={idx}>
          <circle
            cx={n.x}
            cy={n.y}
            r={Math.max(20, n.size * 0.72)}
            fill="var(--surface)"
            stroke={n.accent ? 'var(--primary)' : 'var(--line)'}
            strokeWidth={n.accent ? 2 : 1.5}
          />
          <TumblingE
            x={n.x}
            y={n.y}
            size={n.size}
            rotate={n.rotate}
            color={n.accent ? 'var(--primary)' : 'var(--ink)'}
          />
        </g>
      ))}
    </svg>
  );
}
