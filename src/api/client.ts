import { env } from '../config/env';
import { ApiError } from './errors';

type RequestOptions = {
  method?: 'GET' | 'POST';
  body?: unknown;
  signal?: AbortSignal;
};

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return undefined;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function messageFromBody(body: unknown, status: number): string {
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>;
    if (typeof record.message === 'string') {
      return record.message;
    }
    if (record.error && typeof record.error === 'object') {
      const nested = record.error as Record<string, unknown>;
      if (typeof nested.message === 'string') {
        return nested.message;
      }
      if (Array.isArray(nested.message)) {
        return nested.message
          .map((item) => {
            if (item && typeof item === 'object' && 'message' in item) {
              return String((item as { message: unknown }).message);
            }
            return String(item);
          })
          .join(', ');
      }
    }
  }
  return `Request failed with status ${status}`;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${env.apiToken}`,
      'Content-Type': 'application/json',
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options.signal,
  });

  const body = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(response.status, messageFromBody(body, response.status), body);
  }

  return body as T;
}
