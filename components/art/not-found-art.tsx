/** 404 illustration: lit acuity chart whose bottom row "404" sits blurred with a trial lens hovering just off it. */
export function NotFoundArt({ className = '' }: { className?: string }) {
  const lensCx = 368;
  const lensCy = 248;
  const lensR = 72;

  return (
    <svg
      viewBox="0 0 490 360"
      fill="none"
      role="img"
      aria-label="Acuity chart with a blurred 404 bottom line and a trial lens hovering just beside it"
      className={`block h-auto w-full max-w-[30rem] select-none ${className}`}
    >
      <defs>
        <filter id="nf-blur" x="-12%" y="-12%" width="124%" height="124%">
          <feGaussianBlur stdDeviation="4.2" />
        </filter>
        <clipPath id="nf-lens-clip">
          <circle cx={lensCx} cy={lensCy} r={lensR} />
        </clipPath>
        <linearGradient id="nf-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B54D6" />
          <stop offset="100%" stopColor="#1F8A68" />
        </linearGradient>
      </defs>

      {/* Lit acuity chart card */}
      <rect
        x="34"
        y="24"
        width="320"
        height="312"
        rx="10"
        fill="var(--chart-glow)"
        stroke="var(--chart-line)"
        strokeWidth="1.5"
      />

      {/* Crisp upper rows */}
      <g textAnchor="middle" fill="var(--chart-ink)" fontFamily="var(--font-display)" fontWeight="800">
        <text x="194" y="96" fontSize="54">E</text>
        <text x="194" y="144" fontSize="34" letterSpacing="0.18em">F P</text>
        <text x="194" y="186" fontSize="24" letterSpacing="0.22em">T O Z</text>
      </g>
      <g fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600">
        <text x="54" y="90">20/200</text>
        <text x="54" y="138">20/100</text>
        <text x="54" y="182">20/70</text>
        <text x="54" y="258">20/???</text>
      </g>
      <line x1="54" y1="210" x2="334" y2="210" stroke="#1F8A68" strokeWidth="2.4" />
      <line x1="54" y1="292" x2="334" y2="292" stroke="#C8323A" strokeWidth="2.4" />

      {/* Bottom row 404 — blurred outside the hovering lens */}
      <g filter="url(#nf-blur)">
        <text
          x="194"
          y="272"
          textAnchor="middle"
          fill="var(--chart-ink)"
          fontFamily="var(--font-display)"
          fontSize="58"
          fontWeight="900"
          letterSpacing="0.14em"
        >
          404
        </text>
      </g>

      {/* Only the edge caught inside the off-axis trial lens is sharp */}
      <g clipPath="url(#nf-lens-clip)">
        <rect x="34" y="24" width="320" height="312" fill="var(--chart-glow)" />
        <line x1="54" y1="210" x2="334" y2="210" stroke="#1F8A68" strokeWidth="2.4" />
        <line x1="54" y1="292" x2="334" y2="292" stroke="#C8323A" strokeWidth="2.4" />
        <text
          x="194"
          y="272"
          textAnchor="middle"
          fill="var(--chart-ink)"
          fontFamily="var(--font-display)"
          fontSize="58"
          fontWeight="900"
          letterSpacing="0.14em"
        >
          404
        </text>
      </g>

      {/* Hovering trial lens just off the 404 row */}
      <g>
        <circle cx={lensCx} cy={lensCy} r={lensR + 10} stroke="var(--steel)" strokeWidth="1.8" />
        <circle cx={lensCx} cy={lensCy} r={lensR} stroke="var(--steel)" strokeWidth="2.8" />
        <path
          d={`M ${lensCx - 50} ${lensCy - 40} A ${lensR - 6} ${lensR - 6} 0 0 1 ${lensCx + 32} ${lensCy - 58}`}
          stroke="url(#nf-sheen)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Red lens handle tab */}
        <g transform={`translate(${lensCx}, ${lensCy}) rotate(28)`}>
          <rect x="-18" y={-lensR - 26} width="36" height="15" rx="2.5" fill="var(--minus-red)" />
          <text
            x="0"
            y={-lensR - 15.5}
            textAnchor="middle"
            fill="var(--on-minus-red)"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
            fontWeight="700"
          >
            -2.00
          </text>
        </g>
        {/* Axis needle */}
        <line x1={lensCx - lensR - 14} y1={lensCy} x2={lensCx - lensR + 8} y2={lensCy} stroke="var(--minus-red)" strokeWidth="2.2" strokeLinecap="round" />
        <line x1={lensCx + lensR - 8} y1={lensCy} x2={lensCx + lensR + 14} y2={lensCy} stroke="var(--minus-red)" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
