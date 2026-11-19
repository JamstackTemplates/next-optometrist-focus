export const LENS_OPTION_KINDS = ['lens', 'coating'] as const;

export type LensOptionKind = (typeof LENS_OPTION_KINDS)[number];

export interface LensOption {
  /** Stable URL-safe unique identifier. */
  id: string;
  /** Lens or coating display name. */
  name: string;
  /** Plain-language note explaining what it does. */
  detail: string;
  /** Starting price in whole US dollars (quoted after eye test and fitting). */
  fromPriceUsd: number;
  /** Group on the dispensary price list. */
  kind: LensOptionKind;
}

export const lensOptions: readonly LensOption[] = [
  {
    id: 'single-vision',
    name: 'Single vision lenses',
    detail: 'One prescription for distance or reading',
    fromPriceUsd: 95,
    kind: 'lens',
  },
  {
    id: 'progressive',
    name: 'Progressive lenses',
    detail: 'Distance, middle and near in one lens without a line',
    fromPriceUsd: 295,
    kind: 'lens',
  },
  {
    id: 'office',
    name: 'Office lenses',
    detail: 'Screen and desk distance for long working days',
    fromPriceUsd: 210,
    kind: 'lens',
  },
  {
    id: 'thin-high-index',
    name: 'Thin 1.67 high-index',
    detail: 'Thinner, lighter lenses for stronger prescriptions (added to a lens)',
    fromPriceUsd: 90,
    kind: 'lens',
  },
  {
    id: 'anti-reflective',
    name: 'Anti-reflective coating',
    detail: 'Fewer reflections on screens and at night',
    fromPriceUsd: 65,
    kind: 'coating',
  },
  {
    id: 'photochromic',
    name: 'Light-reactive tint',
    detail: 'Darkens outdoors and clears indoors',
    fromPriceUsd: 110,
    kind: 'coating',
  },
  {
    id: 'polarised-sun',
    name: 'Polarised sun lenses',
    detail: 'Prescription sunglasses that cut glare off water and snow',
    fromPriceUsd: 120,
    kind: 'coating',
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const KIND_SET = new Set<string>(LENS_OPTION_KINDS);

export function validateLensOptions(items: readonly LensOption[]): void {
  if (!items.length) throw new Error('lensOptions: at least one option is required');
  const seen = new Set<string>();
  for (const item of items) {
    const label = `lensOptions.${item.id || '<missing-id>'}`;
    if (!item.id || !URL_SAFE_ID.test(item.id)) throw new Error(`${label}.id: must be a lowercase URL-safe slug`);
    if (seen.has(item.id)) throw new Error(`${label}.id: duplicate lens option id`);
    seen.add(item.id);
    if (!item.name.trim()) throw new Error(`${label}.name: required`);
    if (!item.detail.trim()) throw new Error(`${label}.detail: required`);
    if (!Number.isInteger(item.fromPriceUsd) || item.fromPriceUsd <= 0 || item.fromPriceUsd > 1000) {
      throw new Error(`${label}.fromPriceUsd: must be a positive integer up to 1000`);
    }
    if (!KIND_SET.has(item.kind)) throw new Error(`${label}.kind: must be "lens" or "coating"`);
  }
}
