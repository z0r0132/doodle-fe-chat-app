import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from './errors';
import { createMessage, getMessages } from './messages';

const sampleMessage = {
  _id: 'abc',
  message: 'Hello',
  author: 'You',
  createdAt: '2024-01-12T10:30:00.000Z',
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('getMessages', () => {
  it('GETs messages with Bearer auth', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([sampleMessage]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const messages = await getMessages({ limit: 10 });

    expect(messages).toEqual([sampleMessage]);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/v1/messages?limit=10');
    expect(init.method ?? 'GET').toBe('GET');
    expect(init.headers).toMatchObject({
      Authorization: expect.stringMatching(/^Bearer /),
    });
  });

  it('adds after query param when provided', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await getMessages({ after: '2024-01-12T10:30:00.000Z' });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('after=2024-01-12T10%3A30%3A00.000Z');
  });

  it('throws ApiError on 401', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Unauthorized', statusCode: 401 }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    const error = await getMessages().catch((err: unknown) => err);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 401, message: 'Unauthorized' });
  });
});

describe('createMessage', () => {
  it('POSTs message body and returns created message', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(sampleMessage), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const created = await createMessage({ message: 'Hello', author: 'You' });

    expect(created).toEqual(sampleMessage);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/v1/messages');
    expect(init.method).toBe('POST');
    expect(init.body).toBe(JSON.stringify({ message: 'Hello', author: 'You' }));
  });

  it('throws ApiError on validation failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            error: { message: 'Validation failed', timestamp: '2024-01-01T00:00:00.000Z' },
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      ),
    );

    await expect(createMessage({ message: '', author: 'You' })).rejects.toMatchObject({
      status: 400,
      message: 'Validation failed',
    });
  });
});
