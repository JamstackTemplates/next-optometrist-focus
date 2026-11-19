import type { ReactNode } from 'react';
import type { ChildMilestone } from '../content/child-milestones';
import type { LensOption } from '../content/lens-options';
import { mapDirectionsUrl } from '../lib/maps';
import { OpticalIcon } from './art/icons';
import { TumblingEPath } from './art/tumbling-e-path';
import { GoogleMap } from './google-map';

type ChildrenProps = { children: ReactNode };

/* -------------------------------------------------------------------------- */
/* Eye tests: 6 steps as steel lenses along a calibration rail                */
/* -------------------------------------------------------------------------- */

function ExamRailRoot({
  kicker,
  heading,
  children,
}: {
  kicker: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="wrap py-16">
      <div className="max-w-2xl">
        <p className="readout">{kicker}</p>
        <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
          {heading}
        </h2>
      </div>

      <div className="relative mt-10">
        {/* Horizontal calibration rail on desktop, vertical rail on mobile */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 left-7 w-0.5 bg-steel/60 lg:top-8 lg:right-6 lg:bottom-auto lg:left-6 lg:h-0.5 lg:w-auto"
        />
        <ol className="relative m-0 grid list-none gap-6 p-0 lg:grid-cols-6 lg:gap-4">
          {children}
        </ol>
      </div>
    </section>
  );
}

function ExamRailStep({
  number,
  title,
  children,
}: {
  number: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="relative flex items-start gap-4 lg:flex-col lg:items-start lg:gap-4">
      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-steel bg-surface shadow-xs lg:h-16 lg:w-16">
        <span className="font-mono text-base font-bold text-primary-ink">{number}</span>
        <span
          aria-hidden="true"
          className="absolute -right-1 h-0.5 w-2 bg-minus-red"
        />
      </div>
      <div className="pt-1 lg:pt-0">
        <h3 className="font-display text-lg font-extrabold text-ink">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{children}</p>
      </div>
    </li>
  );
}

export const ExamRail = Object.assign(ExamRailRoot, { Step: ExamRailStep });

/* -------------------------------------------------------------------------- */
/* Printed prescription slip with torn paper edge ("What to bring/include")   */
/* -------------------------------------------------------------------------- */

function PrescriptionSlipRoot({
  code,
  heading,
  children,
  className = '',
}: {
  code: string;
  heading: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rx-slip ${className}`}>
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
          <span className="font-mono text-[0.7rem] font-bold tracking-[0.18em] text-primary-ink uppercase">
            {code}
          </span>
          <span className="font-mono text-xs font-bold text-muted" aria-hidden="true">
            ℞
          </span>
        </div>
        <h2 className="mt-4 font-display text-xl font-extrabold text-ink">{heading}</h2>
        <ul className="mt-4 m-0 list-none space-y-2.5 p-0 font-mono text-xs leading-relaxed text-ink sm:text-[0.83rem]">
          {children}
        </ul>
      </div>
    </div>
  );
}

function PrescriptionSlipItem({ children }: ChildrenProps) {
  return (
    <li className="flex items-start gap-2.5 border-b border-dashed border-line/70 pb-2.5 last:border-b-0 last:pb-0">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-minus-red" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

export const PrescriptionSlip = Object.assign(PrescriptionSlipRoot, {
  Item: PrescriptionSlipItem,
});

/* -------------------------------------------------------------------------- */
/* Accessible <details> FAQ list (no headings inside <summary>)               */
/* -------------------------------------------------------------------------- */

function FaqListRoot({
  kicker,
  heading,
  id = 'faq-heading',
  children,
}: {
  kicker: string;
  heading: ReactNode;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="wrap py-16">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="readout">{kicker}</p>
          <h2 id={id} className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
            {heading}
          </h2>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {children}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className="optical-details py-5">
      <summary className="font-display text-lg font-bold text-ink hover:text-primary-ink">
        {question}
      </summary>
      <div className="pt-3 pl-8 text-base leading-relaxed text-muted">{children}</div>
    </details>
  );
}

export const FaqList = Object.assign(FaqListRoot, { Item: FaqItem });

/* -------------------------------------------------------------------------- */
/* Frames: Lenses & coatings two-column optical price list                    */
/* -------------------------------------------------------------------------- */

export function LensPriceList({
  kicker,
  heading,
  note,
  options,
}: {
  kicker: string;
  heading: ReactNode;
  note: ReactNode;
  options: readonly LensOption[];
}) {
  const lenses = options.filter(o => o.kind === 'lens');
  const coatings = options.filter(o => o.kind === 'coating');

  function Group({ title, items }: { title: string; items: readonly LensOption[] }) {
    return (
      <div>
        <h3 className="border-b border-line pb-2 font-mono text-xs font-bold tracking-[0.18em] text-muted uppercase">
          {title}
        </h3>
        <ul className="mt-4 m-0 list-none space-y-5 p-0">
          {items.map(opt => (
            <li key={opt.id}>
              <div className="flex items-baseline gap-2.5">
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 shrink-0 rounded-full border-2 border-steel bg-surface"
                />
                <span className="font-display text-base font-bold text-ink">{opt.name}</span>
                <span className="dotted-leader" aria-hidden="true" />
                <span className="shrink-0 font-mono text-sm font-bold text-primary-ink">
                  From ${opt.fromPriceUsd}
                </span>
              </div>
              <p className="mt-1 pl-5 text-sm text-muted">{opt.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section className="border-y border-line bg-surface-2 py-16">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="readout">{kicker}</p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
              {heading}
            </h2>
          </div>
          <p className="max-w-md rounded-ui border border-line bg-surface px-4 py-2.5 font-mono text-xs text-muted">
            {note}
          </p>
        </div>

        <div className="mt-10 grid gap-10 rounded-ui border border-line bg-surface p-6 sm:p-8 lg:grid-cols-2">
          <Group title="Prescription lenses" items={lenses} />
          <Group title="Coatings & sun tints" items={coatings} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Frames: "How fitting works" around a calibrated lens ring                  */
/* -------------------------------------------------------------------------- */

function FittingStepsRoot({
  kicker,
  heading,
  aftercare,
  children,
}: {
  kicker: string;
  heading: ReactNode;
  aftercare: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="wrap py-16 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col items-center justify-center lg:col-span-5">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-2 border-steel bg-surface shadow-xs sm:h-72 sm:w-72">
            <div className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-line" />
            <span aria-hidden="true" className="absolute top-1/2 -left-3 h-0.5 w-6 bg-minus-red" />
            <span aria-hidden="true" className="absolute top-1/2 -right-3 h-0.5 w-6 bg-minus-red" />
            <div className="px-8 text-center">
              <p className="readout">{kicker}</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                {heading}
              </h2>
              <p className="mt-3 font-mono text-[0.7rem] font-semibold tracking-wider text-coating uppercase">
                PD · OC · BRIDGE FIT
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-center font-mono text-xs text-muted">{aftercare}</p>
        </div>

        <ol className="m-0 list-none space-y-5 p-0 lg:col-span-7">{children}</ol>
      </div>
    </section>
  );
}

function FittingStep({
  number,
  title,
  children,
}: {
  number: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-5 rounded-ui border border-line bg-surface p-5 sm:p-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary font-mono text-sm font-bold text-primary-ink">
        {number}
      </span>
      <div>
        <h3 className="font-display text-xl font-extrabold text-ink">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{children}</p>
      </div>
    </li>
  );
}

export const FittingSteps = Object.assign(FittingStepsRoot, { Step: FittingStep });

/* -------------------------------------------------------------------------- */
/* Children: Full tumbling-E path with milestones                             */
/* -------------------------------------------------------------------------- */

export function MilestonePath({
  kicker,
  heading,
  milestones,
}: {
  kicker: string;
  heading: ReactNode;
  milestones: readonly ChildMilestone[];
}) {
  return (
    <section className="wrap py-16">
      <div className="max-w-2xl">
        <p className="readout">{kicker}</p>
        <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
          {heading}
        </h2>
      </div>

      {/* Desktop horizontal curving tumbling-E ribbon */}
      <div className="mt-8 hidden lg:block">
        <TumblingEPath />
      </div>

      <ol className="relative mt-8 m-0 grid list-none gap-6 p-0 lg:mt-4 lg:grid-cols-4">
        {/* Mobile vertical milestone rail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-4 bottom-4 left-4 w-0.5 bg-steel/60 lg:hidden"
        />
        {milestones.map((m, idx) => (
          <li
            key={m.id}
            className="relative pl-12 lg:pl-0"
          >
            <span
              aria-hidden="true"
              className="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-surface font-mono text-xs font-bold text-primary-ink lg:hidden"
            >
              {idx + 1}
            </span>
            <div className="h-full rounded-ui border border-line bg-surface p-5">
              <p className="font-mono text-sm font-bold text-primary-ink">{m.age}</p>
              <h3 className="mt-1.5 font-display text-xl font-extrabold text-ink">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Children: Parents' clipboard checklist ("Signs worth a check")             */
/* -------------------------------------------------------------------------- */

function ClipboardChecklistRoot({
  kicker,
  heading,
  intro,
  children,
}: {
  kicker: string;
  heading: ReactNode;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-y border-line bg-surface-2 py-16">
      <div className="wrap">
        <div className="relative mx-auto max-w-3xl rounded-ui border-2 border-steel bg-surface px-6 pt-10 pb-8 shadow-md sm:px-10">
          {/* Steel clipboard top clip */}
          <div
            aria-hidden="true"
            className="absolute -top-4 left-1/2 flex h-8 w-32 -translate-x-1/2 items-center justify-center rounded-ui border-2 border-steel bg-surface-2"
          >
            <span className="h-2.5 w-12 rounded-full bg-steel/60" />
          </div>

          <p className="readout">{kicker}</p>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
            {heading}
          </h2>
          <p className="mt-2 text-base text-muted">{intro}</p>

          <ul className="mt-6 m-0 grid list-none gap-3 p-0 sm:grid-cols-2">{children}</ul>
        </div>
      </div>
    </section>
  );
}

function ClipboardItem({ children }: ChildrenProps) {
  return (
    <li className="flex items-start gap-3 rounded-ui border border-line bg-paper px-4 py-3 text-sm font-medium text-ink">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border-2 border-primary font-mono text-[0.7rem] font-bold text-primary-ink"
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export const ClipboardChecklist = Object.assign(ClipboardChecklistRoot, {
  Item: ClipboardItem,
});

/* -------------------------------------------------------------------------- */
/* Contact: Map framed inside a large calibrated steel lens ring              */
/* -------------------------------------------------------------------------- */

export function LensFramedMap({
  address,
  mapQuery,
  parkingNote,
  heading,
}: {
  address: string;
  mapQuery: string;
  parkingNote: string;
  heading: ReactNode;
}) {
  return (
    <section className="wrap py-16">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="readout">FIND THE PRACTICE</p>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
            {heading}
          </h2>
          <p className="mt-4 flex items-start gap-2.5 text-base font-medium text-ink">
            <OpticalIcon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-primary-ink" />
            <span>{address}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{parkingNote}</p>
          <div className="mt-6">
            <a
              href={mapDirectionsUrl(mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-quiet"
            >
              Get directions
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Map framed inside a calibrated circular steel lens ring */}
        <div className="flex justify-center lg:col-span-7">
          <div className="relative aspect-square w-full max-w-[27rem] rounded-full border-[3px] border-steel bg-surface p-3 shadow-md">
            <span
              aria-hidden="true"
              className="absolute top-1/2 -left-4 h-1 w-7 -translate-y-1/2 bg-minus-red"
            />
            <span
              aria-hidden="true"
              className="absolute top-1/2 -right-4 h-1 w-7 -translate-y-1/2 bg-minus-red"
            />
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[2px] bg-surface px-2 font-mono text-[0.7rem] font-bold tracking-widest text-muted uppercase"
            >
              RICE PARK · 90°
            </span>
            <div className="h-full w-full overflow-hidden rounded-full border border-line">
              <GoogleMap
                address={mapQuery}
                title="Map showing Clear Horizon Optometry facing Rice Park in downtown Saint Paul"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
