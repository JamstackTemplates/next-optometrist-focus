import { NotFoundArt } from '../components/art/not-found-art';
import { PlacidoRings } from '../components/art/placido-rings';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <PlacidoRings className="absolute inset-0 h-full w-full text-ink" cx={760} cy={220} />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="readout flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-minus-red" aria-hidden="true" />
            LINE 404 · OUT OF FOCUS
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black tracking-tight text-ink">
            We can&rsquo;t make out this line.
          </h1>
          <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-muted sm:text-lg">
            The page you tried to open isn&rsquo;t on the chart. Head back to the home page or ask
            us directly if you were looking for an eye test or a frame.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <SiteLink href="/" className="button">
              Back to home
            </SiteLink>
            <SiteLink href="/contact/" className="button button-quiet">
              Contact the practice
            </SiteLink>
          </div>
        </div>

        <div className="flex justify-center lg:col-span-6">
          <NotFoundArt />
        </div>
      </div>
    </section>
  );
}
