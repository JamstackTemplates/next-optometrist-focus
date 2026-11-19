import type { OpticalIconName } from '../../content/eye-tests';

export function OpticalIcon({
  name,
  className = 'h-6 w-6',
}: {
  name: OpticalIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {name === 'phoropter' && (
        <>
          <path d="M12 3v3" />
          <path d="M5 9a5 5 0 0 1 7 0 5 5 0 0 1 7 0v5a5 5 0 0 1-7 4.5A5 5 0 0 1 5 14V9Z" />
          <circle cx="8.5" cy="12" r="2" />
          <circle cx="15.5" cy="12" r="2" />
          <path d="M12 9v9.5" />
        </>
      )}
      {name === 'child-chart' && (
        <>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M8.5 10.5 12 7.5l3.5 3" />
          <path d="M9.5 10.5v3h5v-3" />
          <circle cx="9.5" cy="17" r="1.2" />
          <rect x="13.5" y="15.8" width="2.4" height="2.4" />
        </>
      )}
      {name === 'contact-lens' && (
        <>
          <path d="M4 15c1.5-5.5 4.5-8 8-8s6.5 2.5 8 8" />
          <ellipse cx="12" cy="15.5" rx="8" ry="2.5" />
          <path d="M9 10.5a5 5 0 0 1 6 0" />
        </>
      )}
      {name === 'retina' && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="15" cy="11" r="2" />
          <path d="M13 11c-2.5 0-4.5-1.5-6.5-4" />
          <path d="M13 12c-2.5.5-4.5 2-6 4.5" />
          <path d="M15 9c0-2 1-3.5 2.5-4.5" />
        </>
      )}
      {name === 'drop' && (
        <>
          <path d="M12 3.5c3.5 5 6 8 6 11.2a6 6 0 1 1-12 0c0-3.2 2.5-6.2 6-11.2Z" />
          <path d="M9.5 15.2a2.5 2.5 0 0 0 2.5 2.3" />
        </>
      )}
      {name === 'tear' && (
        <>
          <path d="M3 12c2.5-4 5.5-6 9-6s6.5 2 9 6c-2.5 4-5.5 6-9 6s-6.5-2-9-6Z" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M18.5 17.5c.8 1.2 1.2 1.8 1.2 2.4a1.2 1.2 0 1 1-2.4 0c0-.6.4-1.2 1.2-2.4Z" />
        </>
      )}
      {name === 'car' && (
        <>
          <path d="M4 13l2-5h12l2 5" />
          <rect x="3" y="13" width="18" height="5" rx="1.5" />
          <circle cx="7" cy="18" r="1.5" />
          <circle cx="17" cy="18" r="1.5" />
          <path d="M7 15.5h2M15 15.5h2" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </>
      )}
      {name === 'pin' && (
        <>
          <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </>
      )}
      {name === 'phone' && (
        <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
      )}
      {name === 'mail' && (
        <>
          <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
      {name === 'glasses' && (
        <>
          <circle cx="7" cy="13" r="4" />
          <circle cx="17" cy="13" r="4" />
          <path d="M11 12.5a1.5 1.5 0 0 1 2 0" />
          <path d="M3 12.5 4.5 8M21 12.5 19.5 8" />
        </>
      )}
    </svg>
  );
}
