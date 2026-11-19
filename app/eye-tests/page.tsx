import type { Metadata } from 'next';
import { TrialFrameSingle } from '../../components/art/trial-frame-hero';
import { ClosingCta, UrgentNote } from '../../components/home-sections';
import { ExamRail, FaqList, PrescriptionSlip } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { RefractionDemo } from '../../components/refraction-demo';
import { TrialLensCase } from '../../components/trial-lens-case';
import { eyeTests } from '../../content/eye-tests';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Eye tests',
  description:
    'Comprehensive eye tests, children’s checks, contact lens fittings, diabetic checks and transparent exam fees at Clear Horizon Optometry.',
  alternates: { canonical: absoluteUrl('/eye-tests/') },
};

export default function EyeTestsPage() {
  return (
    <>
      {/* 1. Page head with single-lens trial frame */}
      <PageHead
        eyebrow="OD / OS · Eye tests"
        title="Eye tests, one lens at a time."
        art={<TrialFrameSingle className="w-full" />}
        artFrame="none"
      >
        <p>
          Clear durations, plain-language explanations and upfront fees for every exam we offer in
          downtown Saint Paul.
        </p>
      </PageHead>

      {/* 2. What happens in a full eye test — six lenses along a calibration rail */}
      <ExamRail kicker="Full 45-minute examination" heading="What happens in a full eye test">
        <ExamRail.Step number="01" title="History">
          We talk through what has changed with your sight, screen habits, medicines and family eye
          health.
        </ExamRail.Step>
        <ExamRail.Step number="02" title="Vision check">
          Reading distance and near charts to see how each eye performs on its own and together.
        </ExamRail.Step>
        <ExamRail.Step number="03" title="Refraction">
          Step-by-step lens comparisons to measure your exact prescription for distance, reading or
          screens.
        </ExamRail.Step>
        <ExamRail.Step number="04" title="Eye pressure">
          A quick, gentle intraocular pressure check to screen for glaucoma risk without discomfort.
        </ExamRail.Step>
        <ExamRail.Step number="05" title="Eye health">
          Magnified examination of the front and back of the eye, with retinal imaging available to
          record a baseline.
        </ExamRail.Step>
        <ExamRail.Step number="06" title="Results & advice">
          Plain-English summary, time for questions and your written prescription to keep.
        </ExamRail.Step>
      </ExamRail>

      {/* 3. Full trial-lens case with all eight tests */}
      <section className="border-y border-line bg-surface-2/40 py-16">
        <div className="wrap">
          <div className="mb-8 max-w-2xl">
            <p className="readout">Tests and fees</p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
              Choose the test that fits your visit
            </h2>
            <p className="mt-3 text-base text-muted">
              Open any lens slot to see exactly what is included. If you are unsure which test you
              need, tell us in your enquiry and we will recommend one.
            </p>
          </div>
          <TrialLensCase tests={eyeTests} mode="full" />
        </div>
      </section>

      {/* 4. "One or two?" refraction demo + 5. "What to bring" prescription slip */}
      <section className="wrap py-16">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RefractionDemo
              heading="One or two?"
              caption="During refraction we bracket tiny 0.25-diopter steps—comparing Lens 1 and Lens 2 until the letters snap into effortless contrast. You cannot fail the test; if both look the same, that tells us we are right on the mark."
            />
          </div>

          <div className="lg:col-span-5">
            <PrescriptionSlip code="PRE-VISIT CHECKLIST" heading="What to bring">
              <PrescriptionSlip.Item>
                Your current glasses (distance, reading or sunglasses)
              </PrescriptionSlip.Item>
              <PrescriptionSlip.Item>
                Your contact lens boxes, foil lids or written lens details
              </PrescriptionSlip.Item>
              <PrescriptionSlip.Item>
                A list of medicines or eye drops you take regularly
              </PrescriptionSlip.Item>
              <PrescriptionSlip.Item>
                Your vision plan card, if you would like us to check coverage
              </PrescriptionSlip.Item>
              <PrescriptionSlip.Item>
                Sunglasses for the walk home in case dilating drops are used
              </PrescriptionSlip.Item>
            </PrescriptionSlip>
          </div>
        </div>
      </section>

      {/* 6. Five FAQs as accessible <details> */}
      <FaqList kicker="Common questions" heading="Before your eye test">
        <FaqList.Item question="How long does an eye test take?">
          A comprehensive adult eye test takes about 45 minutes. Children’s eye tests run around 30
          minutes, and contact lens fittings take 40 minutes so there is plenty of time to practise.
        </FaqList.Item>
        <FaqList.Item question="How often should I have my eyes tested?">
          Most adults benefit from an eye test every two years, or every year if you wear contact
          lenses, have diabetes, are over 60 or notice any change in your vision.
        </FaqList.Item>
        <FaqList.Item question="Are dilating eye drops always used?">
          Not for every visit. We always use dilating drops for diabetic eye checks and whenever we
          need a wider look at the retina, and we explain why before putting any drops in.
        </FaqList.Item>
        <FaqList.Item question="Can I drive home afterwards?">
          After a standard undilated test you can drive straight away. If dilating drops are used,
          your near vision will be slightly blurry and bright sunlight can feel strong for two to
          four hours, so bring sunglasses or arrange a lift if you prefer.
        </FaqList.Item>
        <FaqList.Item question="Do you accept vision plans?">
          Yes, we work with many common plans. Ask us with your plan name and we will confirm what it
          covers before your visit.
        </FaqList.Item>
      </FaqList>

      {/* 7. Urgent symptoms note & closing CTA */}
      <section className="wrap pb-6">
        <UrgentNote />
      </section>

      <ClosingCta
        kicker="Eye test enquiries"
        heading="Ready to arrange an eye test? Tell us which days suit you."
        action="Ask about an eye test"
        idPrefix="tests-cta"
      />
    </>
  );
}
