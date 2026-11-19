'use client';

import { useEffect, useState } from 'react';
import {
  filterFrames,
  FRAME_FIT_LABELS,
  FRAME_FITS,
  FRAME_MATERIAL_LABELS,
  FRAME_MATERIALS,
  FRAME_SHAPE_LABELS,
  FRAME_SHAPES,
  parseFrameFilters,
  serializeFrameFilters,
  type Frame,
  type FrameFilters,
  type FrameFit,
  type FrameMaterial,
  type FrameShape,
} from '../content/frames';
import { FrameWall } from './frame-wall';

/**
 * Interactive dispensary wall with sticky filter bar for shape, material and fit.
 * - Syncs with ?fit= / ?shape= / ?material= in the URL so /frames/?fit=kids works from Children.
 * - Without JavaScript every frame is shown on the wall and the interactive chip bar stays hidden.
 */
export function FramesCatalog({ items }: { items: readonly Frame[] }) {
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FrameFilters>({});

  useEffect(() => {
    const syncFromUrl = () => setFilters(parseFrameFilters(window.location.search));
    syncFromUrl();
    setMounted(true);
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  function updateFilters(next: FrameFilters) {
    setFilters(next);
    const query = serializeFrameFilters(next);
    const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }

  function toggleShape(shape: FrameShape) {
    updateFilters({ ...filters, shape: filters.shape === shape ? undefined : shape });
  }

  function toggleMaterial(material: FrameMaterial) {
    updateFilters({ ...filters, material: filters.material === material ? undefined : material });
  }

  function toggleFit(fit: FrameFit) {
    updateFilters({ ...filters, fit: filters.fit === fit ? undefined : fit });
  }

  function clearFilters() {
    updateFilters({});
  }

  const visible = filterFrames(items, mounted ? filters : {});
  const hasFilters = Boolean(filters.shape || filters.material || filters.fit);
  const countLabel = `${visible.length} ${visible.length === 1 ? 'frame' : 'frames'}`;

  return (
    <div>
      {mounted ? (
        <div
          aria-label="Filter frames"
          className="no-print sticky top-[5.25rem] z-30 border-b border-line bg-paper/95 py-4 backdrop-blur-sm"
        >
          <div className="wrap space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs font-bold tracking-widest text-ink uppercase" aria-live="polite">
                {countLabel}
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-mono text-xs font-semibold text-primary-ink underline hover:text-ink"
                >
                  Clear filters
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {/* Fit chips */}
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by fit">
                <span className="mr-1 font-mono text-[0.7rem] font-semibold tracking-wider text-muted uppercase">
                  Fit
                </span>
                {FRAME_FITS.map(fit => {
                  const active = filters.fit === fit;
                  return (
                    <button
                      key={fit}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleFit(fit)}
                      className={`min-h-9 rounded-full border px-3 font-mono text-xs font-semibold transition-colors ${
                        active
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-line bg-surface text-ink hover:border-steel'
                      }`}
                    >
                      {FRAME_FIT_LABELS[fit]}
                    </button>
                  );
                })}
              </div>

              {/* Material chips */}
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by material">
                <span className="mr-1 font-mono text-[0.7rem] font-semibold tracking-wider text-muted uppercase">
                  Material
                </span>
                {FRAME_MATERIALS.map(material => {
                  const active = filters.material === material;
                  return (
                    <button
                      key={material}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleMaterial(material)}
                      className={`min-h-9 rounded-full border px-3 font-mono text-xs font-semibold transition-colors ${
                        active
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-line bg-surface text-ink hover:border-steel'
                      }`}
                    >
                      {FRAME_MATERIAL_LABELS[material]}
                    </button>
                  );
                })}
              </div>

              {/* Shape chips */}
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by shape">
                <span className="mr-1 font-mono text-[0.7rem] font-semibold tracking-wider text-muted uppercase">
                  Shape
                </span>
                {FRAME_SHAPES.map(shape => {
                  const active = filters.shape === shape;
                  return (
                    <button
                      key={shape}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleShape(shape)}
                      className={`min-h-9 rounded-full border px-3 font-mono text-xs font-semibold transition-colors ${
                        active
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-line bg-surface text-ink hover:border-steel'
                      }`}
                    >
                      {FRAME_SHAPE_LABELS[shape]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="wrap py-12">
        {visible.length > 0 ? (
          <FrameWall items={visible} slatSize={4} />
        ) : (
          <div className="rounded-ui border border-line bg-surface px-6 py-12 text-center">
            <p className="font-display text-xl font-bold text-ink">
              No frames match.{' '}
              <button
                type="button"
                onClick={clearFilters}
                className="text-link font-display font-bold"
              >
                Clear filters.
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
