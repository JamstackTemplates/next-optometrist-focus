import type { ReactNode } from 'react';
import { PlacidoRings } from './art/placido-rings';
import { ProtractorTicks } from './art/trial-frame-hero';

/** Steel trial-lens ring with a 0–180° axis scale and red needle, drawn around the PageHead art. */
function ApertureRing() {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" className="decorative-art absolute inset-0 h-full w-full overflow-visible">
      <circle cx="200" cy="200" r="186" stroke="var(--steel)" strokeWidth="2" />
      <circle cx="200" cy="200" r="176" stroke="var(--line)" strokeWidth="1.2" />
      <ProtractorTicks cx={200} cy={200} innerR={166} outerR={186} />
      <g className="trial-needle trial-needle-left">
        <line x1="-14" y1="200" x2="40" y2="200" stroke="var(--minus-red)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="360" y1="200" x2="414" y2="200" stroke="var(--minus-red)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="414" cy="200" r="5" fill="var(--minus-red)" />
      </g>
    </svg>
  );
}

/**
 * Inner-page header band: Placido-ring texture, mono readout kicker, oversized display H1, lede
 * copy, and page-specific artwork seen through a large trial-lens aperture that bleeds off the
 * right edge on wide screens.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  art,
  artFrame = 'lens',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Page-specific SVG artwork shown inside the lens aperture. */
  art?: ReactNode;
  /** `none` when the art is itself a trial lens. */
  artFrame?: 'lens' | 'none';
}) {
  return (
    <header className="trial-lens-single relative isolate overflow-hidden border-b border-line bg-paper">
      <PlacidoRings className="absolute inset-0 -z-10 h-full w-full text-ink" cx={1000} cy={240} opacity={0.1} />
      <div className="wrap relative py-14 sm:py-16 lg:flex lg:min-h-[32rem] lg:items-center lg:py-24">
        <div className="relative z-10 max-w-[38rem] lg:max-w-[36rem] xl:max-w-[40rem]">
          <p className="readout flex items-center gap-2.5 text-ink">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-minus-red" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1
            id={id}
            className="focus-pull-text mt-4 font-display text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] font-black tracking-[-0.045em] text-ink"
          >
            {title}
          </h1>
          {children ? (
            <div className="mt-6 max-w-(--measure) border-t-2 border-ink pt-5 text-lg leading-relaxed text-muted">
              {children}
            </div>
          ) : null}
        </div>
      </div>

      {art ? (
        <div
          aria-hidden="true"
          className="relative mx-auto mb-14 h-72 w-72 sm:h-80 sm:w-80 lg:absolute lg:top-1/2 lg:right-[-4rem] lg:mb-0 lg:h-[27rem] lg:w-[27rem] lg:-translate-y-1/2 xl:right-[max(-4rem,calc((100vw-78rem)/2-3rem))]"
        >
          {artFrame === 'lens' ? (
            <>
              <ApertureRing />
              <div className="absolute inset-[10%] flex items-center justify-center overflow-hidden rounded-full border-[5px] border-steel bg-surface">
                <div className="flex w-[72%] items-center justify-center">{art}</div>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">{art}</div>
          )}
        </div>
      ) : null}
      <div className="mm-rule" aria-hidden="true" />
    </header>
  );
}
