import type { CreateMessageInput, GetMessagesParams, Message } from '../types/message';
import { apiRequest } from './client';

function toQuery(params: GetMessagesParams = {}): string {
  const search = new URLSearchParams();
  if (params.limit !== undefined) {
    search.set('limit', String(params.limit));
  }
  if (params.after) {
    search.set('after', params.after);
  }
  if (params.before) {
    search.set('before', params.before);
  }
  const query = search.toString();
  return query ? `?${query}` : '';
}

export function getMessages(
  params?: GetMessagesParams,
  signal?: AbortSignal,
): Promise<Message[]> {
  return apiRequest<Message[]>(`/api/v1/messages${toQuery(params)}`, { signal });
}

export function createMessage(
  input: CreateMessageInput,
  signal?: AbortSignal,
): Promise<Message> {
  return apiRequest<Message>('/api/v1/messages', {
    method: 'POST',
    body: input,
    signal,
  });
}
