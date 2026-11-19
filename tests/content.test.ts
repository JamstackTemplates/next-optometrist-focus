import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { childMilestones, validateChildMilestones } from '../content/child-milestones.ts';
import { eyeTests, validateEyeTests } from '../content/eye-tests.ts';
import { frames, validateFrames } from '../content/frames.ts';
import { lensOptions, validateLensOptions } from '../content/lens-options.ts';
import { validateHours } from '../lib/hours.ts';
import { route } from '../lib/paths.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields and valid hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'address', 'mapQuery', 'urgentNotice'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.equal(business.optometrists.length, 2, 'business.optometrists: expected two optometrists');
  for (const od of business.optometrists) {
    assert.ok(od.name.trim() && od.focus.trim() && od.bio.trim(), `business.optometrists.${od.id}: incomplete`);
  }
  assert.doesNotThrow(() => validateHours(business.hours));
});

test('eyeTests collection passes validation and rejects bad fields with item-specific errors', () => {
  assert.equal(eyeTests.length, 8);
  assert.doesNotThrow(() => validateEyeTests(eyeTests));

  assert.throws(
    () => validateEyeTests([...eyeTests, { ...eyeTests[0] }]),
    /comprehensive-eye-test\.id/,
  );
  assert.throws(
    () => validateEyeTests(eyeTests.map(x => (x.id === 'dry-eye-assessment' ? { ...x, priceUsd: 501 } : x))),
    /dry-eye-assessment\.priceUsd/,
  );
  assert.throws(
    () => validateEyeTests(eyeTests.map(x => (x.id === 'retinal-imaging' ? { ...x, durationMinutes: 5 } : x))),
    /retinal-imaging\.durationMinutes/,
  );
  assert.throws(
    () => validateEyeTests(eyeTests.map(x => (x.id === 'diabetic-eye-check' ? { ...x, icon: 'bad-icon' as never } : x))),
    /diabetic-eye-check\.icon/,
  );
});

test('frames collection passes validation and rejects bad measurements, prices or missing kids fit', () => {
  assert.equal(frames.length, 12);
  assert.doesNotThrow(() => validateFrames(frames));

  assert.throws(
    () => validateFrames(frames.map(x => (x.id === 'kite-kids-round' ? { ...x, priceUsd: 20 } : x))),
    /kite-kids-round\.priceUsd/,
  );
  assert.throws(
    () => validateFrames(frames.map(x => (x.id === 'rice-park-round' ? { ...x, lensWidthMm: 70 } : x))),
    /rice-park-round\.lensWidthMm/,
  );
  assert.throws(
    () => validateFrames(frames.map(x => (x.id === 'summit-panto' ? { ...x, shape: 'star' as never } : x))),
    /summit-panto\.shape/,
  );
  assert.throws(
    () => validateFrames(frames.map(x => (x.id === 'como-oval' ? { ...x, material: 'wood' as never } : x))),
    /como-oval\.material/,
  );
  assert.throws(
    () => validateFrames(frames.filter(x => x.fit !== 'kids')),
    /kids/,
  );
});

test('lensOptions and childMilestones pass validation and reject bad entries with item-specific errors', () => {
  assert.equal(lensOptions.length, 7);
  assert.doesNotThrow(() => validateLensOptions(lensOptions));
  assert.throws(
    () => validateLensOptions(lensOptions.map(x => (x.id === 'progressive' ? { ...x, fromPriceUsd: 0 } : x))),
    /progressive\.fromPriceUsd/,
  );

  assert.equal(childMilestones.length, 4);
  assert.doesNotThrow(() => validateChildMilestones(childMilestones));
  assert.throws(
    () => validateChildMilestones(childMilestones.map(x => (x.id === 'age-five' ? { ...x, ageMonths: 36 } : x))),
    /age-five\.ageMonths/,
  );
});

test('structured data emits Optician with address, geo-free map, hours and escaped JSON-LD', () => {
  const data = businessStructuredData();
  assert.equal(data['@type'], 'Optician');
  assert.equal(data.name, business.name);
  assert.equal(data.email, business.email);
  assert.equal(data.telephone, business.phone);
  assert.equal(data.address['@type'], 'PostalAddress');
  assert.equal(data.address.addressLocality, 'Saint Paul');
  assert.match(data.hasMap, /^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/);
  assert.equal(data.openingHoursSpecification.length, 6);
  assert.ok(!data.openingHoursSpecification.some(x => x.dayOfWeek.endsWith('Sunday')));

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('route helper preserves query parameters and hashes with trailing slash on pathname', () => {
  assert.equal(route('/frames'), '/frames/');
  assert.equal(route('/frames/?fit=kids'), '/frames/?fit=kids');
  assert.equal(route('/frames?fit=kids'), '/frames/?fit=kids');
  assert.equal(route('/contact/#hours'), '/contact/#hours');
});

test('practice copy uses enquiry wording only and includes urgent symptoms notice on Eye tests and Contact', () => {
  const files = [
    '../content/business.ts',
    '../app/page.tsx',
    '../app/eye-tests/page.tsx',
    '../app/frames/page.tsx',
    '../app/children/page.tsx',
    '../app/contact/page.tsx',
    '../app/not-found.tsx',
  ];
  const forbidden = /\b(book now|reserve|confirmed|guaranteed)\b/i;
  for (const rel of files) {
    const source = readFileSync(new URL(rel, import.meta.url), 'utf8');
    assert.doesNotMatch(source, forbidden, `${rel}: forbidden booking/guarantee phrasing found`);
  }

  const eyeTestsPage = readFileSync(new URL('../app/eye-tests/page.tsx', import.meta.url), 'utf8');
  const contactPage = readFileSync(new URL('../app/contact/page.tsx', import.meta.url), 'utf8');
  assert.match(eyeTestsPage, /<UrgentNote/);
  assert.match(contactPage, /<UrgentNote/);
  assert.match(business.urgentNotice, /Sudden loss of vision/);
});
