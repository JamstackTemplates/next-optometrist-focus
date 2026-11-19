import type { OpeningHours } from '../lib/hours.ts';

export interface Optometrist {
  /** Stable URL-safe identifier. */
  id: string;
  /** Full display name including OD credential. */
  name: string;
  /** Two-letter monogram rendered inside the lens-ring emblem. */
  initials: string;
  /** Axis angle in degrees shown on the optometrist's lens emblem (0–180). */
  axisDegrees: number;
  /** Clinical focus label. */
  focus: string;
  /** One-sentence introduction. */
  bio: string;
}

export interface Business {
  /** Public practice name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by the home page and fallback metadata. */
  introduction: string;
  /** Public contact email, always visible on Contact and footer. */
  email: string;
  /** Public practice phone number; most-edited field alongside hours. */
  phone: string;
  /** Full single-line street address shown to visitors. */
  address: string;
  /** Structured address components for schema.org PostalAddress. */
  postalAddress: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  /** Landmark query used for directions and keyless map embeds (geo-free). */
  mapQuery: string;
  /** Parking and transit note shown near the map. */
  parkingNote: string;
  /** Weekly opening hours (same-day intervals, Monday through Sunday). Most-edited alongside phone. */
  hours: readonly OpeningHours[];
  /** Practice optometrists. */
  optometrists: readonly Optometrist[];
  /** Urgent symptoms warning displayed on Eye tests and Contact. */
  urgentNotice: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Enquiry phrasing only — never imply a settled appointment or a held frame. */
    introduction: string;
    /** Suggestions displayed beside the form, never as extra inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Clear Horizon Optometry',
  tagline: 'See the horizon clearly.',
  introduction:
    'Thorough eye tests, honest advice and frames chosen to fit your face, facing Rice Park in downtown Saint Paul.',
  email: 'hello@clearhorizonoptometry.example',
  phone: '(651) 555-0172',
  address: 'Suite 110, 5th Street West, facing Rice Park, Saint Paul, MN 55102',
  postalAddress: {
    streetAddress: 'Suite 110, 5th Street West',
    addressLocality: 'Saint Paul',
    addressRegion: 'MN',
    postalCode: '55102',
    addressCountry: 'US',
  },
  mapQuery: 'Rice Park, Saint Paul, MN',
  parkingNote: 'Street parking on 5th Street West and public ramps within two blocks.',
  hours: [
    { day: 'Monday', opens: '08:30', closes: '18:00' },
    { day: 'Tuesday', opens: '08:30', closes: '18:00' },
    { day: 'Wednesday', opens: '08:30', closes: '18:00' },
    { day: 'Thursday', opens: '08:30', closes: '19:30' },
    { day: 'Friday', opens: '08:30', closes: '17:00' },
    { day: 'Saturday', opens: '09:00', closes: '14:00' },
    { day: 'Sunday' },
  ],
  optometrists: [
    {
      id: 'dr-priya-raman',
      name: 'Dr. Priya Raman, OD',
      initials: 'PR',
      axisDegrees: 35,
      focus: 'Adult eye health and contact lenses',
      bio: 'Priya takes unhurried time over complex prescriptions, dry eye care and comfortable multifocal or astigmatic contact lens fittings.',
    },
    {
      id: 'dr-owen-lindqvist',
      name: 'Dr. Owen Lindqvist, OD',
      initials: 'OL',
      axisDegrees: 145,
      focus: "Children's vision and binocular vision",
      bio: 'Owen works with babies, school-age readers and adults experiencing eye strain, explaining every measurement in plain language.',
    },
  ],
  urgentNotice:
    'Sudden loss of vision, flashes with new floaters, eye injury or a painful red eye need urgent care. Call us during opening hours or go to the nearest emergency department; do not wait for a reply to an online enquiry.',
  enquiries: {
    title: 'Ask about an eye test or a frame.',
    introduction:
      'Send a question about eye tests, contact lenses, children’s vision or a frame on our wall. We will reply to arrange a time that suits you.',
    usefulToInclude: [
      'Which eye test or frame you are asking about',
      'Who the visit is for (and the child’s age, if it is for a child)',
      'Two or three days and times that suit you',
      'Roughly when your last eye test was',
      'A phone number if you prefer a call back',
      'Your vision plan name if you would like us to check what it covers',
    ],
  },
};

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
