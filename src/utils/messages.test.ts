import { describe, expect, it } from 'vitest';
import type { Message } from '../types/message';
import { mergeMessages, newestCreatedAt } from './messages';

const a: Message = {
  _id: 'a',
  author: 'Luka',
  message: 'first',
  createdAt: '2024-01-01T10:00:00.000Z',
};

const b: Message = {
  _id: 'b',
  author: 'John',
  message: 'second',
  createdAt: '2024-01-01T11:00:00.000Z',
};

describe('mergeMessages', () => {
  it('merges by id and sorts oldest first', () => {
    expect(mergeMessages([b], [a])).toEqual([a, b]);
  });

  it('replaces an existing id', () => {
    const updated = { ...a, message: 'updated' };
    expect(mergeMessages([a], [updated])).toEqual([updated]);
  });
});

describe('newestCreatedAt', () => {
  it('returns undefined for an empty list', () => {
    expect(newestCreatedAt([])).toBeUndefined();
  });

  it('returns the latest createdAt', () => {
    expect(newestCreatedAt([a, b])).toBe(b.createdAt);
  });
});
