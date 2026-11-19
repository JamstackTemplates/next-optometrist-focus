export const OPTICAL_ICONS = [
  'phoropter',
  'child-chart',
  'contact-lens',
  'retina',
  'drop',
  'tear',
  'car',
  'clock',
  'pin',
  'phone',
  'mail',
  'glasses',
] as const;

export type OpticalIconName = (typeof OPTICAL_ICONS)[number];

export interface EyeTest {
  /** Stable URL-safe unique identifier. */
  id: string;
  /** Test name shown on the trial-lens slot. */
  name: string;
  /** Short plain-language summary of who the test is for. */
  summary: string;
  /** Typical exam duration in minutes (integer 10–90). */
  durationMinutes: number;
  /** Fee in whole US dollars (integer 0–500). Most-edited field. */
  priceUsd: number;
  /** Age range label, e.g. "18+" or "6 months–17". */
  ages: string;
  /** Items included in the visit, revealed in the slot details. */
  includes: readonly string[];
  /** Line icon rendered on the lens slot. */
  icon: OpticalIconName;
  /** Trial-lens diopter tab notation shown on the brass/steel ring. */
  lensPower: string;
  /** Trial-lens tab colour: minus lenses use red, plus lenses use ink. */
  tabKind: 'minus' | 'plus';
}

export const eyeTests: readonly EyeTest[] = [
  {
    id: 'comprehensive-eye-test',
    name: 'Comprehensive eye test',
    summary: 'Full prescription and eye-health examination for adults, whether your sight has shifted or you are due a routine check.',
    durationMinutes: 45,
    priceUsd: 135,
    ages: '18+',
    includes: ['refraction', 'eye pressure', 'eye health check', 'written prescription'],
    icon: 'phoropter',
    lensPower: '-1.50',
    tabKind: 'minus',
  },
  {
    id: 'childrens-eye-test',
    name: "Children's eye test",
    summary: 'Calm, unhurried sight and eye-teaming checks tailored for babies, preschoolers and school-age readers.',
    durationMinutes: 30,
    priceUsd: 85,
    ages: '6 months–17',
    includes: ['picture-shape chart', 'focusing and eye-teaming checks', 'eye health check'],
    icon: 'child-chart',
    lensPower: '+1.25',
    tabKind: 'plus',
  },
  {
    id: 'contact-lens-fitting',
    name: 'Contact lens fitting',
    summary: 'For first-time wearers or switching lens types, including corneal measurements and hands-on practice.',
    durationMinutes: 40,
    priceUsd: 95,
    ages: '12+',
    includes: ['corneal measurements', 'trial lenses', 'insertion and removal lesson', 'follow-up visit'],
    icon: 'contact-lens',
    lensPower: '-2.25',
    tabKind: 'minus',
  },
  {
    id: 'contact-lens-check',
    name: 'Contact lens check-up',
    summary: 'Annual comfort and corneal-health review for existing contact lens wearers.',
    durationMinutes: 20,
    priceUsd: 55,
    ages: '12+',
    includes: ['lens fit review', 'corneal health check', 'updated lens prescription'],
    icon: 'contact-lens',
    lensPower: '-0.75',
    tabKind: 'minus',
  },
  {
    id: 'diabetic-eye-check',
    name: 'Diabetic eye check',
    summary: 'Detailed dilated examination of the retinal blood vessels with photographic records for ongoing monitoring.',
    durationMinutes: 40,
    priceUsd: 120,
    ages: '18+',
    includes: ['dilated retina exam', 'retinal photographs', 'report for your doctor on request'],
    icon: 'drop',
    lensPower: '+2.00',
    tabKind: 'plus',
  },
  {
    id: 'dry-eye-assessment',
    name: 'Dry eye assessment',
    summary: 'Focused investigation for gritty, watering or tired eyes, especially after long screen days or winter winds.',
    durationMinutes: 30,
    priceUsd: 110,
    ages: '18+',
    includes: ['tear film check', 'eyelid examination', 'care plan'],
    icon: 'tear',
    lensPower: '+0.50',
    tabKind: 'plus',
  },
  {
    id: 'retinal-imaging',
    name: 'Retinal imaging add-on',
    summary: 'Wide-field digital photographs of the back of each eye saved to your file to track subtle changes year to year.',
    durationMinutes: 10,
    priceUsd: 39,
    ages: '6+',
    includes: ['wide-field retinal photographs', 'side-by-side comparison at future visits'],
    icon: 'retina',
    lensPower: '+0.25',
    tabKind: 'plus',
  },
  {
    id: 'driving-vision-check',
    name: 'Driving vision check',
    summary: 'Focused distance acuity and visual-field screening for licence renewal paperwork.',
    durationMinutes: 15,
    priceUsd: 45,
    ages: '16+',
    includes: ['distance acuity', 'field screening', 'signed vision form'],
    icon: 'car',
    lensPower: '-0.50',
    tabKind: 'minus',
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ICON_SET = new Set<string>(OPTICAL_ICONS);

export function validateEyeTests(items: readonly EyeTest[]): void {
  if (!items.length) throw new Error('eyeTests: at least one test is required');
  const seen = new Set<string>();
  for (const item of items) {
    const label = `eyeTests.${item.id || '<missing-id>'}`;
    if (!item.id || !URL_SAFE_ID.test(item.id)) throw new Error(`${label}.id: must be a lowercase URL-safe slug`);
    if (seen.has(item.id)) throw new Error(`${label}.id: duplicate eye test id`);
    seen.add(item.id);
    if (!item.name.trim()) throw new Error(`${label}.name: required`);
    if (!item.summary.trim()) throw new Error(`${label}.summary: required`);
    if (!item.ages.trim()) throw new Error(`${label}.ages: required`);
    if (!Number.isInteger(item.durationMinutes) || item.durationMinutes < 10 || item.durationMinutes > 90) {
      throw new Error(`${label}.durationMinutes: must be an integer between 10 and 90`);
    }
    if (!Number.isInteger(item.priceUsd) || item.priceUsd < 0 || item.priceUsd > 500) {
      throw new Error(`${label}.priceUsd: must be an integer between 0 and 500`);
    }
    if (!item.includes.length || item.includes.some(x => !x.trim())) {
      throw new Error(`${label}.includes: must contain non-empty items`);
    }
    if (!ICON_SET.has(item.icon)) {
      throw new Error(`${label}.icon: unknown icon "${item.icon}"`);
    }
  }
}
