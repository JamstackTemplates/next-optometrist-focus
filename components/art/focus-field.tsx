import { ProtractorTicks } from './trial-frame-hero';

/**
 * Full-bleed hero field: the lit wall at the end of the exam room (acuity chart and the Rice Park
 * horizon) seen through an oversized steel trial frame. The scene is drawn twice: once softly
 * blurred across the whole field and once pin-sharp, clipped to the two lens apertures. On load the
 * sharp layer fades in (a "focus pull"); reduced motion shows the final, focused state at once.
 */

const VIEW_W = 1600;
const VIEW_H = 900;
const CY = 420;
const LENS_R = 210;
const LEFT_CX = 1010;
const RIGHT_CX = 1470;
const BRIDGE_X = (LEFT_CX + RIGHT_CX) / 2;

function FieldScene({ sharp }: { sharp: boolean }) {
  return (
    <g>
      {/* Lit wall: bleeds off the top, right and bottom; its left edge is the only straight cut */}
      <rect x="770" y="-40" width="900" height="980" fill="var(--chart-glow)" />
      <line x1="770" y1="-40" x2="770" y2="940" stroke="var(--chart-line)" strokeWidth="1.5" />

      {/* Acuity chart rows: C / LE / ARH / ORIZ / ON·SEE / THE·VIEW */}
      <g textAnchor="middle" fill="var(--chart-ink)" fontFamily="var(--font-display)" fontWeight="800">
        <text x={LEFT_CX} y="332" fontSize="140">C</text>
        <text x={LEFT_CX} y="412" fontSize="84" letterSpacing="0.14em">LE</text>
        <text x={LEFT_CX} y="472" fontSize="58" letterSpacing="0.16em">ARH</text>
        <text x={LEFT_CX} y="518" fontSize="40" letterSpacing="0.2em">ORIZ</text>
        <text x={LEFT_CX} y="562" fontSize="28" letterSpacing="0.22em">ON·SEE</text>
        <text x={LEFT_CX} y="600" fontSize="20" letterSpacing="0.26em">THE·VIEW</text>
      </g>
      <line x1="880" y1="533" x2="1140" y2="533" stroke="#1F8A68" strokeWidth="3" />
      <line x1="900" y1="575" x2="1120" y2="575" stroke="#C8323A" strokeWidth="3" />
      <g fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">
        <text x="836" y="300">20/200</text>
        <text x="836" y="404">20/100</text>
        <text x="836" y="466">20/70</text>
        <text x="836" y="514">20/50</text>
        <text x="836" y="558">20/30</text>
      </g>

      {/* Horizon through the right lens: ringed sun, river bluffs, the Mississippi */}
      <circle cx="1520" cy="330" r="40" stroke="#C8323A" strokeWidth="3" />
      <circle cx="1520" cy="330" r="24" stroke="#3A33A8" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="1520" cy="330" r="6" fill="#C8323A" />
      <line x1="1170" y1="520" x2="1670" y2="520" stroke="#3A33A8" strokeWidth="1.5" opacity="0.55" />
      <path
        d="M1170 532 Q1260 452 1360 498 T1560 470 Q1620 462 1670 486 L1670 700 L1170 700 Z"
        fill="#3A33A8"
        opacity={sharp ? 0.24 : 0.18}
      />
      <path
        d="M1170 532 Q1260 452 1360 498 T1560 470 Q1620 462 1670 486"
        stroke="#3A33A8"
        strokeWidth="2"
      />
      <path
        d="M1170 570 Q1300 530 1420 562 T1670 546 L1670 720 L1170 720 Z"
        fill="#1F8A68"
        opacity={sharp ? 0.26 : 0.18}
      />
      <path d="M1170 570 Q1300 530 1420 562 T1670 546" stroke="#1F8A68" strokeWidth="2" />

      {/* The floor of the scene: the same river runs under the whole wall */}
      <path
        d="M770 660 C900 640 1010 690 1150 668 C1300 646 1420 610 1670 626 L1670 940 L770 940 Z"
        fill="#3A33A8"
        opacity="0.2"
      />
      <path
        d="M770 740 C920 712 1060 770 1220 744 C1380 718 1500 700 1670 712 L1670 940 L770 940 Z"
        fill="#3A33A8"
        opacity="0.26"
      />
      <path
        d="M770 660 C900 640 1010 690 1150 668 C1300 646 1420 610 1670 626"
        stroke="#1F8A68"
        strokeWidth="2"
      />
      <text
        x="1260"
        y="842"
        textAnchor="middle"
        fill="var(--chart-muted)"
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="0.2em"
      >
        ∞ · RICE PARK HORIZON
      </text>
    </g>
  );
}

