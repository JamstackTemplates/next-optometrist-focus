export interface ChildMilestone {
  /** Stable URL-safe unique identifier. */
  id: string;
  /** Human-readable age label shown on the tumbling-E path. */
  age: string;
  /** Age in months; milestones must be strictly increasing. */
  ageMonths: number;
  /** Short stage title. */
  title: string;
  /** Explanation for parents. */
  detail: string;
}

export const childMilestones: readonly ChildMilestone[] = [
  {
    id: 'six-months',
    age: '6 months',
    ageMonths: 6,
    title: 'A first look',
    detail: 'We check that both eyes focus, follow and work together. No reading or talking needed.',
  },
  {
    id: 'age-three',
    age: 'Age 3',
    ageMonths: 36,
    title: 'Before preschool',
    detail: 'Picture shapes make it a game. We look for a lazy eye early, when it is easiest to treat.',
  },
  {
    id: 'age-five',
    age: 'Age 5',
    ageMonths: 60,
    title: 'Ready for school',
    detail: 'A full check before reading starts in earnest, including focusing up close.',
  },
  {
    id: 'school-years',
    age: 'Every year, 6–17',
    ageMonths: 72,
    title: 'Each school year',
    detail: 'Sight can change quickly while children grow, so we suggest a test every year.',
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateChildMilestones(items: readonly ChildMilestone[]): void {
  if (!items.length) throw new Error('childMilestones: at least one milestone is required');
  const seen = new Set<string>();
  let previousAge = 0;
  for (const item of items) {
    const label = `childMilestones.${item.id || '<missing-id>'}`;
    if (!item.id || !URL_SAFE_ID.test(item.id)) throw new Error(`${label}.id: must be a lowercase URL-safe slug`);
    if (seen.has(item.id)) throw new Error(`${label}.id: duplicate milestone id`);
    seen.add(item.id);
    if (!item.age.trim()) throw new Error(`${label}.age: required`);
    if (!item.title.trim()) throw new Error(`${label}.title: required`);
    if (!item.detail.trim()) throw new Error(`${label}.detail: required`);
    if (!Number.isInteger(item.ageMonths) || item.ageMonths <= previousAge) {
      throw new Error(`${label}.ageMonths: must be an integer strictly greater than ${previousAge}`);
    }
    previousAge = item.ageMonths;
  }
}
