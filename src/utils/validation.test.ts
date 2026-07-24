import { describe, expect, it } from 'vitest';
import { MESSAGE_MAX_LENGTH, validateMessage } from './validation';

describe('validateMessage', () => {
  it('rejects empty or whitespace-only text', () => {
    expect(validateMessage('')).toBe('Message cannot be empty');
    expect(validateMessage('   ')).toBe('Message cannot be empty');
  });

  it('rejects text over the API max length', () => {
    expect(validateMessage('a'.repeat(MESSAGE_MAX_LENGTH + 1))).toMatch(/500/);
  });

  it('accepts a normal message', () => {
    expect(validateMessage('Hello team')).toBeNull();
  });
});
