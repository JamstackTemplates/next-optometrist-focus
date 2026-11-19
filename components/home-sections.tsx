import type { ReactNode } from 'react';
import { business, phoneHref, type Optometrist } from '../content/business';
import { mapDirectionsUrl } from '../lib/maps';
import { LensRingRule } from './art/lens-ring-rule';
import { OpticalIcon } from './art/icons';
import { PlacidoRings } from './art/placido-rings';
import { FocusField } from './art/focus-field';
import { TumblingEPath } from './art/tumbling-e-path';
import { AppointmentCard } from './appointment-card';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

/* -------------------------------------------------------------------------- */
/* 1. Home Hero — full-bleed focus field; the trial frame bleeds off the right  */
/* -------------------------------------------------------------------------- */

function HomeHeroRoot({ children }: ChildrenProps) {
  return (
    <section className="hero-focus-zone relative isolate overflow-hidden bg-paper">
      {/* Below xl: the lenses sit in a band right under the header, both visible */}
      <div className="relative h-[340px] border-b border-line sm:h-[440px] lg:h-[520px] xl:hidden">
        <FocusField idPrefix="hero-m" className="absolute inset-0 h-full w-full" />
      </div>

      {/* xl and up: the field fills the hero and the frame bleeds off the right edge */}
      <FocusField idPrefix="hero-d" className="absolute inset-0 hidden h-full w-full xl:block" />

      <div className="wrap relative z-10 py-10 sm:py-14 xl:flex xl:min-h-[min(calc(100svh-5.25rem),56rem)] xl:items-center xl:py-20">
        <div className="max-w-[34rem] xl:max-w-[33rem]">
          {children}
          <div className="mt-8 grid gap-2 border-t-2 border-ink pt-4 text-sm">
            <OpenBadge hours={business.hours} className="text-ink" />
            <p className="flex items-start gap-2 font-mono text-xs leading-snug font-medium text-muted">
              <OpticalIcon name="pin" className="mt-px h-4 w-4 shrink-0 text-minus-red" />
              <span>{business.address}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mm-rule relative z-10" aria-hidden="true" />
    </section>
  );
}

function HeroKicker({ children }: ChildrenProps) {
  return (
    <p className="readout flex items-center gap-2.5 text-ink">
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-minus-red" aria-hidden="true" />
      {children}
    </p>
  );
}

function HeroHeading({ children }: ChildrenProps) {
  return (
    <h1 className="focus-pull-text mt-4 font-display text-[clamp(3.1rem,11vw,4.75rem)] leading-[0.92] font-black tracking-[-0.045em] text-ink sm:text-[5.5rem] xl:text-[clamp(5.5rem,6.9vw,7.5rem)]">
      {children}
    </h1>
  );
}

function HeroIntroduction({ children }: ChildrenProps) {
  return (
    <p className="mt-6 max-w-[34ch] text-[1.08rem] leading-relaxed text-muted sm:text-xl">
      {children}
    </p>
  );
}

function HeroActions({ primary, secondary }: { primary: ReactNode; secondary: ReactNode }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
      <SiteLink href="/contact/" className="button button-lg">
        {primary}
      </SiteLink>
      <SiteLink
        href="/frames/"
        className="inline-flex items-center gap-1.5 font-display text-base font-bold text-primary-ink no-underline hover:underline"
      >
        <span>{secondary}</span>
        <span aria-hidden="true">→</span>
      </SiteLink>
    </div>
  );
}

export const HomeHero = Object.assign(HomeHeroRoot, {
  Kicker: HeroKicker,
  Heading: HeroHeading,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
});

/* -------------------------------------------------------------------------- */
/* 2. "Read the chart" — full-bleed lit chart ending on a duochrome strip      */
/* -------------------------------------------------------------------------- */

function LandoltRing({ gap }: { gap: 0 | 90 | 180 | 270 }) {
  return (
    <svg viewBox="0 0 40 40" className="h-[clamp(1.75rem,4vw,3rem)] w-auto" fill="none" aria-hidden="true">
      <g transform={`rotate(${gap} 20 20)`}>
        <path d="M 34 16 A 15 15 0 1 0 34 24" stroke="#13151F" strokeWidth="7" />
      </g>
    </svg>
  );
}

