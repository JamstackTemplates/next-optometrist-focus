import { business, phoneHref } from '../content/business';
import { groupHours } from '../lib/hours';
import { LensRingRule } from './art/lens-ring-rule';
import { SiteLink } from './site-link';

const PAGES = [
  { href: '/', label: 'Home' },
  { href: '/eye-tests/', label: 'Eye tests' },
  { href: '/frames/', label: 'Frames' },
  { href: '/children/', label: 'Children' },
  { href: '/contact/', label: 'Contact' },
] as const;

/** The footer is the foot of the acuity chart in a dimmed room: rows step down to the address. */
export function SiteFooter() {
  return (
    <footer className="mt-20">
      <div className="wrap pb-6">
        <LensRingRule idPrefix="footer-lrr" />
      </div>
      <div className="room bg-paper">
        <div className="mm-rule mm-rule-top" aria-hidden="true" />
        <div className="wrap pt-16 pb-10">
          <div className="text-center">
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.2em] text-muted uppercase">20/40</p>
            <p className="mt-2 font-display text-[clamp(2.4rem,9.6vw,9rem)] leading-[0.9] font-black tracking-[0.02em] text-ink uppercase">
              Clear Horizon
            </p>
            <p className="mt-6 font-mono text-[0.7rem] font-semibold tracking-[0.2em] text-muted uppercase">20/25</p>
            <p className="mt-1 font-display text-[clamp(1.05rem,2.6vw,2rem)] font-extrabold tracking-[0.3em] text-ink uppercase">
              Optometry · Saint Paul
            </p>
          </div>

          <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="readout">Practice</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Independent optometry facing Rice Park. Thorough eye tests, contact lenses,
                children’s vision and curated frames.
              </p>
            </div>

            <div>
              <p className="readout">Hours</p>
              <dl className="mt-3 space-y-1.5 font-mono text-xs text-ink">
                {groupHours(business.hours).map(group => (
                  <div key={group.label} className="flex justify-between gap-4 border-b border-dotted border-line pb-1.5">
                    <dt className="text-muted">{group.label}</dt>
                    <dd>{group.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="readout">Contact</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className="text-link font-mono text-sm" href={phoneHref(business.phone)}>
                    {business.phone}
                  </a>
                </li>
                <li>
                  <a className="text-link font-mono text-xs break-all" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                </li>
              </ul>
            </div>

            <nav aria-label="Footer">
              <p className="readout">Pages</p>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {PAGES.map(page => (
                  <li key={page.href}>
                    <SiteLink href={page.href} className="text-ink hover:text-primary-ink hover:underline">
                      {page.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* 20/10: the smallest line on the chart is the address */}
          <div className="mt-12 border-t border-line pt-6 text-center">
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.2em] text-muted uppercase">20/10</p>
            <p className="mt-1.5 font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-ink uppercase sm:text-xs">
              {business.address}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
            <p>{business.name} · Sample practice for the Jamstacks gallery</p>
            <span title="Made with love by jamstacks.net">
              with <span role="img" aria-label="love">❤️</span>{' '}
              <a className="text-muted no-underline hover:text-primary-ink hover:underline" href="https://jamstacks.net">
                jamstacks.net
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