function TrialRing({
  cx,
  tab,
  tabFill,
  tabInk,
  needleClass,
  sheenId,
}: {
  cx: number;
  tab: string;
  tabFill: string;
  tabInk: string;
  needleClass: string;
  sheenId: string;
}) {
  const r = LENS_R;
  return (
    <g>
      <circle cx={cx} cy={CY} r={r + 22} stroke="var(--steel)" strokeWidth="2" />
      <circle cx={cx} cy={CY} r={r + 10} stroke="var(--line)" strokeWidth="1.5" />
      <circle cx={cx} cy={CY} r={r} stroke="var(--steel)" strokeWidth="5" />
      <path
        d={`M ${cx - 150} ${CY - 126} A ${r - 14} ${r - 14} 0 0 1 ${cx + 84} ${CY - 178}`}
        stroke={`url(#${sheenId})`}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <ProtractorTicks cx={cx} cy={CY} innerR={r + 2} outerR={r + 22} />
      <rect x={cx - 46} y={CY - r - 46} width="92" height="28" rx="4" fill={tabFill} />
      <text
        x={cx}
        y={CY - r - 26.5}
        textAnchor="middle"
        fill={tabInk}
        fontFamily="var(--font-mono)"
        fontSize="15"
        fontWeight="700"
      >
        {tab}
      </text>
      <g className={`trial-needle ${needleClass}`}>
        <line x1={cx - r - 34} y1={CY} x2={cx - r + 20} y2={CY} stroke="var(--minus-red)" strokeWidth="4" strokeLinecap="round" />
        <line x1={cx + r - 20} y1={CY} x2={cx + r + 34} y2={CY} stroke="var(--minus-red)" strokeWidth="4" strokeLinecap="round" />
        <circle cx={cx + r + 34} cy={CY} r="5.5" fill="var(--minus-red)" />
      </g>
    </g>
  );
}

export function FocusField({
  idPrefix,
  className = '',
  align = 'xMaxYMid',
}: {
  idPrefix: string;
  className?: string;
  /** preserveAspectRatio alignment; the field always uses `slice` so it fills its box. */
  align?: 'xMaxYMid' | 'xMidYMid';
}) {
  const blurId = `${idPrefix}-blur`;
  const clipId = `${idPrefix}-lenses`;
  const sheenId = `${idPrefix}-sheen`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio={`${align} slice`}
      fill="none"
      aria-hidden="true"
      className={`focus-field decorative-art trial-frame-stage pointer-events-none select-none ${className}`}
    >
      <defs>
        <filter id={blurId} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <clipPath id={clipId}>
          <circle cx={LEFT_CX} cy={CY} r={LENS_R - 2} />
          <circle cx={RIGHT_CX} cy={CY} r={LENS_R - 2} />
        </clipPath>
        <linearGradient id={sheenId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B54D6" />
          <stop offset="100%" stopColor="#1F8A68" />
        </linearGradient>
      </defs>

      {/* Placido-disc rings radiating from the left lens across the whole field */}
      <g stroke="var(--steel)" strokeWidth="1.2" opacity="0.28">
        {[260, 320, 390, 470, 560, 660, 770, 890, 1020].map(r => (
          <circle key={r} cx={LEFT_CX} cy={CY} r={r} />
        ))}
      </g>
      <line x1="0" y1={CY} x2={VIEW_W} y2={CY} stroke="var(--steel)" strokeWidth="1" strokeDasharray="3 8" opacity="0.45" />

      {/* Out of focus: the whole wall */}
      <g filter={`url(#${blurId})`} opacity="0.8">
        <FieldScene sharp={false} />
      </g>

      {/* In focus: only what the lenses see */}
      <g clipPath={`url(#${clipId})`} className="focus-pull-sharp">
        <FieldScene sharp />
      </g>

      {/* Upper rail with PD millimetre scale */}
      <rect x="740" y="150" width="900" height="20" rx="4" fill="var(--surface)" stroke="var(--steel)" strokeWidth="2" />
      {Array.from({ length: 44 }, (_, i) => {
        const x = 770 + i * 20;
        return <line key={x} x1={x} y1="150" x2={x} y2={i % 5 === 0 ? 164 : 157} stroke="var(--steel)" strokeWidth="1.4" />;
      })}
      <rect x={BRIDGE_X - 28} y="136" width="56" height="48" rx="6" fill="var(--surface-2)" stroke="var(--steel)" strokeWidth="2" />
      <line x1={BRIDGE_X} y1="142" x2={BRIDGE_X} y2="178" stroke="var(--minus-red)" strokeWidth="3" />
      <text x={BRIDGE_X} y="122" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="600" letterSpacing="0.16em">
        PD 62 MM
      </text>

      {/* Nose bridge arch and temple lug */}
      <path
        d={`M ${LEFT_CX + LENS_R + 18} ${CY - 40} Q ${BRIDGE_X} ${CY - 120} ${RIGHT_CX - LENS_R - 18} ${CY - 40}`}
        stroke="var(--steel)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x={LEFT_CX - LENS_R - 76} y={CY - 20} width="46" height="34" rx="5" fill="var(--surface)" stroke="var(--steel)" strokeWidth="2" />

      <TrialRing cx={LEFT_CX} tab="OD −1.25" tabFill="var(--minus-red)" tabInk="var(--on-minus-red)" needleClass="trial-needle-left" sheenId={sheenId} />
      <TrialRing cx={RIGHT_CX} tab="OS +0.75" tabFill="var(--ink)" tabInk="var(--paper)" needleClass="trial-needle-right" sheenId={sheenId} />

      {/* A spare minus lens resting at the foot of the frame */}
      <g transform={`translate(${BRIDGE_X - 10}, 780) rotate(-10)`}>
        <rect x="-26" y="-88" width="52" height="22" rx="3" fill="var(--minus-red)" />
        <text x="0" y="-72" textAnchor="middle" fill="var(--on-minus-red)" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700">
          −0.50
        </text>
        <circle r="64" fill="var(--surface)" stroke="var(--steel)" strokeWidth="3" />
        <circle r="50" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
        <path d="M -34 -24 A 44 44 0 0 1 22 -38" stroke={`url(#${sheenId})`} strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
