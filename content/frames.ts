export const FRAME_SHAPES = [
  'round',
  'panto',
  'rectangle',
  'cat-eye',
  'aviator',
  'browline',
  'hexagonal',
  'oval',
] as const;

export type FrameShape = (typeof FRAME_SHAPES)[number];

export const FRAME_MATERIALS = [
  'acetate',
  'bio-acetate',
  'titanium',
  'stainless-steel',
] as const;

export type FrameMaterial = (typeof FRAME_MATERIALS)[number];

export const FRAME_FITS = ['narrow', 'medium', 'wide', 'kids'] as const;

export type FrameFit = (typeof FRAME_FITS)[number];

export const FRAME_SHAPE_LABELS: Record<FrameShape, string> = {
  round: 'Round',
  panto: 'Panto',
  rectangle: 'Rectangle',
  'cat-eye': 'Cat-eye',
  aviator: 'Aviator',
  browline: 'Browline',
  hexagonal: 'Hexagonal',
  oval: 'Oval',
};

export const FRAME_MATERIAL_LABELS: Record<FrameMaterial, string> = {
  acetate: 'Acetate',
  'bio-acetate': 'Bio-acetate',
  titanium: 'Titanium',
  'stainless-steel': 'Stainless steel',
};

export const FRAME_FIT_LABELS: Record<FrameFit, string> = {
  narrow: 'Narrow',
  medium: 'Medium',
  wide: 'Wide',
  kids: 'Kids',
};

export interface Frame {
  /** Stable URL-safe unique identifier. */
  id: string;
  /** Frame style name. */
  name: string;
  /** Independent house label (fictitious). */
  maker: string;
  /** Frame silhouette used both for filtering and parametric SVG drawing. */
  shape: FrameShape;
  /** Primary frame material. */
  material: FrameMaterial;
  /** Bridge & width fit category. */
  fit: FrameFit;
  /** Human-readable colour finish. */
  colour: string;
  /** Hex colour used to draw the frame rims in the SVG illustration. */
  rimHex: string;
  /** Lens horizontal width in millimetres (38–60). */
  lensWidthMm: number;
  /** Bridge width in millimetres (12–24). */
  bridgeMm: number;
  /** Temple arm length in millimetres (115–150). */
  templeMm: number;
  /** Frame-only price in whole US dollars (49–600). Frequently edited by the owner. */
  priceUsd: number;
  /** True = "On the wall today"; false = "Order in, about 7 days". Frequently edited by the owner. */
  onTheWall: boolean;
}

