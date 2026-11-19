import type { EyeTest } from '../content/eye-tests';
import { OpticalIcon } from './art/icons';

function LensSlotRing({ test }: { test: EyeTest }) {
  const isMinus = test.tabKind === 'minus';
  const gradId = `slot-sheen-${test.id}`;
  return (
    <div className="relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center sm:h-40 sm:w-40">
      {/* Coloured lens tab at the top of the ring */}
      <span
        className={`absolute -top-1 z-10 rounded-[3px] px-2.5 py-0.5 font-mono text-xs font-bold tracking-wider ${
          isMinus ? 'bg-minus-red text-on-minus-red' : 'bg-chart-glow text-chart-ink'
        }`}
      >
        {test.lensPower}
      </span>

      {/* Recessed velvet slot, steel lens ring and a lit lens face */}
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B54D6" />
            <stop offset="100%" stopColor="#1F8A68" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="78" fill="#000000" fillOpacity="0.35" />
        <circle cx="80" cy="80" r="74" stroke="var(--line)" strokeWidth="1" />
        <circle cx="80" cy="80" r="62" fill="var(--surface)" stroke="var(--steel)" strokeWidth="3.5" />
        <circle cx="80" cy="80" r="52" fill="var(--chart-glow)" />
        <path d="M 38 58 A 48 48 0 0 1 100 34" stroke={`url(#${gradId})`} strokeWidth="3" strokeLinecap="round" />
        <line x1="10" y1="80" x2="22" y2="80" stroke="var(--minus-red)" strokeWidth="2.5" />
        <line x1="138" y1="80" x2="150" y2="80" stroke="var(--minus-red)" strokeWidth="2.5" />
      </svg>

      <OpticalIcon name={test.icon} className="relative z-10 h-10 w-10 text-chart-ink" />
    </div>
  );
}

/**
 * Open optometric trial-lens case: a dark velvet tray (the dimmed room) with recessed round slots,
 * each holding a lit lens for one eye test.
 * - `mode="preview"` renders the four-slot tray on Home.
 * - `mode="full"` renders every test on Eye tests with expandable <details> for includes.
 */
export function TrialLensCase({
  tests,
  mode = 'full',
  className = '',
}: {
  tests: readonly EyeTest[];
  mode?: 'preview' | 'full';
  className?: string;
}) {
  return (
    <div className={`room rounded-[1.5rem] border-2 border-steel bg-surface-2 p-2 shadow-2xl sm:p-3 ${className}`}>
      {/* Inner velvet tray */}
      <div className="rounded-[1.1rem] bg-velvet-deep px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 font-mono text-[0.72rem] font-semibold tracking-[0.16em] text-muted uppercase">
          <span>
            Trial lens case · {tests.length} {tests.length === 1 ? 'test' : 'tests'}
          </span>
          <span>Fees in USD · time included</span>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {tests.map(test => (
            <article key={test.id} className="flex flex-col items-center text-center">
              <LensSlotRing test={test} />
              <h3 className="mt-5 font-display text-xl leading-tight font-extrabold text-ink">{test.name}</h3>
              <p className="mt-2 font-mono text-[2rem] leading-none font-bold tracking-tight text-ink">
                ${test.priceUsd}
              </p>
              <p className="mt-2 font-mono text-xs font-semibold tracking-wide text-primary-ink uppercase">
                {test.durationMinutes} min · Ages {test.ages}
              </p>
              <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-muted">{test.summary}</p>

              {mode === 'full' && (
                <details className="optical-details mt-4 w-full border-t border-line pt-3 text-left">
                  <summary className="font-mono text-xs font-semibold tracking-wider text-ink uppercase">
                    What is included ({test.includes.length})
                  </summary>
                  <ul className="mt-3 space-y-1.5 pl-7 text-sm text-muted">
                    {test.includes.map(item => (
                      <li key={item} className="list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
