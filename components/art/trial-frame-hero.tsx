/**
 * Signature visual: steel trial frame with 0–180° axis protractor rings and red axis needles.
 * The scene behind (lit acuity chart on the left, horizon & river landscape on the right) is
 * softly blurred outside the lenses via feGaussianBlur and pin-sharp inside the lens apertures.
 */

export function ProtractorTicks({
  cx,
  cy,
  innerR,
  outerR,
}: {
  cx: number;
  cy: number;
  innerR: number;
  outerR: number;
}) {
  // Lower semicircular 0–180° optometric axis scale (standard TABO notation)
  const ticks = Array.from({ length: 19 }, (_, i) => i * 10);
  const labelled = new Set([0, 30, 60, 90, 120, 150, 180]);

  return (
    <g>
      {ticks.map(deg => {
        const rad = (deg * Math.PI) / 180;
        const isMajor = deg % 30 === 0;
        const r1 = isMajor ? innerR : innerR + 5;
        const r2 = outerR;
        const x1 = cx + Math.cos(rad) * r1;
        const y1 = cy + Math.sin(rad) * r1;
        const x2 = cx + Math.cos(rad) * r2;
        const y2 = cy + Math.sin(rad) * r2;
        const lx = cx + Math.cos(rad) * (outerR + 13);
        const ly = cy + Math.sin(rad) * (outerR + 13);
        return (
          <g key={deg}>
            <line
              x1={x1.toFixed(1)}
              y1={y1.toFixed(1)}
              x2={x2.toFixed(1)}
              y2={y2.toFixed(1)}
              stroke={deg === 0 || deg === 90 || deg === 180 ? 'var(--minus-red)' : 'var(--steel)'}
              strokeWidth={isMajor ? 1.5 : 1}
            />
            {labelled.has(deg) && (
              <text
                x={lx.toFixed(1)}
                y={(ly + 3.5).toFixed(1)}
                textAnchor="middle"
                fill="var(--muted)"
                fontFamily="var(--font-mono)"
                fontSize="9.5"
                fontWeight="600"
              >
                {deg}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

/** Shared backdrop scene: lit acuity chart on the left, Saint Paul river horizon on the right. */
function ExamSceneBackdrop({ sharp }: { sharp: boolean }) {
  return (
    <g>
      {/* Left half: lit acuity chart face (stays bright in dark mode) */}
      <rect
        x="24"
        y="34"
        width="364"
        height="416"
        rx="10"
        fill="var(--chart-glow)"
        stroke="var(--chart-line)"
        strokeWidth="1.5"
      />
      {/* Acuity chart subtle rule lines */}
      <line x1="48" y1="296" x2="364" y2="296" stroke="#1F8A68" strokeWidth="2.5" opacity={sharp ? 0.9 : 0.6} />
      <line x1="48" y1="354" x2="364" y2="354" stroke="#C8323A" strokeWidth="2.5" opacity={sharp ? 0.9 : 0.6} />

      {/* Acuity rows: C / LE / ARH / ORIZ / ON·SEE / THE·VIEW */}
      <g
        textAnchor="middle"
        fill="var(--chart-ink)"
        fontFamily="var(--font-display)"
        fontWeight="800"
      >
        <text x="210" y="130" fontSize="64" letterSpacing="0.06em">C</text>
        <text x="210" y="182" fontSize="42" letterSpacing="0.16em">LE</text>
        <text x="210" y="226" fontSize="31" letterSpacing="0.18em">ARH</text>
        <text x="210" y="264" fontSize="24" letterSpacing="0.2em">ORIZ</text>
        <text x="210" y="334" fontSize="18" letterSpacing="0.22em">ON·SEE</text>
        <text x="210" y="384" fontSize="14.5" letterSpacing="0.24em">THE·VIEW</text>
      </g>

      {/* Side acuity notations */}
      <g fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600">
        <text x="48" y="124">20/200</text>
        <text x="48" y="176">20/100</text>
        <text x="48" y="222">20/70</text>
        <text x="48" y="260">20/50</text>
        <text x="48" y="330">20/30</text>
        <text x="48" y="380">20/20</text>
      </g>

      {/* Right half: clear horizon landscape — river line, low hills, sun as a small ring */}
      <rect
        x="408"
        y="34"
        width="368"
        height="416"
        rx="10"
        fill="var(--surface-2)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      {/* Sky light band */}
      <rect x="409" y="35" width="366" height="214" rx="9" fill="var(--chart-glow)" opacity={sharp ? 0.96 : 0.78} />

      {/* Ringed sun */}
      <circle cx="628" cy="146" r="24" fill="none" stroke="#C8323A" strokeWidth="2.5" />
      <circle cx="628" cy="146" r="14" fill="none" stroke="#3A33A8" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="628" cy="146" r="4" fill="#C8323A" />

      {/* Distant horizon line */}
      <line x1="409" y1="248" x2="775" y2="248" stroke="#3A33A8" strokeWidth="1.5" opacity="0.5" />

      {/* Low hills / river bluffs */}
      <path
        d="M409 258 Q482 212 560 242 T712 224 Q748 220 775 236 L775 310 L409 310 Z"
        fill="#3A33A8"
        opacity={sharp ? 0.22 : 0.16}
      />
      <path
        d="M409 278 Q505 244 606 270 T775 256 L775 338 L409 338 Z"
        fill="#1F8A68"
        opacity={sharp ? 0.24 : 0.16}
      />

      {/* Winding Mississippi river band */}
      <path
        d="M409 322 C490 308 552 344 624 330 C686 318 726 296 775 304 L775 362 C718 352 678 378 606 386 C526 394 468 358 409 374 Z"
        fill="#3A33A8"
        opacity={sharp ? 0.34 : 0.24}
      />
      {/* Crisp contour lines across the landscape */}
      <path
        d="M409 258 Q482 212 560 242 T712 224 Q748 220 775 236"
        fill="none"
        stroke="#3A33A8"
        strokeWidth="1.6"
      />
      <path
        d="M409 322 C490 308 552 344 624 330 C686 318 726 296 775 304"
        fill="none"
        stroke="#1F8A68"
        strokeWidth="1.6"
      />
      <path
        d="M430 412 H752"
        stroke="var(--steel)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      <text
        x="592"
        y="404"
        textAnchor="middle"
        fill="var(--muted)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="0.16em"
      >
        ∞ DIST · RICE PARK HORIZON
      </text>
    </g>
  );
}

export function TrialFrameHero({
  className = '',
  idPrefix = 'tfh',
}: {
  className?: string;
  idPrefix?: string;
}) {
  const blurId = `${idPrefix}-blur`;
  const clipId = `${idPrefix}-lenses`;
  const sheenId = `${idPrefix}-sheen`;

  const leftCx = 216;
  const rightCx = 584;
  const cy = 236;
  const lensR = 128;

  return (
    <svg
      viewBox="0 0 800 520"
      fill="none"
      role="img"
      aria-label="Steel optometry trial frame bringing an eye acuity chart and horizon landscape into crisp focus"
      className={`trial-frame-stage block h-auto w-full select-none ${className}`}
    >
      <defs>
        <filter id={blurId} x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur stdDeviation="4.6" />
        </filter>
        <clipPath id={clipId}>
          <circle cx={leftCx} cy={cy} r={lensR} />
          <circle cx={rightCx} cy={cy} r={lensR} />
        </clipPath>
        <linearGradient id={sheenId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B54D6" />
          <stop offset="100%" stopColor="#1F8A68" />
        </linearGradient>
      </defs>

      {/* Faint Placido rings directly behind the instrument */}
      <g stroke="var(--steel)" strokeWidth="1" opacity="0.18">
        {[90, 145, 200, 255, 310, 365].map(r => (
          <circle key={r} cx="400" cy={cy} r={r} />
        ))}
      </g>

      {/* Out-of-focus background scene */}
      <g filter={`url(#${blurId})`} opacity="0.82">
        <ExamSceneBackdrop sharp={false} />
      </g>

      {/* Pin-sharp scene visible strictly through the two trial-lens apertures */}
      <g clipPath={`url(#${clipId})`}>
        <ExamSceneBackdrop sharp />
      </g>

      {/* Upper optical bridge rail & PD scale */}
      <g>
        <rect
          x="104"
          y="74"
          width="592"
          height="16"
          rx="4"
          fill="var(--surface)"
          stroke="var(--steel)"
          strokeWidth="1.5"
        />
        {/* Millimetre PD graduation ticks across bridge bar */}
        {Array.from({ length: 29 }, (_, idx) => {
          const x = 148 + idx * 18;
          const tall = idx % 4 === 0;
          return (
            <line
              key={x}
              x1={x}
              y1="74"
              x2={x}
              y2={tall ? 85 : 80}
              stroke="var(--steel)"
              strokeWidth="1.2"
            />
          );
        })}
        {/* Centre PD adjustment knob */}
        <rect x="380" y="64" width="40" height="36" rx="5" fill="var(--surface-2)" stroke="var(--steel)" strokeWidth="1.6" />
        <line x1="400" y1="68" x2="400" y2="96" stroke="var(--minus-red)" strokeWidth="2" />
        <text
          x="400"
          y="56"
          textAnchor="middle"
          fill="var(--muted)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.14em"
        >
          PD 62 MM
        </text>
      </g>

      {/* Temple hinge lugs & nose bridge arch */}
      <path
        d={`M ${leftCx + lensR + 12} ${cy - 22} Q 400 ${cy - 68} ${rightCx - lensR - 12} ${cy - 22}`}
        stroke="var(--steel)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect x="36" y={cy - 18} width="34" height="24" rx="4" fill="var(--surface)" stroke="var(--steel)" strokeWidth="1.5" />
      <rect x="730" y={cy - 18} width="34" height="24" rx="4" fill="var(--surface)" stroke="var(--steel)" strokeWidth="1.5" />

      {/* Left (OD) steel trial-lens ring + 0–180° protractor + AR sheen + red axis needle */}
      <g>
        <circle cx={leftCx} cy={cy} r={lensR + 14} fill="none" stroke="var(--steel)" strokeWidth="2" />
        <circle cx={leftCx} cy={cy} r={lensR + 6} fill="none" stroke="var(--line)" strokeWidth="1.2" />
        <circle cx={leftCx} cy={cy} r={lensR} fill="none" stroke="var(--steel)" strokeWidth="3" />
        {/* AR coating sheen arc on lens rim */}
        <path
          d={`M ${leftCx - 92} ${cy - 76} A ${lensR - 8} ${lensR - 8} 0 0 1 ${leftCx + 52} ${cy - 108}`}
          stroke={`url(#${sheenId})`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ProtractorTicks cx={leftCx} cy={cy} innerR={lensR + 1} outerR={lensR + 14} />
        {/* OD lens tab */}
        <rect x={leftCx - 28} y={cy - lensR - 26} width="56" height="18" rx="3" fill="var(--minus-red)" />
        <text
          x={leftCx}
          y={cy - lensR - 13.5}
          textAnchor="middle"
          fill="var(--on-minus-red)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fontWeight="700"
        >
          OD -1.25
        </text>
        {/* Red axis needle (rotates on hover/focus) */}
        <g className="trial-needle trial-needle-left">
          <line
            x1={leftCx - lensR - 20}
            y1={cy}
            x2={leftCx - lensR + 12}
            y2={cy}
            stroke="var(--minus-red)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <line
            x1={leftCx + lensR - 12}
            y1={cy}
            x2={leftCx + lensR + 20}
            y2={cy}
            stroke="var(--minus-red)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle cx={leftCx + lensR + 20} cy={cy} r="3.5" fill="var(--minus-red)" />
        </g>
      </g>

      {/* Right (OS) steel trial-lens ring + 0–180° protractor + AR sheen + red axis needle */}
      <g>
        <circle cx={rightCx} cy={cy} r={lensR + 14} fill="none" stroke="var(--steel)" strokeWidth="2" />
        <circle cx={rightCx} cy={cy} r={lensR + 6} fill="none" stroke="var(--line)" strokeWidth="1.2" />
        <circle cx={rightCx} cy={cy} r={lensR} fill="none" stroke="var(--steel)" strokeWidth="3" />
        {/* AR coating sheen arc */}
        <path
          d={`M ${rightCx - 92} ${cy - 76} A ${lensR - 8} ${lensR - 8} 0 0 1 ${rightCx + 52} ${cy - 108}`}
          stroke={`url(#${sheenId})`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ProtractorTicks cx={rightCx} cy={cy} innerR={lensR + 1} outerR={lensR + 14} />
        {/* OS lens tab */}
        <rect x={rightCx - 28} y={cy - lensR - 26} width="56" height="18" rx="3" fill="var(--ink)" />
        <text
          x={rightCx}
          y={cy - lensR - 13.5}
          textAnchor="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fontWeight="700"
        >
          OS +0.75
        </text>
        {/* Red axis needle (rotates on hover/focus) */}
        <g className="trial-needle trial-needle-right">
          <line
            x1={rightCx - lensR - 20}
            y1={cy}
            x2={rightCx - lensR + 12}
            y2={cy}
            stroke="var(--minus-red)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <line
            x1={rightCx + lensR - 12}
            y1={cy}
            x2={rightCx + lensR + 20}
            y2={cy}
            stroke="var(--minus-red)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle cx={rightCx - lensR - 20} cy={cy} r="3.5" fill="var(--minus-red)" />
        </g>
      </g>

      {/* Spare red-tabbed trial lens resting at the bottom edge */}
      <g transform="translate(402, 464) rotate(-8)">
        <rect x="-15" y="-50" width="30" height="14" rx="2.5" fill="var(--minus-red)" />
        <text
          x="0"
          y="-40"
          textAnchor="middle"
          fill="var(--on-minus-red)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          fontWeight="700"
        >
          -0.50
        </text>
        <circle cx="0" cy="0" r="36" fill="var(--surface)" stroke="var(--steel)" strokeWidth="2.2" />
        <circle cx="0" cy="0" r="28" fill="var(--paper)" stroke="var(--line)" strokeWidth="1" />
        <path
          d="M -18 -14 A 24 24 0 0 1 14 -18"
          stroke={`url(#${sheenId})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/** Single-lens trial frame motif used in the Eye tests PageHead. */
export function TrialFrameSingle({ className = '' }: { className?: string }) {
  const cx = 140;
  const cy = 136;
  const r = 82;
  return (
    <svg
      viewBox="0 0 280 260"
      fill="none"
      aria-hidden="true"
      className={`trial-lens-single block h-auto w-full select-none ${className}`}
    >
      <defs>
        <filter id="tfs-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
        <clipPath id="tfs-clip">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
        <linearGradient id="tfs-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B54D6" />
          <stop offset="100%" stopColor="#1F8A68" />
        </linearGradient>
      </defs>

      {/* Blurred chart background */}
      <g filter="url(#tfs-blur)" opacity="0.72">
        <rect x="28" y="24" width="224" height="212" rx="8" fill="var(--chart-glow)" stroke="var(--chart-line)" />
        <g textAnchor="middle" fill="var(--chart-ink)" fontFamily="var(--font-display)" fontWeight="800">
          <text x={cx} y="96" fontSize="42">E F</text>
          <text x={cx} y="140" fontSize="28" letterSpacing="0.16em">T O Z</text>
          <text x={cx} y="176" fontSize="20" letterSpacing="0.2em">L P E D</text>
          <text x={cx} y="204" fontSize="14" letterSpacing="0.22em">P E C F D</text>
        </g>
      </g>

      {/* Sharp inside lens */}
      <g clipPath="url(#tfs-clip)">
        <rect x="28" y="24" width="224" height="212" fill="var(--chart-glow)" />
        <line x1="48" y1="154" x2="232" y2="154" stroke="#1F8A68" strokeWidth="2" />
        <g textAnchor="middle" fill="var(--chart-ink)" fontFamily="var(--font-display)" fontWeight="800">
          <text x={cx} y="96" fontSize="42">E F</text>
          <text x={cx} y="140" fontSize="28" letterSpacing="0.16em">T O Z</text>
          <text x={cx} y="176" fontSize="20" letterSpacing="0.2em">L P E D</text>
          <text x={cx} y="204" fontSize="14" letterSpacing="0.22em">P E C F D</text>
        </g>
      </g>

      {/* Steel ring, protractor & red tab */}
      <circle cx={cx} cy={cy} r={r + 12} stroke="var(--steel)" strokeWidth="1.8" />
      <circle cx={cx} cy={cy} r={r} stroke="var(--steel)" strokeWidth="2.8" />
      <path
        d={`M ${cx - 58} ${cy - 48} A ${r - 6} ${r - 6} 0 0 1 ${cx + 36} ${cy - 68}`}
        stroke="url(#tfs-sheen)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ProtractorTicks cx={cx} cy={cy} innerR={r + 1} outerR={r + 12} />
      <rect x={cx - 24} y={cy - r - 24} width="48" height="16" rx="2.5" fill="var(--minus-red)" />
      <text x={cx} y={cy - r - 12.5} textAnchor="middle" fill="var(--on-minus-red)" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="700">
        -1.00
      </text>
      <g className="trial-needle trial-needle-left">
        <line x1={cx - r - 16} y1={cy} x2={cx - r + 10} y2={cy} stroke="var(--minus-red)" strokeWidth="2.2" strokeLinecap="round" />
        <line x1={cx + r - 10} y1={cy} x2={cx + r + 16} y2={cy} stroke="var(--minus-red)" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
