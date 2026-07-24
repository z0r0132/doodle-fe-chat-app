import { describe, expect, it } from 'vitest';
import { env } from './env';

describe('env', () => {
  it('exposes required Vite env values', () => {
    expect(env.apiBaseUrl).toMatch(/^https?:\/\//);
    expect(env.apiToken.length).toBeGreaterThan(0);
    expect(env.currentAuthor.length).toBeGreaterThan(0);
    expect(env.pollIntervalMs).toBeGreaterThan(0);
  });
});
