import { act, renderHook, waitFor } from '@testing-library/react';
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

const created = {
  _id: '2',
  author: 'You',
  message: 'Hi from me',
  createdAt: '2024-01-01T11:00:00.000Z',
};

vi.mock('../api/messages', () => ({
  getMessages: vi.fn(),
  createMessage: vi.fn(),
}));

import { createMessage, getMessages } from '../api/messages';

afterEach(() => {
  vi.mocked(getMessages).mockReset();
  vi.mocked(createMessage).mockReset();
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

  it('sends a message and appends it to the list', async () => {
    vi.mocked(getMessages).mockResolvedValue(sample);
    vi.mocked(createMessage).mockResolvedValue(created);

    const { result } = renderHook(() => useMessages());

    await waitFor(() => {
      expect(result.current.status).toBe('ready');
    });

    let ok = false;
    await act(async () => {
      ok = await result.current.sendMessage('Hi from me');
    });

    expect(ok).toBe(true);
    expect(createMessage).toHaveBeenCalledWith({
      message: 'Hi from me',
      author: 'You',
    });
    expect(result.current.messages.map((m) => m._id)).toEqual(['1', '2']);
  });

  it('rejects empty messages before calling the API', async () => {
    vi.mocked(getMessages).mockResolvedValue(sample);

    const { result } = renderHook(() => useMessages());

    await waitFor(() => {
      expect(result.current.status).toBe('ready');
    });

    let ok = true;
    await act(async () => {
      ok = await result.current.sendMessage('   ');
    });

    expect(ok).toBe(false);
    expect(createMessage).not.toHaveBeenCalled();
    expect(result.current.sendError).toMatch(/empty/i);
  });
});