function AcuityChartRoot({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section aria-label="Practice highlights as an eye chart" className="lit-chart relative border-y">
      <div className="wrap pt-12 pb-10 sm:pt-20 sm:pb-16">
        <div className="mb-6 flex items-center justify-between border-b-2 border-chart-ink pb-3 font-mono text-[0.72rem] font-semibold tracking-[0.18em] text-chart-ink uppercase sm:mb-10">
          <span className="flex items-center gap-2.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#C8323A]" aria-hidden="true" />
            {eyebrow}
          </span>
          <span className="text-chart-muted">Snellen · 6 m</span>
        </div>
        <ol className="m-0 list-none p-0">{children}</ol>
      </div>
      <div className="duochrome" aria-hidden="true">
        <div className="bg-[#C8323A]">
          <LandoltRing gap={0} />
          <LandoltRing gap={90} />
          <LandoltRing gap={180} />
        </div>
        <div className="bg-[#1F8A68]">
          <LandoltRing gap={270} />
          <LandoltRing gap={0} />
          <LandoltRing gap={90} />
        </div>
      </div>
    </section>
  );
}

const ROW_SIZE_CLASSES = {
  1: 'text-[clamp(2rem,5.1vw,5.4rem)] tracking-[0.03em] font-black',
  2: 'text-[clamp(1.6rem,3.9vw,4rem)] tracking-[0.07em] font-black',
  3: 'text-[clamp(1.35rem,3.2vw,3rem)] tracking-[0.12em] font-extrabold',
  4: 'text-[clamp(1.1rem,2.2vw,2rem)] tracking-[0.18em] font-extrabold',
} as const;

function AcuityChartRow({
  ratio,
  href,
  size,
  accentRule,
  children,
}: {
  ratio: string;
  href: string;
  size: 1 | 2 | 3 | 4;
  accentRule?: 'green' | 'red';
  children: ReactNode;
}) {
  return (
    <li className="chart-row-reveal relative">
      <SiteLink
        href={href}
        className="group grid grid-cols-[3.5rem_1fr_1.5rem] items-center gap-2 py-4 text-center leading-none text-chart-ink no-underline transition-colors hover:text-[#3A33A8] sm:grid-cols-[6rem_1fr_6rem] sm:gap-3 sm:py-6"
      >
        <span className="text-left font-mono text-[0.68rem] font-semibold text-chart-muted sm:text-sm">
          {ratio}
        </span>
        <span className={`font-display uppercase ${ROW_SIZE_CLASSES[size]}`}>{children}</span>
        <span
          aria-hidden="true"
          className="text-right font-mono text-sm font-bold text-[#3A33A8] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          →
        </span>
      </SiteLink>
      {accentRule ? (
        <div
          aria-hidden="true"
          className={`mx-auto h-1 w-[min(100%,46rem)] ${accentRule === 'green' ? 'bg-[#1F8A68]' : 'bg-[#C8323A]'}`}
        />
      ) : null}
    </li>
  );
}

export const AcuityChartBand = Object.assign(AcuityChartRoot, {
  Row: AcuityChartRow,
});

/* -------------------------------------------------------------------------- */
/* 5. Children's vision teaser — mirrored art-left, copy-right                */
/* -------------------------------------------------------------------------- */

