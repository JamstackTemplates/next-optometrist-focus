import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  filterFrames,
  formatFrameSize,
  frames,
  frameStatusLabel,
  parseFrameFilters,
  serializeFrameFilters,
} from '../content/frames.ts';

test('fit=kids filter returns exactly the three kids frames ordered with on-the-wall first', () => {
  const filters = parseFrameFilters('?fit=kids');
  assert.deepEqual(filters, { fit: 'kids' });

  const matched = filterFrames(frames, filters);
  assert.equal(matched.length, 3);
  assert.deepEqual(
    matched.map(f => f.id),
    ['kite-kids-round', 'comet-kids-rectangle', 'pebble-kids-panto'],
  );
  assert.equal(matched[0].onTheWall, true);
  assert.equal(matched[2].onTheWall, false);
});

test('combined filters with no match return an empty list', () => {
  const filters = parseFrameFilters('?fit=kids&material=titanium');
  assert.deepEqual(filters, { fit: 'kids', material: 'titanium' });
  assert.deepEqual(filterFrames(frames, filters), []);
});

test('unknown query values are ignored cleanly', () => {
  const filters = parseFrameFilters('?fit=giant&shape=triangle&material=titanium&extra=123');
  assert.deepEqual(filters, { material: 'titanium' });
  assert.equal(serializeFrameFilters(filters), 'material=titanium');

  const titanium = filterFrames(frames, filters);
  assert.equal(titanium.length, 3);
  assert.ok(titanium.every(f => f.material === 'titanium'));
});

test('box notation and availability status formatting match dispensary conventions', () => {
  assert.equal(formatFrameSize(frames[0]), '47□21-145');
  assert.equal(frameStatusLabel(true), 'On the wall today');
  assert.equal(frameStatusLabel(false), 'Order in, about 7 days');
});
