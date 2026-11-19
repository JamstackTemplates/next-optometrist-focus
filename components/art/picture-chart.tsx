/** Child's picture-shape acuity chart (house, apple, circle, square) in descending rows. */
function House({ x, y, s }: { x: number; y: number; s: number }) {
  const h = s / 2;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={`M ${-h} ${-h * 0.05} L 0 ${-h} L ${h} ${-h * 0.05} V ${h} H ${-h} Z`}
        fill="none"
        stroke="var(--chart-ink)"
        strokeWidth={Math.max(1.8, s * 0.095)}
        strokeLinejoin="round"
      />
    </g>
  );
}

function Apple({ x, y, s }: { x: number; y: number; s: number }) {
  const h = s / 2;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={`M 0 ${-h * 0.55} C ${h * 0.75} ${-h * 0.95} ${h} ${-h * 0.1} ${h * 0.68} ${h * 0.62} C ${h * 0.42} ${h} ${h * 0.15} ${h * 0.92} 0 ${h * 0.76} C ${-h * 0.15} ${h * 0.92} ${-h * 0.42} ${h} ${-h * 0.68} ${h * 0.62} C ${-h} ${-h * 0.1} ${-h * 0.75} ${-h * 0.95} 0 ${-h * 0.55} Z`}
        fill="none"
        stroke="var(--chart-ink)"
        strokeWidth={Math.max(1.8, s * 0.095)}
        strokeLinejoin="round"
      />
      <path
        d={`M 0 ${-h * 0.55} Q ${h * 0.2} ${-h * 1.02} ${h * 0.42} ${-h * 0.95}`}
        fill="none"
        stroke="var(--chart-ink)"
        strokeWidth={Math.max(1.6, s * 0.08)}
        strokeLinecap="round"
      />
    </g>
  );
}

function Ring({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={s * 0.46}
      fill="none"
      stroke="var(--chart-ink)"
      strokeWidth={Math.max(1.8, s * 0.095)}
    />
  );
}

function Box({ x, y, s }: { x: number; y: number; s: number }) {
  const h = s * 0.44;
  return (
    <rect
      x={x - h}
      y={y - h}
      width={h * 2}
      height={h * 2}
      rx={Math.max(1.5, s * 0.06)}
      fill="none"
      stroke="var(--chart-ink)"
      strokeWidth={Math.max(1.8, s * 0.095)}
    />
  );
}

export function PictureChart({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 340"
      fill="none"
      role="img"
      aria-label="Children's picture acuity chart showing descending rows of a house, apple, circle and square"
      className={`lit-chart block h-auto w-full rounded-ui border select-none ${className}`}
    >
      {/* Top chart header */}
      <text
        x="140"
        y="28"
        textAnchor="middle"
        fill="var(--chart-muted)"
        fontFamily="var(--font-mono)"
        fontSize="9.5"
        fontWeight="600"
        letterSpacing="0.16em"
      >
        PICTURE SYMBOLS · 3M
      </text>
      <line x1="28" y1="40" x2="252" y2="40" stroke="var(--chart-line)" strokeWidth="1" />

      {/* Row 1: single large House */}
      <text x="26" y="92" fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="9">60</text>
      <House x={140} y={88} s={48} />

      {/* Row 2: Apple, Circle */}
      <text x="26" y="160" fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="9">30</text>
      <Apple x={106} y={156} s={34} />
      <Ring x={174} y={156} s={34} />

      {/* Row 3: Square, House, Apple */}
      <text x="26" y="216" fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="9">15</text>
      <Box x={86} y={212} s={24} />
      <House x={140} y={212} s={24} />
      <Apple x={194} y={212} s={24} />

      {/* Green optical reference line */}
      <line x1="36" y1="242" x2="244" y2="242" stroke="#1F8A68" strokeWidth="2.2" />

      {/* Row 4: Circle, Square, House, Apple */}
      <text x="26" y="274" fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="9">10</text>
      <Ring x={76} y={270} s={18} />
      <Box x={118} y={270} s={18} />
      <House x={162} y={270} s={18} />
      <Apple x={204} y={270} s={18} />

      {/* Red optical reference line */}
      <line x1="36" y1="294" x2="244" y2="294" stroke="#C8323A" strokeWidth="2.2" />

      {/* Row 5: smallest row */}
      <text x="26" y="319" fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="9">6</text>
      <House x={72} y={315} s={13} />
      <Ring x={106} y={315} s={13} />
      <Apple x={140} y={315} s={13} />
      <Box x={174} y={315} s={13} />
      <House x={208} y={315} s={13} />
    </svg>
  );
}
