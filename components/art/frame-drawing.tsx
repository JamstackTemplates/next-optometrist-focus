import type { Frame } from '../../content/frames';

/**
 * Parametric front-view optical frame illustration for all eight frame shapes.
 * Proportions scale directly from lensWidthMm and bridgeMm, rim stroke uses rimHex,
 * and lens apertures carry the subtle violet-to-green AR-coating sheen arc.
 */
export function FrameDrawing({
  frame,
  className = 'w-full h-auto',
}: {
  frame: Pick<Frame, 'id' | 'name' | 'shape' | 'material' | 'rimHex' | 'lensWidthMm' | 'bridgeMm'>;
  className?: string;
}) {
  const isMetal = frame.material === 'titanium' || frame.material === 'stainless-steel';
  const strokeW = isMetal ? 2.4 : 4.6;
  const gradId = `ar-lens-${frame.id}`;

  // Map real millimetre measurements onto the 220x96 viewBox
  const scale = 1.38;
  const lw = frame.lensWidthMm * scale; // ~55–77
  const bw = frame.bridgeMm * scale * 0.92; // ~19–28
  const cx = 110;
  const cy = 48;
  const leftCx = cx - bw / 2 - lw / 2;
  const rightCx = cx + bw / 2 + lw / 2;
  const rx = lw / 2;

  const lensHeightFactor: Record<Frame['shape'], number> = {
    round: 0.96,
    panto: 0.88,
    rectangle: 0.64,
    'cat-eye': 0.72,
    aviator: 0.86,
    browline: 0.78,
    hexagonal: 0.84,
    oval: 0.74,
  };
  const ry = rx * lensHeightFactor[frame.shape];

  function lensPath(centerX: number, side: 'left' | 'right'): string {
    const dir = side === 'left' ? -1 : 1;
    const x0 = centerX - rx;
    const x1 = centerX + rx;
    const y0 = cy - ry;
    const y1 = cy + ry;

    switch (frame.shape) {
      case 'round':
        return `M ${centerX} ${y0} A ${rx} ${ry} 0 1 0 ${centerX} ${y1} A ${rx} ${ry} 0 1 0 ${centerX} ${y0} Z`;

      case 'oval':
        return `M ${centerX} ${y0} A ${rx} ${ry} 0 1 0 ${centerX} ${y1} A ${rx} ${ry} 0 1 0 ${centerX} ${y0} Z`;

      case 'rectangle': {
        const r = Math.min(8, ry * 0.34);
        return [
          `M ${x0 + r} ${y0}`,
          `H ${x1 - r} Q ${x1} ${y0} ${x1} ${y0 + r}`,
          `V ${y1 - r} Q ${x1} ${y1} ${x1 - r} ${y1}`,
          `H ${x0 + r} Q ${x0} ${y1} ${x0} ${y1 - r}`,
          `V ${y0 + r} Q ${x0} ${y0} ${x0 + r} ${y0} Z`,
        ].join(' ');
      }

      case 'panto':
        return [
          `M ${centerX - rx * 0.88} ${y0 + ry * 0.16}`,
          `Q ${centerX} ${y0 - ry * 0.08} ${centerX + rx * 0.88} ${y0 + ry * 0.16}`,
          `C ${x1 + rx * 0.06} ${cy - ry * 0.1} ${x1} ${y1 - ry * 0.05} ${centerX} ${y1}`,
          `C ${x0} ${y1 - ry * 0.05} ${x0 - rx * 0.06} ${cy - ry * 0.1} ${centerX - rx * 0.88} ${y0 + ry * 0.16} Z`,
        ].join(' ');

      case 'cat-eye': {
        const outerX = side === 'left' ? x0 - 4 : x1 + 4;
        const innerX = side === 'left' ? x1 : x0;
        const outerTopY = y0 - 5;
        const innerTopY = y0 + 5;
        return [
          `M ${innerX} ${innerTopY}`,
          `Q ${centerX + dir * 4} ${y0 + 1} ${outerX} ${outerTopY}`,
          `C ${outerX + dir * 2} ${cy + ry * 0.35} ${centerX + dir * rx * 0.55} ${y1} ${centerX} ${y1}`,
          `C ${centerX - dir * rx * 0.72} ${y1} ${innerX} ${cy + ry * 0.3} ${innerX} ${innerTopY} Z`,
        ].join(' ');
      }

      case 'aviator': {
        const outerX = side === 'left' ? x0 : x1;
        const innerX = side === 'left' ? x1 : x0;
        return [
          `M ${innerX} ${y0 + 2}`,
          `Q ${centerX} ${y0 - 3} ${outerX} ${y0 + 3}`,
          `C ${outerX + dir * 2} ${cy + ry * 0.55} ${centerX + dir * rx * 0.55} ${y1 + 4} ${centerX + dir * rx * 0.14} ${y1 + 3}`,
          `C ${centerX - dir * rx * 0.55} ${y1 + 1} ${innerX} ${cy + ry * 0.25} ${innerX} ${y0 + 2} Z`,
        ].join(' ');
      }

      case 'browline':
        return [
          `M ${x0 + 3} ${y0 + 2}`,
          `Q ${centerX} ${y0 - 4} ${x1 - 3} ${y0 + 2}`,
          `C ${x1 + 2} ${cy + ry * 0.45} ${centerX + rx * 0.6} ${y1} ${centerX} ${y1}`,
          `C ${centerX - rx * 0.6} ${y1} ${x0 - 2} ${cy + ry * 0.45} ${x0 + 3} ${y0 + 2} Z`,
        ].join(' ');

      case 'hexagonal': {
        const dx = rx * 0.52;
        return [
          `M ${centerX - dx} ${y0}`,
          `L ${centerX + dx} ${y0}`,
          `L ${x1} ${cy - ry * 0.1}`,
          `L ${centerX + dx * 0.85} ${y1}`,
          `L ${centerX - dx * 0.85} ${y1}`,
          `L ${x0} ${cy - ry * 0.1} Z`,
        ].join(' ');
      }
    }
  }

  const leftEdge = leftCx - rx;
  const rightEdge = rightCx + rx;
  const bridgeY = frame.shape === 'aviator' ? cy - ry * 0.58 : cy - ry * 0.24;

  return (
    <svg
      viewBox="0 0 220 96"
      fill="none"
      role="img"
      aria-label={`${frame.name} ${frame.shape} frame`}
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B54D6" stopOpacity="0.26" />
          <stop offset="55%" stopColor="#1F8A68" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1F8A68" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Temple end-pieces */}
      <line
        x1={Math.max(8, leftEdge - 9)}
        y1={cy - ry * 0.34}
        x2={leftEdge + 2}
        y2={cy - ry * 0.34}
        stroke={frame.rimHex}
        strokeWidth={isMetal ? 2.5 : 4.2}
        strokeLinecap="round"
      />
      <line
        x1={rightEdge - 2}
        y1={cy - ry * 0.34}
        x2={Math.min(212, rightEdge + 9)}
        y2={cy - ry * 0.34}
        stroke={frame.rimHex}
        strokeWidth={isMetal ? 2.5 : 4.2}
        strokeLinecap="round"
      />

      {/* Bridge (double bar for aviator, arched keyhole/saddle otherwise) */}
      <path
        d={`M ${leftCx + rx - 1} ${bridgeY} Q ${cx} ${bridgeY - (isMetal ? 5 : 7)} ${rightCx - rx + 1} ${bridgeY}`}
        stroke={frame.rimHex}
        strokeWidth={isMetal ? 2.2 : 4}
        strokeLinecap="round"
      />
      {frame.shape === 'aviator' && (
        <line
          x1={leftCx + rx * 0.55}
          y1={cy - ry + 2}
          x2={rightCx - rx * 0.55}
          y2={cy - ry + 2}
          stroke={frame.rimHex}
          strokeWidth={2}
          strokeLinecap="round"
        />
      )}

      {/* Left & right lenses with AR sheen fill */}
      <path
        d={lensPath(leftCx, 'left')}
        fill={`url(#${gradId})`}
        stroke={frame.shape === 'browline' ? 'var(--steel)' : frame.rimHex}
        strokeWidth={frame.shape === 'browline' ? 2 : strokeW}
        strokeLinejoin="round"
      />
      <path
        d={lensPath(rightCx, 'right')}
        fill={`url(#${gradId})`}
        stroke={frame.shape === 'browline' ? 'var(--steel)' : frame.rimHex}
        strokeWidth={frame.shape === 'browline' ? 2 : strokeW}
        strokeLinejoin="round"
      />

      {/* Heavy upper brow bar for browline frames */}
      {frame.shape === 'browline' && (
        <>
          <path
            d={`M ${leftCx - rx + 1} ${cy - ry * 0.4} Q ${leftCx} ${cy - ry - 4} ${leftCx + rx - 1} ${cy - ry * 0.4}`}
            stroke={frame.rimHex}
            strokeWidth={5.2}
            strokeLinecap="round"
          />
          <path
            d={`M ${rightCx - rx + 1} ${cy - ry * 0.4} Q ${rightCx} ${cy - ry - 4} ${rightCx + rx - 1} ${cy - ry * 0.4}`}
            stroke={frame.rimHex}
            strokeWidth={5.2}
            strokeLinecap="round"
          />
        </>
      )}

      {/* AR coating reflection arcs inside lenses */}
      <path
        d={`M ${leftCx - rx * 0.52} ${cy - ry * 0.25} A ${rx * 0.65} ${ry * 0.65} 0 0 1 ${leftCx + rx * 0.15} ${cy - ry * 0.62}`}
        stroke="#1F8A68"
        strokeOpacity="0.48"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d={`M ${rightCx - rx * 0.52} ${cy - ry * 0.25} A ${rx * 0.65} ${ry * 0.65} 0 0 1 ${rightCx + rx * 0.15} ${cy - ry * 0.62}`}
        stroke="#5B54D6"
        strokeOpacity="0.48"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Nose pad highlights for metal frames */}
      {isMetal && (
        <>
          <ellipse cx={leftCx + rx + 2} cy={cy - 1} rx="1.6" ry="3.4" fill="var(--steel)" opacity="0.65" />
          <ellipse cx={rightCx - rx - 2} cy={cy - 1} rx="1.6" ry="3.4" fill="var(--steel)" opacity="0.65" />
        </>
      )}
    </svg>
  );
}
