import type { ReactNode } from 'react';
import {
  formatFrameSize,
  frameStatusLabel,
  FRAME_FIT_LABELS,
  FRAME_MATERIAL_LABELS,
  type Frame,
} from '../content/frames';
import { FrameDrawing } from './art/frame-drawing';

function HangingFrameItem({ frame }: { frame: Frame }) {
  return (
    <article className="flex w-[15.25rem] shrink-0 snap-start flex-col items-center sm:w-auto">
      {/* Wooden display peg protruding from the ash slat */}
      <div className="flex flex-col items-center" aria-hidden="true">
        <span className="h-3.5 w-3.5 rounded-full border border-ink/25 bg-[var(--wood-peg)] shadow-xs" />
        <span className="h-2.5 w-0.5 bg-steel" />
      </div>

      {/* Frame illustration hanging from the peg */}
      <div className="w-full px-1 py-2">
        <FrameDrawing frame={frame} className="mx-auto h-24 w-full max-w-[13.5rem] drop-shadow-[0_10px_8px_rgb(19_21_31_/_0.14)]" />
      </div>

      {/* Vertical string thread connecting frame to its paper price tag */}
      <div className="flex flex-col items-center" aria-hidden="true">
        <span className="h-4 w-px bg-steel" />
        <span className="h-2 w-2 rounded-full border border-steel bg-paper" />
      </div>

      {/* Paper price tag */}
      <div className="w-full rounded-[3px] border border-line bg-surface px-3.5 py-3 text-left shadow-xs">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-base font-extrabold text-ink">{frame.name}</h3>
          <span className="font-mono text-sm font-bold text-primary-ink">${frame.priceUsd}</span>
        </div>

        <p className="mt-0.5 text-xs text-muted">
          {frame.maker} · {frame.colour}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-1 border-t border-dashed border-line pt-2 font-mono text-[0.7rem] text-muted">
          <span title="Lens width, bridge and temple in millimetres">{formatFrameSize(frame)}</span>
          <span>
            {FRAME_MATERIAL_LABELS[frame.material]} · {FRAME_FIT_LABELS[frame.fit]}
          </span>
        </div>

        <p className="mt-2 flex items-center gap-1.5 font-mono text-[0.7rem] font-semibold">
          <span
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 rounded-full ${
              frame.onTheWall ? 'bg-coating' : 'bg-steel'
            }`}
          />
          <span className={frame.onTheWall ? 'text-coating' : 'text-muted'}>
            {frameStatusLabel(frame.onTheWall)}
          </span>
        </p>
      </div>
    </article>
  );
}

/**
 * Horizontal ash-wood slat wall holding hanging frames with paper price tags.
 * - `scrollRow`: single horizontal slat (Home preview), with an optional pinned paper card on the left.
 * - default: frames grouped onto horizontal slats of up to 4 frames per row (Frames wall & Children kids' shelf).
 */
export function FrameWall({
  items,
  scrollRow = false,
  pinnedCard,
  slatSize = 4,
  className = '',
}: {
  items: readonly Frame[];
  scrollRow?: boolean;
  pinnedCard?: ReactNode;
  slatSize?: number;
  className?: string;
}) {
  if (scrollRow) {
    return (
      <div className={`relative ${className}`}>
        {/* Continuous ash-wood horizontal slat behind the pegs */}
        <div className="wood-slat pointer-events-none absolute inset-x-0 top-0 h-12" aria-hidden="true" />
        <div className="wrap relative pt-4">
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-[15rem_repeat(5,minmax(0,1fr))] lg:overflow-visible">
            {pinnedCard ? (
              <div className="w-[15.5rem] shrink-0 snap-start lg:w-auto">
                <div className="relative -mt-12 rounded-[3px] border border-line bg-surface p-5 shadow-xl lg:-rotate-1">
                  {/* Pin tack */}
                  <span
                    aria-hidden="true"
                    className="mx-auto mb-3 block h-3 w-3 rounded-full border-2 border-steel bg-minus-red"
                  />
                  {pinnedCard}
                </div>
              </div>
            ) : null}
            {items.map(frame => (
              <HangingFrameItem key={frame.id} frame={frame} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Group into horizontal slats of `slatSize` frames
  const slats: Frame[][] = [];
  for (let i = 0; i < items.length; i += slatSize) {
    slats.push(items.slice(i, i + slatSize));
  }

  return (
    <div className={`space-y-12 ${className}`}>
      {slats.map((slat, slatIdx) => (
        <div key={slatIdx} className="relative">
          <div className="wood-slat pointer-events-none absolute inset-x-0 top-0 h-10 rounded-[2px]" aria-hidden="true" />
          <div
            className={`relative grid gap-5 px-2 pt-3 sm:px-4 ${
              slatSize === 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {slat.map(frame => (
              <HangingFrameItem key={frame.id} frame={frame} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
