"use client";
import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Neutral static output; browser refreshes in the configured business zone every minute. */
export function OpenBadge({
  hours,
  className = '',
}: {
  hours: readonly OpeningHours[];
  className?: string;
}) {
  const [label, setLabel] = useState('See opening hours');
  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const isOpen = label.startsWith('Open now');
  const isClosed = label.startsWith('Closed');

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wide ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
          isOpen ? 'bg-coating' : isClosed ? 'bg-minus-red' : 'bg-steel'
        }`}
      />
      <span>{label}</span>
    </span>
  );
}