export function ChildrenTeaser({
  kicker,
  heading,
  body,
  action,
}: {
  kicker: string;
  heading: ReactNode;
  body: ReactNode;
  action: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-7">
          <p className="flex items-baseline font-mono leading-[0.78] font-bold tracking-[-0.07em] text-primary-ink">
            <span className="text-[clamp(9rem,30vw,19rem)]">6</span>
            <span className="ml-3 text-[clamp(3.5rem,11vw,7rem)] tracking-[-0.04em]">mo</span>
          </p>
          <p className="readout mt-4 border-t-2 border-ink pt-3 text-ink">First vision check · No reading needed</p>
          <div className="mt-6 max-w-2xl">
            <TumblingEPath compact />
          </div>
        </div>

        <div className="lg:col-span-5 lg:pl-6">
          <p className="readout">{kicker}</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.4vw,3.6rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{body}</p>
          <div className="mt-8">
            <SiteLink href="/children/" className="button button-quiet">
              <span>{action}</span>
              <span aria-hidden="true">→</span>
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Optometrists — the room dims; two lit lens monograms                    */
/* -------------------------------------------------------------------------- */

function OptometristMonogram({ person }: { person: Optometrist }) {
  const gradId = `od-sheen-${person.id}`;
  const ticks = Array.from({ length: 19 }, (_, i) => i * 10);
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className="h-44 w-44 shrink-0 sm:h-52 sm:w-52">
      <defs>
        <linearGradient id={gradId} x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5B54D6" />
          <stop offset="100%" stopColor="#1F8A68" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="92" stroke="var(--steel)" strokeWidth="1.5" />
      {ticks.map(deg => {
        const rad = (deg * Math.PI) / 180;
        const r1 = deg % 30 === 0 ? 80 : 85;
        return (
          <line
            key={deg}
            x1={(100 + Math.cos(rad) * r1).toFixed(1)}
            y1={(100 + Math.sin(rad) * r1).toFixed(1)}
            x2={(100 + Math.cos(rad) * 92).toFixed(1)}
            y2={(100 + Math.sin(rad) * 92).toFixed(1)}
            stroke="var(--steel)"
            strokeWidth="1.2"
          />
        );
      })}
      <circle cx="100" cy="100" r="78" fill="var(--surface)" stroke="var(--steel)" strokeWidth="4" />
      {/* The lens face stays lit in the dimmed room */}
      <circle cx="100" cy="100" r="68" fill="var(--chart-glow)" />
      <path d="M 50 62 A 62 62 0 0 1 128 44" stroke={`url(#${gradId})`} strokeWidth="4" strokeLinecap="round" />
      <g transform={`rotate(${person.axisDegrees} 100 100)`}>
        <line x1="2" y1="100" x2="30" y2="100" stroke="var(--minus-red)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="170" y1="100" x2="198" y2="100" stroke="var(--minus-red)" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <text x="100" y="116" textAnchor="middle" fill="#13151F" fontFamily="var(--font-display)" fontSize="50" fontWeight="900" letterSpacing="0.02em">
        {person.initials}
      </text>
      <text x="100" y="142" textAnchor="middle" fill="#4A5068" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
        OD · AXIS {person.axisDegrees}°
      </text>
    </svg>
  );
}

export function OptometristsBand({
  kicker,
  heading,
  optometrists,
}: {
  kicker: string;
  heading: ReactNode;
  optometrists: readonly Optometrist[];
}) {
  return (
    <section className="room relative isolate overflow-hidden bg-paper py-20 lg:py-28">
      <PlacidoRings className="absolute inset-0 -z-10 h-full w-full text-ink" cx={600} cy={300} opacity={0.12} />
      <div className="mm-rule mm-rule-top absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="readout">{kicker}</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
            {heading}
          </h2>
        </div>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
          {optometrists.map(person => (
            <article key={person.id} className="flex flex-col items-start gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
              <OptometristMonogram person={person} />
              <div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{person.name}</h3>
                <p className="mt-2 font-mono text-xs font-semibold tracking-wider text-primary-ink uppercase">
                  {person.focus}
                </p>
                <p className="mt-3 leading-relaxed text-muted">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Visit band — AppointmentCard overlapping Placido-ring location panel    */
/* -------------------------------------------------------------------------- */

export function VisitBand({
  kicker,
  heading,
  directionsLabel,
}: {
  kicker: string;
  heading: ReactNode;
  directionsLabel: string;
}) {
  return (
    <section className="wrap py-20 lg:py-28">
      <div className="grid items-center gap-6 lg:grid-cols-12">
        {/* The appointment card overlaps the Placido panel by one column */}
        <div className="relative z-10 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:-rotate-[1.5deg]">
          <AppointmentCard hours={business.hours} heading="Practice hours" className="shadow-2xl" />
        </div>

        <div className="relative isolate overflow-hidden rounded-ui border border-line bg-surface-2 p-8 sm:p-10 lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:py-20 lg:pr-14 lg:pl-[calc(12.5%+3rem)]">
          <PlacidoRings className="absolute inset-0 -z-10 h-full w-full text-ink" cx={980} cy={240} opacity={0.12} />
          <div className="relative">
            <p className="readout">{kicker}</p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
              {heading}
            </h2>

            <dl className="mt-8 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <OpticalIcon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-primary-ink" />
                <div>
                  <dt className="font-mono text-[0.7rem] font-semibold tracking-widest text-muted uppercase">
                    Address
                  </dt>
                  <dd className="mt-0.5 font-sans text-base font-medium text-ink">
                    {business.address}
                  </dd>
                  <p className="mt-1 text-xs text-muted">{business.parkingNote}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <OpticalIcon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-primary-ink" />
                <div>
                  <dt className="font-mono text-[0.7rem] font-semibold tracking-widest text-muted uppercase">
                    Telephone
                  </dt>
                  <dd className="mt-0.5">
                    <a className="text-link font-mono text-sm font-semibold" href={phoneHref(business.phone)}>
                      {business.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <OpticalIcon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-primary-ink" />
                <div>
                  <dt className="font-mono text-[0.7rem] font-semibold tracking-widest text-muted uppercase">
                    Email
                  </dt>
                  <dd className="mt-0.5">
                    <a className="text-link break-all font-mono text-sm font-semibold" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={mapDirectionsUrl(business.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-quiet"
              >
                {directionsLabel}
                <span aria-hidden="true">↗</span>
              </a>
              <SiteLink href="/contact/" className="button">
                Ask about an eye test
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. Closing CTA — LensRingRule followed by centred indigo band              */
/* -------------------------------------------------------------------------- */

export function ClosingCta({
  kicker,
  heading,
  action,
  idPrefix = 'cta-lrr',
  showRule = false,
}: {
  kicker?: string;
  heading: ReactNode;
  action: ReactNode;
  idPrefix?: string;
  /** The footer already opens with a lens-ring rule, so this is off by default. */
  showRule?: boolean;
}) {
  return (
    <section className="mt-16">
      {showRule ? (
        <div className="wrap pb-6">
          <LensRingRule idPrefix={idPrefix} />
        </div>
      ) : null}
      <div className="relative isolate overflow-hidden bg-primary px-4 py-20 text-on-primary sm:py-28">
        <PlacidoRings className="absolute inset-0 -z-10 h-full w-full text-white" cx={600} cy={240} opacity={0.16} />
        <svg
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
          className="decorative-art absolute top-1/2 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 opacity-35"
        >
          <circle cx="200" cy="200" r="190" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="200" cy="200" r="174" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="0" y1="200" x2="40" y2="200" stroke="#FF6B70" strokeWidth="4" />
          <line x1="360" y1="200" x2="400" y2="200" stroke="#FF6B70" strokeWidth="4" />
        </svg>
        <div className="wrap text-center">
          {kicker ? (
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-on-primary/85 uppercase">{kicker}</p>
          ) : null}
          <h2 className="mx-auto mt-4 max-w-[20ch] font-display text-[clamp(2.1rem,5vw,4.25rem)] leading-[1.02] font-black tracking-[-0.035em] text-on-primary">
            {heading}
          </h2>
          <div className="mt-9">
            <SiteLink href="/contact/" className="button button-on-primary button-lg">
              {action}
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared Urgent Symptoms Panel (Eye tests & Contact)                         */
/* -------------------------------------------------------------------------- */

export function UrgentNote({ className = '' }: { className?: string }) {
  return (
    <aside
      aria-label="Urgent eye symptoms"
      className={`relative rounded-ui border-2 border-minus-red/70 bg-surface p-5 sm:p-6 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-[2px] bg-minus-red px-2 py-0.5 font-mono text-[0.7rem] font-bold tracking-widest text-on-minus-red uppercase">
          Urgent care
        </span>
        <span className="font-mono text-xs font-semibold text-muted">
          Call{' '}
          <a className="text-link font-mono" href={phoneHref(business.phone)}>
            {business.phone}
          </a>
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink">{business.urgentNotice}</p>
    </aside>
  );
}