export const frames: readonly Frame[] = [
  {
    id: 'rice-park-round',
    name: 'Rice Park',
    maker: 'Horizon House',
    shape: 'round',
    material: 'acetate',
    fit: 'medium',
    colour: 'Tortoiseshell',
    rimHex: '#6b3f22',
    lensWidthMm: 47,
    bridgeMm: 21,
    templeMm: 145,
    priceUsd: 189,
    onTheWall: true,
  },
  {
    id: 'summit-panto',
    name: 'Summit',
    maker: 'Horizon House',
    shape: 'panto',
    material: 'bio-acetate',
    fit: 'medium',
    colour: 'Smoke grey',
    rimHex: '#5c6070',
    lensWidthMm: 49,
    bridgeMm: 20,
    templeMm: 145,
    priceUsd: 215,
    onTheWall: true,
  },
  {
    id: 'landmark-rectangle',
    name: 'Landmark',
    maker: 'Northline Optical',
    shape: 'rectangle',
    material: 'acetate',
    fit: 'wide',
    colour: 'Matte black',
    rimHex: '#1c1d22',
    lensWidthMm: 55,
    bridgeMm: 18,
    templeMm: 145,
    priceUsd: 165,
    onTheWall: true,
  },
  {
    id: 'lowertown-cat-eye',
    name: 'Lowertown',
    maker: 'Northline Optical',
    shape: 'cat-eye',
    material: 'acetate',
    fit: 'narrow',
    colour: 'Cherry',
    rimHex: '#8e1f2e',
    lensWidthMm: 50,
    bridgeMm: 18,
    templeMm: 140,
    priceUsd: 199,
    onTheWall: true,
  },
  {
    id: 'mississippi-aviator',
    name: 'Mississippi',
    maker: 'Fieldglass',
    shape: 'aviator',
    material: 'titanium',
    fit: 'wide',
    colour: 'Brushed gold',
    rimHex: '#a88a4a',
    lensWidthMm: 56,
    bridgeMm: 15,
    templeMm: 145,
    priceUsd: 295,
    onTheWall: false,
  },
  {
    id: 'grand-avenue-browline',
    name: 'Grand Avenue',
    maker: 'Fieldglass',
    shape: 'browline',
    material: 'stainless-steel',
    fit: 'medium',
    colour: 'Black and silver',
    rimHex: '#2a2c33',
    lensWidthMm: 51,
    bridgeMm: 20,
    templeMm: 145,
    priceUsd: 179,
    onTheWall: true,
  },
  {
    id: 'cathedral-hexagonal',
    name: 'Cathedral',
    maker: 'Horizon House',
    shape: 'hexagonal',
    material: 'titanium',
    fit: 'medium',
    colour: 'Gunmetal',
    rimHex: '#4a4f5c',
    lensWidthMm: 49,
    bridgeMm: 19,
    templeMm: 140,
    priceUsd: 265,
    onTheWall: false,
  },
  {
    id: 'como-oval',
    name: 'Como',
    maker: 'Northline Optical',
    shape: 'oval',
    material: 'bio-acetate',
    fit: 'narrow',
    colour: 'Sea glass',
    rimHex: '#4f8f86',
    lensWidthMm: 48,
    bridgeMm: 19,
    templeMm: 140,
    priceUsd: 175,
    onTheWall: true,
  },
  {
    id: 'harriet-round',
    name: 'Harriet',
    maker: 'Fieldglass',
    shape: 'round',
    material: 'titanium',
    fit: 'narrow',
    colour: 'Champagne',
    rimHex: '#c2a878',
    lensWidthMm: 45,
    bridgeMm: 22,
    templeMm: 140,
    priceUsd: 310,
    onTheWall: true,
  },
  {
    id: 'kite-kids-round',
    name: 'Kite',
    maker: 'Little Horizon',
    shape: 'round',
    material: 'acetate',
    fit: 'kids',
    colour: 'Cobalt',
    rimHex: '#2848b8',
    lensWidthMm: 42,
    bridgeMm: 17,
    templeMm: 125,
    priceUsd: 89,
    onTheWall: true,
  },
  {
    id: 'comet-kids-rectangle',
    name: 'Comet',
    maker: 'Little Horizon',
    shape: 'rectangle',
    material: 'acetate',
    fit: 'kids',
    colour: 'Coral',
    rimHex: '#e0604f',
    lensWidthMm: 44,
    bridgeMm: 16,
    templeMm: 130,
    priceUsd: 89,
    onTheWall: true,
  },
  {
    id: 'pebble-kids-panto',
    name: 'Pebble',
    maker: 'Little Horizon',
    shape: 'panto',
    material: 'bio-acetate',
    fit: 'kids',
    colour: 'Mint',
    rimHex: '#5fb894',
    lensWidthMm: 40,
    bridgeMm: 16,
    templeMm: 120,
    priceUsd: 79,
    onTheWall: false,
  },
];

export interface FrameFilters {
  shape?: FrameShape;
  material?: FrameMaterial;
  fit?: FrameFit;
}

const SHAPE_SET = new Set<string>(FRAME_SHAPES);
const MATERIAL_SET = new Set<string>(FRAME_MATERIALS);
const FIT_SET = new Set<string>(FRAME_FITS);

/** Standard optical box notation, e.g. 47□21-145. */
export function formatFrameSize(frame: Pick<Frame, 'lensWidthMm' | 'bridgeMm' | 'templeMm'>): string {
  return `${frame.lensWidthMm}\u25A1${frame.bridgeMm}-${frame.templeMm}`;
}

