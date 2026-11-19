import { business } from '../content/business.ts';
import { mapSearchUrl } from './maps.ts';
import { absoluteUrl } from './paths.ts';

/** Schema.org Optician (a MedicalBusiness subtype) derived from typed business content. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openingHoursSpecification = business.hours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Optician',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      ...business.postalAddress,
    },
    hasMap: mapSearchUrl(business.mapQuery),
    openingHoursSpecification,
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
