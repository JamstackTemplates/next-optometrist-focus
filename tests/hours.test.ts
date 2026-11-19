import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, groupHours, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
const atPractice = (date: string) => openingLabel(business.hours, 'America/Chicago', new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('Clear Horizon Saint Paul hours: Thursday 19:29 open / 19:30 closed, Saturday 14:00 closed, Sunday closed', () => {
  // 2026-11-19 is Thursday in CST (UTC-6): 19:29 CST = 2026-11-20T01:29:00Z
  assert.equal(atPractice('2026-11-20T01:29:00Z'), 'Open now · until 19:30');
  assert.equal(atPractice('2026-11-20T01:30:00Z'), 'Closed · opens Friday at 08:30');

  // 2026-11-21 is Saturday in CST (UTC-6): 13:59 open, 14:00 closed -> opens Monday at 08:30
  assert.equal(atPractice('2026-11-21T19:59:00Z'), 'Open now · until 14:00');
  assert.equal(atPractice('2026-11-21T20:00:00Z'), 'Closed · opens Monday at 08:30');

  // 2026-11-22 is Sunday -> closed all day, opens Monday at 08:30
  assert.equal(atPractice('2026-11-22T18:00:00Z'), 'Closed · opens Monday at 08:30');
});

test('America/Chicago March and November DST transitions preserve local opening times', () => {
  // Spring forward: Sunday 2026-03-08 02:00 CST -> 03:00 CDT (UTC-5)
  // Monday 2026-03-09 08:29 CDT = 13:29Z; 08:30 CDT = 13:30Z
  assert.equal(atPractice('2026-03-09T13:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(atPractice('2026-03-09T13:30:00Z'), 'Open now · until 18:00');

  // Fall back: Sunday 2026-11-01 02:00 CDT -> 01:00 CST (UTC-6)
  // Monday 2026-11-02 08:29 CST = 14:29Z; 08:30 CST = 14:30Z
  assert.equal(atPractice('2026-11-02T14:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(atPractice('2026-11-02T14:30:00Z'), 'Open now · until 18:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

test('footer hours summary groups consecutive matching days and follows owner edits', () => {
  assert.deepEqual(groupHours(business.hours), [
    { label: 'Mon–Wed', value: '08:30–18:00' },
    { label: 'Thu', value: '08:30–19:30' },
    { label: 'Fri', value: '08:30–17:00' },
    { label: 'Sat', value: '09:00–14:00' },
    { label: 'Sun', value: 'Closed' },
  ]);
  const edited = business.hours.map(entry => entry.day === 'Thursday' ? { ...entry, closes: '18:00' } : entry);
  assert.deepEqual(groupHours(edited)[0], { label: 'Mon–Thu', value: '08:30–18:00' });
  assert.deepEqual(groupHours(hours)[0], { label: 'Mon', value: 'Closed' });
});
