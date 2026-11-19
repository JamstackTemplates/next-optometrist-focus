import type { Metadata } from 'next';
import { FrameWall } from '../components/frame-wall';
import {
  AcuityChartBand,
  ChildrenTeaser,
  ClosingCta,
  HomeHero,
  OptometristsBand,
  VisitBand,
} from '../components/home-sections';
import { SiteLink } from '../components/site-link';
import { TrialLensCase } from '../components/trial-lens-case';
import { business } from '../content/business';
import { eyeTests } from '../content/eye-tests';
import { frames } from '../content/frames';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

const PREVIEW_TEST_IDS = new Set([
  'comprehensive-eye-test',
  'childrens-eye-test',
  'contact-lens-fitting',
  'diabetic-eye-check',
]);

export default function HomePage() {
  const previewTests = eyeTests.filter(test => PREVIEW_TEST_IDS.has(test.id));
  const previewFrames = frames.filter(frame => frame.onTheWall).slice(0, 5);
  const lowestTestPrice = Math.min(
    ...eyeTests
      .filter(test => test.id === 'comprehensive-eye-test' || test.id === 'childrens-eye-test')
      .map(test => test.priceUsd),
  );

  return (
    <>
      {/* 1. Asymmetric 5/7 Hero with trial-frame scene, open-now status and address */}
      <HomeHero>
        <HomeHero.Kicker>Facing Rice Park · Saint Paul</HomeHero.Kicker>
        <HomeHero.Heading>See the horizon clearly.</HomeHero.Heading>
        <HomeHero.Introduction>
          Thorough eye tests, honest advice and frames chosen to fit your face, facing Rice Park in
          downtown Saint Paul.
        </HomeHero.Introduction>
        <HomeHero.Actions primary="Ask about an eye test" secondary="Browse frames" />
      </HomeHero>

      {/* 2. "Read the chart" — full-bleed lit acuity chart band */}
      <AcuityChartBand eyebrow="Read the chart">
        <AcuityChartBand.Row ratio="20/200" href="/eye-tests/" size={1}>
          Eye tests from ${lowestTestPrice}
        </AcuityChartBand.Row>
        <AcuityChartBand.Row ratio="20/100" href="/frames/" size={2} accentRule="green">
          Frames on the wall
        </AcuityChartBand.Row>
        <AcuityChartBand.Row ratio="20/70" href="/children/" size={3}>
          Children from 6 months
        </AcuityChartBand.Row>
        <AcuityChartBand.Row ratio="20/50" href="/contact/#hours" size={4} accentRule="red">
          Late Thursdays to 7:30
        </AcuityChartBand.Row>
      </AcuityChartBand>

      {/* 3. Eye tests preview — heading over a full-width open trial-lens case */}
      <section className="wrap py-20 lg:py-28">
        <div className="mb-10 grid items-end gap-6 lg:mb-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="readout">Exam room · Fees</p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.75rem)] leading-[0.98] font-black tracking-[-0.04em] text-ink">
              Eye tests, clearly priced.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-muted">
              Every test runs at a calm pace with time to ask questions. You leave with a clear
              explanation of your eye health and your written prescription.
            </p>
            <div className="mt-5">
              <SiteLink href="/eye-tests/" className="button button-quiet">
                See all eight eye tests →
              </SiteLink>
            </div>
          </div>
        </div>
        <TrialLensCase tests={previewTests} mode="preview" />
      </section>

      {/* 4. Frames preview — full-bleed ash-wood slat with a pinned title card */}
      <section className="relative border-y border-line bg-surface-2 pt-20 pb-16 lg:pt-24 lg:pb-20">
        <FrameWall
          items={previewFrames}
          scrollRow
          pinnedCard={
            <>
              <p className="readout">Dispensary wall</p>
              <h2 className="mt-2 font-display text-[1.9rem] leading-[1] font-black tracking-tight text-ink">
                Frames on the wall today
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Hand-picked acetate, bio-acetate and titanium shapes with bridge widths that
                actually fit.
              </p>
              <div className="mt-4">
                <SiteLink href="/frames/" className="text-link font-display text-sm font-bold">
                  Explore all {frames.length} frames →
                </SiteLink>
              </div>
            </>
          }
        />
      </section>

      {/* 5. Children's vision teaser — mirrored art-left, copy-right */}
      <ChildrenTeaser
        kicker="Children's vision"
        heading="Children's eyes from six months"
        body="Babies and young children do not need to read letters to have their sight checked. Picture shapes and gentle tracking games let us spot focusing or eye-teaming issues early."
        action="How children's checks work"
      />

      {/* 6. The optometrists — monogram lens rings on surface-2 band */}
      <OptometristsBand
        kicker="Your optometrists"
        heading="Two independent optometrists, one unhurried room."
        optometrists={business.optometrists}
      />

      {/* 7. Visit — AppointmentCard overlapping Placido-ring address panel */}
      <VisitBand
        kicker="Visit Clear Horizon"
        heading="Facing Rice Park in downtown Saint Paul."
        directionsLabel="Get directions"
      />

      {/* 8. Closing call to action */}
      <ClosingCta
        kicker="Enquiries"
        heading="Not sure where to start? Tell us what has changed with your sight."
        action="Ask about an eye test"
        idPrefix="home-cta"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
