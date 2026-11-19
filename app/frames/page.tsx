import type { Metadata } from 'next';
import { FrameDrawing } from '../../components/art/frame-drawing';
import { FramesCatalog } from '../../components/frames-catalog';
import { ClosingCta } from '../../components/home-sections';
import { FittingSteps, LensPriceList } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { frames } from '../../content/frames';
import { lensOptions } from '../../content/lens-options';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Frames',
  description:
    'Filter our curated Saint Paul frames wall by shape, material and fit, with transparent frame sizes, prices, availability and lens options.',
  alternates: { canonical: absoluteUrl('/frames/') },
};

function HangingFramesTrio() {
  const trio = frames.slice(0, 3);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1.5 px-3">
      {trio.map(frame => (
        <FrameDrawing key={frame.id} frame={frame} className="h-14 w-full max-w-[9.5rem]" />
      ))}
    </div>
  );
}

export default function FramesPage() {
  return (
    <>
      {/* 1. Page head with three frames hanging */}
      <PageHead
        eyebrow="Dispensary · Frames wall"
        title="Frames worth wearing every day."
        art={<HangingFramesTrio />}
      >
        <p>
          Independent shapes chosen for balance, bridge fit and lasting materials. Every tag lists
          exact millimetre sizing, frame-only pricing and whether it is on the wall today.
        </p>
      </PageHead>

      {/* 2. Sticky filter bar + full slatted frames wall */}
      <FramesCatalog items={frames} />

      {/* 3. Lenses and coatings optical price list */}
      <LensPriceList
        kicker="Optical lenses"
        heading="Lenses and coatings"
        note="Lenses are quoted after your eye test and fitting."
        options={lensOptions}
      />

      {/* 4. "How fitting works" around a calibrated lens ring */}
      <FittingSteps
        kicker="In the dispensary"
        heading="How fitting works"
        aftercare="Free adjustments and nose-pad swaps for frames bought here."
      >
        <FittingSteps.Step number="01" title="Try on">
          Take your time at the wall. We pull shapes by bridge width, lens depth and how your
          prescription will sit in the rim—never rushing a choice.
        </FittingSteps.Step>
        <FittingSteps.Step number="02" title="Measure">
          Once you pick a frame, we record pupillary distance, optical height and temple angle so
          your lenses sit right where your eyes naturally look.
        </FittingSteps.Step>
        <FittingSteps.Step number="03" title="Collect & adjust">
          When your glasses are ready we check clarity at distance and near, warm-adjust the arms
          behind your ears and balance the bridge.
        </FittingSteps.Step>
      </FittingSteps>

      {/* 5. Closing CTA */}
      <ClosingCta
        kicker="Frames enquiry"
        heading="Ask whether a frame is on the wall today."
        action="Ask about a frame"
        idPrefix="frames-cta"
      />
    </>
  );
}
