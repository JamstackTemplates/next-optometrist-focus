import type { Metadata } from 'next';
import { AppointmentCard, AppointmentCardMini } from '../../components/appointment-card';
import { CopyEmail } from '../../components/copy-email';
import { UrgentNote } from '../../components/home-sections';
import { LensFramedMap, PrescriptionSlip } from '../../components/inner-sections';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { business, phoneHref } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      {/* 1. Page head with appointment-card motif */}
      <PageHead
        eyebrow="Enquiries · Saint Paul"
        title={business.enquiries.title}
        art={<AppointmentCardMini />}
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      {/* 2. Form host (or email fallback) left + What to include slip, email, phone & urgent note right */}
      <section className="wrap py-12 lg:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7" aria-label="Enquiry form">
            <div className="rounded-ui border border-line bg-surface p-6 sm:p-8">
              <p className="readout">Send an enquiry</p>
              <h2 className="mt-1.5 font-display text-2xl font-extrabold text-ink">
                Tell us what you need
              </h2>
              <p className="mt-2 text-sm text-muted">
                Appointments, contact lens fittings, frame checks and vision-plan checks are
                arranged when we reply.
              </p>

              <div className="mt-6">
                {hosted ? (
                  <JamstacksSupportForm
                    siteId={site.jamstacksSite}
                    embedUrl={site.jamstacksEmbedUrl}
                    email={business.email}
                  />
                ) : (
                  <div className="rounded-ui border border-dashed border-steel bg-paper p-6">
                    <h3 className="font-display text-lg font-extrabold text-ink">
                      Email our front desk directly
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      The online enquiry form is not connected on this preview. Send your message to{' '}
                      <a
                        className="text-link break-all font-mono font-semibold"
                        href={`mailto:${business.email}`}
                      >
                        {business.email}
                      </a>{' '}
                      or call{' '}
                      <a
                        className="text-link font-mono font-semibold"
                        href={phoneHref(business.phone)}
                      >
                        {business.phone}
                      </a>{' '}
                      and we will reply to arrange a time.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Urgent symptoms note */}
            <UrgentNote className="mt-8" />
          </div>

          <aside aria-label="Contact details and message guide" className="space-y-8 lg:col-span-5">
            <div className="rounded-ui border border-line bg-surface p-6">
              <p className="readout">Direct contact</p>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="font-mono text-[0.7rem] font-semibold tracking-widest text-muted uppercase">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      className="text-link break-all font-mono text-sm font-semibold"
                      href={`mailto:${business.email}`}
                    >
                      {business.email}
                    </a>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <CopyEmail email={business.email} />
                    </div>
                  </dd>
                </div>

                {business.phone ? (
                  <div className="border-t border-line pt-4">
                    <dt className="font-mono text-[0.7rem] font-semibold tracking-widest text-muted uppercase">
                      Telephone
                    </dt>
                    <dd className="mt-1">
                      <a
                        className="text-link font-mono text-base font-bold"
                        href={phoneHref(business.phone)}
                      >
                        {business.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <PrescriptionSlip code="MESSAGE GUIDE · RX" heading="What to include">
              {business.enquiries.usefulToInclude.map(tip => (
                <PrescriptionSlip.Item key={tip}>{tip}</PrescriptionSlip.Item>
              ))}
            </PrescriptionSlip>
          </aside>
        </div>
      </section>

      {/* 4. Appointment-card hours with open-now status and time-zone note */}
      <section className="border-y border-line bg-surface-2 py-16">
        <div className="wrap max-w-2xl">
          <AppointmentCard id="hours" hours={business.hours} heading="Practice hours" />
        </div>
      </section>

      {/* 5. Map framed inside a large calibrated steel lens ring */}
      <LensFramedMap
        heading="Facing Rice Park in downtown Saint Paul"
        address={business.address}
        mapQuery={business.mapQuery}
        parkingNote={business.parkingNote}
      />
    </>
  );
}
