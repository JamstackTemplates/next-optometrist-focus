import { DarkModeToggle } from 'jamstacks';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/eye-tests/', label: 'Eye tests' },
  { href: '/frames/', label: 'Frames' },
  { href: '/children/', label: 'Children' },
  { href: '/contact/', label: 'Contact' },
] as const;

function WordmarkRing() {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className="h-9 w-9 shrink-0">
      <defs>
        <linearGradient id="wm-sheen" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5B54D6" />
          <stop offset="100%" stopColor="#1F8A68" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="15" fill="var(--surface)" stroke="var(--steel)" strokeWidth="2" />
      <path d="M9 12.5 A12 12 0 0 1 25.5 9" stroke="url(#wm-sheen)" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="18" x2="6.5" y2="18" stroke="var(--minus-red)" strokeWidth="2" />
      <line x1="29.5" y1="18" x2="34" y2="18" stroke="var(--minus-red)" strokeWidth="2" />
      <circle cx="18" cy="18" r="4.5" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="18" cy="18" r="1.4" fill="var(--minus-red)" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm">
      <div className="wrap flex min-h-[4.75rem] items-center justify-between gap-3 py-2">
        <SiteLink
          href="/"
          className="group flex items-center gap-2.5 text-ink no-underline hover:no-underline"
        >
          <WordmarkRing />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.18rem] font-extrabold tracking-tight text-ink">
              Clear Horizon
            </span>
            <span className="mt-1 font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-muted uppercase">
              Optometry
            </span>
          </span>
        </SiteLink>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map(item => (
            <SiteLink
              key={item.href}
              href={item.href}
              markCurrent="page"
              className="font-sans text-[0.95rem] font-medium text-ink no-underline transition-colors hover:text-primary-ink hover:underline aria-[current=page]:font-semibold aria-[current=page]:text-primary-ink aria-[current=page]:underline aria-[current=page]:decoration-2"
            >
              {item.label}
            </SiteLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <SiteLink href="/contact/" className="button hidden md:inline-flex">
            Ask about an eye test
          </SiteLink>
          <DarkModeToggle />

          {/* Mobile disclosure navigation — works with or without JavaScript */}
          <details className="mobile-nav relative md:hidden">
            <summary
              aria-label="Open menu"
              className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-ui border border-line bg-surface px-3 font-mono text-xs font-semibold tracking-widest text-ink uppercase hover:border-steel"
            >
              Menu
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 mt-2 w-64 rounded-ui border border-line bg-surface p-4 shadow-xl"
            >
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {NAV_ITEMS.map(item => (
                  <li key={item.href}>
                    <SiteLink
                      href={item.href}
                      markCurrent="page"
                      className="block rounded-ui px-3 py-2.5 font-display text-base font-semibold text-ink no-underline hover:bg-surface-2 aria-[current=page]:bg-surface-2 aria-[current=page]:text-primary-ink"
                    >
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-line pt-3">
                <SiteLink href="/contact/" className="button w-full">
                  Ask about an eye test
                </SiteLink>
              </div>
            </nav>
          </details>
        </div>
      </div>
      {/* Millimetre tick rule along the bottom edge */}
      <div className="mm-rule border-b border-line" aria-hidden="true" />
    </header>
  );
}