/** Human-readable dispensary availability status. */
export function frameStatusLabel(onTheWall: boolean): string {
  return onTheWall ? 'On the wall today' : 'Order in, about 7 days';
}

/** Parse URL search params into valid frame filters; unknown values are silently ignored. */
export function parseFrameFilters(search: string | URLSearchParams): FrameFilters {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;
  const shape = params.get('shape') ?? '';
  const material = params.get('material') ?? '';
  const fit = params.get('fit') ?? '';
  return {
    ...(SHAPE_SET.has(shape) ? { shape: shape as FrameShape } : {}),
    ...(MATERIAL_SET.has(material) ? { material: material as FrameMaterial } : {}),
    ...(FIT_SET.has(fit) ? { fit: fit as FrameFit } : {}),
  };
}

/** Serialise active frame filters to a query string (without leading '?'). */
export function serializeFrameFilters(filters: FrameFilters): string {
  const params = new URLSearchParams();
  if (filters.fit) params.set('fit', filters.fit);
  if (filters.shape) params.set('shape', filters.shape);
  if (filters.material) params.set('material', filters.material);
  return params.toString();
}

/** Filter frames by shape, material and fit, ordered with on-the-wall frames first. */
export function filterFrames(items: readonly Frame[], filters: FrameFilters): Frame[] {
  return items
    .filter(frame => {
      if (filters.shape && frame.shape !== filters.shape) return false;
      if (filters.material && frame.material !== filters.material) return false;
      if (filters.fit && frame.fit !== filters.fit) return false;
      return true;
    })
    .sort((a, b) => Number(b.onTheWall) - Number(a.onTheWall));
}

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

export function validateFrames(items: readonly Frame[]): void {
  if (!items.length) throw new Error('frames: at least one frame is required');
  const seen = new Set<string>();
  let kidsCount = 0;
  for (const item of items) {
    const label = `frames.${item.id || '<missing-id>'}`;
    if (!item.id || !URL_SAFE_ID.test(item.id)) throw new Error(`${label}.id: must be a lowercase URL-safe slug`);
    if (seen.has(item.id)) throw new Error(`${label}.id: duplicate frame id`);
    seen.add(item.id);
    if (!item.name.trim()) throw new Error(`${label}.name: required`);
    if (!item.maker.trim()) throw new Error(`${label}.maker: required`);
    if (!item.colour.trim()) throw new Error(`${label}.colour: required`);
    if (!SHAPE_SET.has(item.shape)) throw new Error(`${label}.shape: unknown shape "${item.shape}"`);
    if (!MATERIAL_SET.has(item.material)) throw new Error(`${label}.material: unknown material "${item.material}"`);
    if (!FIT_SET.has(item.fit)) throw new Error(`${label}.fit: unknown fit "${item.fit}"`);
    if (!HEX_COLOR.test(item.rimHex)) throw new Error(`${label}.rimHex: must be a 6-digit hex colour`);
    if (!Number.isInteger(item.lensWidthMm) || item.lensWidthMm < 38 || item.lensWidthMm > 60) {
      throw new Error(`${label}.lensWidthMm: must be an integer between 38 and 60`);
    }
    if (!Number.isInteger(item.bridgeMm) || item.bridgeMm < 12 || item.bridgeMm > 24) {
      throw new Error(`${label}.bridgeMm: must be an integer between 12 and 24`);
    }
    if (!Number.isInteger(item.templeMm) || item.templeMm < 115 || item.templeMm > 150) {
      throw new Error(`${label}.templeMm: must be an integer between 115 and 150`);
    }
    if (!Number.isInteger(item.priceUsd) || item.priceUsd < 49 || item.priceUsd > 600) {
      throw new Error(`${label}.priceUsd: must be an integer between 49 and 600`);
    }
    if (typeof item.onTheWall !== 'boolean') throw new Error(`${label}.onTheWall: must be boolean`);
    if (item.fit === 'kids') kidsCount += 1;
  }
  if (kidsCount < 1) throw new Error('frames: at least one frame must have fit "kids"');
}
