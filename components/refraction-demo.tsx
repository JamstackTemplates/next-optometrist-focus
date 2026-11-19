'use client';

import { useEffect, useState } from 'react';

/**
 * Interactive "One or two?" subjective refraction demonstration on a lit acuity chart panel.
 * Progressive enhancement: before JS (or without JS), both lenses render side by side labelled
 * "1" and "2". With JS, two buttons swap the chart between blurred (Lens 1) and sharp (Lens 2).
 */
export function RefractionDemo({
  heading,
  caption,
}: {
  heading: string;
  caption: string;
}) {
  const [interactive, setInteractive] = useState(false);
  const [lens, setLens] = useState<1 | 2>(1);

  useEffect(() => {
    setInteractive(true);
  }, []);

  return (
    <div className="lit-chart rounded-ui border p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-chart-line pb-4">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[0.16em] text-chart-muted uppercase">
            SUBJECTIVE REFRACTION · PHOROPTER DIAL
          </p>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-chart-ink sm:text-3xl">
            {heading}
          </h2>
        </div>

        {interactive ? (
          <div className="flex items-center gap-2" role="group" aria-label="Compare refraction lenses">
            <button
              type="button"
              aria-pressed={lens === 1}
              onClick={() => setLens(1)}
              className={`min-h-11 rounded-ui border px-4 font-mono text-xs font-bold tracking-wider uppercase transition-colors ${
                lens === 1
                  ? 'border-[#3A33A8] bg-[#3A33A8] text-white'
                  : 'border-chart-line bg-white text-chart-ink hover:border-[#3A33A8]'
              }`}
            >
              Lens 1 (−0.75)
            </button>
            <button
              type="button"
              aria-pressed={lens === 2}
              onClick={() => setLens(2)}
              className={`min-h-11 rounded-ui border px-4 font-mono text-xs font-bold tracking-wider uppercase transition-colors ${
                lens === 2
                  ? 'border-[#3A33A8] bg-[#3A33A8] text-white'
                  : 'border-chart-line bg-white text-chart-ink hover:border-[#3A33A8]'
              }`}
            >
              Lens 2 (−1.25)
            </button>
          </div>
        ) : null}
      </div>

      {interactive ? (
        <div className="mt-6 rounded-ui border border-chart-line bg-white/75 px-4 py-8 text-center">
          <p className="font-mono text-[0.72rem] font-semibold tracking-[0.18em] text-chart-muted uppercase">
            {lens === 1 ? 'LENS 1 · SLIGHTLY UNDER-CORRECTED' : 'LENS 2 · IN CRISP FOCUS'}
          </p>
          <div
            data-blurred={lens === 1 ? 'true' : 'false'}
            className="refraction-optotypes mt-4 space-y-2 select-none"
          >
            <p className="font-display text-4xl font-black tracking-[0.22em] text-chart-ink sm:text-5xl">
              D F N P
            </p>
            <p className="font-display text-2xl font-extrabold tracking-[0.26em] text-chart-ink sm:text-3xl">
              T Z V E C
            </p>
            <div className="mx-auto my-3 h-[2.5px] max-w-md bg-[#1F8A68]" aria-hidden="true" />
            <p className="font-display text-lg font-bold tracking-[0.28em] text-chart-ink sm:text-xl">
              H R K S N D
            </p>
          </div>
        </div>
      ) : (
        /* Static / no-JS fallback: both lenses shown side by side labelled "1" and "2" */
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-ui border border-chart-line bg-white/75 px-4 py-6 text-center">
            <p className="font-mono text-xs font-bold tracking-[0.18em] text-chart-muted uppercase">
              1 · Blurred
            </p>
            <div data-blurred="true" className="refraction-optotypes mt-3 space-y-1.5">
              <p className="font-display text-3xl font-black tracking-[0.22em] text-chart-ink">
                D F N P
              </p>
              <p className="font-display text-xl font-extrabold tracking-[0.24em] text-chart-ink">
                T Z V E C
              </p>
            </div>
          </div>
          <div className="rounded-ui border border-chart-line bg-white/75 px-4 py-6 text-center">
            <p className="font-mono text-xs font-bold tracking-[0.18em] text-[#1F8A68] uppercase">
              2 · Sharp
            </p>
            <div data-blurred="false" className="refraction-optotypes mt-3 space-y-1.5">
              <p className="font-display text-3xl font-black tracking-[0.22em] text-chart-ink">
                D F N P
              </p>
              <p className="font-display text-xl font-extrabold tracking-[0.24em] text-chart-ink">
                T Z V E C
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-chart-muted" aria-live="polite">
        {caption}
      </p>
    </div>
  );
}
