import type { OpeningHours } from '../lib/hours';
import { OpenBadge } from './open-badge';
import { TimeZoneNote } from './time-zone-note';

/**
 * Printed appointment-reminder card with a punched hanging hole, ruled "Next visit" line,
 * live open-now status, full weekly hours table and time-zone note.
 */
export function AppointmentCard({
  hours,
  heading = 'Opening hours',
  id,
  className = '',
}: {
  hours: readonly OpeningHours[];
  heading?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={`relative rounded-ui border border-line bg-surface p-6 shadow-md sm:p-8 ${className}`}
    >
      {/* Top appointment-card bar with punched corner hole */}
      <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="readout">APPOINTMENT CARD · NEXT VISIT</p>
          <h2 className="mt-1.5 font-display text-2xl font-extrabold text-ink">{heading}</h2>
        </div>
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-steel bg-paper"
          title="Punched card corner"
        >
          <span className="h-2 w-2 rounded-full border border-line" />
        </span>
      </div>

      {/* Ruled "Next visit" live status strip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-line pb-4">
        <span className="font-mono text-[0.72rem] font-semibold tracking-widest text-muted uppercase">
          Status
        </span>
        <OpenBadge hours={hours} className="text-ink" />
      </div>

      {/* Seven-day table always present (including without JS and in print) */}
      <table className="mt-4 w-full border-collapse text-sm">
        <caption className="sr-only">Weekly opening hours</caption>
        <tbody>
          {hours.map(entry => {
            const isThursday = entry.day === 'Thursday';
            return (
              <tr
                key={entry.day}
                className="border-b border-line/70 last:border-b-0"
              >
                <th
                  scope="row"
                  className="py-2 pr-4 text-left font-sans font-medium text-ink"
                >
                  {entry.day}
                  {isThursday && (
                    <span className="ml-2 font-mono text-[0.7rem] font-semibold tracking-wider text-primary-ink uppercase">
                      Late
                    </span>
                  )}
                </th>
                <td className="py-2 text-right font-mono text-xs font-semibold text-ink sm:text-sm">
                  {entry.opens && entry.closes ? (
                    `${entry.opens} – ${entry.closes}`
                  ) : (
                    <span className="text-muted">Closed</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <TimeZoneNote className="font-mono text-xs text-muted" />
    </div>
  );
}

/** Compact illustrated appointment card motif for the Contact PageHead circular aperture. */
export function AppointmentCardMini() {
  return (
    <svg viewBox="0 0 220 220" fill="none" aria-hidden="true" className="h-full w-full">
      <rect x="26" y="34" width="168" height="152" rx="8" fill="var(--chart-glow)" stroke="var(--steel)" strokeWidth="2" />
      <circle cx="176" cy="52" r="7" fill="var(--paper)" stroke="var(--steel)" strokeWidth="1.5" />
      <rect x="26" y="34" width="168" height="32" rx="8" fill="var(--primary)" opacity="0.12" />
      <text x="42" y="55" fill="var(--chart-ink)" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="700" letterSpacing="0.12em">
        NEXT VISIT
      </text>
      <line x1="42" y1="84" x2="178" y2="84" stroke="var(--chart-line)" strokeWidth="1.5" />
      <text x="42" y="102" fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="9">THU LATE</text>
      <text x="178" y="102" textAnchor="end" fill="var(--chart-ink)" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="700">08:30–19:30</text>
      <line x1="42" y1="114" x2="178" y2="114" stroke="var(--chart-line)" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="42" y="132" fill="var(--chart-muted)" fontFamily="var(--font-mono)" fontSize="9">SAT</text>
      <text x="178" y="132" textAnchor="end" fill="var(--chart-ink)" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="700">09:00–14:00</text>
      <line x1="42" y1="146" x2="178" y2="146" stroke="var(--chart-line)" strokeWidth="1.5" />
      <circle cx="48" cy="165" r="4" fill="#1F8A68" />
      <text x="58" y="168.5" fill="var(--chart-ink)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700">RICE PARK · ST PAUL</text>
    </svg>
  );
}
