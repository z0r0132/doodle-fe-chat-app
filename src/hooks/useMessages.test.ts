import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useMessages } from './useMessages';

const sample = [
  {
    _id: '1',
    author: 'Luka',
    message: 'Hello',
    createdAt: '2024-01-01T10:00:00.000Z',
  },
];

vi.mock('../api/messages', () => ({
  getMessages: vi.fn(),
}));

import { getMessages } from '../api/messages';

afterEach(() => {
  vi.mocked(getMessages).mockReset();
});

describe('useMessages', () => {
  it('loads messages on mount', async () => {
    vi.mocked(getMessages).mockResolvedValue(sample);

    const { result } = renderHook(() => useMessages());

    expect(result.current.status).toBe('loading');

    await waitFor(() => {
      expect(result.current.status).toBe('ready');
    });

    expect(result.current.messages).toEqual(sample);
    expect(result.current.error).toBeNull();
  });

  it('sets error state when the initial load fails', async () => {
    vi.mocked(getMessages).mockRejectedValue(new Error('Network down'));

    const { result } = renderHook(() => useMessages());

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.error).toBe('Network down');
    expect(result.current.messages).toEqual([]);
  });
});
