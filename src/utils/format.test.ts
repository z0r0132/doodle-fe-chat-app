import { describe, expect, it } from 'vitest';
import { decodeHtmlEntities, formatMessageTime } from './format';

describe('formatMessageTime', () => {
  it('formats like the challenge mockups', () => {
    // Local timezone-dependent; assert structure with a fixed UTC parse via components
    const formatted = formatMessageTime('2018-03-10T09:55:00.000Z');
    expect(formatted).toMatch(/^\d{1,2} \w{3} \d{4} \d{1,2}:\d{2}$/);
  });

  it('returns the input when the date is invalid', () => {
    expect(formatMessageTime('not-a-date')).toBe('not-a-date');
  });
});

describe('decodeHtmlEntities', () => {
  it('decodes common HTML entities from seed data', () => {
    expect(decodeHtmlEntities("Cool! It&#39;s super easy to vote.")).toBe(
      "Cool! It's super easy to vote.",
    );
  });
});
