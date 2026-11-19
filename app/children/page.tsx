import type { Metadata } from 'next';
import { PictureChart } from '../../components/art/picture-chart';
import { FrameWall } from '../../components/frame-wall';
import { ClosingCta } from '../../components/home-sections';
import { ClipboardChecklist, MilestonePath } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { childMilestones } from '../../content/child-milestones';
import { frames } from '../../content/frames';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: "Children's vision",
  description:
    'Gentle, picture-based eye tests for babies from six months through teenagers, signs for parents to watch for and kids’ frames at Clear Horizon Optometry.',
  alternates: { canonical: absoluteUrl('/children/') },
};

export default function ChildrenPage() {
  const kidsFrames = frames.filter(frame => frame.fit === 'kids');

  return (
    <>
      {/* 1. Page head with PictureChart */}
      <PageHead
        eyebrow="Paediatric · 6 months to 17"
        title="Good sight is part of growing up."
        art={<PictureChart className="w-full shadow-none" />}
      >
        <p>
          Calm, age-appropriate vision checks for babies, preschoolers and school-age children—with
          a parent right in the room and no reading required.
        </p>
      </PageHead>

      {/* 2. "When to check" along the full tumbling-E path */}
      <MilestonePath
        kicker="Vision milestones"
        heading="When to check"
        milestones={childMilestones}
      />

      {/* 3. "Signs worth a check" on an exam-room clipboard */}
      <ClipboardChecklist
        kicker="Parents' checklist"
        heading="Signs worth a check"
        intro="Children rarely know that their sight looks blurry—they assume everyone sees the same way. Let us know if you notice any of these:"
      >
        <ClipboardChecklist.Item>Squinting or closing one eye to see clearly</ClipboardChecklist.Item>
        <ClipboardChecklist.Item>Sitting very close to screens or holding books close</ClipboardChecklist.Item>
        <ClipboardChecklist.Item>Losing their place or skipping lines when reading</ClipboardChecklist.Item>
        <ClipboardChecklist.Item>Frequent headaches or tired eyes after school</ClipboardChecklist.Item>
        <ClipboardChecklist.Item>An eye that turns inwards or outwards, even occasionally</ClipboardChecklist.Item>
        <ClipboardChecklist.Item>Rubbing their eyes often when not sleepy</ClipboardChecklist.Item>
        <ClipboardChecklist.Item>Avoiding drawing, colouring or close-up puzzles</ClipboardChecklist.Item>
      </ClipboardChecklist>

      {/* 4. "What a child's test looks like" beside the PictureChart */}
      <section className="wrap py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="readout">Inside the exam room</p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
              What a child&rsquo;s test looks like
            </h2>
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-ink">Picture shapes instead of letters:</strong>{' '}
                  younger children name or match a house, apple, circle or square—no reading or
                  alphabet knowledge needed.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-ink">A parent stays in the room:</strong>{' '}
                  babies and toddlers can sit right on your lap while Dr. Owen Lindqvist checks how
                  both eyes focus and track together.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-ink">About 30 minutes at their pace:</strong>{' '}
                  plenty of time to warm up, take breaks and make it feel like a game.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-ink">Drops only when needed:</strong>{' '}
                  if focusing drops would give a clearer answer, we explain everything first and
                  never rush.
                </span>
              </li>
            </ul>
          </div>

          <div className="mx-auto w-full max-w-xs lg:col-span-5">
            <PictureChart />
          </div>
        </div>
      </section>

      {/* 5. Kids' frames shelf — low single slat of kids' frames linking to /frames/?fit=kids */}
      <section className="border-y border-line bg-surface-2/50 py-16">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="readout">Little Horizon shelf</p>
              <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-ink">
                Kids&rsquo; frames built for small bridges
              </h2>
            </div>
            <SiteLink href="/frames/?fit=kids" className="text-link font-display text-sm font-bold">
              View kids&rsquo; frames on the full wall →
            </SiteLink>
          </div>
          <FrameWall items={kidsFrames} slatSize={3} />
        </div>
      </section>

      {/* 6. Closing CTA */}
      <ClosingCta
        kicker="Children's eye tests"
        heading="Ask about a children's eye test."
        action="Ask about a children's eye test"
        idPrefix="children-cta"
      />
    </>
  );
}
