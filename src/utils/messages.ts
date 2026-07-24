import type { Message } from '../types/message';

export function mergeMessages(existing: Message[], incoming: Message[]): Message[] {
  const byId = new Map(existing.map((message) => [message._id, message]));
  for (const message of incoming) {
    byId.set(message._id, message);
  }
  return [...byId.values()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function newestCreatedAt(messages: Message[]): string | undefined {
  if (messages.length === 0) {
    return undefined;
  }
  return messages.reduce((newest, message) =>
    message.createdAt > newest ? message.createdAt : newest,
  messages[0]!.createdAt);
}
